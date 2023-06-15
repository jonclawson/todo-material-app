import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent {

  @Output() onToggle = new EventEmitter<string>();

  toggle(v: string) {
    this.onToggle.emit(v);
    console.log('toggle')
  }

}
