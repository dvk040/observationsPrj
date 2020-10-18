import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.css']
})
export class EditRegisterComponent implements OnInit {
  usersCollection;
  profileEditForm: FormGroup;
  infoMessage;
  emailId = '';
  editRowData;
  totalPages;
  page: number = 1;
  userRole;
  statusDropdown;
  rowEmail;
  rowDetails;
  itemsPerPage = 10; 

  constructor(private usersService: UsersService,private fb: FormBuilder) { }

  ngOnInit() {
    this.usersList();
    this.profileUpdate();
    // this.statusDropdown = [
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
      this.userRole = role.data.roleList;
      this.statusDropdown = role.data.statusList;
    })
  }
  usersList() { 
    const userListPayload = {
            pageNumber: this.page,
            email:this.emailId
    }
    this.usersService.getUsersList(userListPayload).subscribe((details) => {   
      this.usersCollection = details.data.records;  
      this.totalPages = Math.ceil(details.data.totalRecords / 10)    
    })
  }

  
  editRowDetails(editRow) {
    this.editRowData = editRow;
    this.profileUpdate();
    $('#openModal').modal('show');
  }
  public profileUpdate() {
    this.profileEditForm = this.fb.group({
      firstname: [this.editRowData?.firstname, Validators.required],
      middlename: [this.editRowData?.middlename],
      lastname: [this.editRowData?.lastname, Validators.required],
      emp_id: [this.editRowData?.emp_id, Validators.required],
      mobile: [this.editRowData?.mobile, [Validators.required, Validators.pattern("^[0-9]*$")]],     
      userId: [this.editRowData?.id],
      email_id: [this.editRowData?.username],
      role: [this.editRowData?.role,Validators.required],
      status: [this.editRowData?.status.toString(),Validators.required],
    }) 
  } 

  get f() {
    return this.profileEditForm.controls;
  }
  onUpdateDetails() {
    const userListPayload = {
      pageNumber: this.page,
      email:this.emailId
    }
    this.profileEditForm.value.role = parseInt(this.profileEditForm.value.role);
   // this.profileEditForm.value.status = parseInt(this.profileEditForm.value.status);
    console.log(this.profileEditForm.value)
    this.usersService.profileUpdate(this.profileEditForm.value).subscribe((res) => {
      this.usersService.getUsersList(userListPayload).subscribe((updatedData) => {     
        this.usersCollection = updatedData.data.records;     
        this.totalPages = Math.ceil(updatedData.data.totalRecords / 10) 
      })
      $('#openModal').modal('hide');
      this.infoMessage = res.message; 
      $('#messageModal').modal('show');
    }, (err) => {     
        console.log(err)
        this.infoMessage = err.error.message; 
          this.openErrorModal()
    })
  }

  
  pagenationList(value) {
    let page = this.page;
    if (value == "INC") {
    //  page++;
      this.page++
    } else if (value == "DEC") {     
     // page--;
      this.page--
    } else {
      this.totalPages = 0;
      page = 0;
    }
    const userListPayload = {
      pageNumber: this.page,
      email:this.emailId
}  
    this.usersService.getUsersList(userListPayload).subscribe((updatedData) => {     
      this.usersCollection = updatedData.data.records;
      this.totalPages = Math.ceil(updatedData.data.totalRecords / 10) 
           
    }) 
}

  
  searchFun(ketvalue) {
   const userListPayload = {
            pageNumber: this.page,
            email:this.emailId
   }
    this.usersService.getUsersList(userListPayload).subscribe((updatedData) => {     
     this.usersCollection = updatedData.data.records;      
     this.totalPages = Math.ceil(updatedData.data.totalRecords / 10)  
  })
  
  }
   
  onClickDelete(user) {
    this.rowDetails = user;
    this.rowEmail = user.username;
    $('#deleteModal').modal('show');
    
  }

  deleteRowDetails() {
    const payload =  {  
                        action: 'archive', 
                        recordId: this.rowDetails.id
    }
    
    const userListPayload = {
      pageNumber: this.page,
      email:this.emailId
    }
    this.usersService.deleteUser(payload).subscribe((data) => {     
      this.usersService.getUsersList(userListPayload).subscribe((updatedData) => {     
        this.usersCollection = updatedData.data.records;   
        this.totalPages = Math.ceil(updatedData.data.totalRecords / 10) 
        $('#deleteModal').modal('hide');
      this.infoMessage = data.message; 
      $('#messageModal').modal('show');
        
      }) 
           
    }) 
  }
//   toDoAction(user) {
//     user.status = user.status == 0? 'active':'inactive'
//     const payload =  {  
//                         action: user.status, 
//                         recordId: user.id
//     }
//     const userListPayload = {
//       pageNumber: this.page,
//       email:this.emailId
// }
//     this.usersService.deleteUser(payload).subscribe((data) => {     
//       this.usersService.getUsersList(userListPayload).subscribe((updatedData) => {     
//         this.usersCollection = updatedData.data.records;   
//         this.totalPages = Math.ceil(updatedData.data.totalRecords / 10) 
//       }) 
           
//     }) 
//   }

  openErrorModal() {
    $('#messageModal').modal('show');
  }


}
