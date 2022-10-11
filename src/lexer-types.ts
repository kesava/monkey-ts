interface ILexer {
  input: string;
  currentPosition: number;
  currentChar: string;
}

enum TokenType {
  LET, // let
  IDENTIFIER, // identifier
  FOR,
  IF,
  ELSE,
  FUNCTION,
  RETURN,
  QUESTIONMARK,
  COLON,
  INTEGER, // integer
  PLUS, // +
  MINUS, // -
  MUL, // *
  DIV, // /
  EQUAL, // =
  EQUALTO, // ==
  LPAREN, // (
  RPAREN, // )
  SEMICOLON, // ;
  STRING, // "string"
  EOF, // end of file
}

interface Token {
  tokenType: TokenType;
  literal: string;
}

const Keywords = [
  {
    type: TokenType.LET,
    literal: 'let',
  },
  {
    type: TokenType.IF,
    literal: 'if',
  },
  {
    type: TokenType.ELSE,
    literal: 'else',
  },
  {
    type: TokenType.FOR,
    literal: 'for',
  },
  {
    type: TokenType.FUNCTION,
    literal: 'function',
  },
  {
    type: TokenType.RETURN,
    literal: 'return',
  },
];

export { ILexer, TokenType, Token, Keywords };
