# CollectionItem


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | 아이템 ID | [default to undefined]
**type** | **string** | 아이템 타입 | [default to undefined]
**title** | **string** | 제목 | [default to undefined]
**artists** | **Array&lt;string&gt;** | 아티스트 목록 | [optional] [default to undefined]
**coverUrl** | **string** | 커버 이미지 URL | [default to undefined]
**rating** | **number** | 평균 평점 | [default to undefined]
**description** | **string** | 컬렉션 생성자가 작성한 아이템 설명 | [optional] [default to undefined]

## Example

```typescript
import { CollectionItem } from './api';

const instance: CollectionItem = {
    id,
    type,
    title,
    artists,
    coverUrl,
    rating,
    description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
