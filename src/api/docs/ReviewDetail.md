# ReviewDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**reviewId** | **number** | 리뷰 ID | [default to undefined]
**targetId** | **string** | 대상 ID (앨범 또는 트랙) | [default to undefined]
**targetTitle** | **string** | 대상 제목 | [default to undefined]
**targetType** | **string** | 대상 타입 | [default to undefined]
**imageUrl** | **string** | 앨범/트랙 이미지 URL | [default to undefined]
**artists** | **Array&lt;string&gt;** | 아티스트 목록 | [default to undefined]
**releaseDate** | **string** | 발매일 | [default to undefined]
**title** | **string** | 리뷰 제목 | [optional] [default to undefined]
**content** | **string** | 리뷰 내용 | [optional] [default to undefined]
**rating** | **number** | 별점 | [default to undefined]
**userId** | **number** | 작성자 ID | [default to undefined]
**username** | **string** | 작성자 닉네임 | [default to undefined]
**userImageUrl** | **string** | 작성자 프로필 이미지 | [default to undefined]
**likeCount** | **number** | 좋아요 개수 | [default to undefined]
**isLiked** | **boolean** | 현재 사용자의 좋아요 여부 (로그인 시에만 제공) | [optional] [default to undefined]
**commentCount** | **number** | 댓글 개수 | [default to undefined]
**comments** | [**Array&lt;Comment&gt;**](Comment.md) | 댓글 목록 (최대 3개) | [optional] [default to undefined]
**createdAt** | **string** | 작성일시 | [default to undefined]
**updatedAt** | **string** | 수정일시 | [optional] [default to undefined]

## Example

```typescript
import { ReviewDetail } from './api';

const instance: ReviewDetail = {
    reviewId,
    targetId,
    targetTitle,
    targetType,
    imageUrl,
    artists,
    releaseDate,
    title,
    content,
    rating,
    userId,
    username,
    userImageUrl,
    likeCount,
    isLiked,
    commentCount,
    comments,
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
