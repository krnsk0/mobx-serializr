import { serializable, reference, identifier, object } from 'serializr';
import { FooStore } from './fooStore';
import { nanoid } from 'nanoid';

export class RootStore {
  @serializable(identifier()) uuid = nanoid();
  @serializable(object(FooStore)) fooStore: FooStore;

  constructor() {
    this.fooStore = new FooStore(this);

    this.fooStore.init();
  }
}
