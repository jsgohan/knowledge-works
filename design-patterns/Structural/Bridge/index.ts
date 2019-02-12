interface WebPage {
  getContent();
}

class About implements WebPage {
  protected theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  getContent() {
    return `About page in ${this.theme.getColor()}`;
  }
}

class Careers implements WebPage {
  protected theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  getContent() {
    return `Careers page in ${this.theme.getColor()}`;
  }
}

// 解耦后的theme层级
interface Theme {
  getColor();
}

class DarkTheme implements Theme {
  getColor() {
    return 'Dark Black';
  }
}

class LightTheme implements Theme {
  getColor() {
    return 'Off white';
  }
}

class AquaTheme implements Theme {
  getColor() {
    return 'Lightblue';
  }
}

let darkTheme = new DarkTheme();

let about = new About(darkTheme);
let careers = new Careers(darkTheme);

console.log(about.getContent()); // About page in Dark Black
console.log(careers.getContent()); // Careers page in Dark Black
