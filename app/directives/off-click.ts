import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  host: { '(click)': 'onClick($event)' },
  inputs: ['offClick'],
  selector: '[offClick]'
})
export class OffClickDirective implements OnInit, OnDestroy {

  private offClick;

  public ngOnInit () {
    setTimeout(() => document.addEventListener('click', this.offClick), 0);
  }

  public ngOnDestroy () {
    document.addEventListener('click', this.offClick);
  }

  public onClick ($event) {
    $event.stopPropagation();
  }

}
