# AlbumPreview


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 앨범 ID | [default to undefined]
**title** | **string** | 앨범 제목 | [default to undefined]
**imageUrl** | **string** | 앨범 커버 이미지 URL | [default to undefined]
**artists** | **Array&lt;string&gt;** | 아티스트 목록 | [default to undefined]
**averageRating** | **number** | 평균 평점 | [default to undefined]
**ratingCount** | **number** | 평가 개수 | [default to undefined]
**userRating** | **number** | 현재 사용자가 준 평점 (로그인 시에만) | [optional] [default to undefined]
**isRated** | **boolean** | 현재 사용자가 평가했는지 여부 (로그인 시에만) | [optional] [default to undefined]

## Example

```typescript
import { AlbumPreview } from './api';

const instance: AlbumPreview = {
    id,
    title,
    imageUrl,
    artists,
    averageRating,
    ratingCount,
    userRating,
    isRated,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
