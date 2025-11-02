# ArtistDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** | 아티스트 ID | [default to undefined]
**name** | **string** | 아티스트 이름 | [default to undefined]
**imageUrl** | **string** | 아티스트 이미지 URL | [default to undefined]
**genres** | **Array&lt;string&gt;** | 장르 목록 (없으면 빈 배열) | [default to undefined]
**popularTracks** | [**Array&lt;TrackPreview&gt;**](TrackPreview.md) | 인기 트랙 목록 | [default to undefined]
**albums** | [**Array&lt;ArtistDetailAlbumsInner&gt;**](ArtistDetailAlbumsInner.md) | 발매한 앨범 목록 | [default to undefined]
**likes** | **number** | 받은 좋아요 수 | [default to undefined]
**isLiked** | **boolean** | 현재 사용자가 좋아요 했는지 여부 (로그인 시에만) | [default to undefined]

## Example

```typescript
import { ArtistDetail } from './api';

const instance: ArtistDetail = {
    id,
    name,
    imageUrl,
    genres,
    popularTracks,
    albums,
    likes,
    isLiked,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
