import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Theme {
  current: 'light' | 'dark';
  old: 'light' | 'dark';
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = new BehaviorSubject<Theme>({ current: 'light', old: 'dark' });
  constructor() {}
}
