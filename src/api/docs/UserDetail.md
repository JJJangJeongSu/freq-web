# UserDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **number** | 사용자 ID | [default to undefined]
**username** | **string** | 사용자 닉네임 | [default to undefined]
**bio** | **string** | 사용자 소개글 | [default to undefined]
**profileImageUrl** | **string** | 프로필 이미지 URL | [default to undefined]
**likeCount** | **number** | 받은 좋아요 개수 | [default to undefined]
**contentReviewCount** | **number** | 내용이 있는 리뷰 개수 | [default to undefined]
**albumReviewCount** | **number** | 평가한 앨범 개수 | [default to undefined]
**trackReviewCount** | **number** | 평가한 트랙 개수 | [default to undefined]
**likedArtistCount** | **number** | 좋아요한 아티스트 수 | [default to undefined]
**ratedAlbums** | **Array&lt;object&gt;** | 평가한 앨범 미리보기 | [default to undefined]
**ratedTracks** | **Array&lt;object&gt;** | 평가한 트랙 미리보기 | [default to undefined]
**myCollections** | [**Array&lt;CollectionPreview&gt;**](CollectionPreview.md) | 내가 만든 컬렉션 | [default to undefined]
**likedCollections** | [**Array&lt;CollectionPreview&gt;**](CollectionPreview.md) | 좋아요한 컬렉션 | [default to undefined]
**rateDistributions** | [**GetMyActivity200ResponseAllOfDataRateDistributions**](GetMyActivity200ResponseAllOfDataRateDistributions.md) |  | [default to undefined]

## Example

```typescript
import { UserDetail } from './api';

const instance: UserDetail = {
    userId,
    username,
    bio,
    profileImageUrl,
    likeCount,
    contentReviewCount,
    albumReviewCount,
    trackReviewCount,
    likedArtistCount,
    ratedAlbums,
    ratedTracks,
    myCollections,
    likedCollections,
    rateDistributions,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
