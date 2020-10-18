import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy  {
  isLoggedIn$: Observable<boolean>;
  userdetails: any;

  constructor(private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.usersService.userDetails.subscribe((data) => {
      this.userdetails = data; 
      console.log(this.userdetails)
       
     });
  }

  ngOnDestroy() { 
    this.userdetails.unsubscribe();
    console.log(this.userdetails)
}

}
