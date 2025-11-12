# ReviewsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createReview**](#createreview) | **POST** /reviews | 리뷰 작성|
|[**createReview_0**](#createreview_0) | **POST** /reviews | 리뷰 작성|
|[**deleteReview**](#deletereview) | **DELETE** /reviews/{reviewId} | 리뷰 삭제|
|[**deleteReview_0**](#deletereview_0) | **DELETE** /reviews/{reviewId} | 리뷰 삭제|
|[**getReviewDetail**](#getreviewdetail) | **GET** /reviews/{reviewId} | 리뷰 상세 조회|
|[**getReviewDetail_0**](#getreviewdetail_0) | **GET** /reviews/{reviewId} | 리뷰 상세 조회|
|[**getReviews**](#getreviews) | **GET** /reviews | 리뷰 목록 조회|
|[**getReviews_0**](#getreviews_0) | **GET** /reviews | 리뷰 목록 조회|
|[**toggleArtistLike**](#toggleartistlike) | **POST** /reviews/artist-like/{artistId} | 아티스트 좋아요 토글|
|[**toggleArtistLike_0**](#toggleartistlike_0) | **POST** /reviews/artist-like/{artistId} | 아티스트 좋아요 토글|
|[**toggleReviewLike**](#togglereviewlike) | **POST** /reviews/{reviewId}/likes/toggle | 리뷰 좋아요 토글|
|[**toggleReviewLike_0**](#togglereviewlike_0) | **POST** /reviews/{reviewId}/likes/toggle | 리뷰 좋아요 토글|
|[**updateReview**](#updatereview) | **PATCH** /reviews/{reviewId} | 리뷰 수정|
|[**updateReview_0**](#updatereview_0) | **PATCH** /reviews/{reviewId} | 리뷰 수정|

# **createReview**
> CreateReview200Response createReview()

특정 앨범(album) 또는 트랙(track)에 대한 리뷰를 작성합니다. 사용자는 하나의 대상에 대해 하나의 리뷰만 작성할 수 있으며, 중복 작성 시 409 Conflict 에러가 발생합니다. 리뷰에는 별점, 제목, 내용이 포함될 수 있습니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    CreateReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let createReviewRequest: CreateReviewRequest; // (optional)

const { status, data } = await apiInstance.createReview(
    createReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReviewRequest** | **CreateReviewRequest**|  | |


### Return type

**CreateReview200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 작성 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**409** | 이미 리뷰를 작성함 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createReview_0**
> CreateReview200Response createReview_0()

특정 앨범(album) 또는 트랙(track)에 대한 리뷰를 작성합니다. 사용자는 하나의 대상에 대해 하나의 리뷰만 작성할 수 있으며, 중복 작성 시 409 Conflict 에러가 발생합니다. 리뷰에는 별점, 제목, 내용이 포함될 수 있습니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    CreateReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let createReviewRequest: CreateReviewRequest; // (optional)

const { status, data } = await apiInstance.createReview_0(
    createReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createReviewRequest** | **CreateReviewRequest**|  | |


### Return type

**CreateReview200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 작성 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**409** | 이미 리뷰를 작성함 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteReview**
> SuccessResponse deleteReview()

자신이 작성한 리뷰를 삭제합니다. 다른 사용자의 리뷰를 삭제하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: number; //삭제할 리뷰의 ID (default to undefined)

const { status, data } = await apiInstance.deleteReview(
    reviewId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewId** | [**number**] | 삭제할 리뷰의 ID | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 삭제 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteReview_0**
> SuccessResponse deleteReview_0()

자신이 작성한 리뷰를 삭제합니다. 다른 사용자의 리뷰를 삭제하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: number; //삭제할 리뷰의 ID (default to undefined)

const { status, data } = await apiInstance.deleteReview_0(
    reviewId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewId** | [**number**] | 삭제할 리뷰의 ID | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 삭제 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReviewDetail**
> GetReviewDetail200Response getReviewDetail()

특정 리뷰의 상세 내용을 조회합니다.  - 리뷰의 기본 정보, 대상(앨범/트랙) 정보, 작성자 정보, 그리고 해당 리뷰에 달린 댓글 목록을 포함합니다.  - 로그인한 사용자가 요청할 경우, 해당 리뷰에 대한 \'좋아요\' 여부(`isLiked`)가 추가로 제공됩니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: number; //리뷰 ID (default to undefined)

const { status, data } = await apiInstance.getReviewDetail(
    reviewId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewId** | [**number**] | 리뷰 ID | defaults to undefined|


### Return type

**GetReviewDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 상세 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReviewDetail_0**
> GetReviewDetail200Response getReviewDetail_0()

특정 리뷰의 상세 내용을 조회합니다.  - 리뷰의 기본 정보, 대상(앨범/트랙) 정보, 작성자 정보, 그리고 해당 리뷰에 달린 댓글 목록을 포함합니다.  - 로그인한 사용자가 요청할 경우, 해당 리뷰에 대한 \'좋아요\' 여부(`isLiked`)가 추가로 제공됩니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: number; //리뷰 ID (default to undefined)

const { status, data } = await apiInstance.getReviewDetail_0(
    reviewId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewId** | [**number**] | 리뷰 ID | defaults to undefined|


### Return type

**GetReviewDetail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 상세 조회 성공 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReviews**
> GetReviews200Response getReviews()

특정 앨범에 작성된 모든 리뷰의 목록을 조회합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let targetId: string; //가져올 대상의 ID (앨범 ID 또는 트랙 ID) (default to undefined)
let sortBy: 'popularity' | 'recent' | 'old'; //정렬 기준(popularity or recent or old) (default to undefined)
let page: number; //페이지 번호 (1부터 시작) (optional) (default to 1)
let limit: number; //페이지당 항목 수 (optional) (default to 20)

const { status, data } = await apiInstance.getReviews(
    targetId,
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **targetId** | [**string**] | 가져올 대상의 ID (앨범 ID 또는 트랙 ID) | defaults to undefined|
| **sortBy** | [**&#39;popularity&#39; | &#39;recent&#39; | &#39;old&#39;**]**Array<&#39;popularity&#39; &#124; &#39;recent&#39; &#124; &#39;old&#39;>** | 정렬 기준(popularity or recent or old) | defaults to undefined|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to 1|
| **limit** | [**number**] | 페이지당 항목 수 | (optional) defaults to 20|


### Return type

**GetReviews200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 목록 조회 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getReviews_0**
> GetReviews200Response getReviews_0()

특정 앨범에 작성된 모든 리뷰의 목록을 조회합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let targetId: string; //가져올 대상의 ID (앨범 ID 또는 트랙 ID) (default to undefined)
let sortBy: 'popularity' | 'recent' | 'old'; //정렬 기준(popularity or recent or old) (default to undefined)
let page: number; //페이지 번호 (1부터 시작) (optional) (default to 1)
let limit: number; //페이지당 항목 수 (optional) (default to 20)

const { status, data } = await apiInstance.getReviews_0(
    targetId,
    sortBy,
    page,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **targetId** | [**string**] | 가져올 대상의 ID (앨범 ID 또는 트랙 ID) | defaults to undefined|
| **sortBy** | [**&#39;popularity&#39; | &#39;recent&#39; | &#39;old&#39;**]**Array<&#39;popularity&#39; &#124; &#39;recent&#39; &#124; &#39;old&#39;>** | 정렬 기준(popularity or recent or old) | defaults to undefined|
| **page** | [**number**] | 페이지 번호 (1부터 시작) | (optional) defaults to 1|
| **limit** | [**number**] | 페이지당 항목 수 | (optional) defaults to 20|


### Return type

**GetReviews200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 목록 조회 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **toggleArtistLike**
> SuccessResponse toggleArtistLike()

특정 아티스트에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 아티스트에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let artistId: string; //아티스트 ID (default to undefined)

const { status, data } = await apiInstance.toggleArtistLike(
    artistId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **artistId** | [**string**] | 아티스트 ID | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 아티스트 좋아요 토글 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **toggleArtistLike_0**
> SuccessResponse toggleArtistLike_0()

특정 아티스트에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 아티스트에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let artistId: string; //아티스트 ID (default to undefined)

const { status, data } = await apiInstance.toggleArtistLike_0(
    artistId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **artistId** | [**string**] | 아티스트 ID | defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 아티스트 좋아요 토글 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **toggleReviewLike**
> ToggleReviewLike200Response toggleReviewLike()

특정 리뷰에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 리뷰에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다. 요청 성공 시, 현재의 좋아요 상태(`liked`)를 boolean 값으로 반환합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: string; //좋아요를 토글할 리뷰 ID (default to undefined)

const { status, data } = await apiInstance.toggleReviewLike(
    reviewId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewId** | [**string**] | 좋아요를 토글할 리뷰 ID | defaults to undefined|


### Return type

**ToggleReviewLike200Response**

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

# **toggleReviewLike_0**
> ToggleReviewLike200Response toggleReviewLike_0()

특정 리뷰에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 리뷰에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다. 요청 성공 시, 현재의 좋아요 상태(`liked`)를 boolean 값으로 반환합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: string; //좋아요를 토글할 리뷰 ID (default to undefined)

const { status, data } = await apiInstance.toggleReviewLike_0(
    reviewId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reviewId** | [**string**] | 좋아요를 토글할 리뷰 ID | defaults to undefined|


### Return type

**ToggleReviewLike200Response**

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

# **updateReview**
> UpdateReview200Response updateReview()

자신이 작성한 리뷰의 내용을 수정합니다. 별점, 제목, 내용 등을 변경할 수 있습니다. 다른 사용자의 리뷰를 수정하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    UpdateReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: string; // (default to undefined)
let updateReviewRequest: UpdateReviewRequest; // (optional)

const { status, data } = await apiInstance.updateReview(
    reviewId,
    updateReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateReviewRequest** | **UpdateReviewRequest**|  | |
| **reviewId** | [**string**] |  | defaults to undefined|


### Return type

**UpdateReview200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 수정 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateReview_0**
> UpdateReview200Response updateReview_0()

자신이 작성한 리뷰의 내용을 수정합니다. 별점, 제목, 내용 등을 변경할 수 있습니다. 다른 사용자의 리뷰를 수정하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    ReviewsApi,
    Configuration,
    UpdateReviewRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ReviewsApi(configuration);

let reviewId: string; // (default to undefined)
let updateReviewRequest: UpdateReviewRequest; // (optional)

const { status, data } = await apiInstance.updateReview_0(
    reviewId,
    updateReviewRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateReviewRequest** | **UpdateReviewRequest**|  | |
| **reviewId** | [**string**] |  | defaults to undefined|


### Return type

**UpdateReview200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 리뷰 수정 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

