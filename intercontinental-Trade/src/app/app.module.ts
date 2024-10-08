import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LandingComponent } from './components/landing/landing.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { WalletComponent } from './homepages/wallet/wallet.component';
import { AmountComponent } from './components/amount/amount.component';
import { StatisticsComponent } from './homepages/statistics/statistics.component';
import { PaymentsComponent } from './homepages/payments/payments.component';
import { MakePaymentsComponent } from './components/make-payments/make-payments.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotificationsComponent } from './homepages/notifications/notifications.component';
import { SettingsComponent } from './homepages/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CustomerLoginComponent,
    CustomerRegisterComponent,
    CustomerHomeComponent,
    WalletComponent,
    AmountComponent,
    StatisticsComponent,
    PaymentsComponent,
    MakePaymentsComponent,
    NotificationsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
