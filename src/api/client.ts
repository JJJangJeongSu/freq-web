/**
 * API Client
 *
 * Axios instance with interceptors for authentication and error handling
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

/**
 * Token Refresh State
 */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

/**
 * Process failed queue
 */
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  // Direct axios call to avoid circular dependency
  const response = await axios.post(
    `${API_CONFIG.baseURL}/auth/reissue`,
    { refreshToken },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

  const { accessToken, refreshToken: newRefreshToken } = response.data.data;

  // Update tokens
  localStorage.setItem('authToken', accessToken);
  localStorage.setItem('refreshToken', newRefreshToken);

  return accessToken;
};

/**
 * Create Axios instance
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
  withCredentials: API_CONFIG.withCredentials,
});

/**
 * Request Interceptor
 * Add authentication token to all requests
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');

    // Add Authorization header if token exists
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Store request timestamp for duration calculation
    (config as any).metadata = { startTime: new Date() };

    // Rich request logging in development
    if (import.meta.env.DEV) {
      const timestamp = new Date().toISOString();
      const method = config.method?.toUpperCase() || 'GET';
      const url = config.url || '';

      console.groupCollapsed(
        `%c🚀 ${method} %c${url}%c @ ${timestamp}`,
        'color: #3b82f6; font-weight: bold',
        'color: #10b981; font-weight: normal',
        'color: #6b7280; font-weight: normal'
      );

      console.log('%cURL:', 'color: #8b5cf6; font-weight: bold', `${config.baseURL}${url}`);

      if (config.params && Object.keys(config.params).length > 0) {
        console.log('%cQuery Params:', 'color: #f59e0b; font-weight: bold', config.params);
      }

      if (config.data) {
        console.log('%cRequest Body:', 'color: #ec4899; font-weight: bold', config.data);
      }

      console.log('%cHeaders:', 'color: #6366f1; font-weight: bold', {
        'Content-Type': config.headers['Content-Type'],
        'Authorization': token ? `Bearer ${token.substring(0, 20)}...` : 'None',
      });

      console.groupEnd();
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('%c❌ Request Setup Error', 'color: #ef4444; font-weight: bold', error.message);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle common response scenarios and errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Calculate request duration
    const config = response.config as any;
    const duration = config.metadata?.startTime
      ? new Date().getTime() - config.metadata.startTime.getTime()
      : 0;

    // Rich response logging in development
    if (import.meta.env.DEV) {
      const method = response.config.method?.toUpperCase() || 'GET';
      const url = response.config.url || '';
      const status = response.status;

      // Color based on status code
      let statusColor = '#10b981'; // green for 2xx
      if (status >= 300 && status < 400) statusColor = '#f59e0b'; // orange for 3xx
      if (status >= 400) statusColor = '#ef4444'; // red for 4xx/5xx

      console.groupCollapsed(
        `%c✅ ${status} %c${method} %c${url}%c (${duration}ms)`,
        `color: ${statusColor}; font-weight: bold`,
        'color: #3b82f6; font-weight: bold',
        'color: #10b981; font-weight: normal',
        'color: #6b7280; font-weight: normal'
      );

      console.log('%cStatus:', 'color: #10b981; font-weight: bold', status, response.statusText);
      console.log('%cDuration:', 'color: #8b5cf6; font-weight: bold', `${duration}ms`);

      // Log response data with size
      const dataSize = JSON.stringify(response.data).length;
      console.log(
        '%cResponse Data:',
        'color: #ec4899; font-weight: bold',
        response.data,
        `(${(dataSize / 1024).toFixed(2)} KB)`
      );

      // Show response structure for debugging
      if (response.data && typeof response.data === 'object') {
        console.log('%cData Structure:', 'color: #f59e0b; font-weight: bold', {
          success: response.data.success,
          hasData: !!response.data.data,
          message: response.data.message,
          keys: Object.keys(response.data),
        });
      }

      console.groupEnd();
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized with Token Refresh
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      // Avoid refresh loop for /auth/reissue endpoint
      if (originalRequest.url?.includes('/auth/reissue')) {
        console.groupCollapsed('%c❌ 401 RefreshToken Invalid', 'color: #ef4444; font-weight: bold');
        console.error('Refresh token is invalid or expired');
        console.log('Action: Clearing localStorage and redirecting to login');
        console.groupEnd();

        localStorage.clear();
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
        return Promise.reject(error);
      }

      // If already refreshing, add to queue
      if (isRefreshing) {
        console.log(
          '%c⏳ Token Refresh In Progress',
          'color: #f59e0b; font-weight: bold',
          `Adding request to queue (${failedQueue.length + 1} requests waiting)`
        );

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log('%c✅ Request Resumed', 'color: #10b981; font-weight: bold', originalRequest.url);
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Mark as retry and start refreshing
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.groupCollapsed(
          '%c🔄 Token Refresh Started',
          'color: #3b82f6; font-weight: bold; font-size: 14px'
        );
        console.log('Reason: 401 Unauthorized on', originalRequest.url);
        console.log('Queue size:', failedQueue.length);
        console.time('Token Refresh Duration');

        const newToken = await refreshAccessToken();

        console.timeEnd('Token Refresh Duration');
        console.log('%c✅ New Token Acquired', 'color: #10b981; font-weight: bold');
        console.log('Token (first 30 chars):', newToken.substring(0, 30) + '...');
        console.groupEnd();

        // Process queued requests
        console.log(
          `%c📤 Processing ${failedQueue.length} Queued Requests`,
          'color: #8b5cf6; font-weight: bold'
        );
        processQueue(null, newToken);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.groupCollapsed('%c❌ Token Refresh Failed', 'color: #ef4444; font-weight: bold');
        console.error('Refresh Error:', refreshError);
        console.log('Clearing all auth data');
        console.log('Rejecting', failedQueue.length, 'queued requests');
        console.groupEnd();

        processQueue(refreshError as Error, null);

        // Clear tokens and redirect to login
        localStorage.clear();
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Calculate request duration if available
    const config = error.config as any;
    const duration = config?.metadata?.startTime
      ? new Date().getTime() - config.metadata.startTime.getTime()
      : null;

    // Handle other errors with rich logging
    if (error.response) {
      const { status, data, statusText } = error.response;
      const method = error.config?.method?.toUpperCase() || 'GET';
      const url = error.config?.url || 'unknown';

      // Determine error icon and color
      let errorIcon = '❌';
      let errorColor = '#ef4444';

      if (status === 403) {
        errorIcon = '🚫';
        errorColor = '#f59e0b';
      } else if (status === 404) {
        errorIcon = '🔍';
        errorColor = '#f59e0b';
      } else if (status >= 500) {
        errorIcon = '💥';
        errorColor = '#dc2626';
      }

      console.groupCollapsed(
        `%c${errorIcon} ${status} ${statusText} %c${method} %c${url}%c${duration ? ` (${duration}ms)` : ''}`,
        `color: ${errorColor}; font-weight: bold`,
        'color: #3b82f6; font-weight: bold',
        'color: #6b7280; font-weight: normal',
        'color: #9ca3af; font-weight: normal'
      );

      console.error('%cStatus:', 'color: #ef4444; font-weight: bold', status, statusText);

      if (duration) {
        console.log('%cDuration:', 'color: #8b5cf6; font-weight: bold', `${duration}ms`);
      }

      console.log('%cURL:', 'color: #6366f1; font-weight: bold', `${error.config?.baseURL}${url}`);

      // Log error response data
      if (data) {
        console.error('%cError Response:', 'color: #ec4899; font-weight: bold', data);

        // Extract error message if available
        const errorMessage =
          data.error?.message || data.message || data.detail || 'No error message';
        const errorCode = data.error?.code || data.code || 'UNKNOWN';

        console.error('%cError Message:', 'color: #f59e0b; font-weight: bold', errorMessage);
        console.error('%cError Code:', 'color: #f59e0b; font-weight: bold', errorCode);
      }

      // Log request details for debugging
      if (error.config?.data) {
        console.log('%cRequest Body:', 'color: #6b7280; font-weight: bold', error.config.data);
      }

      if (error.config?.params) {
        console.log('%cQuery Params:', 'color: #6b7280; font-weight: bold', error.config.params);
      }

      // Handle specific status codes
      switch (status) {
        case 400:
          console.warn('%cBad Request:', 'color: #f59e0b', 'Check your request parameters');
          break;
        case 403:
          console.warn('%cForbidden:', 'color: #f59e0b', 'You do not have permission to access this resource');
          break;
        case 404:
          console.warn('%cNot Found:', 'color: #f59e0b', 'The requested resource does not exist');
          break;
        case 422:
          console.warn('%cValidation Error:', 'color: #f59e0b', 'Request validation failed');
          break;
        case 429:
          console.warn('%cRate Limited:', 'color: #f59e0b', 'Too many requests, please slow down');
          break;
        case 500:
          console.error('%cServer Error:', 'color: #ef4444', 'Internal server error occurred');
          break;
        case 502:
          console.error('%cBad Gateway:', 'color: #ef4444', 'Server received invalid response');
          break;
        case 503:
          console.error('%cService Unavailable:', 'color: #ef4444', 'Server is temporarily unavailable');
          break;
        case 504:
          console.error('%cGateway Timeout:', 'color: #ef4444', 'Server did not respond in time');
          break;
      }

      console.groupEnd();
    } else if (error.request) {
      // Request was made but no response received
      console.groupCollapsed('%c📡 No Response from Server', 'color: #ef4444; font-weight: bold');
      console.error('Request was sent but no response received');
      console.error('This could be a network error or CORS issue');
      console.log('%cRequest Config:', 'color: #6b7280', error.config);
      console.groupEnd();
    } else {
      // Something happened in setting up the request
      console.groupCollapsed('%c⚙️ Request Setup Error', 'color: #ef4444; font-weight: bold');
      console.error('Error:', error.message);
      console.log('This error occurred before the request was sent');
      console.groupEnd();
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to set authentication token
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

/**
 * Helper function to clear authentication token
 */
export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Helper function to get authentication token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

/**
 * Export axios instance as default
 */
export default apiClient;
