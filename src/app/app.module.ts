import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CountryComponent } from './country/country.component';
import { CountryDetailsComponent } from './country/country-details/country-details.component';
import { CountryPreviewComponent } from './country/country-preview/country-preview.component';
import { FilterComponent } from './country/filter/filter.component';
import { HtmlSanitizerPipe } from './html-sanitizer.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './country/search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { BgImageSanitizerPipe } from './bg-image-sanitizer.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertComponent } from './alert/alert.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CountryComponent,
    CountryDetailsComponent,
    CountryPreviewComponent,
    FilterComponent,
    SearchComponent,
    HtmlSanitizerPipe,
    PaginationComponent,
    SpinnerComponent,
    BgImageSanitizerPipe,
    PageNotFoundComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
