# SocialApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getLikedArtists**](#getlikedartists) | **GET** /users/{userId}/liked-artist | 타인이 좋아요한 아티스트 목록|
|[**getMyCollections**](#getmycollections) | **GET** /users/{userId}/collections | 컬렉션 목록 조회|
|[**getOtherRatedAlbums**](#getotherratedalbums) | **GET** /users/{userId}/review-list | 타인의 앨범 리뷰 (있는 것) 목록|
|[**getOtherRatedAlbums_0**](#getotherratedalbums_0) | **GET** /users/{userId}/review-list | 타인의 앨범 리뷰 (있는 것) 목록|
|[**getOthersActivity**](#getothersactivity) | **GET** /users/{userId}/activity | 타인 활동 페이지 조회|

# **getLikedArtists**
> GetLikedArtists200Response getLikedArtists()

userId의 사용자가 \'좋아요\'를 누른 모든 아티스트의 목록을 조회합니다.

### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

let userId: string; // (default to undefined)
let sortBy: string; //정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) (optional) (default to undefined)
let page: number; //페이지 번호 (1부터 시작) (optional) (default to undefined)
let limit: number; //페이지당 항목 수(기본 20) (optional) (default to undefined)

const { status, data } = await apiInstance.getLikedArtists(
    userId,
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|
| **sortBy** | [**string**] | 정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) | (optional) defaults to undefined|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to undefined|
| **limit** | [**number**] | 페이지당 항목 수(기본 20) | (optional) defaults to undefined|


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

# **getMyCollections**
> GetMyCollections200Response1 getMyCollections()

특정 사용자가 생성한 모든 컬렉션의 목록을 조회합니다. 여기에는 공개(public) 및 비공개(private) 컬렉션이 모두 포함됩니다.

### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

let userId: string; // (default to undefined)
let sortBy: string; //정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) (optional) (default to undefined)
let page: number; //페이지 번호 (1부터 시작) (optional) (default to undefined)
let limit: number; //페이지당 항목 수(기본 20) (optional) (default to undefined)

const { status, data } = await apiInstance.getMyCollections(
    userId,
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|
| **sortBy** | [**string**] | 정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) | (optional) defaults to undefined|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to undefined|
| **limit** | [**number**] | 페이지당 항목 수(기본 20) | (optional) defaults to undefined|


### Return type

**GetMyCollections200Response1**

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

# **getOtherRatedAlbums**
> GetOtherRatedAlbums200Response getOtherRatedAlbums()

별점 + 내용도 있는 앨범 리뷰 전체 목록 조회

### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

let userId: number; // (default to undefined)
let sortBy: string; //정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) (optional) (default to undefined)
let page: number; //페이지 번호 (1부터 시작) (optional) (default to undefined)
let limit: number; //페이지당 항목 수(기본 20) (optional) (default to undefined)

const { status, data } = await apiInstance.getOtherRatedAlbums(
    userId,
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **sortBy** | [**string**] | 정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) | (optional) defaults to undefined|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to undefined|
| **limit** | [**number**] | 페이지당 항목 수(기본 20) | (optional) defaults to undefined|


### Return type

**GetOtherRatedAlbums200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 앨범 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getOtherRatedAlbums_0**
> GetOtherRatedAlbums200Response getOtherRatedAlbums_0()

별점 + 내용도 있는 앨범 리뷰 전체 목록 조회

### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

let userId: number; // (default to undefined)
let sortBy: string; //정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) (optional) (default to undefined)
let page: number; //페이지 번호 (1부터 시작) (optional) (default to undefined)
let limit: number; //페이지당 항목 수(기본 20) (optional) (default to undefined)

const { status, data } = await apiInstance.getOtherRatedAlbums_0(
    userId,
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] |  | defaults to undefined|
| **sortBy** | [**string**] | 정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) | (optional) defaults to undefined|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to undefined|
| **limit** | [**number**] | 페이지당 항목 수(기본 20) | (optional) defaults to undefined|


### Return type

**GetOtherRatedAlbums200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 앨범 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getOthersActivity**
> GetOthersActivity200Response getOthersActivity()

특정 사용자의 활동 페이지를 조회합니다. 사용자의 기본 프로필 정보, 리뷰 통계, 최근에 평가한 앨범/트랙 목록, 그리고 생성하거나 좋아요한 컬렉션 목록 등을 포함합니다. 

### Example

```typescript
import {
    SocialApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SocialApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getOthersActivity(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**GetOthersActivity200Response**

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

