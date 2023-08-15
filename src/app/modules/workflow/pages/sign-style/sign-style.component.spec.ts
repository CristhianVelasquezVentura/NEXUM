import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignStyleComponent } from './sign-style.component';

describe('SignStyleComponent', () => {
  let component: SignStyleComponent;
  let fixture: ComponentFixture<SignStyleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignStyleComponent]
    });
    fixture = TestBed.createComponent(SignStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
