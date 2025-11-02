# Comment


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**commentId** | **number** | 댓글 고유 ID | [default to undefined]
**content** | **string** | 댓글 내용 | [default to undefined]
**userName** | **string** | 작성자 닉네임 | [default to undefined]
**profileImageUrl** | **string** | 작성자 프로필 이미지 URL | [default to undefined]
**createdAt** | **string** | 작성일시 (ISO 8601 형식) | [default to undefined]
**updatedAt** | **string** | 수정일시 (수정된 경우에만) | [optional] [default to undefined]
**parentId** | **number** | 대댓글인 경우 부모 댓글 ID, 없으면 null | [optional] [default to undefined]
**likeCount** | **number** | 좋아요 개수 | [default to undefined]
**commentCount** | **number** | 대댓글 개수 (부모 댓글인 경우에만) | [optional] [default to undefined]
**isLiked** | **boolean** | 현재 사용자의 좋아요 여부 (로그인 시에만) | [default to undefined]

## Example

```typescript
import { Comment } from './api';

const instance: Comment = {
    commentId,
    content,
    userName,
    profileImageUrl,
    createdAt,
    updatedAt,
    parentId,
    likeCount,
    commentCount,
    isLiked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
