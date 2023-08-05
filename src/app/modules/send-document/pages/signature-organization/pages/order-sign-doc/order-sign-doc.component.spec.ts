import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSignDocComponent } from './order-sign-doc.component';

describe('OrderSignDocComponent', () => {
  let component: OrderSignDocComponent;
  let fixture: ComponentFixture<OrderSignDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSignDocComponent]
    });
    fixture = TestBed.createComponent(OrderSignDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
