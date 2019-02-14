// memento
class EditorMemento {
  protected content;

  constructor(content: string) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }
}

class Editor {
  protected content = '';

  type(words) {
    this.content = this.content + ' ' + words;
  }

  getContent() {
    return this.content;
  }

  save() {
    return new EditorMemento(this.content);
  }

  restore(memento: EditorMemento) {
    this.content = memento.getContent();
  }
}

let editor = new Editor();

editor.type('This is the first sentence.');
editor.type('This is second.');

let saved = editor.save();

editor.type('And this is third.');

console.log(editor.getContent()); // This is the first sentence. This is second. And this is third.

editor.restore(saved);
console.log(editor.getContent()); //  This is the first sentence. This is second.
