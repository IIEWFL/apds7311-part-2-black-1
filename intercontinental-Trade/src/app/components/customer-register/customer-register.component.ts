import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent {

  hidepassword = true

  registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    idNumber: new FormControl('', [Validators.minLength(13), Validators.required, Validators.pattern(/^[0-9]{13}$/)]),
    accountNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(private location: Location, private router: Router, private api: ApiService, private shared: SharedService, private snackbar: MatSnackBar){}


  goBack(){
    this.location.back()
  }

  goToSignIn() {
    this.router.navigate(['/customer-login'])
  }

  register(){
    const registerData = this.registerForm.value
    console.log(registerData);
    this.api.register('/register', registerData)
    .subscribe({
      next: (res: any) => {
        console.log('response', res)
        if (res) {
          this.snackbar.open('Register Succussful', 'Ok', { duration: 3000 })
          this.router.navigate(['/customer-login'])
        } else {
          this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
        }
      },
      error: (err: any) => console.log('Error', err),
  })
}

  show(){
    if(this.hidepassword) {
      this.hidepassword = false
    } else {
      this.hidepassword = true
    }
  }

}
