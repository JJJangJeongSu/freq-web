# AuthenticationUpdateInfoApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changeNickname**](#changenickname) | **PATCH** /users/nickname | 닉네임 변경|
|[**changePassword**](#changepassword) | **PATCH** /users/password | 비밀번호 변경|
|[**checkPassword**](#checkpassword) | **POST** /auth/check-password | 비밀번호 확인|
|[**updateBio**](#updatebio) | **PATCH** /users/me/bio | 소개글 업데이트|
|[**updateProfileImage**](#updateprofileimage) | **PATCH** /users/me/profile-img | 프로필 이미지 업데이트|

# **changeNickname**
> SuccessResponse changeNickname()

인증된 사용자가 자신의 닉네임을 변경합니다. 새로운 닉네임은 다른 사용자가 사용하고 있지 않은 고유한 값이어야 합니다. 변경 전 \'닉네임 중복 검사\' API(GET /auth/check-nickname)를 통해 사용 가능 여부를 확인할 수 있습니다.

### Example

```typescript
import {
    AuthenticationUpdateInfoApi,
    Configuration,
    ChangeNicknameRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationUpdateInfoApi(configuration);

let changeNicknameRequest: ChangeNicknameRequest; // (optional)

const { status, data } = await apiInstance.changeNickname(
    changeNicknameRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changeNicknameRequest** | **ChangeNicknameRequest**|  | |


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 닉네임 변경 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**409** | 중복된 닉네임 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **changePassword**
> SuccessResponse changePassword()

인증된 사용자가 자신의 계정 비밀번호를 변경합니다. 보안을 위해, 이 API를 호출하기 전에 먼저 \'비밀번호 확인\' API(POST /auth/check-password)를 통해 사용자 인증을 완료하는 것을 권장합니다.

### Example

```typescript
import {
    AuthenticationUpdateInfoApi,
    Configuration,
    ChangePasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationUpdateInfoApi(configuration);

let changePasswordRequest: ChangePasswordRequest; // (optional)

const { status, data } = await apiInstance.changePassword(
    changePasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **changePasswordRequest** | **ChangePasswordRequest**|  | |


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 비밀번호 변경 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **checkPassword**
> SuccessResponse checkPassword()

사용자가 비밀번호 변경 등 민감한 작업을 수행하기 전에, 현재 로그인된 계정의 소유주가 맞는지 확인하기 위해 현재 비밀번호를 입력받아 검증합니다. 인증된 사용자만 호출할 수 있습니다.

### Example

```typescript
import {
    AuthenticationUpdateInfoApi,
    Configuration,
    CheckPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationUpdateInfoApi(configuration);

let checkPasswordRequest: CheckPasswordRequest; // (optional)

const { status, data } = await apiInstance.checkPassword(
    checkPasswordRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **checkPasswordRequest** | **CheckPasswordRequest**|  | |


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 비밀번호 확인 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateBio**
> SuccessResponse updateBio()

인증된 사용자가 자신의 프로필 페이지에 표시될 소개글(bio)을 수정합니다. 최대 500자까지 입력할 수 있습니다.

### Example

```typescript
import {
    AuthenticationUpdateInfoApi,
    Configuration,
    UpdateBioRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationUpdateInfoApi(configuration);

let updateBioRequest: UpdateBioRequest; // (optional)

const { status, data } = await apiInstance.updateBio(
    updateBioRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateBioRequest** | **UpdateBioRequest**|  | |


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 소개글 업데이트 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateProfileImage**
> SuccessResponse updateProfileImage()

인증된 사용자가 자신의 프로필 이미지를 변경합니다. 이미지 파일 자체를 업로드하는 것이 아니라, \'이미지 업로드\' API(POST /upload-image)를 통해 얻은 이미지 URL을 전달하여 업데이트합니다.

### Example

```typescript
import {
    AuthenticationUpdateInfoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationUpdateInfoApi(configuration);

let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.updateProfileImage(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | (optional) defaults to undefined|


### Return type

**SuccessResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 프로필 이미지 업데이트 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

