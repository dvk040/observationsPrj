import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import * as CryptoJS from 'crypto-js'; 
declare var $: any;


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePWDForm: FormGroup;
  isError: boolean = false;
  tokenFromUI: string = "0123456789123456";
  infoMessage; 
  hide = true; hideNew = true; hideCnf = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
    ) { } 

  userEmail = '';
  ngOnInit() {
    this.changePWDFormFun();
    this.userEmail = localStorage.getItem('usermail');
    console.log(this.userEmail)
  }

  changePWDFormFun() {
    this.changePWDForm = this.fb.group({    
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPWD: ['', Validators.required],
    });
  }
  get f() {
    return this.changePWDForm.controls;
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
  onChangePWDSubmit() {
    console.log(this.changePWDForm.value)
    if (this.changePWDForm.value.oldPassword !== this.changePWDForm.value.newPassword) {
      if (this.changePWDForm.value.newPassword == this.changePWDForm.value.confirmPWD) {
        // let old_password = this.encryptUsingAES256(this.changePWDForm.value.oldPassword);
        // let new_password = this.encryptUsingAES256(this.changePWDForm.value.newPassword);
        let old_password = this.changePWDForm.value.oldPassword;
        let new_password = this.changePWDForm.value.newPassword;

        let data = {
          username: this.userEmail,
          old_password: old_password,
          new_password: new_password 
        }
        console.log(data);
        this.usersService.changePWDService(data).subscribe((res) => {
         // this.changePWDForm.reset();
          this.infoMessage = res.message;
          this.isError = false;
          this.openModal()   
        }, (err) => {
          console.log(err)
         // this.infoMessage = err.error.message;
          this.infoMessage = err.message;
          this.isError = true;
          this.openModal()
        })
      } else {
        this.infoMessage = "New password & Confirm password are not same";
        this.isError = true;
        this.openModal()
      }

    }else {
      this.infoMessage = " Old password & New password should not be same";
      this.isError = true;
      this.openModal()
    }

  }


  openModal() {
    $('#openModal').modal('show');
  }



}
