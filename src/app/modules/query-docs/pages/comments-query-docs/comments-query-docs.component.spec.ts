import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsQueryDocsComponent } from './comments-query-docs.component';

describe('CommentsQueryDocsComponent', () => {
  let component: CommentsQueryDocsComponent;
  let fixture: ComponentFixture<CommentsQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsQueryDocsComponent]
    });
    fixture = TestBed.createComponent(CommentsQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
