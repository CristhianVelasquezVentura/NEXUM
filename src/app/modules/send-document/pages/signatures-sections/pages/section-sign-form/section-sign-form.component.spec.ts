import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSignFormComponent } from './section-sign-form.component';

describe('SectionSignFormComponent', () => {
  let component: SectionSignFormComponent;
  let fixture: ComponentFixture<SectionSignFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionSignFormComponent]
    });
    fixture = TestBed.createComponent(SectionSignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
