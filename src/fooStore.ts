import { list, object, reference, serializable } from 'serializr';
import { Foo } from './foo';
import { RootStore } from './rootStore';
import { action, computed, makeAutoObservable, observable } from 'mobx';

export class FooStore {
  root: RootStore;

  @serializable(list(object(Foo))) foos: Foo[] = [];

  constructor(root: RootStore) {
    this.root = root;

    makeAutoObservable(this, {
      counterSum: computed,
      incrementCounters: action,
    });
  }

  init(): void {
    Array.from({ length: 3 }).forEach(() => {
      this.foos.push(new Foo(this.root));
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
