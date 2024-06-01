import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor (private userService: UserService, private router: Router) {
    this.formRegister = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    })
  }

  ngOnInit(): void {}

  onSubmit () {
    this.userService.register(this.formRegister.value)
      .then(response => {
        console.log(response);
        this.router.navigate([ '/login' ]);
      })
      .catch(error => console.log(error));
  }

}
