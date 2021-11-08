import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';

export interface CountryResponse {
  name: { official: string; common: string };
  population: number;
  region: string;
  flags: { png: string; svg: string };
  capital: string[];
  languages: { [key: string]: string };
  languagesA: string[];
  currencies: { [key: string]: { [key: string]: string } };
  currenciesA: string[];
  subregion: string;
  altSpellings: string[];
  borders: string[];
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1/';
  private nameUrL = 'https://restcountries.com/v3.1/name/';
  private fullNameQuery = '?fullText=true';

  isFetching = new BehaviorSubject<boolean>(false);
  countries = new BehaviorSubject<CountryResponse[]>([]);
  country = new Subject<CountryResponse>();

  constructor(private http: HttpClient, private alertService: AlertService) {}

  searchForCountry(countryName: string) {
    this.isFetching.next(true);
    const name = countryName.toLowerCase().trim();
    this.makeReq(this.nameUrL + name, true);
  }

  fetchCountryDetails(name: string) {
    this.isFetching.next(true);
    this.http
      .get<CountryResponse[]>(this.nameUrL + name + this.fullNameQuery)
      .pipe(
        take(1),
        map((res) => {
          const country = res[0];
          country.languagesA = Object.values(country.languages);
          const currenciesKeys = Object.values(Object.keys(country.currencies));
          const newCurrencies = [];
          for (const key of currenciesKeys) {
            newCurrencies.push(country.currencies[key].name);
          }
          country.currenciesA = newCurrencies;

          if (res[0].borders) {
            res[0].borders.map((border, i) => {
              const b = border.toLowerCase() === 'nld' ? 'netherlands' : border;
              this.http
                .get<CountryResponse[]>(this.nameUrL + b)
                .pipe(take(1))
                .subscribe((res) => {
                  country.borders[i] = res[0].name.common;
                });
            });
          }
          return country;
        })
      )
      .subscribe(
        (country) => {
          this.isFetching.next(false);
          this.country.next(country);
        },
        (err) => {
          this.handleBadReq(err, true);
        }
      );
  }

  searchByRegion(region: string) {
    this.isFetching.next(true);
    this.makeReq(this.baseUrl + 'region/' + region);
  }

  private handleSucessfullyReq(res: CountryResponse[]) {
    this.isFetching.next(false);
    this.countries.next(res);
  }

  private handleBadReq(
    err: { error?: { message?: string } },
    forDetails = false
  ) {
    this.isFetching.next(false);
    this.alertService.state.next(err?.error?.message);
    forDetails ? this.country.next() : this.countries.next([]);
  }

  private makeReq(url: string, name = false) {
    return this.http
      .get<CountryResponse[]>(url)
      .pipe(take(1))
      .subscribe(
        (res) => this.handleSucessfullyReq(res),
        (err) => {
          if (name && err.error.status === 404) {
            this.http
              .get<CountryResponse[]>(url + this.fullNameQuery)
              .subscribe(
                (res) => this.handleSucessfullyReq(res),
                (err) => this.handleBadReq(err)
              );
          } else {
            this.handleBadReq(err);
          }
        }
      );
  }
}
