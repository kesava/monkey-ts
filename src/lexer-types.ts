interface ILexer {
  input: string;
  currentPosition: number;
  currentChar: string;
}

enum TokenType {
  SUB,
  MUL,
  ADD,
  LT,
  GT,
  EQ,
  POP,
  SWAP,
  GET,
  PUT,
  PUSH,
  PRS,
  PRI,
  EXEC,
  PROGRAM,
  QUESTIONMARK,
  IDENTIFIER,
  INTEGER, // integer
  DIV, // /
  LPAREN, // (
  RPAREN, // )
  STRING, // "string"
  EOF, // end of file
}

interface Token {
  tokenType: TokenType;
  literal: string;
  position: number;
}

const Keywords = [
  {
    type: TokenType.PROGRAM,
    literal: 'postfix',
  },
  {
    type: TokenType.SUB,
    literal: 'sub',
  },
  {
    type: TokenType.MUL,
    literal: 'mul',
  },
  {
    type: TokenType.ADD,
    literal: 'add',
  },
  {
    type: TokenType.DIV,
    literal: 'div',
  },
  {
    type: TokenType.LT,
    literal: 'lt',
  },
  {
    type: TokenType.GT,
    literal: 'gt',
  },
  {
    type: TokenType.EQ,
    literal: 'eq',
  },
  {
    type: TokenType.POP,
    literal: 'pop',
  },
  {
    type: TokenType.SWAP,
    literal: 'swap',
  },
  {
    type: TokenType.GET,
    literal: 'get',
  },
  {
    type: TokenType.PUT,
    literal: 'put',
  },
  {
    type: TokenType.PUSH,
    literal: 'push',
  },
  {
    type: TokenType.PRS,
    literal: 'prs',
  },
  {
    type: TokenType.PRI,
    literal: 'pri',
  },
  {
    type: TokenType.EXEC,
    literal: 'exec',
  },
];

export { ILexer, TokenType, Token, Keywords };
