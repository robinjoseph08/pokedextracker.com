import { Pipe } from 'angular2/core';

@Pipe({ name: 'group' })
export class GroupPipe {

  public transform (arr, size) {
    return arr.reduce((acc, item, i) => {
      const group = Math.ceil((i + 1) / size) - 1;
      acc[group] = acc[group] || [];
      acc[group].push(item);
      return acc;
    }, []);
  }

}
