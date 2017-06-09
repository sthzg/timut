import 'mocha';
import {expect} from 'chai';
import * as U from '../utils';

const ANY_TIMESTAMP: number = 1483228861007;

describe('Utils', () => {
  context('last()', () => {
    it('should return last item from an array', () => {
      expect(U.last([1])).to.eq(1);
      expect(U.last([1, 2, 3])).to.eq(3);
    });

    it('should return undefined for an empty array', () => {
      expect(U.last([])).to.eq(undefined);
    });
  });

  context('first()', () => {
    it('should return first item from an array', () => {
      expect(U.first([1])).to.eq(1);
      expect(U.first([1, 2, 3])).to.eq(1);
    });

    it('should return undefined for an empty array', () => {
      expect(U.last([])).to.eq(undefined);
    });
  });

  context('rightPad()', () => {
    it('should right pad successfully', () => {
      const padded = U.rightPad('a', 10, '.');
      expect(padded).to.have.eq(`a${'.'.repeat(9)}`);
    });

    it('should truncate longer input', () => {
      const padded = U.rightPad('abc', 1, '.');
      expect(padded).to.eq('a');
    });
  });

  context('leftPad()', () => {
    it('should left pad successfully', () => {
      const padded = U.leftPad('a', 10, '.');
      expect(padded).to.have.eq(`${'.'.repeat(9)}a`);
    });

    it('should truncate longer input', () => {
      const padded = U.rightPad('abc', 1, '.');
      expect(padded).to.eq('a');
    });
  });

  context('toPreciseTimeString()', () => {
    it('should render a time string up to milliseconds', () => {
      const d: Date = new Date(ANY_TIMESTAMP);
      expect(U.toPreciseTimeString(d)).to.eq('00:01:01:007');
    });
  });
});
