# CreateCollection200ResponseAllOfData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**collectionId** | **number** | 컬렉션 ID | [default to undefined]
**title** | **string** | 컬렉션 제목 | [default to undefined]
**author** | [**UserPreview**](UserPreview.md) |  | [default to undefined]
**description** | **string** | 컬렉션 설명 | [default to undefined]
**createdAt** | **string** | 생성일시 | [default to undefined]
**updatedAt** | **string** | 수정일시 | [optional] [default to undefined]
**coverImgUrl** | **string** | 커버 이미지 URL | [default to undefined]
**tags** | **Array&lt;string&gt;** | 태그 목록 | [default to undefined]
**commentCount** | **number** | 댓글 개수 | [default to undefined]
**likeCount** | **number** | 좋아요 개수 | [default to undefined]
**isLiked** | **boolean** | 현재 사용자의 좋아요 여부 (로그인 시에만) | [optional] [default to undefined]
**items** | [**Array&lt;CollectionItem&gt;**](CollectionItem.md) | 컬렉션에 포함된 모든 아이템 | [default to undefined]
**comments** | [**Array&lt;Comment&gt;**](Comment.md) | 최근 댓글 (최대 3개) | [default to undefined]
**isPublic** | **string** | 공개 여부 | [optional] [default to undefined]

## Example

```typescript
import { CreateCollection200ResponseAllOfData } from './api';

const instance: CreateCollection200ResponseAllOfData = {
    collectionId,
    title,
    author,
    description,
    createdAt,
    updatedAt,
    coverImgUrl,
    tags,
    commentCount,
    likeCount,
    isLiked,
    items,
    comments,
    isPublic,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
