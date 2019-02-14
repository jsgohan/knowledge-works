// 指定build算法的框架基类
abstract class Builder {
  // Template method
  build() {
    this.test();
    this.lint();
    this.assembly();
    this.deploy();
  }

  abstract test();
  abstract lint();
  abstract assembly();
  abstract deploy();
}

class AndroidBuilder extends Builder {
  test() {
    console.log('Running android tests');
  }

  lint() {
    console.log('Linting the android code');
  }

  assembly() {
    console.log('Assemblying the android build');
  }

  deploy() {
    console.log('Deploying android build to server');
  }
}

class IosBuilder extends Builder {
  test() {
    console.log('Running ios tests');
  }

  lint() {
    console.log('Linting the ios code');
  }

  assembly() {
    console.log('Assemblying the ios build');
  }

  deploy() {
    console.log('Deploying ios build to server');
  }
}

let androidBuilder = new AndroidBuilder();
androidBuilder.build();
// Running android tests
// Linting the android code
// Assemblying the android build
// Deploying android build to server

let iosBuilder = new IosBuilder();
iosBuilder.build();
// Running ios tests
// Linting the ios code
// Assemblying the ios build
// Deploying ios build to server
