import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent {

  user!:any

  constructor(private shared: SharedService, private api: ApiService, private dialogRef: MatDialogRef<AmountComponent>, private snackbar: MatSnackBar, private router: Router){
    this.user = this.shared.get('session', 'currentUser')
  }

  amountForm = new FormGroup({
    amount: new FormControl('', Validators.required)
  })

  cancel(){
    this.dialogRef.close();
  }

  addAmount() {
    const data = this.amountForm.value
    console.log(data)
    this.api.update(`/update-user/${this.user.data.accountNumber}`, data)
    .subscribe({
      next: (res: any) => {
        console.log('response', res)
        if (res) {
          this.snackbar.open('Updated balance Succussful', 'Ok', { duration: 3000 })
          this.dialogRef.close();
          this.router.navigate(['/customer-home/wallet'])
        } else {
          this.snackbar.open('Something went wrong ...', 'Ok', { duration: 3000 });
        }
      },
      error: (err: any) => this.snackbar.open(`Error: ${err}`, "ok", {duration: 3000})
  })
  }

}
