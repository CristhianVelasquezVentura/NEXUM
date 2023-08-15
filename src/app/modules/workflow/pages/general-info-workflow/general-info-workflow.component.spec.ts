import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoWorkflowComponent } from './general-info-workflow.component';

describe('GeneralInfoWorkflowComponent', () => {
  let component: GeneralInfoWorkflowComponent;
  let fixture: ComponentFixture<GeneralInfoWorkflowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInfoWorkflowComponent]
    });
    fixture = TestBed.createComponent(GeneralInfoWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
