# DetailPagesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAlbumDetail**](#getalbumdetail) | **GET** /album-detail/{albumId} | 앨범 상세 페이지|
|[**getAlbumDetail_0**](#getalbumdetail_0) | **GET** /album-detail/{albumId} | 앨범 상세 페이지|
|[**getArtistDetail**](#getartistdetail) | **GET** /artist-detail/{artistId} | 아티스트 상세 페이지|
|[**getArtistDetail_0**](#getartistdetail_0) | **GET** /artist-detail/{artistId} | 아티스트 상세 페이지|
|[**getTrackDetail**](#gettrackdetail) | **GET** /track-detail/{trackId} | 트랙 상세 페이지|
|[**getTrackDetail_0**](#gettrackdetail_0) | **GET** /track-detail/{trackId} | 트랙 상세 페이지|

# **getAlbumDetail**
> GetAlbumDetail200Response getAlbumDetail()

특정 앨범의 모든 상세 정보를 조회합니다. Spotify API를 통해 가져온 앨범의 기본 정보, 아티스트 정보, 수록곡 목록을 포함하며, 서비스 내 사용자들이 남긴 리뷰 목록과 평점 통계 정보도 함께 제공합니다.

### Example

```typescript
import {
    DetailPagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DetailPagesApi(configuration);

let albumId: string; //앨범 ID (Spotify ID) (default to undefined)

const { status, data } = await apiInstance.getAlbumDetail(
    albumId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **albumId** | [**string**] | 앨범 ID (Spotify ID) | defaults to undefined|


### Return type

**GetAlbumDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 앨범 상세 정보 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAlbumDetail_0**
> GetAlbumDetail200Response getAlbumDetail_0()

특정 앨범의 모든 상세 정보를 조회합니다. Spotify API를 통해 가져온 앨범의 기본 정보, 아티스트 정보, 수록곡 목록을 포함하며, 서비스 내 사용자들이 남긴 리뷰 목록과 평점 통계 정보도 함께 제공합니다.

### Example

```typescript
import {
    DetailPagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DetailPagesApi(configuration);

let albumId: string; //앨범 ID (Spotify ID) (default to undefined)

const { status, data } = await apiInstance.getAlbumDetail_0(
    albumId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **albumId** | [**string**] | 앨범 ID (Spotify ID) | defaults to undefined|


### Return type

**GetAlbumDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 앨범 상세 정보 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getArtistDetail**
> GetArtistDetail200Response getArtistDetail()

특정 아티스트의 모든 상세 정보를 조회합니다. Spotify API를 통해 가져온 아티스트의 기본 정보, 인기 트랙 목록, 발매 앨범 목록을 포함하며, 서비스 내 사용자들이 누른 \'좋아요\' 집계 정보도 함께 제공합니다.

### Example

```typescript
import {
    DetailPagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DetailPagesApi(configuration);

let artistId: string; //아티스트 ID (Spotify ID) (default to undefined)

const { status, data } = await apiInstance.getArtistDetail(
    artistId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **artistId** | [**string**] | 아티스트 ID (Spotify ID) | defaults to undefined|


### Return type

**GetArtistDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 아티스트 상세 정보 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getArtistDetail_0**
> GetArtistDetail200Response getArtistDetail_0()

특정 아티스트의 모든 상세 정보를 조회합니다. Spotify API를 통해 가져온 아티스트의 기본 정보, 인기 트랙 목록, 발매 앨범 목록을 포함하며, 서비스 내 사용자들이 누른 \'좋아요\' 집계 정보도 함께 제공합니다.

### Example

```typescript
import {
    DetailPagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DetailPagesApi(configuration);

let artistId: string; //아티스트 ID (Spotify ID) (default to undefined)

const { status, data } = await apiInstance.getArtistDetail_0(
    artistId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **artistId** | [**string**] | 아티스트 ID (Spotify ID) | defaults to undefined|


### Return type

**GetArtistDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 아티스트 상세 정보 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTrackDetail**
> GetTrackDetail200Response getTrackDetail()

특정 트랙의 모든 상세 정보를 조회합니다. Spotify API를 통해 가져온 트랙의 기본 정보, 아티스트 정보, 소속 앨범 정보를 포함하며, 서비스 내 사용자들의 평점 통계와 해당 트랙이 포함된 컬렉션 목록도 함께 제공합니다.

### Example

```typescript
import {
    DetailPagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DetailPagesApi(configuration);

let trackId: string; //트랙 ID (Spotify ID) (default to undefined)

const { status, data } = await apiInstance.getTrackDetail(
    trackId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **trackId** | [**string**] | 트랙 ID (Spotify ID) | defaults to undefined|


### Return type

**GetTrackDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 트랙 상세 정보 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTrackDetail_0**
> GetTrackDetail200Response getTrackDetail_0()

특정 트랙의 모든 상세 정보를 조회합니다. Spotify API를 통해 가져온 트랙의 기본 정보, 아티스트 정보, 소속 앨범 정보를 포함하며, 서비스 내 사용자들의 평점 통계와 해당 트랙이 포함된 컬렉션 목록도 함께 제공합니다.

### Example

```typescript
import {
    DetailPagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DetailPagesApi(configuration);

let trackId: string; //트랙 ID (Spotify ID) (default to undefined)

const { status, data } = await apiInstance.getTrackDetail_0(
    trackId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **trackId** | [**string**] | 트랙 ID (Spotify ID) | defaults to undefined|


### Return type

**GetTrackDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 트랙 상세 정보 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

