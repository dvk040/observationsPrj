import { Component, OnInit, Input, OnDestroy, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

import { Observable, Subscription } from "rxjs";
import { Device } from "../../models/device";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoadingService } from "../../services/loading.service";
import { MatAutocomplete } from "@angular/material/autocomplete";

import { DeviceService } from "../../services/device.service";
import { ApiService } from "../../services/api.service";
import { map, startWith } from "rxjs/operators";
import { NewTestCreateDialog } from "../../dialog/newTestCreate/newTestDialog";
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver'
import { UsersService } from '../../services/users.service';

declare var $: any;

@Component({
  selector: "app-device-detail-view",
  templateUrl: "./device-detail-view.component.html",
  styleUrls: ["./device-detail-view.component.scss"],
})
export class DeviceDetailViewComponent implements OnInit, OnDestroy {

  @Input() deviceDetail;
  userdetails;
  infoMessage;
  devices;
  pause = true;
  page = 0;
  finished = false;
  isSwipeModeEnabled = false;
  isRecordModeEnabled= false;
  submittedForm = 0;
  options: string[] = ["One", "Two", "Three"];
  filteredProjectName: Observable<string[]>;

startRecordButtuon: boolean= true;
recordButton : boolean= false;

 
  tests = [];
  currentDevice: Device;
  apkForm;
  APKFile;
  responseData;
  showLoader;
  error;
  shellForm;
  shellFormError;
  browserUrl = "http://";
  searchKey = "";
  searchValue = "";
  testProjects = [];
  totalPages = 0;
  limit;
  screenFileName;
  mpFourFileName;
  recordFile;
  screenRecord;
  screenshot: any;
  saveImage: any;
  searchKeys = [
    { displayName: "Project Name", key: "projectName" },
    { displayName: "Package Name", key: "packageName" },
    { displayName: "Test Name", key: "name" },
    { displayName: "App File Name", key: "appFileNameOriginal" },
  ];

  private _docSub: Subscription;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  

  constructor(
    private deviceService: DeviceService,
    private api: ApiService,
    private loader: LoadingService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.userDetails.subscribe((data) => {
      this.userdetails = data ; 
      console.log(this.userdetails);    
    });
    this.apkForm = this.formBuilder.group({
      APKFile: ["", [Validators.required]],
    });
    this.shellForm = this.formBuilder.group({
      command: ["", [Validators.required]],
    });
    this.shellForm = this.formBuilder.group({
      command: ["", [Validators.required]],
    });

    this.currentDevice = this.deviceService.currentDevice;
    if (this.currentDevice.name) {
      this.getTestList();
      this.getTestProjectList();
    }
   
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NewTestCreateDialog, {
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      width: "450px",
      height: "400px",
      data: { projectList: this.testProjects },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.dataCreated) {
        this.getTestList();
      }
      //refresh the test list
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }

