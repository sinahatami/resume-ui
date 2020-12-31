import { Component, OnInit } from '@angular/core';
import { faGithub, faInstagram, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent implements OnInit {
  faMailBulk = faMailBulk
  faTelegram = faTelegram
  faGithub = faGithub
  faLinkedin = faLinkedin
  faInstagram = faInstagram

  constructor() { }

  ngOnInit(): void {
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
        window.open('http://www.inkedin.com/in/sina-hatami')
        break
      case 'github':
        window.open('http://www.igithub.com/sinahatami')
        break
    }
  }

}
