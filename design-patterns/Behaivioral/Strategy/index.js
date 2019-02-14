var BubbleSortStrategy = /** @class */ (function () {
    function BubbleSortStrategy() {
    }
    BubbleSortStrategy.prototype.sort = function (dataset) {
        console.log('Sorting using bubble sort');
        return dataset;
    };
    return BubbleSortStrategy;
}());
var QuickSortStrategy = /** @class */ (function () {
    function QuickSortStrategy() {
    }
    QuickSortStrategy.prototype.sort = function (dataset) {
        console.log('Sorting using quick sort');
        return dataset;
    };
    return QuickSortStrategy;
}());
var Sorter = /** @class */ (function () {
    function Sorter(sorter) {
        this.sorter = sorter;
    }
    Sorter.prototype.sort = function (dataset) {
        return this.sorter.sort(dataset);
    };
    return Sorter;
}());
var dataset = [1, 5, 3, 2, 5, 6];
var sorter = new Sorter(new BubbleSortStrategy());
sorter.sort(dataset);
sorter = new Sorter(new QuickSortStrategy());
sorter.sort(dataset);
