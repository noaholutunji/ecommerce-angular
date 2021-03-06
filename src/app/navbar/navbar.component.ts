import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../service/account.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated = true;
  private userSub: Subscription;

  constructor(
    private authService: AccountService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
