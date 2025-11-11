# TrackDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 트랙 ID | [default to undefined]
**title** | **string** | 트랙 제목 | [default to undefined]
**releaseDate** | **string** | 발매일 | [default to undefined]
**rating** | [**TrackDetailRating**](TrackDetailRating.md) |  | [default to undefined]
**album** | [**TrackDetailAlbum**](TrackDetailAlbum.md) |  | [default to undefined]
**artists** | [**Array&lt;TrackDetailArtistsInner&gt;**](TrackDetailArtistsInner.md) | 아티스트 목록 | [default to undefined]
**imageUrl** | **string** | 트랙 이미지 URL | [default to undefined]
**collections** | [**Array&lt;CollectionPreview&gt;**](CollectionPreview.md) | 이 트랙이 포함된 컬렉션 목록 | [default to undefined]
**userRating** | **number** | 현재 사용자가 준 평점  | [optional] [default to undefined]
**isRated** | **boolean** | 현재 사용자가 평가했는지 여부 (로그인 시에만) | [optional] [default to undefined]
**myReviewId** | **number** | 별점을 줬을 경우, 해당 리뷰의 id | [default to undefined]

## Example

```typescript
import { TrackDetail } from './api';

const instance: TrackDetail = {
    id,
    title,
    releaseDate,
    rating,
    album,
    artists,
    imageUrl,
    collections,
    userRating,
    isRated,
    myReviewId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
