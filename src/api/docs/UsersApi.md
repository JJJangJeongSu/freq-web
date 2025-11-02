# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getLikedArtists**](#getlikedartists) | **GET** /users/me/liked-artist | 좋아요한 아티스트 목록|
|[**getLikedArtists_0**](#getlikedartists_0) | **GET** /users/me/liked-artist | 좋아요한 아티스트 목록|
|[**getMyActivity**](#getmyactivity) | **GET** /users/me/activity | 내 활동 페이지 조회|
|[**getMyActivity_0**](#getmyactivity_0) | **GET** /users/me/activity | 내 활동 페이지 조회|
|[**getMyCollections**](#getmycollections) | **GET** /users/me/collections | 내 컬렉션 목록 조회|
|[**getMyCollections_0**](#getmycollections_0) | **GET** /users/{userId}/collections/liked | 좋아요한 컬렉션 목록|
|[**getRatedAlbums**](#getratedalbums) | **GET** /users/me/review-list | 리뷰(내용 있는) 목록|
|[**getRatedAlbums_0**](#getratedalbums_0) | **GET** /users/me/review-list | 리뷰(내용 있는) 목록|
|[**getRatedTracks**](#getratedtracks) | **GET** /users/me/track-rate-record | 평가한 트랙 목록|
|[**getRatedTracks_0**](#getratedtracks_0) | **GET** /users/me/track-rate-record | 평가한 트랙 목록|
|[**getUserCollections**](#getusercollections) | **GET** /users/me/badges | 내 칭호 목록 조회|
|[**getUserCollections_0**](#getusercollections_0) | **GET** /users/me/active-badge | 활성화된 칭호 확인|
|[**getUserCollections_1**](#getusercollections_1) | **PATCH** /users/me/active-badge | 칭호 설정|
|[**getUserCollections_2**](#getusercollections_2) | **GET** /users/{userId}/badges | 타인의 칭호 목록 조회|
|[**getUserCollections_3**](#getusercollections_3) | **GET** /users/{userId}/collections | 타인의 컬렉션 목록 조회|
|[**getUserRateRecords**](#getuserraterecords) | **GET** /users/{userId}/rate-records | 평가 기록 전체 페이지|
|[**getUserRateRecords_0**](#getuserraterecords_0) | **GET** /users/{userId}/rate-records | 평가 기록 전체 페이지|
|[**getUserRatedAlbums**](#getuserratedalbums) | **GET** /users/{userId}/rated-albums | 평가한 앨범 페이지|
|[**getUserRatedAlbums_0**](#getuserratedalbums_0) | **GET** /users/{userId}/rated-albums | 평가한 앨범 페이지|
|[**getUserRatedTracks**](#getuserratedtracks) | **GET** /users/{userId}/rated-tracks | 평가한 트랙 페이지|
|[**getUserRatedTracks_0**](#getuserratedtracks_0) | **GET** /users/{userId}/rated-tracks | 평가한 트랙 페이지|
|[**usersUserIdGet**](#usersuseridget) | **GET** /users/{userId} | /users/{userId}|

# **getLikedArtists**
> GetLikedArtists200Response getLikedArtists()

현재 인증된 사용자가 \'좋아요\'를 누른 모든 아티스트의 목록을 조회합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getLikedArtists();
```

### Parameters
This endpoint does not have any parameters.


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

# **getLikedArtists_0**
> GetLikedArtists200Response getLikedArtists_0()

현재 인증된 사용자가 \'좋아요\'를 누른 모든 아티스트의 목록을 조회합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getLikedArtists_0();
```

### Parameters
This endpoint does not have any parameters.


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

# **getMyCollections**
> GetUserCollections200Response getMyCollections()

현재 인증된 사용자가 생성한 모든 컬렉션의 목록을 조회합니다. 여기에는 공개(public) 및 비공개(private) 컬렉션이 모두 포함됩니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getMyCollections();
```

### Parameters
This endpoint does not have any parameters.


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

# **getMyCollections_0**
> GetMyCollections200Response getMyCollections_0()

현재 인증된 사용자가 생성한 모든 컬렉션의 목록을 조회합니다. 여기에는 공개(public) 및 비공개(private) 컬렉션이 모두 포함됩니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getMyCollections_0(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**GetMyCollections200Response**

### Authorization

[bearer](../README.md#bearer)

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

# **getRatedAlbums**
> GetRatedAlbums200Response getRatedAlbums()

별점 + 내용도 있는 앨범 리뷰 전체 목록 조회

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getRatedAlbums();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetRatedAlbums200Response**

### Authorization

No authorization required

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

# **getRatedAlbums_0**
> GetRatedAlbums200Response getRatedAlbums_0()

별점 + 내용도 있는 앨범 리뷰 전체 목록 조회

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getRatedAlbums_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetRatedAlbums200Response**

### Authorization

No authorization required

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

# **getRatedTracks**
> GetRatedTracks200Response getRatedTracks()

현재 인증된 사용자가 리뷰(평가)를 남긴 모든 트랙의 목록을 조회합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getRatedTracks();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetRatedTracks200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 트랙 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRatedTracks_0**
> GetRatedTracks200Response getRatedTracks_0()

현재 인증된 사용자가 리뷰(평가)를 남긴 모든 트랙의 목록을 조회합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getRatedTracks_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetRatedTracks200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 트랙 목록 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserCollections**
> GetUserCollections200Response1 getUserCollections()

홈 화면에 해당하는 API

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getUserCollections();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetUserCollections200Response1**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserCollections_0**
> GetUserCollections200Response2 getUserCollections_0()

홈 화면에 해당하는 API

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getUserCollections_0();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetUserCollections200Response2**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserCollections_1**
> GetUserCollections200Response3 getUserCollections_1()

홈 화면에 해당하는 API

### Example

```typescript
import {
    UsersApi,
    Configuration,
    GetUserCollectionsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let getUserCollectionsRequest: GetUserCollectionsRequest; // (optional)

const { status, data } = await apiInstance.getUserCollections_1(
    getUserCollectionsRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **getUserCollectionsRequest** | **GetUserCollectionsRequest**|  | |


### Return type

**GetUserCollections200Response3**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserCollections_2**
> GetUserCollections200Response1 getUserCollections_2()

홈 화면에 해당하는 API

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getUserCollections_2(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**GetUserCollections200Response1**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserCollections_3**
> GetUserCollections200Response getUserCollections_3()

특정 사용자가 생성한 컬렉션 중 \'공개(public)\'로 설정된 목록만 조회합니다. 다른 사용자의 비공개 컬렉션은 이 API를 통해 조회할 수 없습니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; //조회할 사용자 ID (integer) (default to undefined)

const { status, data } = await apiInstance.getUserCollections_3(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | 조회할 사용자 ID (integer) | defaults to undefined|


### Return type

**GetUserCollections200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserRateRecords**
> GetUserRateRecords200Response getUserRateRecords()

특정 사용자의 전체 평가 기록 페이지 정보를 조회합니다. 사용자 프로필, 통계, 별점 분포, 컬렉션, 장르 키워드, 최근 평가한 앨범/트랙 정보를 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; //사용자 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getUserRateRecords(
    userId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | 사용자 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetUserRateRecords200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가 기록 전체 페이지 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserRateRecords_0**
> GetUserRateRecords200Response getUserRateRecords_0()

특정 사용자의 전체 평가 기록 페이지 정보를 조회합니다. 사용자 프로필, 통계, 별점 분포, 컬렉션, 장르 키워드, 최근 평가한 앨범/트랙 정보를 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; //사용자 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getUserRateRecords_0(
    userId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | 사용자 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetUserRateRecords200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가 기록 전체 페이지 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserRatedAlbums**
> GetUserRatedAlbums200Response getUserRatedAlbums()

특정 사용자가 평가한 모든 앨범의 목록을 조회합니다. 앨범 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; //사용자 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getUserRatedAlbums(
    userId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | 사용자 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetUserRatedAlbums200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 앨범 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserRatedAlbums_0**
> GetUserRatedAlbums200Response getUserRatedAlbums_0()

특정 사용자가 평가한 모든 앨범의 목록을 조회합니다. 앨범 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; //사용자 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getUserRatedAlbums_0(
    userId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | 사용자 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetUserRatedAlbums200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 앨범 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserRatedTracks**
> GetUserRatedTracks200Response getUserRatedTracks()

특정 사용자가 평가한 모든 트랙의 목록을 조회합니다. 트랙 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; //사용자 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getUserRatedTracks(
    userId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | 사용자 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetUserRatedTracks200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 트랙 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserRatedTracks_0**
> GetUserRatedTracks200Response getUserRatedTracks_0()

특정 사용자가 평가한 모든 트랙의 목록을 조회합니다. 트랙 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; //사용자 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getUserRatedTracks_0(
    userId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | 사용자 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetUserRatedTracks200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 평가한 트랙 목록 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersUserIdGet**
> object usersUserIdGet()



### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.usersUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**object**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

