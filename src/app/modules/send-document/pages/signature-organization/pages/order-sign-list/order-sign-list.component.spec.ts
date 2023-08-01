import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSignListComponent } from './order-sign-list.component';

describe('OrderSignListComponent', () => {
  let component: OrderSignListComponent;
  let fixture: ComponentFixture<OrderSignListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSignListComponent]
    });
    fixture = TestBed.createComponent(OrderSignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
