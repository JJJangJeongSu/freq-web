# RatedTrack


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 트랙 ID | [default to undefined]
**title** | **string** | 트랙 제목 | [default to undefined]
**artists** | **Array&lt;string&gt;** | 아티스트 목록 | [default to undefined]
**imageUrl** | **string** | 앨범 커버 이미지 URL | [optional] [default to undefined]
**releaseDate** | **string** | 발매일 | [optional] [default to undefined]
**rating** | **number** | 평균 평점 or 사용자가 준 평점 | [default to undefined]
**ratedDate** | **string** | 평가한 날짜 | [default to undefined]

## Example

```typescript
import { RatedTrack } from './api';

const instance: RatedTrack = {
    id,
    title,
    artists,
    imageUrl,
    releaseDate,
    rating,
    ratedDate,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
