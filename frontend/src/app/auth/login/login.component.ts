import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authServie: AuthService, private router: Router) { }
  showErrorMessage: boolean = false;

  ngOnInit() {
  }

  onLogin(form: { value: any }): void {
    this.authServie.login(form.value).subscribe(
      (res) => {
        if (res.dataUser.rol == 'admin') {
          this.router.navigateByUrl('/auth/list');
        }else{
          this.router.navigateByUrl('/auth/userview');
        }

      },
      (error) => {
        // Mostrar el mensaje de error cuando las credenciales son incorrectas
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    );
  }

  register() {
    this.router.navigateByUrl('/auth/register');
  }

}
