# RatedAlbum


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 앨범 ID | [default to undefined]
**imageUrl** | **string** | 앨범 커버 이미지 URL | [default to undefined]
**title** | **string** | 앨범 제목 | [default to undefined]
**artists** | **Array&lt;string&gt;** | 아티스트 목록 | [default to undefined]
**releaseDate** | **string** | 발매일 | [optional] [default to undefined]
**rating** | **number** | 평균 평점 or 사용자가 준 평점 | [default to undefined]
**ratedDate** | **string** | 평가한 날짜 | [default to undefined]

## Example

```typescript
import { RatedAlbum } from './api';

const instance: RatedAlbum = {
    id,
    imageUrl,
    title,
    artists,
    releaseDate,
    rating,
    ratedDate,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
