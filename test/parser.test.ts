import Parser from '../src/parser';
import { NodeType } from '../src/ast-types';
import Lexer from '../src/lexer';

describe('Basic one-liners', () => {


  it('should return the correct token type', () => {
    const input = '(postfix 3 sub mul)';
    const tokens = new Lexer(input).tokens();
    const parser = new Parser(tokens);
    const program = parser.parseProgram();

    expect(program).toEqual({
      nodeType: NodeType.PROGRAM,
      tokenLiteral: 'postfix',
      args: [
        {
          nodeType: NodeType.SUB_STMT,
          tokenLiteral: 'sub',
          args: [],
          position: 11,
        },
        {
          nodeType: NodeType.MUL_STMT,
          tokenLiteral: 'mul',
          args: [],
          position: 15,
        },
      ],
      numberOfParams: 3,
    });
  });

  it('missing number of parameters', () => {
    const input = '(postfix sub mul)';
    const tokens = new Lexer(input).tokens();
    const parser = new Parser(tokens);
    const program = parser.parseProgram();

    // expect(program).toThrow('Expecting number of parameters');
  });

  it('longer single line', () => {
    const input = '(postfix 13 sub mul add div pri prs lt gt eq swap pop push "hello" 33)';
    const tokens = new Lexer(input).tokens();
    const parser = new Parser(tokens);
    const program = parser.parseProgram();

    expect(program).toEqual({
      nodeType: NodeType.PROGRAM,
      tokenLiteral: 'postfix',
      args: [
        {
          nodeType: NodeType.SUB_STMT,
          tokenLiteral: 'sub',
          args: [],
          position: 12,
        },
        {
          nodeType: NodeType.MUL_STMT,
          tokenLiteral: 'mul',
          args: [],
          position: 16,
        },
        {
          nodeType: NodeType.ADD_STMT,
          tokenLiteral: 'add',
          args: [],
          position: 20,
        },
        {
          nodeType: NodeType.DIV_STMT,
          tokenLiteral: 'div',
          args: [],
          position: 24,
        },
        {
          nodeType: NodeType.PRI_STMT,
          tokenLiteral: 'pri',
          args: [],
          position: 28,
        },
        {
          nodeType: NodeType.PRS_STMT,
          tokenLiteral: 'prs',
          args: [],
          position: 32,
        },
        {
          nodeType: NodeType.LT_STMT,
          tokenLiteral: 'lt',
          args: [],
          position: 36,
        },
        {
          nodeType: NodeType.GT_STMT,
          tokenLiteral: 'gt',
          args: [],
          position: 39,
        },
        {
          nodeType: NodeType.EQ_STMT,
          tokenLiteral: 'eq',
          args: [],
          position: 42,
        },
        {
          nodeType: NodeType.SWAP_STMT,
          tokenLiteral: 'swap',
          args: [],
          position: 45,
        },
        {
          nodeType: NodeType.POP_STMT,
          tokenLiteral: 'pop',
          args: [],
          position: 50,
        },
        {
          nodeType: NodeType.PUSH_STMT,
          tokenLiteral: 'push',
          args: [],
          position: 54,
        },
        {
          nodeType: NodeType.STRING_LITERAL,
          tokenLiteral: 'hello',
          args: [],
          position: 59,
        },
        {
          nodeType: NodeType.INT_LITERAL,
          tokenLiteral: '33',
          args: [],
          position: 67,
        },
      ],
      numberOfParams: 13,
    });
  });

  it('with an exec statement', () => {
    const input = '(postfix 1 push (2 add exec))';
    const tokens = new Lexer(input).tokens();
    const parser = new Parser(tokens);
    const program = parser.parseProgram();

    expect(program).toEqual({
      nodeType: NodeType.PROGRAM,
      tokenLiteral: 'postfix',
      args: [
        {
          nodeType: NodeType.PUSH_STMT,
          tokenLiteral: 'push',
          args: [],
          position: 11,
        },
        {
          nodeType: NodeType.SEQUENCE_STMT,
          tokenLiteral: 'SEQ',
          args: [
            {
              nodeType: NodeType.INT_LITERAL,
              tokenLiteral: '2',
              args: [],
              position: 17,
            },
            {
              nodeType: NodeType.ADD_STMT,
              tokenLiteral: 'add',
              args: [],
              position: 19,
            },
            {
              nodeType: NodeType.EXEC_STMT,
              tokenLiteral: 'exec',
              args: [],
              position: 23,
            }
          ],
          position: 16,
        },
      ],
      numberOfParams: 1,
    });
  });
});
