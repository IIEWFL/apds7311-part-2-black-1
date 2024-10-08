import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-make-payments',
  templateUrl: './make-payments.component.html',
  styleUrls: ['./make-payments.component.scss']
})
export class MakePaymentsComponent {

  user!:any
  constructor(private shared: SharedService, private api: ApiService,private dialogRef: MatDialogRef<MakePaymentsComponent>, private snackbar: MatSnackBar, private router: Router){
    this.user = this.shared.get('session', 'currentUser')
  }

  paymentForm = new FormGroup({
    amount: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    accountNumber: new FormControl('', [Validators.required, Validators.minLength(11)]),
    code: new FormControl('', [Validators.required, Validators.minLength(11)]),
    idNumber: new FormControl('')
  })

  cancel(){
    this.dialogRef.close();
  }

  submit() {
    this.paymentForm.value.idNumber = this.user.data.idNumber
    const data = this.paymentForm.value
    console.log(data);
    this.api.genericPost('/add-transactions', data)
    .subscribe({
      next: (res: any) => {
        console.log('response', res)
        if (res) {
          this.snackbar.open('Payment Made', 'Ok', { duration: 3000 })
          this.dialogRef.close();
          this.router.navigate(['/customer-home/payments'])
        } else {
          this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
        }
      },
      error: (err: any) => this.snackbar.open(`Error: ${err}`, "ok", {duration: 3000})
  })
  }

}
