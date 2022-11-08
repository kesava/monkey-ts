import { Node, NodeType, ProgramNode } from "./ast-types";
import Stack from './stack';
import Lexer from "./lexer";
import Parser from "./parser";
import { Token } from "./lexer-types";

export default class Interpreter {
  private astTree: ProgramNode;
  private stack: Stack;
  private lexer: Lexer;
  private tokens: Token[];
  private parser: Parser

  constructor(input: string, stackArgs: number[] = []) {
    this.lexer = new Lexer(input);
    this.tokens = this.lexer.tokens();
    this.parser = new Parser(this.tokens);
    this.astTree = this.parser.parseProgram();
    this.stack = new Stack(stackArgs);
  }

  private evalNode(node: Node|ProgramNode) {
    switch (node.nodeType) {
      case NodeType.PROGRAM:
        for (const child of node.args) {
          this.evalNode(child);
        }
        break;
      case NodeType.INT_LITERAL:
        this.stack.push(parseInt(node.tokenLiteral, 10));
        break;
      case NodeType.ADD_STMT:
        this.stack.add();
        break;
      case NodeType.SUB_STMT:
        this.stack.sub();
        break;
      case NodeType.MUL_STMT:
        this.stack.mul();
        break;
      case NodeType.DIV_STMT:
        this.stack.div();
        break;
      case NodeType.SWAP_STMT:
        this.stack.swap();
        break;
      case NodeType.PUT_STMT:
        this.stack.put(this.stack.get());
        break;
      case NodeType.GET_STMT:
        this.stack.get();
        break;
      default:
        throw new Error(`Invalid node type: ${node.nodeType}`);
    }

    return this.stack.get();
  }

  eval(astTree: ProgramNode = this.astTree): number {
    return this.evalNode(astTree);
  }

}
