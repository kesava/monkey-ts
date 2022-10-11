import {ILexer, TokenType, Token, Keywords} from './lexer-types';
export default class Lexer {
  private lexer: ILexer;
  private lengthOfInput: number;

  constructor(input: string) {
    this.lexer = {
      input,
      currentPosition: 0,
      currentChar: '',
    };
    this.lengthOfInput = input.length;
  }

  private consumeChar() {
    this.lexer.currentPosition = this.lexer.currentPosition + 1;
  }

  private getCurrentChar() {
    return this.lexer.input[this.lexer.currentPosition];
  }

  private peekNextChar(): string {
    if (this.lexer.currentPosition < this.lengthOfInput) {
      return this.lexer.input[this.lexer.currentPosition + 1];
    } else {
      return '';
    }
  }

  private nextToken(): Token {
    while (this.lexer.currentPosition < this.lengthOfInput) {
      this.lexer.currentChar = this.getCurrentChar();
      // console.log({ currentChar: this.lexer.currentChar });
      switch (this.lexer.currentChar) {
        // consume whitespace
        case ' ':
        case '\t':
        case '\n':
        case '\r':
          this.consumeChar();
          break;
        case '+':
          this.consumeChar();
          return {
            tokenType: TokenType.PLUS,
            literal: '+',
          };
        case '-':
          this.consumeChar();
          return {
            tokenType: TokenType.MINUS,
            literal: '-',
          };
        case '*':
          this.consumeChar();
          return {
            tokenType: TokenType.MUL,
            literal: '*',
          };
        case '(':
          this.consumeChar();
          return {
            tokenType: TokenType.LPAREN,
            literal: '(',
          };
        case ')':
          this.consumeChar();
          return {
            tokenType: TokenType.RPAREN,
            literal: ')',
          };
        case '/':
          this.consumeChar();
          return {
            tokenType: TokenType.DIV,
            literal: '/',
          };
        case ';':
          this.consumeChar();
          return {
            tokenType: TokenType.SEMICOLON,
            literal: ';',
          };
        case ':':
          this.consumeChar();
          return {
            tokenType: TokenType.COLON,
            literal: ':',
          };
        case '?':
          this.consumeChar();
          return {
            tokenType: TokenType.QUESTIONMARK,
            literal: '?',
          };
        case '=':
          if (this.peekNextChar() === '=') {
            this.consumeChar(); // consume the first =
            this.consumeChar(); // consume the second =
            return {
              tokenType: TokenType.EQUALTO,
              literal: '==',
            }
          } else {
            this.consumeChar(); // consume the =
            return {
              tokenType: TokenType.EQUAL,
              literal: '=',
            };
          }
        case '"':
          this.consumeChar(); // consume the opening "
          const str = this.consumeString();
          return {
            tokenType: TokenType.STRING,
            literal: str,
          };
        default:
          if (this.isDigit(this.lexer.currentChar)) {
            return {
              tokenType: TokenType.INTEGER,
              literal: this.consumeNumeric(),
            };
          } else {
            const iden = this.consumeIdentifier();
            return {
              literal: iden,
              tokenType: Keywords.filter(kv => (kv.literal === iden)).length > 0 ? Keywords.filter(kv => (kv.literal === iden))[0].type : TokenType.IDENTIFIER,
            }
          }
      }
    }
    return {
      tokenType: TokenType.EOF,
      literal: '',
    };
  }

  public tokens(): Token[] {
    const output: Token[] = [];

    while (true) {
      const nextToken = this.nextToken();
      output.push(nextToken);
      if (nextToken.tokenType === TokenType.EOF) {
        break;
      }
    }
    return output;
  }

  private isDigit(char: string) {
    if (char >= '0' && char <= '9') {
      return true;
    }
    return false;
  }

  private isLetter(char: string) {
    if (char >= 'a' && char <= 'z') {
      return true;
    } else if (char >= 'A' && char <= 'Z') {
      return true;
    } else {
      return false;
    }
  }

  private isIdentifierChar(char: string) {
    if (this.isLetter(char) || this.isDigit(char) || (char === '_') || (char === '?')) {
      return true;
    }
  }

  private consumeNumeric(): string {
    let output = '';
    let currentChar = this.getCurrentChar();
    while(this.isDigit(currentChar)) {
      output += currentChar;
      this.consumeChar();
      currentChar = this.getCurrentChar();
    }
    return output;
  }

  private consumeIdentifier(): string {
    let output = '';
    let currentChar = this.getCurrentChar();
    while(this.isIdentifierChar(currentChar)) {
      output += currentChar;
      this.consumeChar();
      currentChar = this.getCurrentChar();
    }
    return output;
  }

  private consumeString(): string {
    let output = '';
    let currentChar = this.getCurrentChar();
    while(currentChar !== '"') {
      output += currentChar;
      this.consumeChar();
      currentChar = this.getCurrentChar();
    }
    this.consumeChar(); // consume the closing "
    return output;
  }
}


