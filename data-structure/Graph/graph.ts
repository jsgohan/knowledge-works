// 图
/**
 * 创建Vertex类保存顶点和边
 * Vertex类有两个数据成员：一个用于标识顶点，另一个表明这个顶点是否被访问过的布尔值
 * @param label
 * @param wasVisited
 */
class Vertex {
  label;
  wasVisited;

  constructor(label, wasVisited) {
    this.label = label;
    this.wasVisited = wasVisited;
  }
}
// 将所有顶点保存到数组中，在图类里，可以通过他们在数组中的位置引用他们
/**
 * 表示边：图的实际信息都保存在边上面，因为它们描述了图的结构
 * 表示图的边的方法称为邻接表或邻接表数组
 * 这种方法将边存储为由顶点的相邻顶点列表构成的数组，并以此顶点作为索引
 * 
 * 还有一种表示图边的方法被称为邻接矩阵。它是一个二维数组，其中的元素表示两个顶点之间是否有一条边
 */

 /**
  * 构建图: 该类会记录该图表示了多少条边，并使用一个长度与图的顶点树相同的数组来记录顶点的数量。
  * 通过for循环为数组中的每个元素添加一个子数组来存储所有的相邻顶点，并将所有元素初始化为空字符串
  * @param vertices 顶点数
  * @param edges 边的数量
  * @param adj 相邻顶点的邻接表数组
  * @param marked_dfs 用于深度优先搜索缓存已经访问过的顶点
  * @param marked_bfs 用于广度优先搜索缓存已经访问过的顶点
  */
class Graph {
  vertices;
  edges = 0;
  adj = [];
  marked_dfs = [];
  marked_bfs = [];

  constructor(v) {
    this.vertices = v;
    for (var i = 0; i < this.vertices; i++) {
      this.adj[i] = [];
      this.marked_dfs.push(false);
      this.marked_bfs.push(false);
    }
  }

  /**
  * addEdge: 添加一条边
  * 传入顶点A和B，函数会先查找顶点A的邻接表，将顶点B添加到列表中，然后再查找顶点B的邻接表，将顶点A加入到列表。最后，这个函数会将边数加1
  * @param v 顶点A
  * @param w 顶点B
  */
  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  }

  /**
  * showGraph: 通过打印所有顶点及其相邻顶点列表的方式显示图
  */
  showGraph() {
    for (var i = 0; i < this.vertices; i++) {
      let str = i + '->';
      for (var j = 0; j < this.vertices; j++) {
        if (this.adj[i][j] != undefined) {
          str += this.adj[i][j] + ' ';
        }
      }
      console.log(str);
    }
  }

  // 搜索图：确定从一个指定的顶点可以到达其他哪些顶点，经常对图执行的操作。
  /**
   * dfs: 深度优先搜索。包括从一条路径的起始顶点开始追溯，直到到达最后一个顶点，然后回溯，继续追溯下一条路径，直到到达最后的顶点，如此往复，直到没有路径为止
   * 访问一个没有访问过的顶点，将它标记为已访问，再递归地去访问在初始顶点的邻接表中其他没有访问过的顶点
   * 要运行该算法，需要添加一个数组，用来存储已经访问过的顶点，将它所有元素的值全部初始化为false
   */
  dfs(v) {
    this.marked_dfs[v] = true;
    if (this.adj[v] != undefined) {
      console.log(`dfs Visited vertex: ${v}`);
    }
    for (var w = 0; w < this.adj[v].length; w++) {
      if (!this.marked_dfs[this.adj[v][w]]) {
        this.dfs(this.adj[v][w]);
      }
    }
  }

  /**
   * bfs: 广度优先搜索。从第一个顶点开始，尝试访问尽可能靠近它的顶点。本质上，这种搜索在图上是逐层移动的，首先检查最靠近第一个顶点的层，再逐渐向下移动到离起始顶点最远的层。
   * 广度优先搜索算法使用了抽象的队列而不是数组来对已访问过的顶点进行排序，工作原理
   *  1. 查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表及队列中
   *  2. 从图中取出下一个顶点v，添加到已访问的顶点列表
   *  3. 将所有与v相邻的未访问顶点添加到队列
   */
  bfs(v) {
    var queue = [];
    this.marked_bfs[v] = true;
    queue.push(v);
    while (queue.length > 0) {
      var s = queue.shift();
      if (this.adj[s] !== undefined) {
        console.log(`bfs Visited vertex: ${s}`);
      }
      for (var w = 0; w < this.adj[s].length; w++) {
        if (!this.marked_bfs[this.adj[s][w]]) {
          this.marked_bfs[this.adj[s][w]] = true;
          queue.push(this.adj[s][w]);
        }
      }
    }
  }
}

var g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.showGraph();
// 0-> 1 2
// 1-> 0 3
// 2-> 0 4
// 3-> 1
// 4-> 2
g.dfs(0);
// dfs Visited vertex: 0
// dfs Visited vertex: 1
// dfs Visited vertex: 3
// dfs Visited vertex: 2
// dfs Visited vertex: 4
g.bfs(0);
// bfs Visited vertex: 0
// bfs Visited vertex: 1
// bfs Visited vertex: 2
// bfs Visited vertex: 3
// bfs Visited vertex: 4
