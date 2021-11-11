import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarlinksComponent } from './sidebarlinks.component';

describe('SidebarlinksComponent', () => {
  let component: SidebarlinksComponent;
  let fixture: ComponentFixture<SidebarlinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarlinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarlinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
