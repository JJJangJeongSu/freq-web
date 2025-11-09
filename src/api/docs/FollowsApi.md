# FollowsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**toggleFollow**](#togglefollow) | **POST** /follow/{targetUserId}/toggle | 팔로우 토글|
|[**toggleFollow_0**](#togglefollow_0) | **POST** /follow/{targetUserId}/toggle | 팔로우 토글|

# **toggleFollow**
> ToggleFollow200Response toggleFollow()

특정 사용자를 팔로우 또는 언팔로우합니다.   이미 팔로우 중이면 언팔로우, 팔로우하지 않은 상태면 팔로우로 동작합니다.   팔로우 시에는 대상 사용자에게 `USER_FOLLOWED_YOU` 알림이 생성됩니다. 

### Example

```typescript
import {
    FollowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FollowsApi(configuration);

let targetUserId: number; //팔로우 대상 사용자 ID (default to undefined)

const { status, data } = await apiInstance.toggleFollow(
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **targetUserId** | [**number**] | 팔로우 대상 사용자 ID | defaults to undefined|


### Return type

**ToggleFollow200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 팔로우 상태 토글 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **toggleFollow_0**
> ToggleFollow200Response toggleFollow_0()

특정 사용자를 팔로우 또는 언팔로우합니다.   이미 팔로우 중이면 언팔로우, 팔로우하지 않은 상태면 팔로우로 동작합니다.   팔로우 시에는 대상 사용자에게 `USER_FOLLOWED_YOU` 알림이 생성됩니다. 

### Example

```typescript
import {
    FollowsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FollowsApi(configuration);

let targetUserId: number; //팔로우 대상 사용자 ID (default to undefined)

const { status, data } = await apiInstance.toggleFollow_0(
    targetUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **targetUserId** | [**number**] | 팔로우 대상 사용자 ID | defaults to undefined|


### Return type

**ToggleFollow200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 팔로우 상태 토글 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

