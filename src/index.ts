import { deserialize, serialize } from 'serializr';
import { RootStore } from './rootStore';

const root = new RootStore();

// set some Foo state and make an assertion about it
root.fooStore.incrementFooCounters();
root.fooStore.incrementFooCounters();
root.fooStore.incrementFooCounters();
const firstFooCounterSum = root.fooStore.fooCounterSum;
console.assert(firstFooCounterSum === 9);

// set some FooChild state and make an assertion about it
root.fooStore.incrementFooChildCounters();
const firstFooChildCounterSum = root.fooStore.fooChildCounterSum;
console.assert(firstFooChildCounterSum === 3);

// attempt to serialize the root
console.log('serializing...');
const json = serialize(RootStore, root);

// mess up state in the old Foo root
root.fooStore.incrementFooCounters();
root.fooStore.incrementFooCounters();
root.fooStore.incrementFooCounters();

// mess up state in Foochild
root.fooStore.incrementFooChildCounters();
root.fooStore.incrementFooChildCounters();

// attempt to deserialize
console.log('deserializing...');
const deserialized = deserialize<RootStore>(RootStore, json);

// check to see if state was preserved
const secondFooCounterSum = deserialized.fooStore.fooCounterSum;
console.assert(secondFooCounterSum === firstFooCounterSum);
const secondFooChildCounterSum = deserialized.fooStore.fooChildCounterSum;
console.assert(secondFooChildCounterSum === firstFooChildCounterSum);

// check to see if root in a foo is correct
console.assert(deserialized === deserialized.fooStore.foos[0].root);

// check to see if fooChild refers to fooParent
console.assert(
  deserialized.fooStore.foos[0] === deserialized.fooStore.foos[0].fooChild.foo
);

console.log('done');
