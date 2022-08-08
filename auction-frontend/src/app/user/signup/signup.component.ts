import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserService],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
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
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.checkPassword]],
    });
  }

  checkInUseEmail(control: any): any {
    try {
      let exist = this.userService
        .checkEmail(control.value)
        .subscribe((res) => res);
      let result = exist ? { alreadyInUse: true } : null;
      return { alreadyInUse: true };
    } catch (err) {}
  }

  checkPassword(control: any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  getErrorEmail() {
    return this.signUpForm?.get('email')?.hasError('required')
      ? this.titleAlert
      : this.signUpForm?.get('email')?.hasError('pattern')
      ? 'Not a valid emailaddress'
      : this.signUpForm?.get('email')?.hasError('alreadyInUse')
      ? 'This emailaddress is already in use'
      : '';
  }

  getErrorPassword() {
    return this.signUpForm?.get('password')?.hasError('required')
      ? this.titleAlert
      : this.signUpForm?.get('password')?.hasError('requirements')
      ? 'Password needs to be at least eight characters, one uppercase letter and one number'
      : '';
  }

  onSubmit(user: User) {
    if (!this.signUpForm.valid) return;
    try {
      this.userService.signup(user).subscribe((res) => {
        this.router.navigate(['user/signin']);
      });
    } catch (err) {}
  }
}