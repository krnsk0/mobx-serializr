import { object, createModelSchema } from 'serializr';
import { FooStore } from './fooStore';

export class RootStore {
  fooStore: FooStore;

  constructor() {
    this.fooStore = new FooStore(this);
  }
}

createModelSchema<RootStore>(RootStore, { fooStore: object(FooStore) });
