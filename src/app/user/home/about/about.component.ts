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

}
