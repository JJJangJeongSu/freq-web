# SearchResult


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **string** | 검색 결과 타입 | [default to undefined]
**id** | **string** | ID (Spotify ID) | [default to undefined]
**imageUrl** | **string** | 이미지 URL | [default to undefined]
**title** | **string** | 제목 (아티스트명, 앨범명, 트랙명) | [default to undefined]
**artist** | **string** | 아티스트명 (앨범/트랙인 경우) | [optional] [default to undefined]
**releaseYear** | **string** | 발매 연도 (앨범/트랙인 경우) | [optional] [default to undefined]
**popularity** | **number** | 인기도 (0-100) | [optional] [default to undefined]
**rating** | **number** | 평균 평점 (로그인 시 사용자 평점 포함) | [optional] [default to undefined]
**isRated** | **boolean** | 현재 사용자가 평가했는지 여부 (로그인 시에만) | [optional] [default to undefined]

## Example

```typescript
import { SearchResult } from './api';

const instance: SearchResult = {
    type,
    id,
    imageUrl,
    title,
    artist,
    releaseYear,
    popularity,
    rating,
    isRated,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
