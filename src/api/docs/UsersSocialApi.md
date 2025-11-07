# UsersSocialApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getLikedArtists**](#getlikedartists) | **GET** /users/{userId}/liked-artist | 타인이 좋아요한 아티스트 목록|
|[**getMyActivity**](#getmyactivity) | **GET** /users/{userId}/activity | 타인 활동 페이지 조회|
|[**getMyCollections**](#getmycollections) | **GET** /users/{userId}/collections | 컬렉션 목록 조회|

# **getLikedArtists**
> GetLikedArtists200Response getLikedArtists()

userId의 사용자가 \'좋아요\'를 누른 모든 아티스트의 목록을 조회합니다.

### Example

```typescript
import {
    UsersSocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersSocialApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getLikedArtists(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**GetLikedArtists200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 좋아요한 아티스트 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyActivity**
> GetMyActivity200Response getMyActivity()

특정 사용자의 활동 페이지를 조회합니다. 사용자의 기본 프로필 정보, 리뷰 통계, 최근에 평가한 앨범/트랙 목록, 그리고 생성하거나 좋아요한 컬렉션 목록 등을 포함합니다. 

### Example

```typescript
import {
    UsersSocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersSocialApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getMyActivity(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


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

# **getMyCollections**
> GetUserCollections200Response getMyCollections()

특정 사용자가 생성한 모든 컬렉션의 목록을 조회합니다. 여기에는 공개(public) 및 비공개(private) 컬렉션이 모두 포함됩니다.

### Example

```typescript
import {
    UsersSocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersSocialApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getMyCollections(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**GetUserCollections200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

