import { createModelSchema, primitive } from 'serializr';
import { RootStore } from './rootStore';
import { action, makeAutoObservable, observable } from 'mobx';
import { Foo } from './foo';

export class FooChild {
  root: RootStore;
  foo: Foo;
  counter: number = 0;

  constructor(root: RootStore, foo: Foo) {
    this.root = root;
    this.foo = foo;

    makeAutoObservable(this, {
      counter: observable,
      incrementCounter: action,
    });
  }
  incrementCounter(): void {
    this.counter += 1;
  }
}

createModelSchema<FooChild>(FooChild, { counter: primitive() }, (context) => {
  return new FooChild(
    context.rootContext.target,
    (<{ target: Foo }>context.parentContext).target
  );
});
