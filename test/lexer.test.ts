import Lexer from '../src/lexer';
import { TokenType } from '../src/lexer-types';

describe("Basic one-liners", () => {
  it("should return the correct token type", () => {
    const lexer = new Lexer("(postfix sub mul div add lt gt swap pop)");
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.LPAREN, literal: '(', position: 0 },
      { tokenType: TokenType.PROGRAM, literal: 'postfix', position: 1 },
      { tokenType: TokenType.SUB, literal: 'sub', position: 9 },
      { tokenType: TokenType.MUL, literal: 'mul', position: 13 },
      { tokenType: TokenType.DIV, literal: 'div', position: 17 },
      { tokenType: TokenType.ADD, literal: 'add', position: 21 },
      { tokenType: TokenType.LT, literal: 'lt', position: 25 },
      { tokenType: TokenType.GT, literal: 'gt', position: 28 },
      { tokenType: TokenType.SWAP, literal: 'swap', position: 31 },
      { tokenType: TokenType.POP, literal: 'pop', position: 36 },
      { tokenType: TokenType.RPAREN, literal: ')', position: 39 },
      { tokenType: TokenType.EOF, literal: '', position: 40 },
    ]);
  });
  it("Simple assignment", () => {
    const lexer = new Lexer('(1 22 "hello")');
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.LPAREN, literal: '(', position: 0 },
      { tokenType: TokenType.INTEGER, literal: '1', position: 1 },
      { tokenType: TokenType.INTEGER, literal: '22', position: 3 },
      { tokenType: TokenType.STRING, literal: 'hello', position: 6 },
      { tokenType: TokenType.RPAREN, literal: ')', position: 13 },
      { tokenType: TokenType.EOF, literal: '', position: 14 },
    ]);
  });

  it("Unknow token", () => {
    const lexer = new Lexer('(1 22 "hello")');
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.LPAREN, literal: '(', position: 0 },
      { tokenType: TokenType.INTEGER, literal: '1', position: 1 },
      { tokenType: TokenType.INTEGER, literal: '22', position: 3 },
      { tokenType: TokenType.STRING, literal: 'hello', position: 6 },
      { tokenType: TokenType.RPAREN, literal: ')', position: 13 },
      { tokenType: TokenType.EOF, literal: '', position: 14 },
    ]);
  });

  it("Nested token", () => {
    const lexer = new Lexer('(1 (22 "hello"))');
    expect(lexer.tokens()).toEqual([
      { tokenType: TokenType.LPAREN, literal: '(', position: 0 },
      { tokenType: TokenType.INTEGER, literal: '1', position: 1 },
      { tokenType: TokenType.LPAREN, literal: '(', position: 3 },
      { tokenType: TokenType.INTEGER, literal: '22', position: 4 },
      { tokenType: TokenType.STRING, literal: 'hello', position: 7 },
      { tokenType: TokenType.RPAREN, literal: ')', position: 14 },
      { tokenType: TokenType.RPAREN, literal: ')', position: 15 },
      { tokenType: TokenType.EOF, literal: '', position: 16 },
    ]);
  });
});
