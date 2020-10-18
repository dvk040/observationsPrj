import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
declare var $: any;
@Component({
  selector: 'app-profile',
   templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileEditForm: FormGroup;
  userdetails;
  infoMessage;
  

  constructor(private fb: FormBuilder, private router: Router ,private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.userDetails.subscribe((data) => {
      
      this.userdetails = data ;
      console.log(this.userdetails);
       
    });
    this.profileUpdate();

  }

 public profileUpdate() { 
    this.profileEditForm = this.fb.group({
      firstname: [this.userdetails.firstname, Validators.required],
      lastname: [this.userdetails.lastname, Validators.required],
      emp_id: [this.userdetails.emp_id, [Validators.required]],
      mobile: [this.userdetails.mobile, [Validators.required, Validators.pattern("^[0-9]*$")]],
      middlename: [this.userdetails.middlename],
      userId: [this.userdetails.id],
      role: [this.userdetails.role],
      status: [this.userdetails.status],
      email_id: [this.userdetails.username],
    }) 
  } 

  get f() {
    return this.profileEditForm.controls;
  }

  
  
  editDetailsModel() {     
    console.log(this.profileEditForm.value);
    $('#openModal').modal('show');
  }
 
  onUpdateDetails() {
    console.log(this.profileEditForm.value);
    this.usersService.profileUpdate(this.profileEditForm.value).subscribe((res) => {
      console.log(res)
      this.usersService.getProfileDetails(this.userdetails.id).subscribe((updatedData) => {     
        console.log(updatedData.data)
        this.userdetails = updatedData.data;
        console.log(this.userdetails)      
      })
      $('#openModal').modal('hide');
      this.infoMessage = res.message; 
      $('#messageModal').modal('show');
    }, (err) => {     
        console.log(err)
        //this.infoMessage = err.error.message; 
          this.openErrorModal()
    })
  }

  openErrorModal() {
    $('#messageModal').modal('show');
  }

}
