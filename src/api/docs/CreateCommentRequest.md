# CreateCommentRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **string** | 댓글을 작성할 대상 타입 | [default to undefined]
**targetId** | **number** | 댓글을 작성할 대상 ID (리뷰 ID 또는 컬렉션 ID) | [default to undefined]
**content** | **string** | 댓글 내용 | [default to undefined]
**parentId** | **number** | 대댓글인 경우 부모 댓글 ID (선택사항) | [optional] [default to undefined]

## Example

```typescript
import { CreateCommentRequest } from './api';

const instance: CreateCommentRequest = {
    type,
    targetId,
    content,
    parentId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
