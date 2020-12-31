import { AuthService } from 'src/providers/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faBars = faBars

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toggle = false
  changeToggle() {
    this.toggle = !this.toggle
  }

  reloadPage() {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }

  @Output() scrollEmit = new EventEmitter()
  scrollTo(item) {
    let el = document.getElementById(item)
    this.scrollEmit.emit(el)
  }

  navigate(url?: string) {
    localStorage.wantToRoute = url
    this.authService.navigateTo(url)
  }
}
