import {
  Component,
  AfterViewChecked,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  countrySearched = '';
  @Input() p: PaginationControlsDirective;

  constructor(private countryService: CountryService) {}

  ngOnInit() {}

  onChange() {
    this.p.setCurrent(1);
    if (this.countrySearched) {
      this.countryService.searchForCountry(this.countrySearched);
    } else {
      this.countryService.searchByRegion('Europe');
    }
  }
}
