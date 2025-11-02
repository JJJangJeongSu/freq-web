# UpdateCollectionRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | 수정할 제목 | [default to undefined]
**description** | **string** | 수정할 설명 | [default to undefined]
**visibility** | **string** | 수정할 공개 여부 | [default to undefined]
**coverImageUrl** | **string** | 수정할 커버 이미지 URL | [default to undefined]
**tags** | **Array&lt;string&gt;** | 수정할 태그 목록 | [default to undefined]

## Example

```typescript
import { UpdateCollectionRequest } from './api';

const instance: UpdateCollectionRequest = {
    title,
    description,
    visibility,
    coverImageUrl,
    tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
