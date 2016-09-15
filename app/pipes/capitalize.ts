import { Pipe } from 'angular2/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe {

  public transform (input) {
    return input.replace(/([^\W_]+[^\s-]*) */g, (word) => word[0].toUpperCase() + word.substr(1).toLowerCase());
  }

}
