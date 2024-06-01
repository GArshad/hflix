import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //new way of injecting services in angular
  private userService = inject(UserService);
  private router =  inject(Router);
  //creating reactive form
  formLogin: FormGroup;

  constructor () {
    this.formLogin = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email] //new angular approach for setting validatiors
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
  }

  onSubmit () {
    this.userService.login(this.formLogin.value)
      .then(response => {
        this.router.navigate([ '/home' ]);
      })
      .catch(error => console.log(error));
  }

  onClick () {
    this.userService.loginWithGoogle()
      .then(response => {
        this.router.navigate([ '/home' ]);
      })
      .catch(error => console.log(error));
  }

  /* checkcontrol for email in formLogin */
  /* get email () {
    return this.formLogin.get('email');
  }
 */
  checkControl (controlName: string, errorName: string): boolean {
    if (
      this.formLogin.get(controlName)?.hasError(errorName) &&
      this.formLogin.get(controlName)?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }
}
