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

// attempt to deserialize
console.log('deserializing...');
const deserialized = deserialize(
  RootStore,
  json,
  (err) => {
    if (err) console.error(err);
  },
  //context object
  { rootStore: new RootStore() }
);

// check to see if state was preserved
const secondCounterSum = deserialized.fooStore.counterSum;
console.assert(secondCounterSum === 9);

// check each foo's reference to root
console.log(deserialized.uuid);
console.log(deserialized.fooStore.foos[0].root.uuid);
