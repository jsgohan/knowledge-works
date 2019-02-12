// let Sheep = (function() {
//   function Sheep(name, category = 'Mountain Sheep') {
//     this.name = name;
//     this.category = category;
//   }
//   Sheep.prototype.setName = function(name) {
//     this.name = name;
//   }
//   Sheep.prototype.getName = function() {
//     console.log(this.name);
//     return this.name;
//   }
//   Sheep.prototype.setCategory = function(category) {
//     this.category = category;
//   }
//   Sheep.prototype.getCategory = function() {
//     console.log(this.category);
//     return this.category;
//   }
//   return Sheep;
// })();

// let original = new Sheep('Jolly');
// original.getName(); // Jolly
// original.getCategory(); // Mountain Sheep

// // let clone = Object.assign(null, original);
// // clone.setName('Dolly');
// // clone.getName();
// // clone.getCategory();
