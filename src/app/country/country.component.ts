import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationControlsDirective } from 'ngx-pagination';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { listAnimation } from '../animations';
import { isMobile } from '../utils';
import { CountryService, CountryResponse } from './country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  animations: [listAnimation],
})
export class CountryComponent implements OnInit, OnDestroy {
  countries: CountryResponse[] = [];
  config = { id: 'countries', itemsPerPage: 8, currentPage: 1 };
  isFetching = false;
  countryNotFound = false;
  paginationApi: PaginationControlsDirective;

  private subscription: Subscription;

  constructor(
    private countryService: CountryService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (isMobile(navigator.userAgent)) {
      this.config.itemsPerPage = 1;
    }

    this.countryService.searchByRegion('Africa');

    this.subscription = this.countryService.isFetching
      .pipe(
        mergeMap((isLoading) => {
          this.isFetching = isLoading;
          return this.countryService.countries;
        })
      )
      .subscribe((res) => {
        if (res.length === 0) {
          this.countryNotFound = true;
        } else {
          this.countryNotFound = false;
        }

        this.countries = res;
      });
  }

  setPaginationApi(p: PaginationControlsDirective) {
    this.paginationApi = p;
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
