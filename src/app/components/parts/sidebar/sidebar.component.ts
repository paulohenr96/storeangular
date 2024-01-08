import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  ngOnInit(): void {
    this.role = localStorage.getItem('roles')?.includes('admin')
      ? 'ADMIN'
      : 'USER';
  }

  role: string = '';
}
