import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ThemeService } from '../theme.service';
import { scrollBar } from '../utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const $progress = document.querySelector('.top-bar') as HTMLElement;
    this.subscription = scrollBar().subscribe((percent) => {
      $progress.style.setProperty('--width', `${percent}%`);
    });
  }

  onSwitchMode() {
    this.subscription = this.themeService.theme
      .pipe(take(1))
      .subscribe((theme) => {
        if (theme.current === 'light') {
          this.themeService.theme.next({ current: 'dark', old: 'light' });
        } else {
          this.themeService.theme.next({ current: 'light', old: 'dark' });
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
