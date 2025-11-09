# Notification


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | 알림 ID | [default to undefined]
**type** | **string** | 알림 유형 | [default to undefined]
**actor** | [**NotificationActor**](NotificationActor.md) |  | [default to undefined]
**entity** | [**NotificationEntity**](NotificationEntity.md) |  | [default to undefined]
**message** | **string** | 알림 메시지 | [default to undefined]
**isRead** | **boolean** | 읽음 여부 | [default to undefined]
**createdAt** | **string** | 알림 생성 시각 | [default to undefined]

## Example

```typescript
import { Notification } from './api';

const instance: Notification = {
    id,
    type,
    actor,
    entity,
    message,
    isRead,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
