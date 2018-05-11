import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeitemComponent } from './homeitem.component';

describe('HomeitemComponent', () => {
  let component: HomeitemComponent;
  let fixture: ComponentFixture<HomeitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
