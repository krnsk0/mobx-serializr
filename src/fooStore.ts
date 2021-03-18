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
      fooCounterSum: computed,
      incrementFooCounters: action,
      foos: observable,
    });
  }

  get fooCounterSum(): number {
    console.log('computing fooCounterSum in fooStore');
    return this.foos.reduce((acc, foo) => acc + foo.counter, 0);
  }

  get fooChildCounterSum(): number {
    console.log('computing fooChildCounterSum in fooStore');
    return this.foos.reduce((acc, foo) => acc + foo.fooChild.counter, 0);
  }

  incrementFooCounters(): void {
    this.foos.forEach((foo) => foo.incrementCounter());
  }

  incrementFooChildCounters(): void {
    this.foos.forEach((foo) => foo.fooChild.incrementCounter());
  }
}

createModelSchema<FooStore>(
  FooStore,
  { foos: list(object(Foo)) },
  (context) => {
    return new FooStore(context.rootContext.target);
  }
);
