import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { WalletComponent } from './homepages/wallet/wallet.component';
import { StatisticsComponent } from './homepages/statistics/statistics.component';
import { PaymentsComponent } from './homepages/payments/payments.component';
import { NotificationsComponent } from './homepages/notifications/notifications.component';
import { SettingsComponent } from './homepages/settings/settings.component';

const routes: Routes = [
  {path: '', redirectTo: "/landing", pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'customer-register', component: CustomerRegisterComponent},
  {path: 'customer-login', component: CustomerLoginComponent},
  {path: 'customer-home', component: CustomerHomeComponent, children: [
    {path: 'wallet', component:WalletComponent},
    {path: 'statistics', component:StatisticsComponent},
    {path: 'payments', component:PaymentsComponent},
    {path: 'notifications', component:NotificationsComponent},
    {path: 'settings', component:SettingsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
