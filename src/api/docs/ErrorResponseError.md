# ErrorResponseError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **string** | 에러 코드 | [default to undefined]
**message** | **string** | 사용자를 위한 에러 메시지 | [default to undefined]
**details** | **{ [key: string]: any; }** | 추가 에러 상세 정보 | [optional] [default to undefined]
**timestamp** | **string** | 에러 발생 시간 | [optional] [default to undefined]

## Example

```typescript
import { ErrorResponseError } from './api';

const instance: ErrorResponseError = {
    code,
    message,
    details,
    timestamp,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
