import { deserialize, serialize } from 'serializr';
import { RootStore } from './rootStore';

const root = new RootStore();

// set some state and make an assertion about it
root.fooStore.incrementCounters();
root.fooStore.incrementCounters();
root.fooStore.incrementCounters();
const firstCounterSum = root.fooStore.counterSum;
console.assert(firstCounterSum === 9);

// attempt to serialize the root
console.log('serializing...');
const json = serialize(RootStore, root);

// mess up state in the old root
root.fooStore.incrementCounters();
root.fooStore.incrementCounters();
root.fooStore.incrementCounters();

// attempt to deserialize
console.log('deserializing...');
const deserialized = deserialize<RootStore>(
  RootStore,
  json,
  (err) => {
    if (err) console.error(err);
  },
  //context object
  { rootStore: root }
);

// check to see if state was preserved
const secondCounterSum = deserialized.fooStore.counterSum;
console.assert(secondCounterSum === firstCounterSum);

// check a foo's reference to root
console.assert(deserialized.uuid === deserialized.fooStore.foos[0].root.uuid);

// for some reason this fails
// console.assert(deserialized === deserialized.fooStore.foos[0].root);
