import { createModelSchema, primitive } from 'serializr';
import { RootStore } from './rootStore';
import { action, makeAutoObservable, observable } from 'mobx';
import { FooChild } from './fooChild';

export class Foo {
  root: RootStore;
  fooChild: FooChild;
  counter: number = 0;

  constructor(root: RootStore) {
    this.root = root;

    this.fooChild = new FooChild(root, this);

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
