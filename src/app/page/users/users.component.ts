import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  list: User[] = [];
  constructor(private service: UsersService, private router: Router) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('admin') === 'false')
      this.router.navigate(['/home']);
    this.getAll();
  }
  delete(id: Number) {
    this.service.deleteById(id).subscribe((s) => this.getAll());
  }
  getAll() {
    this.service.getAll().subscribe((data) => {
      console.log(data);
      this.list = data;
    });
  }
}
