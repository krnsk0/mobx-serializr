import { reference, serializable } from 'serializr';
import { RootStore } from './rootStore';
import { action, computed, makeAutoObservable, observable } from 'mobx';

export class Bar {
  @serializable(reference(RootStore)) root: RootStore;

  constructor(root: RootStore) {
    this.root = root;

    makeAutoObservable(this, {
      fooCounterSum: computed,
    });
  }

  get fooCounterSum(): number {
    console.log('computing fooCounterSum in Bar');
    // return this.root.fooStore.counterSum
  }
}
