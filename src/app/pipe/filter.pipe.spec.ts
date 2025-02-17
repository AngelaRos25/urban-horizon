import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  })

  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the original array if no search term is provide', () => {
    const items = [{name: 'Anna'}, {name: 'mino'}];
    expect(pipe.transform(items, '')).toEqual(items);
  })
});
