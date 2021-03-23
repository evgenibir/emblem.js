import { module, test } from 'qunit';
import { w } from 'tests/support/utils';

module('glimmer: blocks', function (hooks) {
  test("basic", function (assert) {
    const emblem = w(
      "%MyComponent @value=foo",
      "  |Hi!"
    );

    assert.compilesTo(emblem,
      '<MyComponent @value={{foo}}>Hi!</MyComponent>');
  });

  test("block params", function (assert) {
    const emblem = w(
      "%MyComponent @value=foo as |comp1 @comp2|",
      "  = comp1.name"
    );

    assert.compilesTo(emblem,
      '<MyComponent @value={{foo}} as |comp1 @comp2|>{{comp1.name}}</MyComponent>');
  });

  test("block params with nested angle bracket", function (assert) {
    const emblem = w(
      "%MyComponent @value=foo as |comp|",
      "  % comp>subcomp @value=foo"
    );

    assert.compilesTo(emblem,
      '<MyComponent @value={{foo}} as |comp|><comp.subcomp @value={{foo}}></comp.subcomp></MyComponent>');
  });

  test('recursive nesting part 2', function (assert) {
    const emblem = w(
      '',
      '%my-comp-1',
      '  %my-comp-2',
      '    p Hello'
    );

    assert.compilesTo(emblem, '<my-comp-1><my-comp-2><p>Hello</p></my-comp-2></my-comp-1>');
  });

});
