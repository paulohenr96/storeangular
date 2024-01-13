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
  setUserDelete(arg0: number) {
    this.idUserDelete = arg0;
  }
  list: User[] = [];
  idUserDelete: any;
  constructor(private service: UsersService, private router: Router) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('admin') === 'false')
      this.router.navigate(['/home']);
    this.getAll();
  }
  delete() {
    this.service.deleteById(this.idUserDelete).subscribe((s) => this.getAll());
  }
  getAll() {
    this.service.getAll().subscribe((data) => {
      console.log(data);
      this.list = data;
    });
  }
}
