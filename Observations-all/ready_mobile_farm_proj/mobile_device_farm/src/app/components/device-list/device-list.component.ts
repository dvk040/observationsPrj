import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Device } from "../../models/device";
import { DeviceService } from "src/app/services/device.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { RegisterDeviceDialog } from "../../dialog/registerDevice/registerDevice";
import { LoadingService } from "../../services/loading.service";
import { ApiService } from "../../services/api.service";
import { DeviceViewComponent } from "../deviceView/device-view.component";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.scss"],
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[];

  currentDevice: Device;
  private _docSub: Subscription;

  constructor(
    private api: ApiService,
    private deviceService: DeviceService,
    public dialog: MatDialog,
    private loader: LoadingService
  ) {}

  ngOnInit() {
    this.deviceService.refreshList();
    this.currentDevice = this.deviceService.currentDevice;

    this._docSub = this.deviceService.deviceList.subscribe(
      (devices: Device[]) => {
        console.log(Date.now());

        if (devices) {
          this.devices = devices.map((device) => {
            device.status = device.deviceStatus;
            if (device.deviceStatus == "Active" && device.isInUse) {
              device.status = "In Use";
            } else if (device.deviceStatus == "Active") {
              device.status = "Available";
            }
            return device;
          });
        }
        console.log(Date.now());
      }
    );
  }

  ngOnDestroy() {
    this.deviceService.clearImageInterval();
  }
  editRegisteredDevice(device) {
    if (device.isInUse) {
      return;
    }
    this.openRegisterDeviceDialog(device);
  }
  openRegisterDeviceDialog(device?): void {
    const dialogRef = this.dialog.open(RegisterDeviceDialog, {
      disableClose: false,
      hasBackdrop: true,
      autoFocus: false,
      width: "450px",
      height: "600px",
      data: { platform: "android", device },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.dataCreated) {
        this.refreshList();
      }
      //refresh the test list
      console.log("The dialog was closed");
      // this.animal = result;
    });
  }
  loadDevice(device) {
    if (device.status != "Available") {
      alert("Device is " + device.status);
      return;
    }
    if (
      this.deviceService.currentDevice &&
      this.deviceService.currentDevice.name
    ) {
      alert(
        "Already connected to " +
          this.deviceService.currentDevice.name +
          " . Please disconnent device first"
      );
      return;
    }
    let data = {
      serialNo: device.serialNo,
    };

    let reqData = {
      data,
      endPoint: "devices/connection",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();

        console.log(res);
        if (res.message) {
          this.connectToDevice(device.id);
          this.deviceService.getDeviceImage(device);
        } else {
          alert(res.error);
        }
      },
      (err) => {
        this.loader.hideLoader();

        alert((err.error && err.error.error) || "Something went wrong..");
      }
    );
  }

  refreshList() {
    this.deviceService.clearImageInterval();
    this.deviceService.refreshList();
  }
  connectToDevice(id) {
    let data = {
      id,
      usageStatus: true,
    };

    let reqData = {
      data,
      endPoint: "devices/usageStatus",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();

        if (res.data) {
          if (res.data.length) {
          }
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