import { serializable, reference, identifier, object } from 'serializr';
import { FooStore } from './fooStore';

export class RootStore {
  @serializable(object(FooStore)) fooStore: FooStore;

  constructor() {
    this.fooStore = new FooStore(this);

    this.fooStore.init();
  }
}
