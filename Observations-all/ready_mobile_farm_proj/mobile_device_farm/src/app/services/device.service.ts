import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { ScreenshotData } from "../models/screenshotData";
import { Device } from "../models/device";

import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { BehaviorSubject, Subject } from "rxjs";

import { LoadingService } from "./loading.service";
import { ApiService } from "./api.service";
@Injectable({
  providedIn: "root",
})
export class DeviceService {
  currentDevice;
  private screnshotPauseSource = new BehaviorSubject(true);
  screnshotPause = this.screnshotPauseSource.asObservable();
  private screnshotModeSource = new BehaviorSubject("TAP");
  screnshotMode = this.screnshotModeSource.asObservable();

  private recordModeSource = new BehaviorSubject("TAP");
  recordMode = this.recordModeSource.asObservable();
  
  deviceList = new Subject();
  deviceDetails = new Subject();

  currentImage = this.socket.fromEvent<ScreenshotData>("baseImage");
  currentImageId;
  constructor(
    private socket: Socket,
    public router: Router,
    public storage: StorageService,
    private api: ApiService,
    private loader: LoadingService
  ) {
    let deviceDet = storage.getFromLocalStorage("currentDevice");
    if (deviceDet) {
      this.currentDevice = JSON.parse(deviceDet) || {};
    }
  }

  getDeviceImage(device) {
    this.clearImageInterval();

    this.router.navigate(["deviceView"], { state: device });
    device.isInUse = true;
    this.storage.addToLocalStorage("currentDevice", device);
    this.currentDevice = device;
  }
  getDeviceScreenshots(device) {
    this.screnshotPauseSource.next(true);
    this.socket.emit("getDeviceImage", device.serialNo);
  }
  refreshList() {
    this.getRegisteredDevices();
  }
  getDeviceDetailsList() {
    this.clearImageInterval();
    this.getRegisteredDevices();
  }

  clearImageInterval(isClearCurrentDeviceStorage?) {
    this.screnshotPauseSource.next(false);
    this.socket.emit(
      "clearImageInterval",
      this.currentDevice && this.currentDevice.serialNo
    );
    if (isClearCurrentDeviceStorage) {
      this.currentDevice = {};
      this.storage.removeFromLocalStorage("currentDevice");
    }
  }
  onClick(args) {
    this.screnshotPauseSource.next(false);
    this.socket.emit("onScreenshotClick", args);
  }
  onPause(args) {
    this.screnshotPauseSource.next(false);

    this.socket.emit("onPauseClick", args);
  }
  onPlay(args) {
    this.screnshotPauseSource.next(true);

    this.socket.emit("onPlayClick", args);
  }
  updateScrenshotPauseSource(value) {
    this.screnshotPauseSource.next(value);
  }
  updateScrenshotModeSource(value) {
    this.screnshotModeSource.next(value);
  }

  updateRecordModeSource(value) {
    this.recordModeSource.next(value);
  }

  private docId() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
  private deviceId() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
  getRegisteredDevices() {
    let reqData = {
      data: {},
      endPoint: "devices",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.loader.hideLoader();

        console.log(res);
        // this.dialogRef.close({ dataCreated: 1 });
        if (res.data) {
          this.deviceList.next(res.data);
          this.deviceDetails.next(res.data);
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
