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

  t.deepEqual(queue.peek(), undefined);
  t.deepEqual(queue.dequeue(), undefined);
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

test('default priority', t => {
  const queue = new PriorityQueue<Item>();

  queue.queue({ id: 3 }, -2);
  queue.queue({ id: 1 });
  queue.queue({ id: 1 });
  queue.queue({ id: 2 }, -1);

  t.deepEqual(queue.dequeue(), { id: 1 });
  t.deepEqual(queue.dequeue(), { id: 1 });
  t.deepEqual(queue.dequeue(), { id: 2 });
  t.deepEqual(queue.dequeue(), { id: 3 });
});

test('duplicate throws error', t => {
  const queue = new PriorityQueue<number>();

  const value = 42;

  queue.queue(value);

  const reason = t.throws(() => {
    queue.queue(value, 24);
  });

  t.is(reason.message, 'Cannot add element that already exist');
});

test('add/poll throws errors', t => {
  t.plan(2);

  const queue = new PriorityQueue<any>();
  let errors = 0;

  try {
    queue.add('value');
  } catch (e) {
    t.is(++errors, 1);
  }

  try {
    queue.poll();
  } catch (e) {
    t.is(++errors, 2);
  }
});

test('high load', t => {
  const queue = new PriorityQueue<Item>();
  const maxId = 1e6;

  for (let i = 1; i <= maxId; ++i) {
    queue.queue({ id: i }, i);
  }

  t.deepEqual(queue.dequeue(), { id: maxId });
});
