import { Component, OnInit } from '@angular/core';
import { faInstagram, faTelegram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos'

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  faMailBulk = faMailBulk
  faGithub = faGithub
  faLinkedin = faLinkedin
  faTelegram = faTelegram
  personalImg = "../../../../assets/images/personal-photo.jpg"

  constructor() { }

  ngOnInit(): void {
    AOS.init({
      duration: 2500,
      disable: function () {
        var maxWidth = 800;
        return window.innerWidth < maxWidth;
      }
    });
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
