import { SyntaxNode, Unit } from "../syntax/syntax-node";

type SemanticSymbol = TypeSymbol;

export class TypeSymbol {
  kind = "TypeSymbol" as const;
  constructor(
    public baseType: TypeSymbol | 'not-resolved' | 'none',
  ) {}
}

export class SemanticContext {
  nodes: Map<string, SyntaxNode> = new Map();
  symbols: Map<SyntaxNode, TypeSymbol> = new Map();
  builtinTypes: Map<string, TypeSymbol> = new Map();

  constructor() {
    this.builtinTypes.set('string', new TypeSymbol('none'));
    this.builtinTypes.set('number', new TypeSymbol('none'));
    this.builtinTypes.set('boolean', new TypeSymbol('none'));
    this.builtinTypes.set('object', new TypeSymbol('none'));
  }
}

export function analyze(ctx: SemanticContext, unit: Unit) {
  collectNames(ctx, unit);
  bindNames(ctx, unit);
}

function collectNames(ctx: SemanticContext, node: SyntaxNode) {
  switch (node.kind) {
    case "Unit": {
      for (const decl of node.decls) {
        collectNames(ctx, decl);
      }
      break;
    }
    case "TypeDecl": {
      const symbol = new TypeSymbol('not-resolved');
      ctx.nodes.set(node.name, node);
      ctx.symbols.set(node, symbol);
      break;
    }
  }
}

function bindNames(ctx: SemanticContext, node: SyntaxNode) {
  switch (node.kind) {
    case "Unit": {
      for (const decl of node.decls) {
        bindNames(ctx, decl);
      }
      break;
    }
    case "TypeDecl": {
      break;
    }
    case "TypeNode": {
      break;
    }
  }
}
