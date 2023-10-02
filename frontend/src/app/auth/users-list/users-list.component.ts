import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: UserI[] = [];
  searchTerm: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() { 
    this.getUsers();  
  }

  getUsers(): void {
    this.authService.getUsers().subscribe((res: UserI[]) => {
      this.users = res;
    });
  }

  filterUsers(): UserI[] {
    const lowerCaseSearch = this.searchTerm.toLowerCase().trim();

    if (!lowerCaseSearch) {
      return this.users;
    }

    return this.users.filter((user) => {
      return (
        user.email.toLowerCase().includes(lowerCaseSearch)
      );
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
