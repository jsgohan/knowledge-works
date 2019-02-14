// 个人觉得状态模式和策略模式相似
interface WritingState {
  write(words: string);
}

// state
class UpperCase implements WritingState {
  write(words: string) {
    console.log(words.toUpperCase());
  }
}

class LowerCase implements WritingState {
  write(words: string) {
    console.log(words.toLowerCase());
  }
}

class DefaultText implements WritingState {
  write(words: string) {
    console.log(words);
  }
}

class TextEditor {
  protected state;

  constructor(state: WritingState) {
    this.state = state;
  }

  setState(state: WritingState) {
    this.state = state;
  }

  type(words: string) {
    this.state.write(words);
  }
}

let editor = new TextEditor(new DefaultText());
editor.type('First line'); // First line

editor.setState(new UpperCase());
editor.type('Second line'); // SECOND LINE
editor.type('Third line'); // THIRD LINE

editor.setState(new LowerCase());
editor.type('Forth line'); // forth line
editor.type('Fifth line'); // fifth line
