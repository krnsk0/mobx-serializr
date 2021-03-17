import { createModelSchema, reference, serializable } from 'serializr';
import { RootStore } from './rootStore';
import { action, makeAutoObservable, observable } from 'mobx';

export class Foo {
  root: RootStore;
  @serializable counter: number = 0;

  constructor(root: RootStore) {
    this.root = root;

    makeAutoObservable(this, {
      counter: observable,
      incrementCounter: action,
    });
  }

  incrementCounter(): void {
    this.counter += 1;
  }
}

createModelSchema(Foo, { counter: true }, (context) => {
  return new Foo(context.args.rootStore);
});
