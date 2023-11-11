import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardQueryDocsComponent } from './dashboard-query-docs.component';

describe('DashboardQueryDocsComponent', () => {
  let component: DashboardQueryDocsComponent;
  let fixture: ComponentFixture<DashboardQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardQueryDocsComponent]
    });
    fixture = TestBed.createComponent(DashboardQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
