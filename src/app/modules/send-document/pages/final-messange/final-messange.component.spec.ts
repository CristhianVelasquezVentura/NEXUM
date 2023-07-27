import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMessangeComponent } from './final-messange.component';

describe('FinalMessangeComponent', () => {
  let component: FinalMessangeComponent;
  let fixture: ComponentFixture<FinalMessangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalMessangeComponent]
    });
    fixture = TestBed.createComponent(FinalMessangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
