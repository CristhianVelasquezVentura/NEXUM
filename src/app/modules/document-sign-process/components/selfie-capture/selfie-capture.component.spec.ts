import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfieCaptureComponent } from './selfie-capture.component';

describe('SelfieCaptureComponent', () => {
  let component: SelfieCaptureComponent;
  let fixture: ComponentFixture<SelfieCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfieCaptureComponent]
    });
    fixture = TestBed.createComponent(SelfieCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
