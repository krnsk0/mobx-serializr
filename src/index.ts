import { action, computed, makeAutoObservable, observable } from "mobx"

class RootStore {
  child1: ChildStoreOne
  child2: ChildStoreTwo

  constructor() {
    this.child1 = new ChildStoreOne(this)
    this.child2 = new ChildStoreTwo(this)
  }
}

class ChildStoreOne {
  root: RootStore
  counter: number = 0

  constructor(root: RootStore) {
    this.root = root

    makeAutoObservable(this, {
      counter: observable,
      counterTimesTen: computed,
      incrementCounter: action,
    })
  }
  get counterTimesTen() {
    return this.counter * 10
  }

  incrementCounter(): void {
    this.counter += 1
  }
}

class ChildStoreTwo {
  root: RootStore
  stringArray: string[] = ['a', 'b', 'c']

  constructor(root: RootStore) {
    this.root = root

    makeAutoObservable(this, {
      stringArray: observable,
    })
  }

  getOtherCounter() {
    return this.root.child1.counterTimesTen
  }
}


const root = new RootStore()
root.child1.incrementCounter()
console.log(`${root.child1.counterTimesTen} should be 10`)
console.log(`${root.child2.getOtherCounter()} should be 10`)
root.child1.incrementCounter()
console.log(`${root.child2.getOtherCounter()} should be 20`)
