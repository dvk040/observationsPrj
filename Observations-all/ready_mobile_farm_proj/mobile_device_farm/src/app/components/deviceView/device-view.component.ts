import { Component, OnInit, OnDestroy } from "@angular/core";
import { DeviceService } from "src/app/services/device.service";
import { Subscription } from "rxjs";
import { Device } from "src/app/models/device";
import { startWith } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { LoadingService } from "../../services/loading.service";
import { ApiService } from "../../services/api.service";
declare var $: any;

@Component({
  selector: "device-view",
  templateUrl: "./device-view.component.html",
  styleUrls: ["./device-view.component.scss", "./device-view.component.css"],
})
export class DeviceViewComponent implements OnInit, OnDestroy {
  device: Device;
  screenshot;
  private _docSub: Subscription;
  private currentImageSub: Subscription;
  currentSerialNo;
  deviceDetails;
  currentDevice;
  constructor(
    private deviceService: DeviceService,
    private sanitizer: DomSanitizer,
    public router: Router,
    private api: ApiService,
    private loader: LoadingService
  ) {
    this.deviceDetails = this.router.getCurrentNavigation().extras.state;
  }
  openDisconnectModal(){
    $('#disconnectModal').modal('show');
  }

  disconnectDevice() {
    let data = {
      id: this.currentDevice.id,
      usageStatus: false,
    };

    let reqData = {
      data,
      endPoint: "devices/usageStatus",
    };
    this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        $('#disconnectModal').modal('hide');
        this.router.navigate(['/deviceListView']);
        this.deviceService.clearImageInterval(true);
        this.loader.hideLoader();
        this.deviceDetails.isInUse = false;
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

  ngOnInit() {
    this.currentDevice = this.deviceService.currentDevice;
    this.deviceDetails = this.currentDevice;
    if (this.deviceDetails) {
      this.deviceService.getDeviceScreenshots(this.currentDevice);
    }
  }

  isViewMode ='PORT' ;
  landPortrait(value) {
    this.isViewMode = value;
  }
  ngOnDestroy() {
    if (this.currentImageSub) {
      this.currentImageSub.unsubscribe();
    }
    this.deviceService.clearImageInterval();
  }
}
