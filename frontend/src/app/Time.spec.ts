import { Time } from './Time';

describe('Time', () => {
  it('substracts correctly', () => {
    const timeA = new Time(8, 0);
    const timeB = new Time(12, 10);

    const result = timeB.substract(timeA);

    expect(result).toEqual(new Time(4, 10))
  });
});
