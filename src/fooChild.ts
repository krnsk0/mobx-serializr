import { createModelSchema, primitive } from 'serializr';
import { RootStore } from './rootStore';
import { action, makeAutoObservable, observable } from 'mobx';
import { Foo } from './foo';

export class FooChild {
  root: RootStore;
  foo: Foo;

  constructor(root: RootStore, foo: Foo) {
    this.root = root;
    this.foo = foo;

    makeAutoObservable(this, {});
  }
}

createModelSchema<FooChild>(FooChild, {}, (context) => {
  return new FooChild(
    context.rootContext.target,
    (<{ target: Foo }>context.parentContext).target
  );
});
