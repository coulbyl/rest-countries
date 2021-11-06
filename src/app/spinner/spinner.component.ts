import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  styleUrls: ['./spinner.component.scss'],
  template: `<div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>`,
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
