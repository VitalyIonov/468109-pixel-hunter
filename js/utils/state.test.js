import {assert} from 'chai';
import {livesCounter, getNextScreen, getElapsedTime} from './state';

describe(`livesCounter`, () => {

  it(`should correctly counting lives of the game with correct data got`, () => {
    assert.equal(livesCounter({isCorrect: true, elapsedTime: 25}, 3), 3);
    assert.equal(livesCounter({isCorrect: true, elapsedTime: 25}, 1), 1);
    assert.equal(livesCounter({isCorrect: false, elapsedTime: 25}, 1), 0);
  });

  it(`should correctly counting lives of the game with incorrect data got`, () => {
    assert.equal(livesCounter({isCorrect: false, elapsedTime: 25}, 0), -1);
    assert.equal(livesCounter({isCorrect: true, elapsedTime: 25}, 5), 3);
    assert.equal(livesCounter({isCorrect: false, elapsedTime: 25}, 5), 2);
  });
});

describe(`getNextScreen`, () => {

  it(`should correctly return next screen with correct data got`, () => {
    assert.equal(getNextScreen(true, `rules`, new Array(10).fill({isCorrect: true, elapsedTime: 5})), `stats`);
    assert.equal(getNextScreen(true, `intro`, new Array(7).fill({isCorrect: true, elapsedTime: 5})), `stats`);
    assert.equal(getNextScreen(false, `game`, new Array(7).fill({isCorrect: true, elapsedTime: 5})), `game`);
  });

  it(`should correctly return next screen with incorrect data got`, () => {
    assert.equal(getNextScreen(true, `game`, new Array(11).fill({isCorrect: true, elapsedTime: 5})), `stats`);
    assert.equal(getNextScreen(false, `game`, new Array(11).fill({isCorrect: true, elapsedTime: 5})), `stats`);
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
});
