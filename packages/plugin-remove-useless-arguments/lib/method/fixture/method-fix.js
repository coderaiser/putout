return class extends Parser {
        parseStatement(context, topLevel, exports) {
            if (this.type === Parser.acorn.keywordTypes.guard) {
                return this.parseGuard();
            }
            
            this.parseGuard();
            super.spread(a, b);
            
            hello.parseGuard(a, b, c, d);

            return super.parseStatement(context, topLevel, exports);
        }
        
        parseGuard() {
        }
    
        spread(...a) {
        }
};

fn();

class A extends Parser {
        parseStatement(context, topLevel, exports) {
            if (this.type === Parser.acorn.keywordTypes.guard) {
                return this.parseGuard();
            }
            
            this.parseGuard();
            super.spread(a, b);
            
            hello.parseGuard(a, b, c, d);

            return super.parseStatement(context, topLevel, exports);
        }
        
        parseGuard() {
        }
    
        spread(...a) {
        }
}
