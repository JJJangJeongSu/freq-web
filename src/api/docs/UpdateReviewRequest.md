# UpdateReviewRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**rating** | **number** | 수정할 별점 | [default to undefined]
**title** | **string** | 수정할 제목 | [optional] [default to undefined]
**content** | **string** | 수정할 내용 | [optional] [default to undefined]
**type** | **string** | 리뷰 타입 | [default to undefined]

## Example

```typescript
import { UpdateReviewRequest } from './api';

const instance: UpdateReviewRequest = {
    rating,
    title,
    content,
    type,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
