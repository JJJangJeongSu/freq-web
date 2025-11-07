# GetRatedAlbums200ResponseAllOfDataReviewsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**reviewId** | **number** | 리뷰 ID | [default to undefined]
**rating** | **number** | 별점 (0.5 ~ 5.0) | [default to undefined]
**title** | **string** | 리뷰 제목 | [optional] [default to undefined]
**content** | **string** | 리뷰 내용 미리보기 | [default to undefined]
**likeCount** | **number** | 좋아요 개수 | [default to undefined]
**commentCount** | **number** | 댓글 개수 | [default to undefined]
**createdAt** | **string** | 작성일시 | [default to undefined]
**album** | [**GetRatedAlbums200ResponseAllOfDataReviewsInnerAlbum**](GetRatedAlbums200ResponseAllOfDataReviewsInnerAlbum.md) |  | [default to undefined]

## Example

```typescript
import { GetRatedAlbums200ResponseAllOfDataReviewsInner } from './api';

const instance: GetRatedAlbums200ResponseAllOfDataReviewsInner = {
    reviewId,
    rating,
    title,
    content,
    likeCount,
    commentCount,
    createdAt,
    album,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
