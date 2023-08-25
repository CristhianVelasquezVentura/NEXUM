import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroQueryDocsComponent } from './intro-query-docs.component';

describe('IntroQueryDocsComponent', () => {
  let component: IntroQueryDocsComponent;
  let fixture: ComponentFixture<IntroQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntroQueryDocsComponent]
    });
    fixture = TestBed.createComponent(IntroQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
