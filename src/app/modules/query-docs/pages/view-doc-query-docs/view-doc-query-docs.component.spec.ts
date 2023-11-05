import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocQueryDocsComponent } from './view-doc-query-docs.component';

describe('ViewDocQueryDocsComponent', () => {
  let component: ViewDocQueryDocsComponent;
  let fixture: ComponentFixture<ViewDocQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocQueryDocsComponent]
    });
    fixture = TestBed.createComponent(ViewDocQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
