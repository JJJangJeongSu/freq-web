# AuthResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **number** | 사용자 식별 번호 | [default to undefined]
**accessToken** | **string** | API 접근에 사용되는 JWT 액세스 토큰 | [default to undefined]
**refreshToken** | **string** | AccessToken 재발급에 사용되는 JWT 리프레시 토큰 | [default to undefined]
**email** | **string** | 로그인한 사용자의 이메일 | [default to undefined]
**nickname** | **string** | 로그인한 사용자의 닉네임 | [default to undefined]
**provider** | **string** | 로그인 방법 | [default to undefined]
**role** | **string** | 사용자 권한 | [default to undefined]

## Example

```typescript
import { AuthResponse } from './api';

const instance: AuthResponse = {
    userId,
    accessToken,
    refreshToken,
    email,
    nickname,
    provider,
    role,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
