# HomeApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getUserCollections**](#getusercollections) | **GET** /home | 홈 화면 조회|
|[**getUserCollections_0**](#getusercollections_0) | **GET** /popular-albums | 인기 앨범 목록|
|[**getUserCollections_1**](#getusercollections_1) | **GET** /popular-tracks | 인기 트랙 목록|

# **getUserCollections**
> GetUserCollections200Response4 getUserCollections()

홈 화면에 해당하는 API

### Example

```typescript
import {
    HomeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HomeApi(configuration);

const { status, data } = await apiInstance.getUserCollections();
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

# **getUserCollections_0**
> GetUserCollections200Response5 getUserCollections_0()

인기 앨범 목록  상위 100개 불러오기

### Example

```typescript
import {
    HomeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HomeApi(configuration);

const { status, data } = await apiInstance.getUserCollections_0();
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

# **getUserCollections_1**
> GetUserCollections200Response6 getUserCollections_1()

인기 트랙 목록  상위 100개 불러오기 인기도는 복합적으로 계산해야할 듯?

### Example

```typescript
import {
    HomeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HomeApi(configuration);

const { status, data } = await apiInstance.getUserCollections_1();
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

