import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.clear()
    let linkElement = '<a href="http://github.com/sinahatami/resume-ui">github</a>'
    this.toastr.info(`fork me on ${linkElement}`, 'Fork Me!', {
      positionClass: 'toast-bottom-right',
      enableHtml: true,
      progressBar: true,
      timeOut: 15000,
      extendedTimeOut: 10000
    })
  }

  changeScroll(element) {
    element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

}
