# FastAPIApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**recommendGet**](#recommendget) | **GET** /recommend | 맞춤 컬렉션 추천 조회|
|[**updatePreferenceFromArtistLikePost**](#updatepreferencefromartistlikepost) | **POST** /update_preference_from_artist_like | 아티스트 좋아요로 선호도 업데이트|
|[**updatePreferencePost**](#updatepreferencepost) | **POST** /update_preference | 선호도 업데이트|

# **recommendGet**
> RecommendGet200Response recommendGet()



### Example

```typescript
import {
    FastAPIApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FastAPIApi(configuration);

let userId: number; //유저 아이디 (optional) (default to undefined)
let topK: string; //추천 개수 (optional) (default to undefined)

const { status, data } = await apiInstance.recommendGet(
    userId,
    topK
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**number**] | 유저 아이디 | (optional) defaults to undefined|
| **topK** | [**string**] | 추천 개수 | (optional) defaults to undefined|


### Return type

**RecommendGet200Response**

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

# **updatePreferenceFromArtistLikePost**
> updatePreferenceFromArtistLikePost()



### Example

```typescript
import {
    FastAPIApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FastAPIApi(configuration);

let body: object; // (optional)

const { status, data } = await apiInstance.updatePreferenceFromArtistLikePost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updatePreferencePost**
> UpdatePreferencePost200Response updatePreferencePost()



### Example

```typescript
import {
    FastAPIApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FastAPIApi(configuration);

let body: object; // (optional)

const { status, data } = await apiInstance.updatePreferencePost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

**UpdatePreferencePost200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

