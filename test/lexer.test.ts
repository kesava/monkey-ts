import Lexer from '../src/lexer';
import { TokenType } from '../src/lexer-types';

describe("Basic one-liners", () => {
  it("should return the correct token type", () => {
    const lexer = new Lexer("+()==-*/;?=:");
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.PLUS, literal: '+' },
      { tokenType: TokenType.LPAREN, literal: '(' },
      { tokenType: TokenType.RPAREN, literal: ')' },
      { tokenType: TokenType.EQUALTO, literal: '==' },
      { tokenType: TokenType.MINUS, literal: '-' },
      { tokenType: TokenType.MUL, literal: '*' },
      { tokenType: TokenType.DIV, literal: '/' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.QUESTIONMARK, literal: '?' },
      { tokenType: TokenType.EQUAL, literal: '=' },
      { tokenType: TokenType.COLON, literal: ':' },
      { tokenType: TokenType.EOF, literal: '' },
    ]);
  });
  it("Simple assignment", () => {
    const lexer = new Lexer('let one = 1;');
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENTIFIER, literal: 'one' },
      { tokenType: TokenType.EQUAL, literal: '=' },
      { tokenType: TokenType.INTEGER, literal: '1' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.EOF, literal: '' },
    ]);
  });
  it("Simple expression", () => {
    const lexer = new Lexer('1 + 1;');
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.INTEGER, literal: '1' },
      { tokenType: TokenType.PLUS, literal: '+' },
      { tokenType: TokenType.INTEGER, literal: '1' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.EOF, literal: '' },
    ]);
  });
  it("Simple String", () => {
    const lexer = new Lexer('"hello world";');
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.STRING, literal: 'hello world' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.EOF, literal: '' },
    ]);
  });
});
