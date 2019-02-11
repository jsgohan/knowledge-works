# Design Patterns-设计模式

设计模式是为了解决反复出现的问题而存在的，是作为如何解决确定问题的指导方针。它们并不是像传统的工具库那样直接引入到引用就会有神奇的事情发生。只是作为解决问题的一种合理方案。

> 在维基百科中是这么描述的：软件工程中，软件设计模式是在给定的软件设计上下文里，对于普遍出现的问题的一个可重用的解决方案。它并不是转换准确源码或者机器语言的最终设计。它只是作为一个如何解决被使用在不同情况中问题的描述或模板。

## 设计模式类型

- Creational

  > 创建模式专注于如何初始化对象或相关联对象组

  - Simple Factory - 简单工厂

    > 简单工厂就是为使用者生成一个不暴露任何创建逻辑的实例

    维基百科：

    > 在面向对象编程中(OOP)，工厂即一个创建别的对象的对象 - 工厂通常是一个返回对象或class的函数或方法，被定义为"new"

    何时使用？

    当需要创建对象会包含一些逻辑时，把这些重复的代码由专用的工厂代替会变得很有意义

    示例：

    ```typescript
    interface Door {
      getWidth();
      getHeight();
    }
    
    class WoodenDoor implements Door {
      protected width;
      protected height;
    
      constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
      }
    
      getWidth() {
        return this.width;
      }
    
      getHeight() {
        return this.height;
      }
    }
    
    class DoorFactory {
      static makeDoor(width, height) {
        return new WoodenDoor(width, height);
      }
    }
    
    const door = DoorFactory.makeDoor(100, 200);
    door.getWidth(); // 100
    door.getHeight(); // 200
    ```

  - Factory Method - 工厂方法

    > 工厂方法提供了一个委派实例逻辑给child classes的方式

    维基百科：

    > 工厂方法模式是使用一些工厂方法来处理创建对象问题，没有指定准确的需要被创建的类。创建对象通过调用工厂方法(指定接口由child类实现或实现一个基础类通过派生类选择性的覆盖)来完成，而不是直接调用构造函数

    何时使用？

    在类中，存在通用的处理且必要的子类是在运行时动态决定情况下很有用。或者换句话说，使用者不知道子类如何准确的执行时。

    示例：

    ```typescript
    interface Interviewer {
      askQuestions();
    }
    
    class Developer implements Interviewer {
      askQuestions() {
        console.log('Asking about design patterns!');
      }
    }
    
    class CommunityExecutive implements Interviewer {
      askQuestions() {
        console.log('Asking about community building!');
      }
    }
    
    abstract class HiringManager {
      interviewer;
    
      // Factory method
      protected abstract makeInterviewer(): Interviewer;
    
      takeInterview() {
        this.interviewer = this.makeInterviewer();
        this.interviewer.askQuestions();
      }
    }
    
    class DevelopmentManager extends HiringManager {
      protected makeInterviewer(): Interviewer {
        return new Developer();
      }
    }
    
    class MarketingManager extends HiringManager {
      protected makeInterviewer(): Interviewer {
        return new CommunityExecutive();
      }
    }
    
    let devManager = new DevelopmentManager();
    devManager.takeInterview(); // Asking about design patterns!
    
    let marketingManager = new MarketingManager();
    marketingManager.takeInterview(); // Asking about community building!
    ```

  - Abstract Factory - 抽象工厂

    >抽象工厂即工厂的工厂；将独立的但相关/依赖的工厂分组在一起，不指定其具体类的工厂的工厂

    维基百科：

    > 抽象工厂模式提供一个方式-封装独立的带有通用主题不指定具体类的工厂分组

    示例：

    ```typescript
    // Door interface and implements for it
    interface Door {
      getDescription();
    }
    
    class WoodenDoor implements Door {
      getDescription() {
        console.log('I am a wooden door');
      }
    }
    
    class IronDoor implements Door {
      getDescription() {
        console.log('I am an iron door');
      }
    }
    
    // fitting experts for each door type
    interface DoorFittingExpert {
      getDescription();
    }
    
    class Welder implements DoorFittingExpert {
      getDescription() {
        console.log('I can only fit iron doors');
      }
    }
    
    class Carpenter implements DoorFittingExpert {
      getDescription() {
        console.log('I can only fit wooden doors');
      }
    }
    
    // abstract factory
    interface DoorFactory {
      makeDoor(): Door;
      mekeFittingExpert(): DoorFittingExpert;
    }
    
    class WoodenDoorFactory implements DoorFactory {
      makeDoor(): Door {
        return new WoodenDoor();
      }
      
      mekeFittingExpert(): DoorFittingExpert {
        return new Carpenter();
      }
    }
    
    class IronDoorFactory implements DoorFactory {
      makeDoor(): Door {
        return new IronDoor();
      }
    
      mekeFittingExpert(): DoorFittingExpert {
        return new Welder();
      }
    }
    
    let woodenFactory = new WoodenDoorFactory();
    let door = woodenFactory.makeDoor();
    let expert = woodenFactory.mekeFittingExpert();
    door.getDescription(); // I am a wooden door
    expert.getDescription(); // I can only fit wooden doors
    
    let ironFactory = new IronDoorFactory();
    let ironDoor = ironFactory.makeDoor();
    let ironExpert = ironFactory.mekeFittingExpert();
    ironDoor.getDescription(); // I am an iron door
    ironExpert.getDescription(); // I can only fit iron doors
    ```

  - Builder - 生成器

    >

- Structural

- Behavioral



