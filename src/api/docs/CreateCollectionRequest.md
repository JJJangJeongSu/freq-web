# CreateCollectionRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **string** | 컬렉션 제목 | [default to undefined]
**description** | **string** | 컬렉션 소개글 | [default to undefined]
**isPublic** | **string** | 공개 여부 (public: 공개, private: 비공개) | [default to undefined]
**coverImageUrl** | **string** | 컬렉션 커버 이미지 URL | [default to undefined]
**items** | [**Array&lt;CollectionItemInput&gt;**](CollectionItemInput.md) | 초기 아이템 목록 (중복 제거됨) | [optional] [default to undefined]
**tags** | **Array&lt;string&gt;** | 컬렉션 태그 목록 | [optional] [default to undefined]

## Example

```typescript
import { CreateCollectionRequest } from './api';

const instance: CreateCollectionRequest = {
    title,
    description,
    isPublic,
    coverImageUrl,
    items,
    tags,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
