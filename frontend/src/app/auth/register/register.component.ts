import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onRegister(form: { value: any }): void {
    // Verificar que las contraseñas coincidan
    if (form.value.password !== form.value.confirmPassword) {
      // Mostrar un mensaje de error
      alert('Las contraseñas no coinciden');
      return;
    }

    this.authService.register(form.value).subscribe(
      (res) => {
        alert('Usuario registrado con éxito');
        this.router.navigateByUrl('/auth/login');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 409 && error.error === 'Email already exist') {
          alert('El correo electrónico ya está registrado');
        } else {
          // Manejar otros errores si es necesario
          alert('Ocurrió un error durante el registro');
        }
      }
    );
  }

  login() {
    this.router.navigateByUrl('/auth/login');
  }
}
