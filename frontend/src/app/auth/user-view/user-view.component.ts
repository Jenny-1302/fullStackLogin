import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  constructor(private authServie: AuthService, private router: Router) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.logout();
    } , 4000);
  }

  logout() {
    this.authServie.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
