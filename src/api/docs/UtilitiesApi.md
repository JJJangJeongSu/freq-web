# UtilitiesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**uploadImage**](#uploadimage) | **POST** /upload-image | 이미지 업로드|
|[**uploadImage_0**](#uploadimage_0) | **POST** /upload-image | 이미지 업로드|

# **uploadImage**
> UploadImage200Response uploadImage()

서비스 내에서 사용할 이미지(프로필 이미지, 컬렉션 커버 등)를 서버에 업로드합니다. `multipart/form-data` 형식으로 이미지 파일을 전송해야 하며, 성공 시 업로드된 이미지에 접근할 수 있는 URL을 반환합니다. 이 URL을 사용하여 프로필 이미지 변경 등의 후속 작업을 수행할 수 있습니다.

### Example

```typescript
import {
    UtilitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UtilitiesApi(configuration);

let file: File; //업로드할 이미지 파일 (JPEG, PNG, GIF 지원) (default to undefined)

const { status, data } = await apiInstance.uploadImage(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] | 업로드할 이미지 파일 (JPEG, PNG, GIF 지원) | defaults to undefined|


### Return type

**UploadImage200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 이미지 업로드 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadImage_0**
> UploadImage200Response uploadImage_0()

서비스 내에서 사용할 이미지(프로필 이미지, 컬렉션 커버 등)를 서버에 업로드합니다. `multipart/form-data` 형식으로 이미지 파일을 전송해야 하며, 성공 시 업로드된 이미지에 접근할 수 있는 URL을 반환합니다. 이 URL을 사용하여 프로필 이미지 변경 등의 후속 작업을 수행할 수 있습니다.

### Example

```typescript
import {
    UtilitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UtilitiesApi(configuration);

let file: File; //업로드할 이미지 파일 (JPEG, PNG, GIF 지원) (default to undefined)

const { status, data } = await apiInstance.uploadImage_0(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] | 업로드할 이미지 파일 (JPEG, PNG, GIF 지원) | defaults to undefined|


### Return type

**UploadImage200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 이미지 업로드 성공 |  -  |
|**400** | 잘못된 요청 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

