import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [UserService],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  titleAlert: string = 'This field is required';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
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
      : '';
  }

  getErrorPassword() {
    return this.signInForm?.get('password')?.hasError('required')
      ? this.titleAlert
      : '';
  }

  onSubmit(user: User) {
    try {
      this.userService.signIn(user).subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/auction']);
      });
    } catch (err) {}
  }
}
