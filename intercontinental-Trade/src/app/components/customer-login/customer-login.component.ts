import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent {

  constructor(private snackbar: MatSnackBar, private location: Location, private router: Router, private api: ApiService, private shared: SharedService){}

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(4)]),
    accountNumber: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  })

  goBack(){
    this.location.back()
  }

  goToSignUp() {
    this.router.navigate(['/customer-register'])
  }

  login() {
    const formdata = this.loginForm.value
    console.log(formdata);
    this.api.login(formdata)
    .subscribe({
      next: (res: any) => {
        console.log('response', res)
        if (res) {
          this.snackbar.open('Login Succussful', 'Ok', { duration: 3000 })
          this.shared.set('session', 'currentUser', res)
          this.shared.set('session', 'token', res.token)
          this.router.navigate(['/customer-home/wallet'])
        } else {
          this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
        }
      },
      error: (err: any) => this.snackbar.open(`Error: ${err}`, "ok", {duration: 3000})
  })
  }
}
