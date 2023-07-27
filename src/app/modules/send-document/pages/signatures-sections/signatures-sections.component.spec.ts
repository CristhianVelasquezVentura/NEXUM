import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturesSectionsComponent } from './signatures-sections.component';

describe('SignaturesSectionsComponent', () => {
  let component: SignaturesSectionsComponent;
  let fixture: ComponentFixture<SignaturesSectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignaturesSectionsComponent]
    });
    fixture = TestBed.createComponent(SignaturesSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
