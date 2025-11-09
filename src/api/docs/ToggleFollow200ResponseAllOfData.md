# ToggleFollow200ResponseAllOfData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**action** | **string** | 수행된 동작 | [default to undefined]
**followerId** | **number** | 팔로우를 수행한 사용자 ID | [default to undefined]
**followingId** | **number** | 팔로우 대상 사용자 ID | [default to undefined]
**createdAt** | **string** | 팔로우 생성 시각 (FOLLOWED일 때만 존재) | [optional] [default to undefined]

## Example

```typescript
import { ToggleFollow200ResponseAllOfData } from './api';

const instance: ToggleFollow200ResponseAllOfData = {
    action,
    followerId,
    followingId,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
