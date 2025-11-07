# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMyActivity**](#getmyactivity) | **GET** /users/me/activity | 내 활동 페이지 조회|
|[**getMyActivity_0**](#getmyactivity_0) | **GET** /users/me/activity | 내 활동 페이지 조회|

# **getMyActivity**
> GetMyActivity200Response getMyActivity()

현재 인증된 사용자의 활동 정보를 종합적으로 조회합니다. 사용자의 기본 프로필 정보, 리뷰 통계, 최근에 평가한 앨범/트랙 목록, 그리고 생성하거나 좋아요한 컬렉션 목록 등을 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getMyActivity();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetMyActivity200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 사용자 정보 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyActivity_0**
> GetMyActivity200Response getMyActivity_0()

현재 인증된 사용자의 활동 정보를 종합적으로 조회합니다. 사용자의 기본 프로필 정보, 리뷰 통계, 최근에 평가한 앨범/트랙 목록, 그리고 생성하거나 좋아요한 컬렉션 목록 등을 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getMyActivity_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetMyActivity200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 사용자 정보 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

