var List = /** @class */ (function () {
    function List() {
        this.listSize = 0;
        this.pos = 0;
        this.dataStore = [];
    }
    List.prototype.length = function () {
        return this.dataStore.length;
    };
    List.prototype.clear = function () {
        delete this.dataStore;
        this.dataStore.length = 0;
        this.listSize = this.pos = 0;
    };
    List.prototype.toString = function () {
        return this.dataStore;
    };
    List.prototype.getElement = function () {
        return this.dataStore[this.pos];
    };
    List.prototype.insert = function (element, after) {
        var insertPos = this.find(after);
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element);
            this.listSize++;
            return true;
        }
        return false;
    };
    List.prototype.append = function (element) {
        this.dataStore[this.listSize++] = element;
    };
    List.prototype.remove = function (element) {
        var foundAt = this.find(element);
        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            this.listSize--;
            return true;
        }
        return false;
    };
    List.prototype.front = function () {
        this.pos = 0;
    };
    List.prototype.end = function () {
        this.pos = this.listSize - 1;
    };
    List.prototype.prev = function () {
        --this.pos;
    };
    List.prototype.next = function () {
        if (this.pos < this.listSize) {
            ++this.pos;
        }
    };
    List.prototype.hasNext = function () {
        return this.pos < this.listSize;
    };
    List.prototype.hasPrev = function () {
        return this.pos >= 0;
    };
    List.prototype.currPos = function () {
        return this.pos;
    };
    List.prototype.moveTo = function (position) {
        this.pos = position;
    };
    List.prototype.find = function (element) {
        for (var i = 0; i < this.listSize; i++) {
            if (this.dataStore[i] === element) {
                return i;
            }
        }
        return -1;
    };
    List.prototype.contain = function (element) {
        for (var i = 0; i < this.listSize; i++) {
            if (this.dataStore[i] === element) {
                return true;
            }
        }
        return false;
    };
    return List;
}());
var names = new List();
names.append('Rey');
names.append('Shieh');
names.append('James');
names.append('Cain');
names.front();
console.log(names.getElement());
// [ 'Rey', 'Shieh', 'James', 'Cain' ]
names.next();
console.log(names.getElement());
names.next();
names.next();
names.prev();
console.log(names.getElement());
