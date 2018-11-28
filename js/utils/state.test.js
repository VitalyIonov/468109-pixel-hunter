import {assert} from 'chai';
import {pointsCounter, livesCounter, getNextScreen, getElapsedTime} from './state';

describe(`pointsCounter`, () => {

  it(`should correctly counting points of the game with correct data got`, () => {
    assert.equal(pointsCounter(new Array(10).fill({isCorrect: true, elapsedTime: 5}), 3), 1650);
    assert.equal(pointsCounter(new Array(10).fill({isCorrect: true, elapsedTime: 10}), 1), 1050);
    assert.equal(pointsCounter(new Array(10).fill({isCorrect: true, elapsedTime: 15}), 3), 1150);
    assert.equal(pointsCounter(new Array(10).fill({isCorrect: true, elapsedTime: 20}), 1), 550);
    assert.equal(pointsCounter(new Array(10).fill({isCorrect: true, elapsedTime: 25}), 2), 600);
    assert.equal(pointsCounter(new Array(10).fill({isCorrect: true, elapsedTime: 5}), 0), 0);
  });

  it(`should correctly counting points of the game with incorrect data got`, () => {
    assert.equal(pointsCounter(new Array(3).fill({isCorrect: true, elapsedTime: 5}), 3), 0);
    assert.equal(pointsCounter(new Array(11).fill({isCorrect: true, elapsedTime: 5}), 3), 0);
  });

  it(`should correctly counting points of the game with corner cases`, () => {
    assert.equal(pointsCounter(``, 2), 0);
    assert.equal(pointsCounter({}, 5), 0);
    assert.equal(pointsCounter([], undefined), 0);
    assert.equal(pointsCounter(undefined, undefined), 0);
  });
});

describe(`livesCounter`, () => {

  it(`should correctly counting lives of the game with correct data got`, () => {
    assert.equal(livesCounter({isCorrect: true, elapsedTime: 25}, 3), 3);
    assert.equal(livesCounter({isCorrect: true, elapsedTime: 25}, 1), 1);
    assert.equal(livesCounter({isCorrect: false, elapsedTime: 25}, 1), 0);
  });

  it(`should correctly counting lives of the game with incorrect data got`, () => {
    assert.equal(livesCounter({isCorrect: false, elapsedTime: 25}, 0), 0);
    assert.equal(livesCounter({isCorrect: true, elapsedTime: 25}, 5), 3);
    assert.equal(livesCounter({isCorrect: false, elapsedTime: 25}, 5), 2);
  });

  it(`should correctly counting lives of the game with corner cases`, () => {
    assert.equal(livesCounter({}, 3), 0);
    assert.equal(livesCounter(undefined, 2), 0);
    assert.equal(livesCounter({isCorrect: false, elapsedTime: 25}, `string`), 0);
    assert.equal(livesCounter(undefined, undefined), 0);
  });
});

describe(`getNextScreen`, () => {

  it(`should correctly return next screen with correct data got`, () => {
    assert.equal(getNextScreen(true, `rules`), `stats`);
    assert.equal(getNextScreen(true, `intro`), `stats`);
    assert.equal(getNextScreen(false, `stats`), `stats`);
    assert.equal(getNextScreen(false, `game1`), `game1`);
  });

  it(`should correctly return next screen with incorrect data got`, () => {
    assert.equal(getNextScreen(true, `game6`), `stats`);
    assert.equal(getNextScreen(false, `game5`), `greeting`);
  });

  it(`should correctly return next screen with corner cases`, () => {
    assert.equal(getNextScreen([], `game1`), `greeting`);
    assert.equal(getNextScreen(undefined, `game1`), `greeting`);
    assert.equal(getNextScreen(undefined, undefined), `greeting`);
    assert.equal(getNextScreen(undefined, ``), `greeting`);
  });
});

describe(`getElapsedTime`, () => {

  it(`should correctly return next screen with correct data got`, () => {
    assert.equal(getElapsedTime(6), 7);
    assert.equal(getElapsedTime(0), 1);
    assert.equal(getElapsedTime(30), 30);
  });

  it(`should correctly return next screen with incorrect data got`, () => {
    assert.equal(getElapsedTime(-5), 0);
    assert.equal(getElapsedTime(40), 30);
  });

  it(`should correctly return next screen with corner cases`, () => {
    assert.equal(getElapsedTime(``), 0);
    assert.equal(getElapsedTime(undefined), 0);
    assert.equal(getElapsedTime({}), 0);
  });
});
