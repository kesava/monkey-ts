export default class Stack {
  stack: number[];
  constructor(list: number[] = []) {
    this.stack = [];
    this.stack = this.stack.concat(list);
  }

  pop(): number {
    if (this.stack.length === 0) {
      throw new Error('Stack is empty');
    }
    return this.stack.pop() || 0; // TODO: fix this
  }

  push(elem: number) {
    this.stack.push(elem);
  }

  swap() {
    const temp1: number = this.pop();
    const temp2: number = this.pop();
    this.stack.push(temp1);
    this.stack.push(temp2);
  }

  add() {
    const temp1: number = this.pop();
    const temp2: number = this.pop();
    this.push(temp1 + temp2);
  }

  sub() {
    const temp1: number = this.pop();
    const temp2: number = this.pop();
    this.push(temp1 - temp2);
  }

  mul() {
    const temp1: number = this.pop();
    const temp2: number = this.pop();
    this.push(temp1 * temp2);
  }

  div() {
    const temp1: number = this.pop();
    const temp2: number = this.pop();
    this.push(temp1 / temp2);
  }

  get() {
    const temp1: number = this.pop();
    this.push(temp1);
    return temp1;
  }

  put(elem: number) {
    this.push(elem);
  }

  lt() {
    const temp1: number = this.pop();
    const temp2: number = this.pop();
    this.push(temp1 < temp2 ? 1 : 0);
  }

  gt() {
    const temp1: number = this.pop();
    const temp2: number = this.pop();
    this.push(temp1 > temp2 ? 1 : 0);
  }

}
