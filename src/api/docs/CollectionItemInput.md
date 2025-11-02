# CollectionItemInput


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **number** | 아이템 타입 | [default to undefined]
**id** | **string** | 아이템 ID (Spotify ID) | [default to undefined]
**title** | **string** | 아이템에 대한 제목 | [default to undefined]
**description** | **string** | 아이템에 대한 설명 (선택사항) | [optional] [default to undefined]
**coverUrl** | **string** | 아이템에 대한 커버 이미지 경로 | [default to undefined]
**artists** | **Array&lt;string&gt;** | 부른 가수 리스트 | [default to undefined]

## Example

```typescript
import { CollectionItemInput } from './api';

const instance: CollectionItemInput = {
    type,
    id,
    title,
    description,
    coverUrl,
    artists,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
