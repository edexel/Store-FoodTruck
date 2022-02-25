import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListToysComponent } from './list-toys.component';

describe('ListToysComponent', () => {
  let component: ListToysComponent;
  let fixture: ComponentFixture<ListToysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListToysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListToysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