  get apkFormControl() {
    return this.apkForm.controls;
  }
  get shellCommandFormControl() {
    return this.shellForm.controls;
  }
  onSelectedFile(event, fileName) {
    if (event.target.files.length > 0) {
      this[fileName] = event.target.files[0];
    }
  }
  getTestList(value?) {
    let page = this.page;
    if (value == "increment") {
      page++;
    } else if (value == "decrement") {
      page--;
    } else {
      this.totalPages = 0;
      page = 0;
    }
    let data = {
      platform: this.currentDevice.platform,
      page: page,
    };
    if (this.searchKey && this.searchValue) {
      data[this.searchKey] = this.searchValue;
    }
    let reqData = {
      data,
      endPoint: "tests",
      userid: this.userdetails.id.toString(),
      MDF_TOKEN: this.userdetails.MDF_TOKEN
    };
    this.loader.showLoader();
    console.log(reqData)
    this.usersService.apkTestList(reqData).subscribe(
      (res: any) => {
        debugger;
        console.log(res)
        this.loader.hideLoader();
        this.showLoader = false;
      //  console.log(res);
        if (res.data) {
          if (page == 0) {
            this.totalPages = res.totalPage || 0;
            this.limit = res.limit;
          }
          if (res.data.length) {
            this.page = page;

            this.tests = res.data;
            console.log(this.tests)
            this.finished = false;
          } else if (page != 0) {
            this.finished = true;
          } else {
            this.page = page;

            this.tests = res.data;
          }
        } else {
          alert(res.error);

          this.responseData = res.error;
        }
      },
      (err) => {
        debugger;
        this.loader.hideLoader();

        alert("Something went wrong..");

        this.error = err;
        this.showLoader = false;
      }
    );
  }
  getTestProjectList() {
    let data = {
      platform: this.currentDevice.platform,
    };

    let reqData = {
      data,
      endPoint: "tests/project",
    };
    this.loader.showLoader();
    debugger;
    console.log(reqData)
    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();
        debugger;
        this.showLoader = false;
       // console.log(res);
        if (res.data) {
          if (res.data.length) {
            this.testProjects = res.data;
          }
        } else {
          alert(res.error);

          this.responseData = res.error;
        }
      },
      (err) => {
        this.loader.hideLoader();

        alert("Something went wrong..");

        this.error = err;
        this.showLoader = false;
      }
    );
  }
  onSearchKeyChange(newValue) {
    this.searchValue = "";
  }
  uploadAPK() {
    if (!this.APKFile) {
      return;
    }
    const formData = new FormData();
    formData.append("apk", this.APKFile);
    formData.append("serialNo", this.currentDevice.serialNo);

    this.showLoader = true;
    let reqData = {
      data: formData,
      endPoint: "uploadAPK",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();

        this.showLoader = false;
        console.log(res);
        if (res.message) {
          this.responseData = res.message;
          this.apkForm.reset();
          alert(res.message);
        } else {
          alert(res.error);

          this.responseData = res.error;
        }
      },
      (err) => {
        this.loader.hideLoader();

        alert("Something went wrong..");

        this.error = err;
        this.showLoader = false;
      }
    );
  }
  shellExec(keyword, content?) {
    let command = "";
    if (keyword == "home") {
      command = keyword; //"input keyevent KEYCODE_HOME";
    } else if (keyword == "back") {
      command = keyword; // "input keyevent KEYCODE_BACK";
    } 
    else if (keyword == "chrome") {
      if (!content) {
        return;
      }
      if (content.indexOf("http://") == -1) {
        content = "http://" + content;
      }
      command = keyword; // content//`am start -a android.intent.action.VIEW -d '${content}'`;
    } else if (keyword == "pause") {
      if (content == true) {
        this.deviceService.onPause(this.currentDevice.serialNo);
      } else {
        this.deviceService.onPlay(this.currentDevice.serialNo);
      }
      this.pause = !this.pause;
    } else {
      return;
    }
    let reqData = {
      data: {
        keyword: command,
        content: content,
        serialNo: this.currentDevice.serialNo,
      },
      endPoint: "executeCommand",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();

        this.showLoader = false;
        console.log(res);
        if (res.message) {
          this.responseData = res.message;
          this.apkForm.reset();
          // alert(res.message);
        } else {
          alert(res.error);

          this.responseData = res.error;
        }
      },
      (err) => {
        this.loader.hideLoader();

        alert("Something went wrong..");

        this.error = err;
        this.showLoader = false;
      }
    );
  }
  runCommand() {
    if (!this.shellForm.value.command) {
      this.shellFormError = "Please enter the command";
      return;
    }
    let reqData = {
      data: {
        command: this.shellForm.value.command,
        serialNo: this.currentDevice.serialNo,
      },
      endPoint: "executeCommand",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();

        this.showLoader = false;
        console.log(res);
        if (res.message) {
          this.responseData = res.message;
          this.apkForm.reset();
          alert(res.message);
        } else {
          alert(res.error);

          this.responseData = res.error;
        }
      },
      (err) => {
        this.loader.hideLoader();

        alert("Something went wrong..");

        this.error = err;
        this.showLoader = false;
      }
    );
  }

  onstartSwipe() {
    this.isSwipeModeEnabled = !this.isSwipeModeEnabled;
    this.deviceService.updateScrenshotModeSource(
      this.isSwipeModeEnabled ? "SWIPE" : "TAP"
    );
  }

  

onStartRecord(content?: any){
this.startRecordButtuon= false;
this.recordButton= true;

let reqData = {
  data: {
    keyword: content,
    serialNo: this.currentDevice.serialNo,
  },
  endPoint: "executeCommand",
};
// this.loader.showLoader();
console.log(reqData)
this.api.apiCall(reqData).subscribe(
  
  (res: any) => {
    console.log(res)
    this.mpFourFileName = res.data.fileName;
    this.loader.hideLoader();
    console.log(this.mpFourFileName);
    this.showLoader = false;
   // console.log(res);
   
  },
  (err) => {
    this.loader.hideLoader();
    console.log(err);
    alert("Something went wrong..");

    this.error = err;
    this.showLoader = false;
  }
);

  }

  
   onStopRecord(content?: any) {
  
    this.startRecordButtuon= true;
this.recordButton= false;
    this.isRecordModeEnabled = !this.isRecordModeEnabled;
    this.deviceService.updateRecordModeSource(
      this.isRecordModeEnabled ? "SWIPE" : "TAP"
    );
    let reqData = {
      data: {
        keyword: content,
        serialNo: this.currentDevice.serialNo,
       fileName: this.mpFourFileName
      },
      endPoint: "executeCommand",
    };
    // this.loader.showLoader();
    console.log(reqData)    
     
     this.api.apiCall(reqData).subscribe(     
      (res: any) => {         
        console.log(res.data.fileUrl)
        this.loader.hideLoader();          
        this.showLoader = false;
         this.screenRecord = res.data.fileUrl;
          this.recordFile= this.mpFourFileName
        //  if (this.mpFourFileName) {        
        //  }
         $('#recordModal').modal('show');
        
       // this.screenRecord = "assets/loginmodule/ee364c28-new.mp4"      
      },
      (err) => {
        this.loader.hideLoader();
        console.log(err);
        alert("Something went wrong..");  
        this.error = err;
        this.showLoader = false;
      }
    );

  }
  
  onRecordSave() {
    saveAs(this.screenRecord, this.recordFile);
  }

 
