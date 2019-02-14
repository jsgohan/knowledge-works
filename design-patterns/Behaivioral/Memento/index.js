// memento
var EditorMemento = /** @class */ (function () {
    function EditorMemento(content) {
        this.content = content;
    }
    EditorMemento.prototype.getContent = function () {
        return this.content;
    };
    return EditorMemento;
}());
var Editor = /** @class */ (function () {
    function Editor() {
        this.content = '';
    }
    Editor.prototype.type = function (words) {
        this.content = this.content + ' ' + words;
    };
    Editor.prototype.getContent = function () {
        return this.content;
    };
    Editor.prototype.save = function () {
        return new EditorMemento(this.content);
    };
    Editor.prototype.restore = function (memento) {
        this.content = memento.getContent();
    };
    return Editor;
}());
var editor = new Editor();
editor.type('This is the first sentence.');
editor.type('This is second.');
var saved = editor.save();
editor.type('And this is third.');
console.log(editor.getContent());
editor.restore(saved);
console.log(editor.getContent());
