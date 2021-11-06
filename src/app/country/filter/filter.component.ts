import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { CountryService } from '../country.service';
import { chevronDown, chevronUp } from '../svg-icons';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  isOpenDropdown = false;
  downIcon = chevronDown;
  upIcon = chevronUp;
  @Input() p: PaginationControlsDirective;

  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion: string | null = null;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {}

  onToggleDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  onSelect(region: string) {
    this.p.setCurrent(1);
    this.selectedRegion = region;
    this.countryService.searchByRegion(region);
    this.onToggleDropdown();
  }
}
