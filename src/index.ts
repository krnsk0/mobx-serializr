import { deserialize, serialize } from 'serializr';
import { RootStore } from './rootStore';

const root = new RootStore();
root.fooStore.incrementCounters();
root.fooStore.incrementCounters();
root.fooStore.incrementCounters();

const firstCounterSum = root.fooStore.counterSum;
console.assert(firstCounterSum === 9);

console.log('serializing...');
const json = serialize(RootStore, root);

console.log('deserializing...');
const deserialized = deserialize(
  RootStore,
  json,
  (err, user) => console.log('done'),
  //context object
  { rootStore: new RootStore() }
);

const secondCounterSum = deserialized.fooStore.counterSum;
console.assert(secondCounterSum === 9);
