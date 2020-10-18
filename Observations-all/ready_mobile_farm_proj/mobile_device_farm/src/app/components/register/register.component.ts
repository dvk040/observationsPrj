import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  userRole: any;
  statusDropdown: any;
  infoMessage = '';

  constructor(private fb: FormBuilder,private router: Router,
    private usersService: UsersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initRegisterForm();
   // this.userRole = [{ id:'1' , role :'Admin'},  { id:'2' , role :'Super Admin'}, { id:'3' , role :'Other User'}];
    // this.statusDropdown =  [
    //   {
    //     "id": 1,
    //     "name": "Active",
    //     "value": "1"
    //   },
    //   {
    //     "id": 2,
    //     "name": "InActive",
    //     "value": "0"
    //   },
    //   {
    //     "id": 3,
    //     "name": "Archive",
    //     "value": "2"
    //   }
    // ];
    this.roleList();
  }
  roleList() {
    this.usersService.roleDropDown().subscribe((role) => {  
      console.log(role)
      this.userRole = role.data.roleList;
      this.statusDropdown = role.data.statusList;
    })
  }
  
  public initRegisterForm(){
    this.registerForm = this.fb.group({  
      emailId: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstName: ['',[Validators.required]],
      middleName: [''],
      lastName: ['',[Validators.required]],
      mobile:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      role: ['',[Validators.required]],
      employeId: ['',[Validators.required]],
      status:['',[Validators.required]]
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  onRegisterSubmit() {
    console.log(this.registerForm.value);
   // this.registerForm.value.status = parseInt(this.registerForm.value.status);
    const postData = {  
    "email_id": this.registerForm.value.emailId,
    "firstname": this.registerForm.value.firstName,
    "middlename": this.registerForm.value.middleName,
    "lastname": this.registerForm.value.lastName,
    "mobile": this.registerForm.value.mobile,
    "role": this.registerForm.value.role,
    "emp_id": this.registerForm.value.employeId,
    "status": this.registerForm.value.status
    }
    
    console.log(postData);
    this.usersService.postRegister(postData).subscribe((res) => {
      console.log(res);
      this.infoMessage = res.message; 
      this.openModal()
      this.registerForm.reset();
 
    }, (err) => {
      console.log(err);      
    });


  }

  openModal() {
    $('#openModal').modal('show');
  }



}
