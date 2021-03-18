import { createModelSchema, primitive } from 'serializr';
import { RootStore } from './rootStore';
import { action, makeAutoObservable, observable } from 'mobx';

export class Foo {
  root: RootStore;
  counter: number = 0;

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

createModelSchema<Foo>(Foo, { counter: primitive() }, (context) => {
  return new Foo(context.rootContext.target);
});
