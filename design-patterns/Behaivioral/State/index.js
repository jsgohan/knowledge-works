// state
var UpperCase = /** @class */ (function () {
    function UpperCase() {
    }
    UpperCase.prototype.write = function (words) {
        console.log(words.toUpperCase());
    };
    return UpperCase;
}());
var LowerCase = /** @class */ (function () {
    function LowerCase() {
    }
    LowerCase.prototype.write = function (words) {
        console.log(words.toLowerCase());
    };
    return LowerCase;
}());
var DefaultText = /** @class */ (function () {
    function DefaultText() {
    }
    DefaultText.prototype.write = function (words) {
        console.log(words);
    };
    return DefaultText;
}());
var TextEditor = /** @class */ (function () {
    function TextEditor(state) {
        this.state = state;
    }
    TextEditor.prototype.setState = function (state) {
        this.state = state;
    };
    TextEditor.prototype.type = function (words) {
        this.state.write(words);
    };
    return TextEditor;
}());
var editor = new TextEditor(new DefaultText());
editor.type('First line');
editor.setState(new UpperCase());
editor.type('Second line');
editor.type('Third line');
editor.setState(new LowerCase());
editor.type('Forth line');
editor.type('Fifth line');
