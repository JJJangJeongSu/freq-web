# GetUserRateRecords200ResponseAllOfData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userProfile** | [**GetUserRateRecords200ResponseAllOfDataUserProfile**](GetUserRateRecords200ResponseAllOfDataUserProfile.md) |  | [default to undefined]
**statistics** | [**GetUserRateRecords200ResponseAllOfDataStatistics**](GetUserRateRecords200ResponseAllOfDataStatistics.md) |  | [default to undefined]
**albumRateDistribution** | [**RatingDistribution**](RatingDistribution.md) |  | [default to undefined]
**trackRateDistribution** | [**RatingDistribution**](RatingDistribution.md) |  | [default to undefined]
**myCollections** | [**Array&lt;GetUserRateRecords200ResponseAllOfDataMyCollectionsInner&gt;**](GetUserRateRecords200ResponseAllOfDataMyCollectionsInner.md) | 내가 만든 컬렉션 | [default to undefined]
**likedCollections** | [**Array&lt;GetUserRateRecords200ResponseAllOfDataLikedCollectionsInner&gt;**](GetUserRateRecords200ResponseAllOfDataLikedCollectionsInner.md) | 좋아요한 컬렉션 | [default to undefined]
**genreKeywords** | [**Array&lt;GetUserRateRecords200ResponseAllOfDataGenreKeywordsInner&gt;**](GetUserRateRecords200ResponseAllOfDataGenreKeywordsInner.md) | 장르 키워드 | [default to undefined]
**ratedAlbums** | [**Array&lt;RatedAlbum&gt;**](RatedAlbum.md) | 최근 평가한 앨범 | [default to undefined]
**ratedTracks** | [**Array&lt;RatedTrack&gt;**](RatedTrack.md) | 최근 평가한 트랙 | [default to undefined]

## Example

```typescript
import { GetUserRateRecords200ResponseAllOfData } from './api';

const instance: GetUserRateRecords200ResponseAllOfData = {
    userProfile,
    statistics,
    albumRateDistribution,
    trackRateDistribution,
    myCollections,
    likedCollections,
    genreKeywords,
    ratedAlbums,
    ratedTracks,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
