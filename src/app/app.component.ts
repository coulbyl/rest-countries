import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rest-countries';
  private subscription: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.subscription = this.themeService.theme.subscribe((theme) => {
      const html = document.querySelector('html');
      html?.classList.replace(theme.old, theme.current);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
