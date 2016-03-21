import { Pipe } from 'angular2/core';

@Pipe({ name: 'GroupPipe' })
export class GroupPipe {

  public transform (pokemon, size) {
    return pokemon.reduce((acc, p) => {
      const box = Math.ceil(p.national_id / size) - 1;
      acc[box] = acc[box] || [];
      acc[box].push(p);
      return acc;
    }, []);
  }

}
