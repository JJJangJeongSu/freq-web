# GetUserRatedAlbums200ResponseAllOfDataAlbumsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 앨범 ID | [default to undefined]
**imageUrl** | **string** | 앨범 커버 이미지 | [default to undefined]
**title** | **string** | 앨범 제목 | [default to undefined]
**artists** | **Array&lt;string&gt;** | 아티스트 목록 | [default to undefined]
**reviewId** | **number** | 리뷰 ID | [default to undefined]
**rating** | **number** | 내가 준 평점 (0.5~5) | [default to undefined]
**ratedDate** | **string** | 평가 날짜 (ISO 8601 format) | [default to undefined]
**content** | **string** | 리뷰 내용 (없으면 빈 스트링) | [default to undefined]

## Example

```typescript
import { GetUserRatedAlbums200ResponseAllOfDataAlbumsInner } from './api';

const instance: GetUserRatedAlbums200ResponseAllOfDataAlbumsInner = {
    id,
    imageUrl,
    title,
    artists,
    reviewId,
    rating,
    ratedDate,
    content,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
