import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpConfigComponent } from './otp-config.component';

describe('OtpConfigComponent', () => {
  let component: OtpConfigComponent;
  let fixture: ComponentFixture<OtpConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpConfigComponent]
    });
    fixture = TestBed.createComponent(OtpConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
