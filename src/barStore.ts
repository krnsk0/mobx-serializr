import { list, object, reference, serializable } from 'serializr';
import { Bar } from './bar';
import { RootStore } from './rootStore';

export class BarStore {
  root: RootStore;
  @serializable(list(object(Bar))) bars: Bar[] = [];

  constructor(root: RootStore) {
    this.root = root;
  }
}
