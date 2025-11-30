return class extends Parser {
        parseStatement(context, topLevel, exports) {
            if (this.type === Parser.acorn.keywordTypes.guard) {
                return this.parseGuard(context, topLevel, exports);
            }
            
            this.parseGuard(...a);
            super.spread(a, b);
            
            hello.parseGuard(a, b, c, d);

            return super.parseStatement(context, topLevel, exports);
        }
        
        parseGuard() {
        }
    
        spread(...a) {
        }
}

fn();

class A extends Parser {
        parseStatement(context, topLevel, exports) {
            if (this.type === Parser.acorn.keywordTypes.guard) {
                return this.parseGuard(context, topLevel, exports);
            }
            
            this.parseGuard(a, b);
            super.spread(a, b);
            
            hello.parseGuard(a, b, c, d);

            return super.parseStatement(context, topLevel, exports);
        }
        
        parseGuard() {
        }
    
        spread(...a) {
        }
}
