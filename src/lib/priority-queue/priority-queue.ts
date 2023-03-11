import { MaxHeapTree } from '@algo-js/heap-tree';

export interface Queue<T> {
  queue: (item: T, priority: number) => this;
  dequeue: () => T;

  readonly size: number;
}

export class PriorityQueue<T> extends MaxHeapTree<T> implements Queue<T> {
  /**
   * @returns {number}
   */
  get size(): number {
    return this.heap.length;
  }
  public static defaultPriority = 1;

  /**
   * @param {Map} priorities
   * @param {*} a
   * @param {*} b
   * @returns {number}
   */
  public static priorityCompareFn<T>(
    priorities: Map<T, number>,
    a: T,
    b: T
  ): number {
    const pa = priorities.get(a);
    const pb = priorities.get(b);
    return pa === pb ? 0 : pa < pb ? -1 : 1;
  }

  private priorities: Map<T, number>;

  constructor() {
    const priorities = new Map<T, number>();
    const compareFn = PriorityQueue.priorityCompareFn.bind(null, priorities);

    super(compareFn);

    this.priorities = priorities;
  }

  /**
   * @param {*} element
   * @param {number} priority
   * @returns {PriorityQueue}
   */
  public queue(
    element: T,
    priority: number = PriorityQueue.defaultPriority
  ): this {
    if (this.priorities.has(element)) {
      throw new Error('Cannot add element that already exist');
    }

    this.priorities.set(element, priority);
    super.add(element);

    return this;
  }

  /**
   * @returns {*}
   */
  public dequeue(): T | undefined {
    const element = super.poll();

    if (element) {
      this.priorities.delete(element);
    }

    return element;
  }

  /**
   * @private
   * @deprecated
   */
  public add(element: T): this {
    throw new Error('Use `queue` method instead');
  }

  /**
   * @private
   * @deprecated
   */
  public poll(): T {
    throw new Error('Use `dequeue` method instead');
  }
}
