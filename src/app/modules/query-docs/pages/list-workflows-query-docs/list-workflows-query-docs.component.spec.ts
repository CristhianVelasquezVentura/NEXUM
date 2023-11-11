import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkflowsQueryDocsComponent } from './list-workflows-query-docs.component';

describe('ListWorkflowsQueryDocsComponent', () => {
  let component: ListWorkflowsQueryDocsComponent;
  let fixture: ComponentFixture<ListWorkflowsQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWorkflowsQueryDocsComponent]
    });
    fixture = TestBed.createComponent(ListWorkflowsQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
