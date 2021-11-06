import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { fadeAnimation } from 'src/app/animations';
import { CountryService, CountryResponse } from '../country.service';
import { arrowLeft } from '../svg-icons';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
  animations: [fadeAnimation],
})
export class CountryDetailsComponent implements OnInit {
  backIcon = arrowLeft;
  country: CountryResponse;
  isFetching = false;

  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((param) => {
          this.countryService.fetchCountryDetails(param.name);
          return this.countryService.country;
        })
      )
      .subscribe((res) => (this.country = res));

    this.countryService.isFetching.subscribe(
      (isLoading) => (this.isFetching = isLoading)
    );
  }

  onGoBack() {
    this.router.navigate(['/']);
  }
}
