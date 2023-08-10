import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureOrganizationComponent } from './signature-organization.component';

describe('SignatureOrganizationComponent', () => {
  let component: SignatureOrganizationComponent;
  let fixture: ComponentFixture<SignatureOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignatureOrganizationComponent]
    });
    fixture = TestBed.createComponent(SignatureOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
