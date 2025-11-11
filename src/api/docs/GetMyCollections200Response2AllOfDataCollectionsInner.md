# GetMyCollections200Response2AllOfDataCollectionsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**collectionId** | **number** | 컬렉션 ID | [default to undefined]
**title** | **string** | 컬렉션 제목 | [default to undefined]
**description** | **string** | 컬렉션 설명 | [default to undefined]
**author** | [**UserPreview**](UserPreview.md) |  | [default to undefined]
**itemCount** | **number** | 컬렉션에 포함된 아이템 개수 | [default to undefined]
**likeCount** | **number** | 받은 좋아요 수 | [default to undefined]
**coverImageUrl** | **string** | 커버 이미지 URL | [default to undefined]
**visibility** | **string** | 공개 여부 | [optional] [default to undefined]
**likedDate** | **string** | 좋아요한 날짜 | [default to undefined]
**tags** | **Array&lt;string&gt;** |  | [default to undefined]

## Example

```typescript
import { GetMyCollections200Response2AllOfDataCollectionsInner } from './api';

const instance: GetMyCollections200Response2AllOfDataCollectionsInner = {
    collectionId,
    title,
    description,
    author,
    itemCount,
    likeCount,
    coverImageUrl,
    visibility,
    likedDate,
    tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
