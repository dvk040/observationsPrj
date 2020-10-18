import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
declare var $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPWDForm: FormGroup;
  infoMessage = '';
  isError: boolean = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
    this.forgotPWDfun();
  }

  forgotPWDfun() {
    this.forgotPWDForm = this.fb.group({ 
      emailid: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]]   
    });   
  }

  get f() {
    return this.forgotPWDForm.controls;
  }

  onforgotPWDSubmit() {
    let request = {
      username:this.forgotPWDForm.value.emailid
    }
     this.usersService.forgotPWDService(request).subscribe((res) => {
       console.log(res);
       this.infoMessage = res.message; 
       this.isError = false;
       this.openModal()     
     }, (err) => {  
         this.isError = true;
      this.infoMessage = err.error.message; 
      this.openModal()
  }
     )
  }

  openModal() {
    $('#openModal').modal('show');
  }

  onClickOk() {
    this.router.navigate(['/login']);
  }

}
