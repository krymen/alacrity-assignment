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
    const regexp = wildcardToRegExp(id);

    return (await this.all()).filter(value => regexp.test(value.id));
  }

  public async all(): Promise<Value[]> {
    return [...this.items.values()];
  }
}

// By https://gist.github.com/donmccurdy/6d073ce2c6f3951312dfa45da14a420f
const wildcardToRegExp = (s: string) => new RegExp('^' + s.split(/\*+/).map(regExpEscape).join('.*') + '$');
const regExpEscape = (s: string) => s.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
