import { Pipe } from 'angular2/core';

@Pipe({ name: 'NumberPipe' })
export class NumberPipe {

  public transform (n, [width]) {
    n = n + '';

    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
  }

}
