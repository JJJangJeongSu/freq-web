# TrackPreview


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 트랙 ID | [default to undefined]
**title** | **string** | 트랙 제목 | [default to undefined]
**artists** | **Array&lt;string&gt;** | 아티스트 목록 | [default to undefined]
**imageUrl** | **string** | 앨범 커버 이미지 URL (앨범 상세에서는 불필요) | [optional] [default to undefined]
**releaseDate** | **string** | 발매일 | [optional] [default to undefined]
**rating** | **number** | 평균 평점 또는 사용자 평점 | [optional] [default to undefined]
**isRated** | **boolean** | 사용자가 평가했는지 여부 | [default to undefined]

## Example

```typescript
import { TrackPreview } from './api';

const instance: TrackPreview = {
    id,
    title,
    artists,
    imageUrl,
    releaseDate,
    rating,
    isRated,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
