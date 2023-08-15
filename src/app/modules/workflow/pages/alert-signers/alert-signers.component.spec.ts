import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSignersComponent } from './alert-signers.component';

describe('AlertSignersComponent', () => {
  let component: AlertSignersComponent;
  let fixture: ComponentFixture<AlertSignersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertSignersComponent]
    });
    fixture = TestBed.createComponent(AlertSignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
