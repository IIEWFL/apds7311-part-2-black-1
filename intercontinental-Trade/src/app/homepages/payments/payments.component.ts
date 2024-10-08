import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MakePaymentsComponent } from 'src/app/components/make-payments/make-payments.component';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

  array!:any;
  user!:any

  constructor(private shared: SharedService, private api: ApiService, private dialog: MatDialog){
    this.user = shared.get('session', 'currentUser')
    this.api.findTransaction(`/find-transactions/${this.user.data.idNumber}`)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.array = res
      },
      error: (err: any) => console.log("No data", err)
      
    })
  }

  openPayments(){
    this.dialog.open(MakePaymentsComponent, {disableClose: true})
  }

}
