import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { HashStringService } from '../../common/services/hash-string';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UsersEntity> {
  constructor(
    connection: Connection,
    private readonly hashStringService: HashStringService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UsersEntity;
  }

  async beforeInsert(event: InsertEvent<UsersEntity>) {
    event.entity.password = await this.hashStringService.hashPassword(
      event.entity.password,
    );
  }

  async beforeUpdate(event: UpdateEvent<UsersEntity>) {
    if (event.databaseEntity.password !== event.entity.password) {
      event.entity.password = await this.hashStringService.hashPassword(
        event.entity.password,
      );
    }
  }
}
