import test from 'ava';
import { PriorityQueue } from './priority-queue';

interface Item {
  id: number;
}

test('queue/dequeue', t => {
  const queue = new PriorityQueue<Item>();

  queue.queue({ id: 1 }, 2);
  queue.queue({ id: 2 }, 20);
  queue.queue({ id: 3 }, 3);
  queue.queue({ id: 4 }, 5);

  t.deepEqual(queue.peek(), { id: 2 });
  t.deepEqual(queue.dequeue(), { id: 2 });
  t.deepEqual(queue.dequeue(), { id: 4 });
  t.deepEqual(queue.dequeue(), { id: 3 });
  t.deepEqual(queue.dequeue(), { id: 1 });

  t.deepEqual(queue.peek(), null);
  t.deepEqual(queue.dequeue(), null);
});

test('size', t => {
  const queue = new PriorityQueue<Item>();

  queue.queue({ id: 1 }, 2);
  queue.queue({ id: 2 }, 20);
  queue.queue({ id: 3 }, 3);
  queue.queue({ id: 4 }, 5);

  t.is(queue.size, 4);

  queue.peek();
  t.is(queue.size, 4);

  queue.dequeue();
  t.is(queue.size, 3);
  queue.dequeue();
  t.is(queue.size, 2);
  queue.dequeue();
  t.is(queue.size, 1);

  queue.dequeue();
  t.is(queue.size, 0);
  queue.dequeue();
  t.is(queue.size, 0);
});
