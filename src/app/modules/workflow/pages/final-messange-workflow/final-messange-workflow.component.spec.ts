import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMessangeWorkflowComponent } from './final-messange-workflow.component';

describe('FinalMessangeWorkflowComponent', () => {
  let component: FinalMessangeWorkflowComponent;
  let fixture: ComponentFixture<FinalMessangeWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalMessangeWorkflowComponent]
    });
    fixture = TestBed.createComponent(FinalMessangeWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
