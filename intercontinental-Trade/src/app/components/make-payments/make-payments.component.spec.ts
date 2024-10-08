import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakePaymentsComponent } from './make-payments.component';

describe('MakePaymentsComponent', () => {
  let component: MakePaymentsComponent;
  let fixture: ComponentFixture<MakePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakePaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
