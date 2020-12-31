import { AuthService } from './../../../../providers/auth.service'
import { Component, OnInit, Input } from '@angular/core'
import { speedDialFabAnimations } from './speed-dial-fab.animations'
import { NavigationEnd, Router } from '@angular/router'
import { faLinkedin, faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'
import { faArrowDown, faSignOutAlt, faMailBulk } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations,
})
export class SpeedDialFabComponent implements OnInit {
  faArrowDown = faArrowDown
  faMailBulk = faMailBulk
  faGithub = faGithub
  faLinkedin = faLinkedin
  faTelegram = faTelegram
  faSignOutAlt = faSignOutAlt
  buttons = []
  fabTogglerState = 'inactive'

  activeUrl: string = ''
  constructor(private router: Router, private authService: AuthService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.activeUrl = event.url
      }
    })
  }

  @Input() menuArray
  ngOnInit() {
    this.onToggleFab()
  }

  showItems() {
    this.fabTogglerState = 'active'
  }

  hideItems() {
    this.fabTogglerState = 'inactive'
  }

  degree = 0
  onToggleFab() {
    this.degree += 180
    this.fabTogglerState == 'active' ? this.hideItems() : this.showItems()
  }

  goToRoute(btn) {
    this.router.navigateByUrl(`/${btn.link}`)
  }

  logout() {
    this.authService.logout()
    this.authService.routeToHome()
  }

  navigate(type) {
    switch (type) {
      case 'mail':
        window.location.href = 'mailto:sina13781999@gmail.com'
        break
      case 'telegram':
        window.open('https://web.telegram.org/#/im?p=%40sina_ht')
        break
      case 'linkedin':
        window.open('http://www.linkedin.com/in/sina-hatami')
        break
      case 'github':
        window.open('http://www.github.com/sinahatami')
        break
    }
  }
}
