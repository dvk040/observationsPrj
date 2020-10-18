import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js'; 

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  infoMessage = '';
  userDetails={MDF_TOKEN:'',username:''}
  tokenFromUI: string = "0123456789123456";
  hide = true;

  
  constructor(private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],    
      password: ['', [Validators.required]] 
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  encryptUsingAES256(passwordValue) {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(passwordValue), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    
    console.log(encrypted.toString())
      return encrypted.toString();
  }



  userId: any;
  mdfToken;
  public onLoginSubmit() { //(res : HttpResponse<any> ) 
    if(this.loginForm.valid){
      this.usersService.loginService(this.loginForm.value).subscribe((res) => {
        if (res.body.code == '200') {        
          this.mdfToken = res.body.data.MDF_TOKEN;
          this.userId = res.headers.get('UserId');
          this.usersService.getProfileDetails(this.userId).subscribe((details) => {
            this.userDetails = details.data;           
            this.userDetails.MDF_TOKEN = this.mdfToken.toString() 
            console.log(this.userDetails )
            this.usersService.userDetails.next(this.userDetails);
            localStorage.setItem('usermail', this.userDetails.username);
            this.authService.login(this.loginForm.value);
            this.router.navigate(['/deviceListView']);
          });

        }
        console.log(res);
        
        },(err) => {
          this.infoMessage = err.error.message; 
          this.openModal()
        })
    }
     

    
  }

  openModal() {
    $('#openModal').modal('show');
  }
  
}
