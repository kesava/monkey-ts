import Lexer from "./lexer";
import { Token, TokenType } from "./lexer-types";
import { IParser, Node, NodeType, ProgramNode, validNodeTypes } from "./ast-types";

export default class Parser {
  private parser: IParser;
  private lengthOfTokens: number;

  constructor(tokens: Token[]) {
    this.parser = {
      input: tokens,
      currentPosition: 0,
    };
    this.lengthOfTokens = tokens.length;
    // console.log({ fsf: this.parser, gg: this.lengthOfTokens });
  }

  private consumeToken() {
    this.parser.currentPosition = this.parser.currentPosition + 1;
  }

  private peekToken() {
    if (this.parser.currentPosition < this.lengthOfTokens) {
      return this.parser.input[this.parser.currentPosition + 1];
    } else {
      return {
        tokenType: TokenType.EOF,
        literal: "",
      };
    }
  }

  private match(...tokenTypes: TokenType[]) {
    // console.log('Matching: ', tokenTypes)
    for (const tokenType of tokenTypes) {
      if (this.parser.input[this.parser.currentPosition].tokenType === tokenType) {
        // console.log('Found a match: ', this.parser.input[this.parser.currentPosition].literal);
        return true;
      }
    }
    // console.log('No match');
    return false;
  }

  private matchAndConsume(...tokenTypes: TokenType[]) {
    if (this.match(...tokenTypes)) {
      return this.parser.input[this.parser.currentPosition++];
    }
    return false;
  }

  private matchAndReturn(...tokenTypes: TokenType[]) {
    if (this.match(...tokenTypes)) {
      return this.parser.input[this.parser.currentPosition];
    }
    return false;
  }

  private peekMatch(...tokenTypes: TokenType[]) {
    for (const tokenType of tokenTypes) {
      if (this.peekToken().tokenType === tokenType) {
        return true;
      }
    }
    return false;
  }

  public parseProgram(): ProgramNode {
    const pNode: ProgramNode = {
      tokenLiteral: 'postfix',
      args: [],
      nodeType: NodeType.PROGRAM,
      numberOfParams: 0,
    };
    // console.log({ ff: JSON.stringify(this.parser) });
    let index = 0;
    debugger;
    if (this.matchAndConsume(TokenType.LPAREN)) {
      while (!this.matchAndConsume(TokenType.RPAREN) && !this.matchAndConsume(TokenType.EOF)) {
        // console.log({ curr: this.parser.input[this.parser.currentPosition] });
        if (index === 0) {
          this.matchAndConsume(TokenType.PROGRAM);
        } else if (index === 1) {
          const paramsToken = this.matchAndConsume(TokenType.INTEGER);
          if (paramsToken) pNode.numberOfParams = parseInt(paramsToken.literal, 10);
        } else {
          pNode.args.push(this.atom());
        }
        index = index + 1;
      }
    }
    this.matchAndConsume(TokenType.EOF);
    return pNode;
  }

  private findNodeType(tokenType: TokenType) {
    const m = validNodeTypes.find(nt => nt.tokenType === tokenType);
    if (m) return m.nodeType;
    throw new Error(`Not a valid token type: ${tokenType} at ${this.parser.input[this.parser.currentPosition].position}`);
    return NodeType.PROGRAM;
  }

  private atom(): Node {
    const node: Node = {
      nodeType: NodeType.PROGRAM,
      tokenLiteral: this.parser.input[this.parser.currentPosition].literal,
      args: [],
      position: this.parser.input[this.parser.currentPosition].position,
    };
    const outputFn = () => {
      switch (true) {
        case (this.match(TokenType.INTEGER)):
          node.nodeType = NodeType.INT_LITERAL;
          return node;
        case (this.match(TokenType.STRING)):
          node.nodeType = NodeType.STRING_LITERAL;
          return node;
        case (this.match(TokenType.LPAREN)):
          node.tokenLiteral = 'SEQ';
          node.nodeType = NodeType.SEQUENCE_STMT;
          this.consumeToken(); // consume the LPAREN
          while (!this.match(TokenType.RPAREN) && !this.match(TokenType.EOF)) {
            node.args.push(this.atom());
          }
          return node;
        default:
          const mToken = this.matchAndReturn.apply(this, validNodeTypes.map(nt => nt.tokenType));
          if (mToken) {
            node.nodeType = this.findNodeType(mToken.tokenType);
            return node;
          }
          throw new Error(`Not a valid token: ${node.tokenLiteral} at ${node.position}`);
          return node;
     };
    }
    const output: Node = outputFn();
    this.consumeToken();
    return output;
  }
}
