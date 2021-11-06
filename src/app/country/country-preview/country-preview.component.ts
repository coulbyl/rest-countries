import { Component, Input, OnInit } from '@angular/core';
import { CountryResponse } from '../country.service';

@Component({
  selector: 'app-country-preview',
  templateUrl: './country-preview.component.html',
  styleUrls: ['./country-preview.component.scss'],
})
export class CountryPreviewComponent implements OnInit {
  @Input() country: CountryResponse;

  constructor() {}

  ngOnInit(): void {}
}
