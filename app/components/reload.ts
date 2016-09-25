import { Component } from '@angular/core';

const HTML = require('../views/reload.html');

@Component({
  selector: 'reload',
  template: HTML
})
export class ReloadComponent {

  public reloadPage () {
    window.location.href = window.location.href;
  }

}
