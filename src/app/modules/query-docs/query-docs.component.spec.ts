import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryDocsComponent } from './query-docs.component';

describe('QueryDocsComponent', () => {
  let component: QueryDocsComponent;
  let fixture: ComponentFixture<QueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueryDocsComponent]
    });
    fixture = TestBed.createComponent(QueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
