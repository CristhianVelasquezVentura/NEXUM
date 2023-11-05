import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDocQueryDocsComponent } from './detail-doc-query-docs.component';

describe('DetailDocQueryDocsComponent', () => {
  let component: DetailDocQueryDocsComponent;
  let fixture: ComponentFixture<DetailDocQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDocQueryDocsComponent]
    });
    fixture = TestBed.createComponent(DetailDocQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
