import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css'],
})
export class UserformComponent implements OnInit {
  role: string = '';
  edit() {
    this.service.edit(this.user).subscribe((s) => alert(s));
  }
  reset() {
    this.user = new User();
  }
  submit() {
    alert(this.role);
    this.service.save(this.user).subscribe((s) => console.log(s));
  }
  user: User = new User();
  constructor(private router: ActivatedRoute, private service: UsersService) {}
  ngOnInit(): void {
    this.router.params.subscribe((res) => {
      if (res['id']) {
        console.log(res['id']);
        this.service.getById(res['id']).subscribe((u) => (this.user = u));
      }
    });
  }
}
