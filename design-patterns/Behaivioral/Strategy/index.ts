interface SortStrategy {
  sort(dataset: any[]): any[];
}

class BubbleSortStrategy implements SortStrategy {
  sort(dataset: any[]): any[] {
    console.log('Sorting using bubble sort');
    return dataset;
  }
}

class QuickSortStrategy implements SortStrategy {
  sort(dataset: any[]): any[] {
    console.log('Sorting using quick sort');
    return dataset;
  }
}

class Sorter {
  protected sorter;

  constructor(sorter: SortStrategy) {
    this.sorter = sorter;
  }

  sort(dataset: any[]): any[] {
    return this.sorter.sort(dataset);
  }
}

let dataset = [1, 5, 3, 2, 5, 6];

let sorter = new Sorter(new BubbleSortStrategy());
sorter.sort(dataset); // Sorting using bubble sort

sorter = new Sorter(new QuickSortStrategy());
sorter.sort(dataset); // Sorting using quick sort
