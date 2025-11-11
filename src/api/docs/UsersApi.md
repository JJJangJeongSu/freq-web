# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getLikedArtists**](#getlikedartists) | **GET** /users/{userId}/liked-artist | 타인이 좋아요한 아티스트 목록|
|[**getLikedArtists_0**](#getlikedartists_0) | **GET** /users/me/liked-artist | 좋아요한 아티스트 목록|
|[**getLikedArtists_1**](#getlikedartists_1) | **GET** /users/me/liked-artist | 좋아요한 아티스트 목록|
|[**getMyActivity**](#getmyactivity) | **GET** /users/{userId}/activity | 타인 활동 페이지 조회|
|[**getMyActivity_0**](#getmyactivity_0) | **GET** /users/me/activity | 내 활동 페이지 조회|
|[**getMyActivity_1**](#getmyactivity_1) | **GET** /users/me/activity | 내 활동 페이지 조회|
|[**getMyCollections**](#getmycollections) | **GET** /users/me/collections | 내 컬렉션 목록 조회|
|[**getMyCollections_0**](#getmycollections_0) | **GET** /users/{userId}/collections/liked | 좋아요한 컬렉션 목록|
|[**getRatedAlbums**](#getratedalbums) | **GET** /users/me/review-list | 리뷰(내용 있는) 목록(앨범만)|
|[**getRatedAlbums_0**](#getratedalbums_0) | **GET** /users/me/review-list | 리뷰(내용 있는) 목록(앨범만)|
|[**getUserCollections**](#getusercollections) | **GET** /users/me/badges | 내 칭호 목록 조회|
|[**getUserCollections_0**](#getusercollections_0) | **GET** /users/me/active-badge | 활성화된 칭호 확인|
|[**getUserCollections_1**](#getusercollections_1) | **PATCH** /users/me/active-badge | 칭호 설정|
|[**getUserCollections_2**](#getusercollections_2) | **GET** /users/{userId}/badges | 타인의 칭호 목록 조회|
|[**getUserProfile**](#getuserprofile) | **GET** /users/{userId}/profile | 사용자 프로필 조회|
|[**getUserProfile_0**](#getuserprofile_0) | **GET** /users/{userId}/profile | 사용자 프로필 조회|
|[**getUserRatedAlbums**](#getuserratedalbums) | **GET** /users/{userId}/rated-albums | 평가한 앨범 페이지|
|[**getUserRatedAlbums_0**](#getuserratedalbums_0) | **GET** /users/{userId}/rated-albums | 평가한 앨범 페이지|
|[**getUserRatedTracks**](#getuserratedtracks) | **GET** /users/{userId}/rated-tracks | 평가한 트랙 페이지|
|[**getUserRatedTracks_0**](#getuserratedtracks_0) | **GET** /users/{userId}/rated-tracks | 평가한 트랙 페이지|

# **getLikedArtists**
> GetLikedArtists200Response getLikedArtists()

userId의 사용자가 \'좋아요\'를 누른 모든 아티스트의 목록을 조회합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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

# **getLikedArtists_1**
> GetLikedArtists200Response getLikedArtists_1()

현재 인증된 사용자가 \'좋아요\'를 누른 모든 아티스트의 목록을 조회합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getLikedArtists_1();
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

특정 사용자의 활동 페이지를 조회합니다. 사용자의 기본 프로필 정보, 리뷰 통계, 최근에 평가한 앨범/트랙 목록, 그리고 생성하거나 좋아요한 컬렉션 목록 등을 포함합니다. 

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

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

# **getMyActivity_0**
> GetMyActivity200Response1 getMyActivity_0()

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

**GetMyActivity200Response1**

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

# **getMyActivity_1**
> GetMyActivity200Response1 getMyActivity_1()

현재 인증된 사용자의 활동 정보를 종합적으로 조회합니다. 사용자의 기본 프로필 정보, 리뷰 통계, 최근에 평가한 앨범/트랙 목록, 그리고 생성하거나 좋아요한 컬렉션 목록 등을 포함합니다.

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getMyActivity_1();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetMyActivity200Response1**

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
> GetMyCollections200Response1 getMyCollections()

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

# **getMyCollections_0**
> GetMyCollections200Response2 getMyCollections_0()

현재 인증된 사용자가 좋아요한 컬렉션의 목록

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

**GetMyCollections200Response2**

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

# **getUserProfile**
> GetUserProfile200Response getUserProfile()

특정 사용자의 프로필 사진과 소개글(bio)을 조회합니다. 

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; //프로필을 조회할 사용자 ID (default to undefined)

const { status, data } = await apiInstance.getUserProfile(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] | 프로필을 조회할 사용자 ID | defaults to undefined|


### Return type

**GetUserProfile200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 프로필 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 사용자를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserProfile_0**
> GetUserProfile200Response getUserProfile_0()

특정 사용자의 프로필 사진과 소개글(bio)을 조회합니다. 

### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: number; //프로필을 조회할 사용자 ID (default to undefined)

const { status, data } = await apiInstance.getUserProfile_0(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] | 프로필을 조회할 사용자 ID | defaults to undefined|


### Return type

**GetUserProfile200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 프로필 조회 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 사용자를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserRatedAlbums**
> GetUserRatedAlbums200Response getUserRatedAlbums()

특정 사용자가 평가한 모든 앨범의 목록을 조회합니다. 앨범 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다. 평가한 내용이 없어도 모든 평가를 불러옵니다

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

특정 사용자가 평가한 모든 앨범의 목록을 조회합니다. 앨범 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다. 평가한 내용이 없어도 모든 평가를 불러옵니다

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

특정 사용자가 평가한 모든 트랙의 목록을 조회합니다. 트랙 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다. 리뷰 내용이 없어도 모든 평가를 가져옵니다

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

특정 사용자가 평가한 모든 트랙의 목록을 조회합니다. 트랙 정보, 평점, 평가 날짜, 리뷰 내용을 포함합니다. 리뷰 내용이 없어도 모든 평가를 가져옵니다

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

