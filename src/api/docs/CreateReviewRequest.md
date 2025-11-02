# CreateReviewRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**rating** | **number** | 별점 (0.5 ~ 5.0, 0.5 단위) | [default to undefined]
**title** | **string** | 리뷰 제목 (선택사항) | [optional] [default to undefined]
**content** | **string** | 리뷰 내용 (선택사항) | [optional] [default to undefined]
**type** | **string** | 리뷰 대상 타입 | [default to undefined]
**targetId** | **string** | 리뷰 대상의 ID (Spotify ID) | [default to undefined]
**artistIds** | **Array&lt;string&gt;** | 아티스트들의 id | [default to undefined]

## Example

```typescript
import { CreateReviewRequest } from './api';

const instance: CreateReviewRequest = {
    rating,
    title,
    content,
    type,
    targetId,
    artistIds,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
