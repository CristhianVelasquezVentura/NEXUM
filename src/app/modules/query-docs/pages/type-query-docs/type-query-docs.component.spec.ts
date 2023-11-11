import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeQueryDocsComponent } from './type-query-docs.component';

describe('TypeQueryDocsComponent', () => {
  let component: TypeQueryDocsComponent;
  let fixture: ComponentFixture<TypeQueryDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeQueryDocsComponent]
    });
    fixture = TestBed.createComponent(TypeQueryDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
