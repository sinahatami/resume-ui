import { Component, OnInit, Input } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { Router } from '@angular/router';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {
  faArrowDown = faArrowDown
  faInstagram = faInstagram
  buttons = [];
  fabTogglerState = 'inactive';

  constructor(private router: Router) { }

  @Input() menuArray
  ngOnInit() {
    this.onToggleFab();
  }

  showItems() {
    this.fabTogglerState = 'active';
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
  }

  degree = 0
  onToggleFab() {
    this.degree += 180
    this.fabTogglerState == 'active' ? this.hideItems() : this.showItems();
  }

  goToRoute(btn) {
    this.router.navigateByUrl(`/${btn.link}`);
  }
}
