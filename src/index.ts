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
const deserialized = deserialize<RootStore>(RootStore, json);

// check to see if state was preserved
const secondCounterSum = deserialized.fooStore.counterSum;
console.assert(secondCounterSum === firstCounterSum);

// check to see if root in a foo is correct
console.assert(deserialized === deserialized.fooStore.foos[0].root);

// check to see if fooChild refers to fooParent
console.assert(
  deserialized.fooStore.foos[0] === deserialized.fooStore.foos[0].fooChild.foo
);

console.log('done');
