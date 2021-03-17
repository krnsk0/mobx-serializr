
import { RootStore } from "./rootStore"

const root = new RootStore()
root.fooStore.incrementCounter()
console.log(`${root.fooStore.counterTimesTen} should be 10`)
console.log(`${root.barStore.getOtherCounter()} should be 10`)
root.fooStore.incrementCounter()
console.log(`${root.barStore.getOtherCounter()} should be 20`)
