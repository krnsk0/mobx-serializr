import { serializable, reference, identifier, object } from 'serializr';
import { BarStore } from './barStore';
import { FooStore } from './fooStore';
import { nanoid } from 'nanoid';

export class RootStore {
  @serializable(identifier()) uuid = nanoid();
  @serializable(object(FooStore)) fooStore: FooStore;
  // @serializable(object(BarStore)) barStore: BarStore;

  constructor() {
    this.fooStore = new FooStore(this);
    // this.barStore = new BarStore(this);
  }
}
