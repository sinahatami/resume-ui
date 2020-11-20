import { Component, OnInit, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'timelie-form',
  templateUrl: './timeline-form.component.html',
  styleUrls: ['./timeline-form.component.scss']
})
export class TimelineFormComponent implements OnInit {
  @Input() formType: string

  constructor(private modalService: NgxSmartModalService) { }

  ngOnInit(): void {
    debugger
  }

  ngAfterViewInit(): void {
    this.modalService.getModal('timelineModal').open
  }
}
