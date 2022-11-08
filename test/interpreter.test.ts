import Interpreter from '../src/interpreter';
import Stack from '../src/stack';

describe("Simple eval", () => {
  it("Simple add", () => {
    const interpreter = new Interpreter('(postfix 2 add)', [1, 2]);
    expect(interpreter.eval()).toBe(3);
  });
  it("Simple sub", () => {
    const interpreter = new Interpreter('(postfix 2 sub)', [1, 2]);
    expect(interpreter.eval()).toBe(1);
  });
  it("Simple mul", () => {
    const interpreter = new Interpreter('(postfix 2 mul)', [4, 2]);
    expect(interpreter.eval()).toBe(8);
  });
  it("Simple div", () => {
    const interpreter = new Interpreter('(postfix 2 div)', [2, 4]);
    expect(interpreter.eval()).toBe(2);
  });
});

describe("two operations", () => {
  it("add sub", () => {
    const interpreter = new Interpreter('(postfix 2 add sub)', [1, 2, 4]);
    expect(interpreter.eval()).toBe(5);
  });
  xit("sub add", () => {
    const interpreter = new Interpreter('(postfix 2 sub add)', [1, 2, 4]);
    expect(interpreter.eval()).toBe(1);
  });
  it("mul add", () => {
    const interpreter = new Interpreter('(postfix 2 mul div)', [2, 4, 5]);
    expect(interpreter.eval()).toBe(10);
  });
});
