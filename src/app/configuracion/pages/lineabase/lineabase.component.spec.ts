import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineabaseComponent } from './lineabase.component';

describe('LineabaseComponent', () => {
  let component: LineabaseComponent;
  let fixture: ComponentFixture<LineabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
