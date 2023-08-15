import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkflowsComponent } from './list-workflows.component';

describe('ListWorkflowsComponent', () => {
  let component: ListWorkflowsComponent;
  let fixture: ComponentFixture<ListWorkflowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWorkflowsComponent]
    });
    fixture = TestBed.createComponent(ListWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
