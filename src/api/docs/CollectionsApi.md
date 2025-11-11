# CollectionsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**collectionsByItemItemIdGet**](#collectionsbyitemitemidget) | **GET** /collections/by-item/{itemId} | 컬렉션 내용을 like순으로 제공|
|[**createCollection**](#createcollection) | **POST** /collections | 컬렉션 생성|
|[**createCollection_0**](#createcollection_0) | **POST** /collections | 컬렉션 생성|
|[**deleteCollection**](#deletecollection) | **DELETE** /collections/{collectionId} | 컬렉션 삭제|
|[**deleteCollection_0**](#deletecollection_0) | **DELETE** /collections/{collectionId} | 컬렉션 삭제|
|[**getCollectionDetail**](#getcollectiondetail) | **GET** /collections/{collectionId} | 컬렉션 상세 조회|
|[**getCollectionDetail_0**](#getcollectiondetail_0) | **GET** /collections/{collectionId} | 컬렉션 상세 조회|
|[**getMyCollections**](#getmycollections) | **GET** /comments/detail/{itemId} | 댓글 목록조회|
|[**getMyCollections_0**](#getmycollections_0) | **GET** /users/{userId}/collections | 컬렉션 목록 조회|
|[**getMyCollections_1**](#getmycollections_1) | **GET** /users/me/collections | 내 컬렉션 목록 조회|
|[**getMyCollections_2**](#getmycollections_2) | **GET** /users/{userId}/collections/liked | 좋아요한 컬렉션 목록|
|[**getUserCollections**](#getusercollections) | **GET** /collections/all | 컬렉션 전체 조회|
|[**getUserCollections_0**](#getusercollections_0) | **GET** /collections/all | 컬렉션 전체 조회|
|[**getUserCollections_1**](#getusercollections_1) | **GET** /users/me/badges | 내 칭호 목록 조회|
|[**getUserCollections_2**](#getusercollections_2) | **GET** /users/me/active-badge | 활성화된 칭호 확인|
|[**getUserCollections_3**](#getusercollections_3) | **PATCH** /users/me/active-badge | 칭호 설정|
|[**getUserCollections_4**](#getusercollections_4) | **GET** /users/{userId}/badges | 타인의 칭호 목록 조회|
|[**getUserCollections_5**](#getusercollections_5) | **GET** /home | 홈 화면 조회|
|[**getUserCollections_6**](#getusercollections_6) | **GET** /popular-albums | 인기 앨범 목록|
|[**getUserCollections_7**](#getusercollections_7) | **GET** /popular-tracks | 인기 트랙 목록|
|[**search**](#search) | **GET** /collections/search | 컬렉션 검색|
|[**toggleCollectionLike**](#togglecollectionlike) | **POST** /collections/{collectionId}/likes/toggle | 컬렉션 좋아요 토글|
|[**toggleCollectionLike_0**](#togglecollectionlike_0) | **POST** /collections/{collectionId}/likes/toggle | 컬렉션 좋아요 토글|
|[**updateCollection**](#updatecollection) | **PATCH** /collections/{collectionId} | 컬렉션 수정|
|[**updateCollection_0**](#updatecollection_0) | **PATCH** /collections/{collectionId} | 컬렉션 수정|

# **collectionsByItemItemIdGet**
> object collectionsByItemItemIdGet()

예상 응답:    {     \"success\": true,     \"data\": {       \"collections\": [         {           \"collectionId\": 5,           \"title\": \"인기 플레이리스트\",           \"likeCount\": 500,  // ⭐ 가장 많음           \"...\": \"...\"         },         {           \"collectionId\": 3,           \"title\": \"운동 음악 모음\",           \"likeCount\": 300,  // 두 번째           \"...\": \"...\"         },         {           \"collectionId\": 1,           \"title\": \"내 플레이리스트\",           \"likeCount\": 10,   // 적음           \"...\": \"...\"         }       ]     }   } 

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let itemId: string; // (default to undefined)

const { status, data } = await apiInstance.collectionsByItemItemIdGet(
    itemId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemId** | [**string**] |  | defaults to undefined|


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

# **createCollection**
> CreateCollection200Response createCollection()

새로운 음악 컬렉션을 생성합니다. 컬렉션은 사용자가 직접 앨범이나 트랙을 모아 만드는 플레이리스트와 유사한 개념입니다. 제목, 설명, 공개 여부, 커버 이미지, 그리고 초기에 포함될 아이템 목록을 지정할 수 있습니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration,
    CreateCollectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let createCollectionRequest: CreateCollectionRequest; // (optional)

const { status, data } = await apiInstance.createCollection(
    createCollectionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCollectionRequest** | **CreateCollectionRequest**|  | |


### Return type

**CreateCollection200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 생성 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createCollection_0**
> CreateCollection200Response createCollection_0()

새로운 음악 컬렉션을 생성합니다. 컬렉션은 사용자가 직접 앨범이나 트랙을 모아 만드는 플레이리스트와 유사한 개념입니다. 제목, 설명, 공개 여부, 커버 이미지, 그리고 초기에 포함될 아이템 목록을 지정할 수 있습니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration,
    CreateCollectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let createCollectionRequest: CreateCollectionRequest; // (optional)

const { status, data } = await apiInstance.createCollection_0(
    createCollectionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCollectionRequest** | **CreateCollectionRequest**|  | |


### Return type

**CreateCollection200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 생성 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteCollection**
> SuccessResponse deleteCollection()

자신이 생성한 컬렉션을 삭제합니다. 다른 사용자의 컬렉션을 삭제하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: number; //삭제할 컬렉션 ID (default to undefined)

const { status, data } = await apiInstance.deleteCollection(
    collectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **collectionId** | [**number**] | 삭제할 컬렉션 ID | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 삭제 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteCollection_0**
> SuccessResponse deleteCollection_0()

자신이 생성한 컬렉션을 삭제합니다. 다른 사용자의 컬렉션을 삭제하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: number; //삭제할 컬렉션 ID (default to undefined)

const { status, data } = await apiInstance.deleteCollection_0(
    collectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **collectionId** | [**number**] | 삭제할 컬렉션 ID | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 삭제 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCollectionDetail**
> GetCollectionDetail200Response getCollectionDetail()

특정 컬렉션의 상세 정보를 조회합니다. 컬렉션의 기본 정보, 포함된 모든 아이템 목록, 그리고 댓글 목록을 포함합니다. 비공개 컬렉션은 생성자 본인만 조회할 수 있습니다. 로그인한 사용자가 요청할 경우, 해당 컬렉션에 대한 \'좋아요\' 여부(`isLiked`)가 추가로 제공됩니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: string; //컬렉션 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 좋아요 상태 등 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getCollectionDetail(
    collectionId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **collectionId** | [**string**] | 컬렉션 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 좋아요 상태 등 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetCollectionDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCollectionDetail_0**
> GetCollectionDetail200Response getCollectionDetail_0()

특정 컬렉션의 상세 정보를 조회합니다. 컬렉션의 기본 정보, 포함된 모든 아이템 목록, 그리고 댓글 목록을 포함합니다. 비공개 컬렉션은 생성자 본인만 조회할 수 있습니다. 로그인한 사용자가 요청할 경우, 해당 컬렉션에 대한 \'좋아요\' 여부(`isLiked`)가 추가로 제공됩니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: string; //컬렉션 ID (default to undefined)
let authorization: string; //선택사항. 로그인 시 좋아요 상태 등 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.getCollectionDetail_0(
    collectionId,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **collectionId** | [**string**] | 컬렉션 ID | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 좋아요 상태 등 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**GetCollectionDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyCollections**
> GetMyCollections200Response getMyCollections()

itemId의 댓글 상세 목록을 조회한다 리뷰 혹은 컬렉션에 댓글을 달 수 있으므로, type = \'review\' or \'collection\' sortBy option도 있슴

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let itemId: string; //리뷰 or 콜렉션의 id (default to undefined)
let type: 'collection' | 'review'; //review or collection (optional) (default to undefined)
let sortBy: 'likes' | 'recent' | 'old'; //\'likes\' or \'recent\' or \'old\' (optional) (default to undefined)

const { status, data } = await apiInstance.getMyCollections(
    itemId,
    type,
    sortBy
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **itemId** | [**string**] | 리뷰 or 콜렉션의 id | defaults to undefined|
| **type** | [**&#39;collection&#39; | &#39;review&#39;**]**Array<&#39;collection&#39; &#124; &#39;review&#39;>** | review or collection | (optional) defaults to undefined|
| **sortBy** | [**&#39;likes&#39; | &#39;recent&#39; | &#39;old&#39;**]**Array<&#39;likes&#39; &#124; &#39;recent&#39; &#124; &#39;old&#39;>** | \&#39;likes\&#39; or \&#39;recent\&#39; or \&#39;old\&#39; | (optional) defaults to undefined|


### Return type

**GetMyCollections200Response**

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
> GetMyCollections200Response1 getMyCollections_0()

특정 사용자가 생성한 모든 컬렉션의 목록을 조회합니다. 여기에는 공개(public) 및 비공개(private) 컬렉션이 모두 포함됩니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

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

# **getMyCollections_1**
> GetMyCollections200Response1 getMyCollections_1()

현재 인증된 사용자가 생성한 모든 컬렉션의 목록을 조회합니다. 여기에는 공개(public) 및 비공개(private) 컬렉션이 모두 포함됩니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

const { status, data } = await apiInstance.getMyCollections_1();
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

# **getMyCollections_2**
> GetMyCollections200Response2 getMyCollections_2()

현재 인증된 사용자가 좋아요한 컬렉션의 목록

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getMyCollections_2(
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

# **getUserCollections**
> GetUserCollections200Response getUserCollections()

공개(public)로 설정된 컬렉션을 조회합니다

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let sortBy: 'popularity' | 'recent' | 'old'; //정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) (optional) (default to 'recent')
let page: number; //페이지 번호 (1부터 시작) (optional) (default to 1)
let limit: number; //페이지당 항목 수 (optional) (default to 20)

const { status, data } = await apiInstance.getUserCollections(
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sortBy** | [**&#39;popularity&#39; | &#39;recent&#39; | &#39;old&#39;**]**Array<&#39;popularity&#39; &#124; &#39;recent&#39; &#124; &#39;old&#39;>** | 정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) | (optional) defaults to 'recent'|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to 1|
| **limit** | [**number**] | 페이지당 항목 수 | (optional) defaults to 20|


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
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserCollections_0**
> GetUserCollections200Response getUserCollections_0()

공개(public)로 설정된 컬렉션을 조회합니다

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let sortBy: 'popularity' | 'recent' | 'old'; //정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) (optional) (default to 'recent')
let page: number; //페이지 번호 (1부터 시작) (optional) (default to 1)
let limit: number; //페이지당 항목 수 (optional) (default to 20)

const { status, data } = await apiInstance.getUserCollections_0(
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **sortBy** | [**&#39;popularity&#39; | &#39;recent&#39; | &#39;old&#39;**]**Array<&#39;popularity&#39; &#124; &#39;recent&#39; &#124; &#39;old&#39;>** | 정렬 기준 (popularity: 인기도순, recent: 최신순, old: 오래된순) | (optional) defaults to 'recent'|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to 1|
| **limit** | [**number**] | 페이지당 항목 수 | (optional) defaults to 20|


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
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserCollections_1**
> GetUserCollections200Response1 getUserCollections_1()

홈 화면에 해당하는 API

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

const { status, data } = await apiInstance.getUserCollections_1();
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

# **getUserCollections_2**
> GetUserCollections200Response2 getUserCollections_2()

홈 화면에 해당하는 API

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

const { status, data } = await apiInstance.getUserCollections_2();
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

# **getUserCollections_3**
> GetUserCollections200Response3 getUserCollections_3()

홈 화면에 해당하는 API

### Example

```typescript
import {
    CollectionsApi,
    Configuration,
    GetUserCollectionsRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let getUserCollectionsRequest: GetUserCollectionsRequest; // (optional)

const { status, data } = await apiInstance.getUserCollections_3(
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

# **getUserCollections_4**
> GetUserCollections200Response1 getUserCollections_4()

홈 화면에 해당하는 API

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.getUserCollections_4(
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

# **getUserCollections_5**
> GetUserCollections200Response4 getUserCollections_5()

홈 화면에 해당하는 API

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

const { status, data } = await apiInstance.getUserCollections_5();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetUserCollections200Response4**

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

# **getUserCollections_6**
> GetUserCollections200Response5 getUserCollections_6()

인기 앨범 목록  상위 100개 불러오기

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

const { status, data } = await apiInstance.getUserCollections_6();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetUserCollections200Response5**

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

# **getUserCollections_7**
> GetUserCollections200Response6 getUserCollections_7()

인기 트랙 목록  상위 100개 불러오기 인기도는 복합적으로 계산해야할 듯?

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

const { status, data } = await apiInstance.getUserCollections_7();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetUserCollections200Response6**

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

# **search**
> Search200Response search()

컬렉션 전체 검색 기능 이름과 정렬기준을 제공합니다 

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let q: string; //이름  (optional) (default to undefined)
let sortBy: ''; // (optional) (default to undefined)

const { status, data } = await apiInstance.search(
    q,
    sortBy
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **q** | [**string**] | 이름  | (optional) defaults to undefined|
| **sortBy** | [**&#39;&#39;**]**Array<&#39;&#39;>** |  | (optional) defaults to undefined|


### Return type

**Search200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 검색 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **toggleCollectionLike**
> ToggleCollectionLike200Response toggleCollectionLike()

특정 컬렉션에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 컬렉션에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: string; //좋아요를 토글할 컬렉션 ID (default to undefined)

const { status, data } = await apiInstance.toggleCollectionLike(
    collectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **collectionId** | [**string**] | 좋아요를 토글할 컬렉션 ID | defaults to undefined|


### Return type

**ToggleCollectionLike200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 좋아요 토글 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **toggleCollectionLike_0**
> ToggleCollectionLike200Response toggleCollectionLike_0()

특정 컬렉션에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 컬렉션에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: string; //좋아요를 토글할 컬렉션 ID (default to undefined)

const { status, data } = await apiInstance.toggleCollectionLike_0(
    collectionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **collectionId** | [**string**] | 좋아요를 토글할 컬렉션 ID | defaults to undefined|


### Return type

**ToggleCollectionLike200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 좋아요 토글 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateCollection**
> GetCollectionDetail200Response updateCollection()

자신이 생성한 컬렉션의 정보를 수정합니다. 제목, 설명, 공개 범위, 커버 이미지, 태그 등을 변경할 수 있습니다. 다른 사용자의 컬렉션을 수정하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration,
    UpdateCollectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: string; //수정할 컬렉션 ID (default to undefined)
let updateCollectionRequest: UpdateCollectionRequest; // (optional)

const { status, data } = await apiInstance.updateCollection(
    collectionId,
    updateCollectionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCollectionRequest** | **UpdateCollectionRequest**|  | |
| **collectionId** | [**string**] | 수정할 컬렉션 ID | defaults to undefined|


### Return type

**GetCollectionDetail200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 수정 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateCollection_0**
> GetCollectionDetail200Response updateCollection_0()

자신이 생성한 컬렉션의 정보를 수정합니다. 제목, 설명, 공개 범위, 커버 이미지, 태그 등을 변경할 수 있습니다. 다른 사용자의 컬렉션을 수정하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CollectionsApi,
    Configuration,
    UpdateCollectionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CollectionsApi(configuration);

let collectionId: string; //수정할 컬렉션 ID (default to undefined)
let updateCollectionRequest: UpdateCollectionRequest; // (optional)

const { status, data } = await apiInstance.updateCollection_0(
    collectionId,
    updateCollectionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCollectionRequest** | **UpdateCollectionRequest**|  | |
| **collectionId** | [**string**] | 수정할 컬렉션 ID | defaults to undefined|


### Return type

**GetCollectionDetail200Response**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 컬렉션 수정 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

