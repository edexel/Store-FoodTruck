import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodtruckComponent } from './list-foodtruck.component';

describe('ListFoodtruckComponent', () => {
  let component: ListFoodtruckComponent;
  let fixture: ComponentFixture<ListFoodtruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodtruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodtruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
