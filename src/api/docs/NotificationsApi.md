# NotificationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getNotifications**](#getnotifications) | **GET** /notifications | 알림 목록 조회|
|[**getNotifications_0**](#getnotifications_0) | **GET** /notifications | 알림 목록 조회|
|[**markAllNotificationsRead**](#markallnotificationsread) | **PATCH** /notifications/read-all | 전체 알림 읽음 처리|
|[**markAllNotificationsRead_0**](#markallnotificationsread_0) | **PATCH** /notifications/read-all | 전체 알림 읽음 처리|
|[**markNotificationRead**](#marknotificationread) | **PATCH** /notifications/{id}/read | 단일 알림 읽음 처리|
|[**markNotificationRead_0**](#marknotificationread_0) | **PATCH** /notifications/{id}/read | 단일 알림 읽음 처리|

# **getNotifications**
> GetNotifications200Response getNotifications()

로그인한 사용자의 알림 목록을 조회합니다.   필터나 페이징 없이 전체 알림을 반환합니다. 

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.getNotifications();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetNotifications200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 알림 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getNotifications_0**
> GetNotifications200Response getNotifications_0()

로그인한 사용자의 알림 목록을 조회합니다.   필터나 페이징 없이 전체 알림을 반환합니다. 

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.getNotifications_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetNotifications200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 알림 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markAllNotificationsRead**
> MarkAllNotificationsRead200Response markAllNotificationsRead()

로그인한 사용자의 모든 알림을 읽음 처리합니다.

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.markAllNotificationsRead();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MarkAllNotificationsRead200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 전체 읽음 처리 성공 |  -  |
|**401** | 인증 실패 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markAllNotificationsRead_0**
> MarkAllNotificationsRead200Response markAllNotificationsRead_0()

로그인한 사용자의 모든 알림을 읽음 처리합니다.

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

const { status, data } = await apiInstance.markAllNotificationsRead_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**MarkAllNotificationsRead200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 전체 읽음 처리 성공 |  -  |
|**401** | 인증 실패 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markNotificationRead**
> MarkNotificationRead200Response markNotificationRead()

특정 알림을 읽음 상태로 변경합니다.

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: number; //알림 ID (default to undefined)

const { status, data } = await apiInstance.markNotificationRead(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | 알림 ID | defaults to undefined|


### Return type

**MarkNotificationRead200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 읽음 처리 성공 |  -  |
|**401** | 인증 실패 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **markNotificationRead_0**
> MarkNotificationRead200Response markNotificationRead_0()

특정 알림을 읽음 상태로 변경합니다.

### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: number; //알림 ID (default to undefined)

const { status, data } = await apiInstance.markNotificationRead_0(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | 알림 ID | defaults to undefined|


### Return type

**MarkNotificationRead200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 읽음 처리 성공 |  -  |
|**401** | 인증 실패 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

