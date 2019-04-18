/**
 * 根据menu对象，生成menu tree，格式如下
 * <ul>
 *  <li>
 *    <a>菜单1</a>
 *    <ul>
 *      // 子菜单节点
 *    </ul>
 *  </li>
 *  // 其他节点
 * </ul>
 */

let menu = [
  { "Id": 1, "ParentId": null, "Sort": 0, "Name": "菜单1" },
  { "Id": 2, "ParentId": 1,    "Sort": 0, "Name": "菜单1-1"},
  { "Id": 3, "ParentId": 1,    "Sort": 0, "Name": "菜单1-2"},
  { "Id": 4, "ParentId": 2,    "Sort": 2, "Name": "菜单1-1-2"},
  { "Id": 5, "ParentId": 2,    "Sort": 1, "Name": "菜单1-1-1"},
  { "Id": 6, "ParentId": null, "Sort": 0, "Name": "菜单2" },
  { "Id": 7, "ParentId": 6,    "Sort": 0, "Name": "菜单2-1"},
  { "Id": 8, "ParentId": 6,    "Sort": 0, "Name": "菜单2-2"},
  { "Id": 9, "ParentId": 8,    "Sort": 2, "Name": "菜单2-2-2"},
  { "Id": 10, "ParentId": 8,   "Sort": 1, "Name": "菜单2-2-1"},
  { "Id": 11, "ParentId": 10,  "Sort": 0, "Name": "菜单2-2-1-1"}
]

const mTree = [];
const mTreeDom = '<ul>';

// 遍历menu菜单
for (var i = 0; i < menu.length; i++) {
	recursionMenu(menu[i]);
}

function recursionMenu(child) {
  child.subMenu = [];
  // 判断mTree是否为空，或者传入的菜单对象ParentId是否为null，成立直接插入到mTree中
  if (mTree && mTree.length === 0 || !child.ParentId) {
    mTree.push(child);
    mTree.sort((a, b) => {
      return a.Sort - b.Sort
    });
    return;
  }
  // 否则遍历mTree，判断mTree节点的Id和child的parentId是否相等，相等插入
  for (var i = 0; i < mTree.length; i++) {
  	if (child.ParentId === mTree[i].Id) {
      mTree[i].subMenu.push(child); 
      // Sort排序
      if (mTree[i].subMenu && mTree[i].subMenu.length >= 2) {
        mTree[i].subMenu.sort((a, b) => {
          return a.Sort - b.Sort
        });
      }
    } else {
      // 不相等开始递归菜单
      recursionSubMenu(child, mTree[i].subMenu);
    }
  }
}

// 递归菜单
function recursionSubMenu(child, subMenu) {
  for (var i = 0; i < subMenu.length; i++) {
  	if (child.ParentId === subMenu[i].Id) {
      subMenu[i].subMenu.push(child);
      subMenu[i].subMenu.sort((a, b) => {
        return a.Sort - b.Sort
      });
    } else {
      recursionSubMenu(child, subMenu[i].subMenu);
    }
  }
}

// 上面的函数生成mTree树形对象，开始创建内容
function setMenu(menu, mTreeDom) {
  var ulstart = '<ul>', ulend = '</ul>', name, listart = '<li>', liend = '</li>', temp = '';
  temp += mTreeDom;
  for (var i = 0; i < menu.length; i++) {
    name = '<a>' + menu[i].Name + '</a>';
    temp += listart + name;
  	if (menu[i].subMenu && menu[i].subMenu.length > 0) {
      temp += setMenu(menu[i].subMenu, ulstart);
    }
    temp += liend;
  }
  temp += ulend;
  return temp;
}

// 生成Dom节点
console.log(setMenu(mTree, mTreeDom));

// <ul>
//   <li><a>菜单1</a>
//   <ul>
//     <li><a>菜单1-1</a>
//     <ul>
//       <li><a>菜单1-1-1</a></li>
//       <li><a>菜单1-1-2</a></li>
//     </ul></li>
//     <li><a>菜单1-2</a></li>
//   </ul></li>
//   <li><a>菜单2</a>
//   <ul>
//     <li><a>菜单2-1</a></li>
//     <li><a>菜单2-2</a>
//     <ul>
//       <li><a>菜单2-2-1</a>
//       <ul>
//         <li><a>菜单2-2-1-1</a></li>
//       </ul></li>
//       <li><a>菜单2-2-2</a></li>
//     </ul></li>
//   </ul></li>
// </ul>
