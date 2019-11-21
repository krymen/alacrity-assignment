import { Value, ValueId, ValueRepository, WildcardId } from '../../model/Value';

export class InMemoryValueRepository implements ValueRepository {
  private items: Map<ValueId, Value>;

  constructor() {
    this.items = new Map();
  }

  public async save(item: Value): Promise<Value> {
    this.items.set(item.id, item);

    return item;
  }

  public async find(id: ValueId | WildcardId): Promise<Value[]> {
    return (await this.all()).filter(value => value.id === id);
  }

  public async all(): Promise<Value[]> {
    return [...this.items.values()];
  }
}
