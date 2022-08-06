import { SigninService } from './services/signin.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [SigninService],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  titleAlert: string = 'This field is required';

  constructor(
    private fb: FormBuilder,
    private signInService: SigninService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.signInForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern(emailregex)],
        //this.checkInUseEmail,
      ],
      password: ['', [Validators.required]],
    });
  }

  checkPassword(control: any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  getErrorEmail() {
    return this.signInForm?.get('email')?.hasError('required')
      ? this.titleAlert
      : this.signInForm?.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : '';
  }

  getErrorPassword() {
    return this.signInForm?.get('password')?.hasError('required')
      ? this.titleAlert
      : this.signInForm?.get('password')?.hasError('requirements')
      ? 'Password needs to be at least eight characters, one uppercase letter and one number'
      : '';
  }

  onSubmit(user: User) {
    try {
      this.signInService.signIn(user).subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      });
    } catch (err) {}
  }
}
