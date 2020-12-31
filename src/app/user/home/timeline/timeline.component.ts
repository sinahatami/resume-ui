import { TimelineService } from './timeline.service'
import { Component, OnInit } from '@angular/core'
import * as AOS from 'aos'

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  constructor(private service: TimelineService) {}

  timelineArray = []
  ngOnInit(): void {
    this.service.getAll().subscribe((res: any) => (this.timelineArray = res))
    AOS.init({
      duration: 1200,
    })
  }
}
