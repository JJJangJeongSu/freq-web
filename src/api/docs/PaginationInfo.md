# PaginationInfo


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**currentPage** | **number** | 현재 페이지 번호 | [default to undefined]
**totalPages** | **number** | 전체 페이지 수 | [default to undefined]
**totalItems** | **number** | 전체 항목 수 | [default to undefined]
**itemsPerPage** | **number** | 페이지당 항목 수 | [default to undefined]
**hasNext** | **boolean** | 다음 페이지 존재 여부 | [default to undefined]
**hasPrevious** | **boolean** | 이전 페이지 존재 여부 | [default to undefined]

## Example

```typescript
import { PaginationInfo } from './api';

const instance: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNext,
    hasPrevious,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
