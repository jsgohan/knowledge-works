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
    door.getWidth();
    door.getHeight();
    ```

  - Factory Method - 工厂方法

    > 工厂方法提供了一个委派实例逻辑给child classes的方式

    维基百科：

    > 工厂方法模式是使用一些工厂方法来处理创建对象问题，没有指定准确的需要被创建的class。

- Structural

- Behavioral



