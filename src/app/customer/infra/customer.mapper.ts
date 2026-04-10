import { CustomerEntity } from 'src/app/customer/infra/customer.entity';
import { Customer } from '../domain/customer';

export class CustomerMapper {
  static toDomain(entity: CustomerEntity): Customer {
    return new Customer(
      entity.id,
      entity.document,
      entity.fullName,
      entity.birthDate,
      entity.email,
      entity.phone,
      entity.active,
    );
  }
  static toPersistence(domain: Customer): CustomerEntity {
    const entity = new CustomerEntity();
    entity.id = domain.id!;
    entity.document = domain.document;
    entity.fullName = domain.fullName;
    entity.birthDate = domain.birthDate;
    entity.email = domain.email;
    entity.phone = domain.phone;
    entity.active = domain.active;
    return entity;
  }
}
