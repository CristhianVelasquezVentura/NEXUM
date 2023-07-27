import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReviewComponent } from './document-review.component';

describe('DocumentReviewComponent', () => {
  let component: DocumentReviewComponent;
  let fixture: ComponentFixture<DocumentReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentReviewComponent]
    });
    fixture = TestBed.createComponent(DocumentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
