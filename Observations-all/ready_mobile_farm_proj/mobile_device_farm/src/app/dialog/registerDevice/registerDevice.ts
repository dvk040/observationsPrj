import {
  Component,
  AfterViewInit,
  OnInit,
  Input,
  OnDestroy,
  Inject,
} from "@angular/core";
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

var self;
const languages = [
  { code: "java", displayName: "Java" },
  { code: "nodejs", displayName: "Nodejs" },
  { code: "python", displayName: "Python" },
];
@Component({
  selector: "new-test-dialog",
  templateUrl: "registerDevice.html",
  styleUrls: ["./registerDevice.css"],
})
export class RegisterDeviceDialog implements AfterViewInit {
  currentDevice: Device;
  connectedDeviceList = [];
  isModalShown = true;
  selectedDevice;
  registerDeviceForm;
  platform;
  connectedDevice;
  filteredDeviceList = [];
  registeredDevice;
  isEditMode = false;
  showDeviceDetails = false;
  deviceDetails;

  constructor(
    public dialogRef: MatDialogRef<RegisterDeviceDialog>,
    private deviceService: DeviceService,
    private api: ApiService,
    private loader: LoadingService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    self = this;
    this.platform = data.platform;
    this.registeredDevice = data.device;
    if (this.registeredDevice) {
      this.isEditMode = true;
    } else {
      this.registeredDevice = {};
    }
    if (!this.isEditMode) {
      this.getConnectedDevices();
    }
    this.currentDevice = this.deviceService.currentDevice;
    this.registerDeviceForm = this.formBuilder.group({
      name: [this.registeredDevice.name || "", [Validators.required]],
      model: [this.registeredDevice.model || "", [Validators.required]],
      buildNo: [this.registeredDevice.buildNo || "", [Validators.required]],
      serialNo: [this.registeredDevice.serialNo || "", [Validators.required]],
      platform: [
        this.registeredDevice.platform || this.platform,
        [Validators.required],
      ],
      deviceStatus: [
        this.registeredDevice.deviceStatus || "",
        [Validators.required],
      ],
      osVersion: [this.registeredDevice.osVersion || "", []],
      sdkVersion: [this.registeredDevice.sdkVersion || "", []],
      storage: [this.registeredDevice.storage || "", []],
      ram: [this.registeredDevice.ram || "", []],
      ipAddress: [this.registeredDevice.ipAddress || "", []],
      hardware: [this.registeredDevice.hardware || "", []],
      hardwareVersion: [this.registeredDevice.hardwareVersion || "", []],
      height: [this.registeredDevice.height || null, []],
      width: [this.registeredDevice.width || null, []],
      remarks: [this.registeredDevice.remarks || ""],
    });
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  toggleModal() {}
  getDeviceDetails() {
    let reqData = {
      data: { serialNo: this.registeredDevice.serialNo },
      endPoint: "devices/details",
    };

    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();
        this.showDeviceDetails = true;
        console.log(res);
        this.deviceDetails = res.data;
      },
      (err) => {
        this.loader.hideLoader();

        alert((err.error && err.error.error) || "Something went wrong..");
      }
    );
  }
  registerDevice() {
    let reqData = {
      data: this.registerDeviceForm.value,
      endPoint: "devices/register",
      method: "",
    };
    if (this.isEditMode) {
      reqData.method = "PUT";
      reqData.data = {
        formValue: this.registerDeviceForm.value,
        id: this.registeredDevice.id,
      };
    }

    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
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
  getConnectedDevices() {
    let reqData = {
      data: {},
      endPoint: "devices/connected",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();

        console.log(res);
        // this.dialogRef.close({ dataCreated: 1 });
        if (res.data) {
          this.connectedDeviceList = res.data;
          this.filteredDeviceList = res.data;
          this.connectedDeviceList.push({
            name: "Add Manually",
            value: "addManually",
          });
        } else {
          alert(res.error);
        }
      },
      (err) => {
        this.loader.hideLoader();
        -alert("Something went wrong..");
      }
    );
  }
  onSelectDeviceChange(value) {
    let filterValue = value.toLowerCase();

    this.filteredDeviceList = this.connectedDeviceList.filter((option) => {
      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }
  private _filter(value: string): string[] {
    let filterValue = value.toLowerCase();
    let a = this.connectedDeviceList.filter((option) => {
      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
    console.log(a);
    return a;
  }
  onBackPress() {}

  displayFunc(value) {
    let ind = self.connectedDeviceList.findIndex((item) => {
      return item.name == value;
    });
    return value
      ? self.connectedDeviceList[ind].name +
          (self.connectedDeviceList[ind].buildNo
            ? " - " + self.connectedDeviceList[ind].buildNo
            : "")
      : "";
  }
  onOptionSelection(value) {
    if (value) {
      value = value.option.value;
    }
    console.log(value, self);

    if (self.connectedDeviceList.length) {
      let ind = self.connectedDeviceList.findIndex((item) => {
        return item.name == value;
      });

      let name = ind != -1 ? self.connectedDeviceList[ind].name : "";
      if (name && name != "Add Manually") {
        self.registerDeviceForm.setValue({
          ...self.connectedDeviceList[ind],
          storage: "",
          ram: "",
          remarks: "",
          deviceStatus: "Active",
        });
      } else if (name && name == "Add Manually") {
        self.registerDeviceForm.setValue({
          osVersion: "",
          sdkVersion: "",
          serialNo: "",
          name: "",
          buildNo: "",
          model: "",
          platform: "Android",
          ipAddress: "",
          height: null,
          width: null,
          hardware: "",
          hardwareVersion: "",
          storage: "",
          ram: "",
          remarks: "",
          deviceStatus: "Inactive",
        });
      }
      return name;
    }
  }
  applyDetails() {
    let formValues = this.registerDeviceForm.value;
    self.registerDeviceForm.setValue({
      osVersion: this.deviceDetails.osVersion,
      sdkVersion: this.deviceDetails.sdkVersion,
      hardware: this.deviceDetails.hardware || null,
      hardwareVersion: this.deviceDetails.hardwareVersion || null,
      width: this.deviceDetails.width,
      height: this.deviceDetails.height,
      ipAddress: this.deviceDetails.ipAddress,
      storage: formValues.storage,
      ram: formValues.ram,
      remarks: formValues.remarks,
      deviceStatus: formValues.deviceStatus,
      serialNo: formValues.serialNo,
      name: formValues.name,
      buildNo: formValues.buildNo,
      model: formValues.model,
      platform: formValues.platform,
    });
    this.showDeviceDetails = false;
  }
}
