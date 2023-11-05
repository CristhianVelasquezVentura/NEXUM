import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewQueryDocsComponent } from './tree-view-query-docs.component';

describe('TreeViewQueryDocsComponent', () => {
  let component: TreeViewQueryDocsComponent;
  let fixture: ComponentFixture<TreeViewQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeViewQueryDocsComponent]
    });
    fixture = TestBed.createComponent(TreeViewQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
