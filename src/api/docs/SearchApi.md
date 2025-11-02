# SearchApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**search**](#search) | **GET** /collections/search | 컬렉션 검색|
|[**search_0**](#search_0) | **GET** /search | 통합 검색|
|[**search_1**](#search_1) | **GET** /search | 통합 검색|

# **search**
> Search200Response search()

키워드를 사용하여 앨범, 트랙, 아티스트를 통합 검색합니다. `type` 파라미터를 통해 검색 범위를 \'all\'(전체), \'album\', \'track\', \'artist\' 중 하나로 지정할 수 있습니다. 현재 검색어는 영어만 지원하며, 띄어쓰기 없이 입력해야 합니다.

### Example

```typescript
import {
    SearchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SearchApi(configuration);

let q: string; //이름  (optional) (default to undefined)
let sortBy: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.search(
    q,
    sortBy
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **q** | [**string**] | 이름  | (optional) defaults to undefined|
| **sortBy** | [**string**] |  | (optional) defaults to undefined|


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

# **search_0**
> Search200Response1 search_0()

키워드를 사용하여 앨범, 트랙, 아티스트를 통합 검색합니다. `type` 파라미터를 통해 검색 범위를 \'all\'(전체), \'album\', \'track\', \'artist\' 중 하나로 지정할 수 있습니다. 현재 검색어는 영어만 지원하며, 띄어쓰기 없이 입력해야 합니다.

### Example

```typescript
import {
    SearchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SearchApi(configuration);

let query: string; //검색어 (영어, 띄어쓰기 불가) (default to undefined)
let type: 'all' | 'album' | 'track' | 'artist'; //검색 타입 (all: 전체, album: 앨범만, track: 트랙만, artist: 아티스트만) (default to undefined)
let authorization: string; //선택사항. 로그인 시 사용자별 평가 상태 등 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.search_0(
    query,
    type,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] | 검색어 (영어, 띄어쓰기 불가) | defaults to undefined|
| **type** | [**&#39;all&#39; | &#39;album&#39; | &#39;track&#39; | &#39;artist&#39;**]**Array<&#39;all&#39; &#124; &#39;album&#39; &#124; &#39;track&#39; &#124; &#39;artist&#39;>** | 검색 타입 (all: 전체, album: 앨범만, track: 트랙만, artist: 아티스트만) | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 사용자별 평가 상태 등 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**Search200Response1**

### Authorization

No authorization required

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

# **search_1**
> Search200Response1 search_1()

키워드를 사용하여 앨범, 트랙, 아티스트를 통합 검색합니다. `type` 파라미터를 통해 검색 범위를 \'all\'(전체), \'album\', \'track\', \'artist\' 중 하나로 지정할 수 있습니다. 현재 검색어는 영어만 지원하며, 띄어쓰기 없이 입력해야 합니다.

### Example

```typescript
import {
    SearchApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SearchApi(configuration);

let query: string; //검색어 (영어, 띄어쓰기 불가) (default to undefined)
let type: 'all' | 'album' | 'track' | 'artist'; //검색 타입 (all: 전체, album: 앨범만, track: 트랙만, artist: 아티스트만) (default to undefined)
let authorization: string; //선택사항. 로그인 시 사용자별 평가 상태 등 추가 정보 제공 (optional) (default to undefined)

const { status, data } = await apiInstance.search_1(
    query,
    type,
    authorization
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **query** | [**string**] | 검색어 (영어, 띄어쓰기 불가) | defaults to undefined|
| **type** | [**&#39;all&#39; | &#39;album&#39; | &#39;track&#39; | &#39;artist&#39;**]**Array<&#39;all&#39; &#124; &#39;album&#39; &#124; &#39;track&#39; &#124; &#39;artist&#39;>** | 검색 타입 (all: 전체, album: 앨범만, track: 트랙만, artist: 아티스트만) | defaults to undefined|
| **authorization** | [**string**] | 선택사항. 로그인 시 사용자별 평가 상태 등 추가 정보 제공 | (optional) defaults to undefined|


### Return type

**Search200Response1**

### Authorization

No authorization required

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

