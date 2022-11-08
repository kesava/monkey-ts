import { Token, TokenType } from "./lexer-types";

enum NodeType {
  PROGRAM,
  EXEC_STMT,
  SEQUENCE_STMT,
  PUSH_STMT,
  POP_STMT,
  SWAP_STMT,
  GET_STMT,
  PUT_STMT,
  PRS_STMT,
  PRI_STMT,
  ADD_STMT,
  SUB_STMT,
  MUL_STMT,
  DIV_STMT,
  LT_STMT,
  GT_STMT,
  EQ_STMT,
  INT_LITERAL,
  STRING_LITERAL,
}

const validNodeTypes = [
  {
    nodeType: NodeType.EXEC_STMT,
    tokenType: TokenType.EXEC,
  },
  {
    nodeType: NodeType.PUSH_STMT,
    tokenType: TokenType.PUSH,
  },
  {
    nodeType: NodeType.POP_STMT,
    tokenType: TokenType.POP,
  },
  {
    nodeType: NodeType.SWAP_STMT,
    tokenType: TokenType.SWAP,
  },
  {
    nodeType: NodeType.GET_STMT,
    tokenType: TokenType.GET,
  },
  {
    nodeType: NodeType.PUT_STMT,
    tokenType: TokenType.PUT,
  },
  {
    nodeType: NodeType.PRS_STMT,
    tokenType: TokenType.PRS,
  },
  {
    nodeType: NodeType.PRI_STMT,
    tokenType: TokenType.PRI,
  },
  {
    nodeType: NodeType.ADD_STMT,
    tokenType: TokenType.ADD,
  },
  {
    nodeType: NodeType.SUB_STMT,
    tokenType: TokenType.SUB,
  },
  {
    nodeType: NodeType.MUL_STMT,
    tokenType: TokenType.MUL,
  },
  {
    nodeType: NodeType.DIV_STMT,
    tokenType: TokenType.DIV,
  },
  {
    nodeType: NodeType.LT_STMT,
    tokenType: TokenType.LT,
  },
  {
    nodeType: NodeType.GT_STMT,
    tokenType: TokenType.GT,
  },
  {
    nodeType: NodeType.EQ_STMT,
    tokenType: TokenType.EQ,
  },
];

interface Node {
  nodeType: NodeType;
  tokenLiteral: string;
  args: Node[];
  position: number;
}

interface ProgramNode {
  nodeType: NodeType.PROGRAM;
  tokenLiteral: string;
  args: Node[];
  numberOfParams: number;
}

interface IParser {
  input: Token[];
  currentPosition: number;
}
export { Node, NodeType, IParser, ProgramNode, validNodeTypes };
