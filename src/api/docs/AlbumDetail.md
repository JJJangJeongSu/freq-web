# AlbumDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 앨범 ID | [default to undefined]
**title** | **string** | 앨범 제목 | [default to undefined]
**imageUrl** | **string** | 앨범 커버 이미지 URL | [default to undefined]
**artists** | [**Array&lt;ArtistPreview&gt;**](ArtistPreview.md) | 아티스트 목록 | [default to undefined]
**averageRating** | **number** | 평균 평점 | [default to undefined]
**ratingCount** | **number** | 평가 개수 | [default to undefined]
**ratingDistribution** | [**RatingDistribution**](RatingDistribution.md) |  | [default to undefined]
**tracks** | [**Array&lt;TrackPreview&gt;**](TrackPreview.md) | 수록곡 목록 | [default to undefined]
**releaseDate** | **string** | 발매일 (YYYY-MM-DD) | [default to undefined]
**description** | **string** | 앨범 설명 | [optional] [default to undefined]
**collections** | [**Array&lt;CollectionPreview&gt;**](CollectionPreview.md) | 이 앨범이 포함된 컬렉션 목록 | [default to undefined]
**userRating** | **number** | 현재 사용자가 준 평점 (로그인 시에만) | [optional] [default to undefined]
**isRated** | **boolean** | 현재 사용자가 평가했는지 여부 (로그인 시에만) | [optional] [default to undefined]

## Example

```typescript
import { AlbumDetail } from './api';

const instance: AlbumDetail = {
    id,
    title,
    imageUrl,
    artists,
    averageRating,
    ratingCount,
    ratingDistribution,
    tracks,
    releaseDate,
    description,
    collections,
    userRating,
    isRated,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
