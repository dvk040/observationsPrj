import { Component, OnInit, Input, OnDestroy, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TestData } from "../../models/testData";

import { Device } from "../../models/device";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingService } from "../../services/loading.service";
import { MatAutocomplete } from "@angular/material/autocomplete";

import { DeviceService } from "../../services/device.service";
import { ApiService } from "../../services/api.service";
import { map, startWith } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";
import { UsersService } from 'src/app/services/users.service';
var self;
const languages = [
  { code: "java", displayName: "Java" },
  // { code: "nodejs", displayName: "Nodejs" },
  // { code: "python", displayName: "Python" },
];
@Component({
  selector: "new-test-dialog",
  templateUrl: "newTestDialog.html",
  styleUrls: ["./newTestDialog.css"],
})
export class NewTestCreateDialog {
  currentDevice: Device;
  isModalShown = true;
  modalApkForm1;
  modalApkForm2;
  modalApkForm3;
  apk;
  testFile;
  languages = languages;
  submittedForm = 0;
  options: string[] = ["One", "Two", "Three"];
  filteredProjectName: Observable<string[]>;
  userdetails;

  constructor(private usersService: UsersService,
    public dialogRef: MatDialogRef<NewTestCreateDialog>,
    private deviceService: DeviceService,
    private api: ApiService,
    private loader: LoadingService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    self = this;
    this.options = data.projectList;
    this.currentDevice = this.deviceService.currentDevice;
    this.modalApkForm1 = this.formBuilder.group({
      testName: ["", [Validators.required]],
      testDescription: [""],
      projectName: ["", [Validators.required]],
    });
    this.modalApkForm2 = this.formBuilder.group({
      apk: [""],
      packageName: ["",[Validators.required]],
    });
    this.modalApkForm3 = this.formBuilder.group({
      language: ["", [Validators.required]],
      testFile: ["", [Validators.required]],
    });
    this.modalApkForm2.controls.packageName.valueChanges.subscribe((value) => {
      if (this.modalApkForm2.controls.apk.value && value != null) {
        this.modalApkForm2.controls.apk.reset();
        this.apk = "";
      }
    });
    this.modalApkForm2.controls.apk.valueChanges.subscribe((value) => {
      if (this.modalApkForm2.controls.packageName.value && value != null) {
        this.modalApkForm2.controls.packageName.reset();
      }
    });
    this.filteredProjectName = this.modalApkForm1.controls.projectName.valueChanges.pipe(
      startWith(""),
      map((value: string) => {
        return this._filter(value);
      })
    );

    
  }
  get f() {
    return this.modalApkForm2.controls;
  }

  ngOnInit() { 
    this.usersService.userDetails.subscribe((data) => {
      this.userdetails = data ; //id
      console.log(this.userdetails);
       
    });
  }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    let a = this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
    console.log(a);
    return a;
  }
  get modalApkForm2Control() {
    return this.modalApkForm2.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSelectedFile(event, fileName) {
    if (event.target.files.length > 0) {
      this[fileName] = event.target.files[0];
    }
  }
  toggleModal() {
    this.isModalShown = !this.isModalShown;
    if (this.isModalShown == true) {
      this.submittedForm = 0;
      this.modalApkForm1.reset();
      this.modalApkForm2.reset();
      this.modalApkForm3.reset();
    }
  }
  onSubmit(value) {
    if (value == 1) {
      this.checkProjectTestName(
        this.modalApkForm1.value.projectName,
        this.modalApkForm1.value.testName,
        value
      );
      return;
    }
    this.submittedForm = value;
    if (this.submittedForm == 3) {
      this.submittedForm = 2;
      const formData = new FormData();

      formData.append("name", this.modalApkForm1.value.testName);
      formData.append("description", this.modalApkForm1.value.testDescription);
      formData.append("apk", this.apk);
      formData.append("packageName", this.modalApkForm2.value.packageName);
      formData.append("language", this.modalApkForm3.value.language);
      formData.append("testFile", this.testFile);
      formData.append("serialNo", this.currentDevice.serialNo);
      formData.append("platform", this.currentDevice.platform);
      formData.append("projectName", this.modalApkForm1.value.projectName);

console.log(formData)

      let reqData = {
        data: formData,
        endPoint: "test/create",
        userid: this.userdetails.id.toString(),
        MDF_TOKEN: this.userdetails.MDF_TOKEN
      };
      this.loader.showLoader();

      this.usersService.submitAPKForms(reqData).subscribe(
        (res: any) => {
          this.loader.hideLoader();
          console.log(res);
          this.dialogRef.close({ dataCreated: 1 });
          if (res.message) {
            alert(res.message);
          } else {
            alert(res.error);
          }
        },
        (err) => {
          this.loader.hideLoader();
          alert("Something went wrong..");
        }
      );
    }
  }
  checkProjectTestName(projectName, testName, formValue) {
    let reqData = {
      data: { projectName: projectName, name: testName },
      endPoint: "tests/checkProjectTestName",
      userid: this.userdetails.id.toString(),
      MDF_TOKEN: this.userdetails.MDF_TOKEN
    };
    this.loader.showLoader();

    this.usersService.checkProjectTest(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();
        console.log(res);
        if (res.data && res.data.isUniqueName) {
          this.submittedForm = formValue;
        } else {
          alert("Please enter unique test Name for this project");
        }
      },
      (err) => {
        this.loader.hideLoader();

        alert("Something went wrong..");
      }
    );
  }
  onBackPress() {
    this.submittedForm--;
  }
  displayFunc(value) {
    console.log(value, self);
    let ind = self.languages.findIndex((item) => {
      return item.code == value;
    });
    return ind != -1 ? self.languages[ind].displayName : "";
  }
}