onScreenshot(event) {
  let reqData = {
    data: {
      serialNo: this.currentDevice.serialNo,
      x: event.offsetX,
      y: event.offsetY,
    },
    endPoint: "clickOnScreenshot",
  };

  
    // this.loader.showLoader();
    this.deviceService.clearImageInterval();

    this.api.apiCall(reqData).subscribe( 
      (res: any) => {
        this.saveImage= res.baseImage;
        console.log(this.saveImage)
        this.deviceService.getDeviceScreenshots(this.currentDevice);
         this.screenFileName= this.currentDevice.serialNo,
        $('#screenshotModal').modal('show');
        this.loader.hideLoader();
        
        if (res.message) {
          if (res.baseImage) {
            this.screenshot =
              "data:image/png;base64," +
              (this.sanitizer.bypassSecurityTrustResourceUrl(
                res.baseImage
              ) as any).changingThisBreaksApplicationSecurity;
            console.log("res.baseImage", res.baseImage);
          }
          
        } 
        this.deviceService.getDeviceImage(this.currentDevice);
      },
      (err) => {
        
        this.loader.hideLoader();
        alert("Something went wrong..");
        this.deviceService.getDeviceImage(this.currentDevice);
      }
    );
  }
  
  
onImageSave(){
  saveAs(this.screenshot, this.screenFileName + '.png');
  $('#screenshotModal').modal('hide');
}


  apkUrl;
  apkDetails;
  onExecute(testId) {
    // console.log(testId)
    // console.log(this.userdetails)
    // console.log(this.currentDevice)
    let data = {
      testId: testId,
      serialNo:this.currentDevice.serialNo
    };
    let reqData = {
      data,
      endPoint: "tests/execute",
      userid: this.userdetails.id.toString(),
      MDF_TOKEN: this.userdetails.MDF_TOKEN
    };
    console.log(reqData)
//this.loader.showLoader();
    this.usersService.exicuteTest(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();
       // this.showLoader = false;
        console.log(res);
        if (res.message) {
          //alert(res.message);
          this.apkDetails = res;
          console.log(this.apkUrl)
          $('#ApkModal').modal('show');
        }
        else {
         // alert(res.error);
          this.infoMessage = res.error;
         $('#infoModal').modal('show');
          this.responseData = res.error;
        }
      },
      (err) => {
        this.loader.hideLoader();

       // alert("Something went wrong..");
       this.infoMessage = err.message;
       $('#infoModal').modal('show');

        this.error = err;
        this.showLoader = false;
      }
    );
  }

  onApkDownload() {
    
    saveAs("http://localhost:4000/testResults?fileName="+this.userdetails.id+"/"+this.apkDetails.data.resultFile, this.apkDetails.data.resultFile)
//     let reqData = {
//       endPoint: "testResults?fileName="+ this.apkDetails.data.resultFile,
//       userid: this.userdetails.id.toString(),
//       MDF_TOKEN: this.userdetails.MDF_TOKEN
//     };
//     console.log(reqData)
//     this.usersService.apkDownload(reqData).subscribe(
//       (res: any) => {
      
//         console.log(res);   
//       //  window.location.href()
        
// //saveAs(res, this.apkDetails.data.resultFile);
//       },
//       (err) => {
        
//       });

$('#ApkModal').modal('hide');

  }

  onRowApkDownload(testScriptPath) { 

    saveAs("http://localhost:4000/testResults?fileName="+this.userdetails.id+"/"+this.apkDetails.data.resultFile, this.apkDetails.data.resultFile)
     
  }
 
 isManula = 'MANUAL';
  manualAutoFun(evt ,value) {
    this.isManula = value
   // evt.currentTarget.className += "active";
  }
  ngOnDestroy() {}
}
