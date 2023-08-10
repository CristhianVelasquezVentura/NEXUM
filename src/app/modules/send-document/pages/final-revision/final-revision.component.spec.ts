import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalRevisionComponent } from './final-revision.component';

describe('FinalRevisionComponent', () => {
  let component: FinalRevisionComponent;
  let fixture: ComponentFixture<FinalRevisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalRevisionComponent]
    });
    fixture = TestBed.createComponent(FinalRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
