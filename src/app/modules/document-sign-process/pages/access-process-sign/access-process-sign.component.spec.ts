import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessProcessSignComponent } from './access-process-sign.component';

describe('AccessProcessSignComponent', () => {
  let component: AccessProcessSignComponent;
  let fixture: ComponentFixture<AccessProcessSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessProcessSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessProcessSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
