import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmountComponent } from 'src/app/components/amount/amount.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {

  amount!:any
  user!:any

  constructor(private dialog: MatDialog, private shared: SharedService) {
    this.user = this.shared.get('session', 'currentUser')
    this.amount = this.user.data.balance
    console.log(this.amount);
    
  }

  addAmount(){
    this.dialog.open(AmountComponent, {
      disableClose: true // Prevent closing the dialog via escape or backdrop click
    })
  }
}
