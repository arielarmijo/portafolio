import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  logout = false;
  error = false;
  message = '';
  credentials: any = {username: '', password: ''};
  subscription$!: Subscription;

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.subscription$ = this.activatedRouter.queryParamMap.subscribe(params => {
      this.logout = params.get('logout') === 'true';
      if (this.logout) 
        this.message = 'Se ha cerrado la sesión.';
      this.error = params.get('error') === 'true';
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  submit() {
    this.auth.login(this.credentials).then(status => {
      if (status == 401) {
        this.loginError('Usuario y/o contraseña inválidos.');
      }
      if (status == 204) {
        this.router.navigateByUrl('/admin');
      }
    }, error => this.loginError('Error de conexión.'));
  }

  private loginError(message: string) {
    this.message = message;
    this.router.navigate(['/login'], {queryParams: {error: true}});
  }

}
