export class Emojizer {
        providedCodeActionKinds = [
            vscode.CodeActionKind.QuickFix
        ];

        provideCodeActions(document, range) {
            if (!this.isAtStartOfSmiley(document, range)) {
                return;
            }
        }
};

