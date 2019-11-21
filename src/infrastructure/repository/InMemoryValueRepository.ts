import { Value, ValueId, ValueRepository } from '../../model/Value';

export class InMemoryValueRepository implements ValueRepository {
  private items: Map<ValueId, Value>;

  constructor() {
    this.items = new Map();
  }

  public async save(item: Value): Promise<Value> {
    this.items.set(item.id, item);

    return item;
  }

  public async all(): Promise<Value[]> {
    return [...this.items.values()];
  }
}
