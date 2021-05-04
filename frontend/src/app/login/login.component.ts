import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logout?: boolean;
  error?: boolean;
  isAuthenticated = false;
  credentials: any = {username: '', password: ''};

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe(params => {
      this.logout = params.get('logout') === 'true';
      this.error = params.get('error') === 'true';
    });
  }

  submit() {
    this.auth.login(this.credentials).then(status => {
      if (status == 401)
        this.router.navigate(['/login'], {queryParams: {error: true}});
      if (status == 204)    
        this.router.navigateByUrl('/admin');
    });
  }

}
