import proxyquire = require('proxyquire');

import test from 'ava';
import {stub} from 'sinon';
import {format} from '../description';

const deepStrictEqual = stub();

proxyquire('../predicate', {'deep-strict-equal': deepStrictEqual});

import {PredicateBuilder} from '../predicate';

function createTestName(method: string): string {
  return `\`PredicateBuilder.${method}\` should return a predicate`;
}

test.beforeEach(() => {
  deepStrictEqual.reset();
  deepStrictEqual.resetBehavior();
});

test(createTestName('contain'), async t => {
  t.plan(5);

  const predicate = new PredicateBuilder().contain('foo');

  t.is(format(predicate.description), 'should contain \'foo\'');

  t.true(predicate.test('foo'));
  t.true(predicate.test('foobar'));
  t.true(predicate.test('barfoo'));

  t.false(predicate.test('bar'));
});

test(createTestName('not.contain'), async t => {
  t.plan(5);

  const predicate = new PredicateBuilder().not.contain('foo');

  t.is(format(predicate.description), 'should not contain \'foo\'');

  t.true(predicate.test('bar'));

  t.false(predicate.test('foo'));
  t.false(predicate.test('foobar'));
  t.false(predicate.test('barfoo'));
});

test(createTestName('equal'), async t => {
  t.plan(5);

  const predicate = new PredicateBuilder().equal('foo');

  t.is(format(predicate.description), 'should equal \'foo\'');

  deepStrictEqual.returns(true);

  t.true(predicate.test('bar'));

  t.is(deepStrictEqual.callCount, 1);
  t.is(deepStrictEqual.args[0][0], 'bar');
  t.is(deepStrictEqual.args[0][1], 'foo');
});

test(createTestName('not.equal'), async t => {
  t.plan(5);

  const predicate = new PredicateBuilder().not.equal('foo');

  t.is(format(predicate.description), 'should not equal \'foo\'');

  deepStrictEqual.returns(true);

  t.false(predicate.test('bar'));

  t.is(deepStrictEqual.callCount, 1);
  t.is(deepStrictEqual.args[0][0], 'bar');
  t.is(deepStrictEqual.args[0][1], 'foo');
});

test(createTestName('match'), async t => {
  t.plan(5);

  const predicate = new PredicateBuilder().match(/foo/);

  t.is(format(predicate.description), 'should match /foo/');

  t.true(predicate.test('foo'));
  t.true(predicate.test('foobar'));
  t.true(predicate.test('barfoo'));

  t.false(predicate.test('bar'));
});

test(createTestName('not.match'), async t => {
  t.plan(5);

  const predicate = new PredicateBuilder().not.match(/foo/);

  t.is(format(predicate.description), 'should not match /foo/');

  t.true(predicate.test('bar'));

  t.false(predicate.test('foo'));
  t.false(predicate.test('foobar'));
  t.false(predicate.test('barfoo'));
});

test(createTestName('be.above'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().be.above(1);

  t.is(format(predicate.description), 'should be above 1');

  t.true(predicate.test(2));

  t.false(predicate.test(1));
  t.false(predicate.test(0));
});

test(createTestName('not.be.above'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().not.be.above(1);

  t.is(format(predicate.description), 'should not be above 1');

  t.true(predicate.test(0));
  t.true(predicate.test(1));

  t.false(predicate.test(2));
});

test(createTestName('be.at.least'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().be.at.least(1);

  t.is(format(predicate.description), 'should be at least 1');

  t.true(predicate.test(2));
  t.true(predicate.test(1));

  t.false(predicate.test(0));
});

test(createTestName('not.be.at.least'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().not.be.at.least(1);

  t.is(format(predicate.description), 'should not be at least 1');

  t.true(predicate.test(0));

  t.false(predicate.test(1));
  t.false(predicate.test(2));
});

test(createTestName('be.below'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().be.below(1);

  t.is(format(predicate.description), 'should be below 1');

  t.true(predicate.test(0));

  t.false(predicate.test(1));
  t.false(predicate.test(2));
});

test(createTestName('not.be.below'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().not.be.below(1);

  t.is(format(predicate.description), 'should not be below 1');

  t.true(predicate.test(2));
  t.true(predicate.test(1));

  t.false(predicate.test(0));
});

test(createTestName('be.at.most'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().be.at.most(1);

  t.is(format(predicate.description), 'should be at most 1');

  t.true(predicate.test(0));
  t.true(predicate.test(1));

  t.false(predicate.test(2));
});

test(createTestName('not.be.at.most'), async t => {
  t.plan(4);

  const predicate = new PredicateBuilder().not.be.at.most(1);

  t.is(format(predicate.description), 'should not be at most 1');

  t.true(predicate.test(2));

  t.false(predicate.test(1));
  t.false(predicate.test(0));
});
