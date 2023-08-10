import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsSignGroupComponent } from './sections-sign-group.component';

describe('SectionsSignGroupComponent', () => {
  let component: SectionsSignGroupComponent;
  let fixture: ComponentFixture<SectionsSignGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionsSignGroupComponent]
    });
    fixture = TestBed.createComponent(SectionsSignGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
