import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturesGroupComponent } from './signatures-group.component';

describe('SignaturesGroupComponent', () => {
  let component: SignaturesGroupComponent;
  let fixture: ComponentFixture<SignaturesGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignaturesGroupComponent]
    });
    fixture = TestBed.createComponent(SignaturesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
