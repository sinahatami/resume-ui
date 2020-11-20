import { LoaderService } from './loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }
  loadertype: string[] = ['ball-atom', 'ball-beat', 'ball-circus', 'ball-climbing-dot', 'ball-clip-rotate-multiple', 'ball-clip-rotate-pulse', 'ball-elastic-dots',
    'ball-fussion', 'ball-newton-cradle', 'ball-running-dots', 'ball-rotate', 'ball-pulse-rise', 'ball-spin', 'ball-scale-ripple-multiple', 'ball-spin-clockwise',
    'ball-spin-clockwise-fade-rotating', 'ball-spin-fade-rotating', 'ball-triangle-path', 'ball-zig-zag', 'fire', 'line-spin-clockwise-fade-rotating',
    'pacman', 'square-jelly-box', 'square-spin', 'timer', 'triangle-skew-spin'];
  rnd = 1;
  ngOnInit() {
    this.ChangeSpinnerType();
    // this.loaderService.show()
  }

  public ChangeSpinnerType() {
    this.rnd = Math.floor(Math.random() * this.loadertype.length)
  }

}
