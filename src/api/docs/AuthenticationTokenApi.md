# AuthenticationTokenApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**reissueToken**](#reissuetoken) | **POST** /auth/reissue | 토큰 재발급|

# **reissueToken**
> ReissueToken200Response reissueToken()

만료된 AccessToken을 새로운 토큰으로 교체합니다.  - 클라이언트는 유효한 RefreshToken을 요청 본문에 담아 보내야 합니다.  - 서버는 RefreshToken을 검증한 후, 유효할 경우 새로운 AccessToken을 발급하여 반환합니다.

### Example

```typescript
import {
    AuthenticationTokenApi,
    Configuration,
    ReissueTokenRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationTokenApi(configuration);

let reissueTokenRequest: ReissueTokenRequest; // (optional)

const { status, data } = await apiInstance.reissueToken(
    reissueTokenRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reissueTokenRequest** | **ReissueTokenRequest**|  | |


### Return type

**ReissueToken200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 토큰 재발급 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

