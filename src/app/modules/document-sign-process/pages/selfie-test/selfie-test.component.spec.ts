import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfieTestComponent } from './selfie-test.component';

describe('SelfieTestComponent', () => {
  let component: SelfieTestComponent;
  let fixture: ComponentFixture<SelfieTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfieTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfieTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
