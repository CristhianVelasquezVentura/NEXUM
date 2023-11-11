import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSignDocQueryDocsComponent } from './status-sign-doc-query-docs.component';

describe('StatusSignDocQueryDocsComponent', () => {
  let component: StatusSignDocQueryDocsComponent;
  let fixture: ComponentFixture<StatusSignDocQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusSignDocQueryDocsComponent]
    });
    fixture = TestBed.createComponent(StatusSignDocQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
