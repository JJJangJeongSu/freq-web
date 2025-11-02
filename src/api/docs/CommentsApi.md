# CommentsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createComment**](#createcomment) | **POST** /comments | 댓글 작성|
|[**createComment_0**](#createcomment_0) | **POST** /comments | 댓글 작성|
|[**deleteComment**](#deletecomment) | **DELETE** /comments/{commentId} | 댓글 삭제|
|[**deleteComment_0**](#deletecomment_0) | **DELETE** /comments/{commentId} | 댓글 삭제|
|[**toggleCommentLike**](#togglecommentlike) | **POST** /comments/{commentId}/like | 댓글 좋아요 토글|
|[**toggleCommentLike_0**](#togglecommentlike_0) | **POST** /comments/{commentId}/like | 댓글 좋아요 토글|
|[**updateComment**](#updatecomment) | **PATCH** /comments/{commentId} | 댓글 수정|
|[**updateComment_0**](#updatecomment_0) | **PATCH** /comments/{commentId} | 댓글 수정|

# **createComment**
> CreateComment200Response createComment()

리뷰 또는 컬렉션에 새로운 댓글을 작성합니다. `parentId`를 포함하면 특정 댓글에 대한 답글(대댓글)로 작성됩니다. `parentId`가 없으면 일반 댓글로 작성됩니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration,
    CreateCommentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let createCommentRequest: CreateCommentRequest; // (optional)

const { status, data } = await apiInstance.createComment(
    createCommentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCommentRequest** | **CreateCommentRequest**|  | |


### Return type

**CreateComment200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 댓글 작성 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createComment_0**
> CreateComment200Response createComment_0()

리뷰 또는 컬렉션에 새로운 댓글을 작성합니다. `parentId`를 포함하면 특정 댓글에 대한 답글(대댓글)로 작성됩니다. `parentId`가 없으면 일반 댓글로 작성됩니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration,
    CreateCommentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let createCommentRequest: CreateCommentRequest; // (optional)

const { status, data } = await apiInstance.createComment_0(
    createCommentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCommentRequest** | **CreateCommentRequest**|  | |


### Return type

**CreateComment200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 댓글 작성 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteComment**
> SuccessResponse deleteComment()

자신이 작성한 댓글을 삭제합니다. 다른 사용자의 댓글을 삭제하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let commentId: string; //삭제할 댓글 ID (default to undefined)

const { status, data } = await apiInstance.deleteComment(
    commentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentId** | [**string**] | 삭제할 댓글 ID | defaults to undefined|


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
|**200** | 댓글 삭제 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteComment_0**
> SuccessResponse deleteComment_0()

자신이 작성한 댓글을 삭제합니다. 다른 사용자의 댓글을 삭제하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let commentId: string; //삭제할 댓글 ID (default to undefined)

const { status, data } = await apiInstance.deleteComment_0(
    commentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentId** | [**string**] | 삭제할 댓글 ID | defaults to undefined|


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
|**200** | 댓글 삭제 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **toggleCommentLike**
> ToggleCommentLike200Response toggleCommentLike()

특정 댓글에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 댓글에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let commentId: string; //좋아요를 토글할 댓글 ID (default to undefined)

const { status, data } = await apiInstance.toggleCommentLike(
    commentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentId** | [**string**] | 좋아요를 토글할 댓글 ID | defaults to undefined|


### Return type

**ToggleCommentLike200Response**

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

# **toggleCommentLike_0**
> ToggleCommentLike200Response toggleCommentLike_0()

특정 댓글에 대한 \'좋아요\' 상태를 변경(토글)합니다. 사용자가 해당 댓글에 좋아요를 누르지 않은 상태이면 좋아요를 추가하고, 이미 누른 상태이면 좋아요를 취소합니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let commentId: string; //좋아요를 토글할 댓글 ID (default to undefined)

const { status, data } = await apiInstance.toggleCommentLike_0(
    commentId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **commentId** | [**string**] | 좋아요를 토글할 댓글 ID | defaults to undefined|


### Return type

**ToggleCommentLike200Response**

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

# **updateComment**
> UpdateComment200Response updateComment()

자신이 작성한 댓글의 내용을 수정합니다. 다른 사용자의 댓글을 수정하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration,
    UpdateCommentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let commentId: string; //수정할 댓글 ID (default to undefined)
let updateCommentRequest: UpdateCommentRequest; // (optional)

const { status, data } = await apiInstance.updateComment(
    commentId,
    updateCommentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCommentRequest** | **UpdateCommentRequest**|  | |
| **commentId** | [**string**] | 수정할 댓글 ID | defaults to undefined|


### Return type

**UpdateComment200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 댓글 수정 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateComment_0**
> UpdateComment200Response updateComment_0()

자신이 작성한 댓글의 내용을 수정합니다. 다른 사용자의 댓글을 수정하려고 할 경우 403 Forbidden 에러가 발생합니다.

### Example

```typescript
import {
    CommentsApi,
    Configuration,
    UpdateCommentRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new CommentsApi(configuration);

let commentId: string; //수정할 댓글 ID (default to undefined)
let updateCommentRequest: UpdateCommentRequest; // (optional)

const { status, data } = await apiInstance.updateComment_0(
    commentId,
    updateCommentRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCommentRequest** | **UpdateCommentRequest**|  | |
| **commentId** | [**string**] | 수정할 댓글 ID | defaults to undefined|


### Return type

**UpdateComment200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 댓글 수정 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**403** | 권한 없음 |  -  |
|**404** | 리소스를 찾을 수 없음 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

