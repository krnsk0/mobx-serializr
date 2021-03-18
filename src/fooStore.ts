import { createModelSchema, list, object } from 'serializr';
import { Foo } from './foo';
import { RootStore } from './rootStore';
import { action, computed, makeAutoObservable, observable } from 'mobx';

export class FooStore {
  root: RootStore;
  foos: Foo[] = [];

  constructor(root: RootStore) {
    this.root = root;

    Array.from({ length: 3 }).forEach(() => {
      this.foos.push(new Foo(this.root));
    });

    makeAutoObservable(this, {
      counterSum: computed,
      incrementCounters: action,
      foos: observable,
    });
  }

  get counterSum(): number {
    console.log('computing counterSum in fooStore');
    return this.foos.reduce((acc, foo) => acc + foo.counter, 0);
  }

  incrementCounters(): void {
    this.foos.forEach((foo) => foo.incrementCounter());
  }
}

createModelSchema<FooStore>(
  FooStore,
  { foos: list(object(Foo)) },
  (context) => {
    return new FooStore(context.rootContext.target);
  }
);
