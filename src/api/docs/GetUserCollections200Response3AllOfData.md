# GetUserCollections200Response3AllOfData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**recommandedCollections** | **Array&lt;string&gt;** | 사용자 취향 맞춤 컬렉션 | [default to undefined]
**popularReviews** | [**Array&lt;ReviewSummary&gt;**](ReviewSummary.md) | 인기 많은 리뷰(단위시간) | [default to undefined]
**recentReviews** | [**Array&lt;ReviewSummary&gt;**](ReviewSummary.md) | 최신 리뷰 | [default to undefined]

## Example

```typescript
import { GetUserCollections200Response3AllOfData } from './api';

const instance: GetUserCollections200Response3AllOfData = {
    recommandedCollections,
    popularReviews,
    recentReviews,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
