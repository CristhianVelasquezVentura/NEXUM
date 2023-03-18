import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidSignComponent } from './valid-sign.component';

describe('ValidSignComponent', () => {
  let component: ValidSignComponent;
  let fixture: ComponentFixture<ValidSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidSignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
