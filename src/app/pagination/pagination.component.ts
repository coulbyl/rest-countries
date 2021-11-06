import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  PaginationControlsDirective,
  PaginationInstance,
} from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, AfterViewInit {
  @Output() onGetPaginationApi =
    new EventEmitter<PaginationControlsDirective>();
  @ViewChild('p') p: PaginationControlsDirective;
  @Input() config: PaginationInstance;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.onGetPaginationApi.emit(this.p);
  }
}
