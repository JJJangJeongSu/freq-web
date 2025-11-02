# AuthenticationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**changeNickname**](#changenickname) | **PATCH** /users/nickname | 닉네임 변경|
|[**changePassword**](#changepassword) | **PATCH** /users/password | 비밀번호 변경|
|[**checkEmail**](#checkemail) | **GET** /auth/check-email | 이메일 중복 검사|
|[**checkNickname**](#checknickname) | **GET** /auth/check-nickname | 닉네임 중복 검사|
|[**checkPassword**](#checkpassword) | **POST** /auth/check-password | 비밀번호 확인|
|[**googleLogin**](#googlelogin) | **POST** /auth/oauth/google | 구글 소셜 로그인|
|[**kakaoLogin**](#kakaologin) | **POST** /auth/oauth/kakao | 카카오 소셜 로그인|
|[**login**](#login) | **POST** /auth/login | 로컬 로그인|
|[**logout**](#logout) | **POST** /auth/logout | 로그아웃|
|[**naverLogin**](#naverlogin) | **POST** /auth/oauth/naver | 네이버 소셜 로그인|
|[**reissueToken**](#reissuetoken) | **POST** /auth/reissue | 토큰 재발급|
|[**signup**](#signup) | **POST** /auth/signup | 이메일 회원가입|
|[**updateBio**](#updatebio) | **PATCH** /users/me/bio | 소개글 업데이트|
|[**updateProfileImage**](#updateprofileimage) | **PATCH** /users/me/profile-img | 프로필 이미지 업데이트|

# **changeNickname**
> SuccessResponse changeNickname()

인증된 사용자가 자신의 닉네임을 변경합니다. 새로운 닉네임은 다른 사용자가 사용하고 있지 않은 고유한 값이어야 합니다. 변경 전 \'닉네임 중복 검사\' API(GET /auth/check-nickname)를 통해 사용 가능 여부를 확인할 수 있습니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ChangeNicknameRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

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
    AuthenticationApi,
    Configuration,
    ChangePasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

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

# **checkEmail**
> CheckEmail200Response checkEmail()

회원가입 과정에서 사용자가 입력한 이메일이 이미 데이터베이스에 존재하는지 확인합니다. 중복 여부에 따라 사용 가능 상태를 boolean 값으로 반환합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let email: string; //확인할 이메일 (default to undefined)

const { status, data } = await apiInstance.checkEmail(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] | 확인할 이메일 | defaults to undefined|


### Return type

**CheckEmail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 사용 가능한 이메일 |  -  |
|**409** | 이미 사용 중인 이메일 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **checkNickname**
> CheckEmail200Response checkNickname()

회원가입 또는 닉네임 변경 과정에서 사용자가 입력한 닉네임이 이미 사용 중인지 확인합니다. 중복 여부에 따라 사용 가능 상태를 boolean 값으로 반환합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let nickname: string; //중복 확인할 닉네임 (default to undefined)

const { status, data } = await apiInstance.checkNickname(
    nickname
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **nickname** | [**string**] | 중복 확인할 닉네임 | defaults to undefined|


### Return type

**CheckEmail200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 사용 가능한 닉네임 |  -  |
|**409** | 이미 사용 중인 닉네임 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **checkPassword**
> SuccessResponse checkPassword()

사용자가 비밀번호 변경 등 민감한 작업을 수행하기 전에, 현재 로그인된 계정의 소유주가 맞는지 확인하기 위해 현재 비밀번호를 입력받아 검증합니다. 인증된 사용자만 호출할 수 있습니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    CheckPasswordRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

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

# **googleLogin**
> Login200Response googleLogin()

구글에서 발급받은 OAuth AccessToken을 사용하여 서비스에 로그인 또는 회원가입을 처리합니다. 기존에 해당 소셜 계정으로 가입한 사용자가 없으면 신규 계정을 생성하고, 있으면 로그인을 진행합니다. 성공 시, 서비스의 AccessToken과 RefreshToken을 발급합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    GoogleLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let googleLoginRequest: GoogleLoginRequest; // (optional)

const { status, data } = await apiInstance.googleLogin(
    googleLoginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **googleLoginRequest** | **GoogleLoginRequest**|  | |


### Return type

**Login200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 로그인 성공 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **kakaoLogin**
> Login200Response kakaoLogin()

카카오에서 발급받은 OAuth AccessToken을 사용하여 서비스에 로그인 또는 회원가입을 처리합니다. 기존에 해당 소셜 계정으로 가입한 사용자가 없으면 신규 계정을 생성하고, 있으면 로그인을 진행합니다. 성공 시, 서비스의 AccessToken과 RefreshToken을 발급합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    KakaoLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let kakaoLoginRequest: KakaoLoginRequest; // (optional)

const { status, data } = await apiInstance.kakaoLogin(
    kakaoLoginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **kakaoLoginRequest** | **KakaoLoginRequest**|  | |


### Return type

**Login200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 로그인 성공 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **login**
> Login200Response login()

이메일과 비밀번호를 사용하여 로컬 계정으로 로그인합니다.  - 로그인 성공 시, API 접근에 필요한 AccessToken과 RefreshToken을 포함한 인증 정보를 반환합니다.  - RefreshToken은 AccessToken이 만료되었을 때 새로운 토큰을 발급받는 데 사용됩니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    LoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let loginRequest: LoginRequest; // (optional)

const { status, data } = await apiInstance.login(
    loginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequest** | **LoginRequest**|  | |


### Return type

**Login200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 로그인 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**404** |  |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **logout**
> SuccessResponse logout()

사용자를 로그아웃 처리합니다. 서버는 요청 헤더의 `Authorization` 필드에서 AccessToken을 추출하여 해당 토큰을 더 이상 사용하지 못하도록 블랙리스트에 추가합니다. RefreshToken 또한 서버와 클라이언트 양쪽에서 무효화되어야 합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

const { status, data } = await apiInstance.logout();
```

### Parameters
This endpoint does not have any parameters.


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
|**200** | 로그아웃 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **naverLogin**
> Login200Response naverLogin()

네이버에서 발급받은 OAuth AccessToken을 사용하여 서비스에 로그인 또는 회원가입을 처리합니다. 기존에 해당 소셜 계정으로 가입한 사용자가 없으면 신규 계정을 생성하고, 있으면 로그인을 진행합니다. 성공 시, 서비스의 AccessToken과 RefreshToken을 발급합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    NaverLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let naverLoginRequest: NaverLoginRequest; // (optional)

const { status, data } = await apiInstance.naverLogin(
    naverLoginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **naverLoginRequest** | **NaverLoginRequest**|  | |


### Return type

**Login200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 로그인 성공 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **reissueToken**
> ReissueToken200Response reissueToken()

만료된 AccessToken을 새로운 토큰으로 교체합니다.  - 클라이언트는 유효한 RefreshToken을 요청 본문에 담아 보내야 합니다.  - 서버는 RefreshToken을 검증한 후, 유효할 경우 새로운 AccessToken을 발급하여 반환합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    ReissueTokenRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let reissueTokenRequest: ReissueTokenRequest; // (optional)

const { status, data } = await apiInstance.reissueToken(
    reissueTokenRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reissueTokenRequest** | **ReissueTokenRequest**|  | |


### Return type

**ReissueToken200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 토큰 재발급 성공 |  -  |
|**401** | 인증 실패 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **signup**
> Signup200Response signup()

사용자의 이메일, 비밀번호, 닉네임을 사용하여 새로운 계정을 생성합니다.  - 이메일과 닉네임의 중복 여부는 별도의 API(GET /auth/check-email, GET /auth/check-nickname)를 통해 미리 검증된 상태이다. - 회원가입 성공 시, 생성된 사용자의 고유 ID와 기본 정보를 반환합니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    SignupRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let signupRequest: SignupRequest; // (optional)

const { status, data } = await apiInstance.signup(
    signupRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **signupRequest** | **SignupRequest**|  | |


### Return type

**Signup200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 회원가입 성공 |  -  |
|**500** | 서버 오류 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateBio**
> SuccessResponse updateBio()

인증된 사용자가 자신의 프로필 페이지에 표시될 소개글(bio)을 수정합니다. 최대 500자까지 입력할 수 있습니다.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    UpdateBioRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

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
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

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

