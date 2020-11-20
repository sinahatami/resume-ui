import { Component, OnInit } from '@angular/core';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos'

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  faInstagram = faInstagram
  personalImg = "../../../../assets/images/personal-photo.jpg"

  constructor() { }

  ngOnInit(): void {
    AOS.init({
      duration: 2500,
    });
  }

  downloadResume() {
//    const blob = new Blob([fileSrc], { type: 'text/pdf' });
 //   const url = window.URL.createObjectURL(blob);
   // window.open(url);
  }
}
