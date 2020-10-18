import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { DeviceService } from "src/app/services/device.service";
import { Subscription } from "rxjs";
import { Device } from "src/app/models/device";
import { ScreenshotData } from "src/app/models/screenshotData";

import { startWith } from "rxjs/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { LoadingService } from "../../services/loading.service";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "device-screen-view",
  templateUrl: "./device-screen-view.component.html",
  styleUrls: [
    "./device-screen-view.component.scss",
    "./device-screen-view.component.css",
  ],
})
export class DeviceScreenViewComponent implements OnInit, OnDestroy {
  screenshot;
  currentDevice: Device;
  screenMode = "TAP";
  private currentImageSub: Subscription;
  deviceDetails;
  startX = -1;
  startY = -1;
  endX = -1;
  endY = -1;
  strokeWidth = 0;
  radius = 0;
  @Input() serialNo;
  @ViewChild("d1") d1: ElementRef;

  constructor(
    private deviceService: DeviceService,
    private sanitizer: DomSanitizer,
    private api: ApiService,
    private loader: LoadingService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.currentDevice = this.deviceService.currentDevice;
    this.deviceService.screnshotMode.subscribe((value) => {
      this.removeCircleAndLine();
      this.screenMode = value;
    });
    this.currentImageSub = this.deviceService.currentImage.subscribe(
      (screenshotData) => {
      
        if (screenshotData && screenshotData.baseImage) {
          this.deviceService.updateScrenshotPauseSource(true);
          this.screenshot =
            "data:image/png;base64," +
            (this.sanitizer.bypassSecurityTrustResourceUrl(
              screenshotData.baseImage
            ) as any).changingThisBreaksApplicationSecurity;
        //  console.log(this.screenshot.screen.orientation.type)
        }
        if (screenshotData.error) {
          alert(screenshotData.error);
          this.deviceService.clearImageInterval();
        }
      }
    );
  }
  onClick(event) {
    if (this.screenMode == "TAP") {
      let reqData = {
        data: {
          serialNo: this.currentDevice.serialNo,
          x: event.offsetX,
          y: event.offsetY,
        },
        endPoint: "clickOnScreenshot",
      };
      this.sceenshotActionApiHit(reqData);
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      this.radius = 10;
      console.log(this.startX, this.startY )
    } else if (this.screenMode == "SWIPE") {
      if (this.startX == -1) {
        this.startX = event.offsetX;
        this.startY = event.offsetY;
        this.radius = 10;
      } else {
        this.endX = event.offsetX;
        this.endY = event.offsetY;
        this.strokeWidth = 4;
        let reqData = {
          data: {
            serialNo: this.currentDevice.serialNo,
            startX: this.startX,
            startY: this.startY,
            endX: this.endX,
            endY: this.endY,
          },
          endPoint: "swipeOnScreenshot",
        };
        this.sceenshotActionApiHit(reqData);
      }
    }
  }

  drawLine() {
    // let el = <HTMLElement>document.getElementsByClassName('svgElement')[0];
    // //
    // let change_this;
    // let elem = `<svg class="drawnLine" style="position: absolute;top: 0px;height: ${el.offsetHeight};left: 0px;width: ${el.offsetWidth};">
    // <circle cx=${this.startX} cy=${this.startY} r="5" stroke="black" stroke-width="3" fill="black"></circle>
    // <circle cx=${this.endX} cy=${this.endY} r="10" stroke="black" stroke-width="3" fill="black"></circle>
    // <line x1=${this.startX} y1=${this.startY} x2=${this.endX} y2=${this.endY} style="stroke: #000000;stroke-width: 4px;"></line>
    // Sorry, your browser does not support inline SVG.
    // </svg>`;
    // change_this = this.renderer.createElement(elem);
    // this.renderer.appendChild(this.d1, change_this);
    // let el = <HTMLElement>document.getElementsByClassName('svgElement')[0];
    // el.innerHTML += '';
  }

  drawCircle() {
    // this.radius = 10;
    // let el = <HTMLElement>document.getElementsByClassName('svgElement')[0];
    // let change_this;
    // let elem = `<svg class="drawnCircle" style="position: absolute;top: 0px;height: ${el.offsetHeight};left: 0px;width: ${el.offsetWidth};">
    // <circle cx=${this.startX} cy=${this.startY} r="5" stroke="black" stroke-width="3" fill="black"></circle>
    // </svg>`;
    // change_this = this.renderer.createElement(elem);
    // this.renderer.appendChild(this.d1, change_this);
    // el.innerHTML += ;
  }
  sceenshotActionApiHit(reqData) {
    this.loader.showLoader();
    this.deviceService.clearImageInterval();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
        this.deviceService.getDeviceScreenshots(this.currentDevice);

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
          // alert(res.message);
          this.removeCircleAndLine();
        } else {
          this.removeCircleAndLine();
          alert(res.error);
        }
        this.deviceService.getDeviceImage(this.currentDevice);
      },
      (err) => {
        this.removeCircleAndLine();
        this.loader.hideLoader();
        alert("Something went wrong..");
        this.deviceService.getDeviceImage(this.currentDevice);
      }
    );
  }
  removeCircleAndLine() {
    this.radius = 0;
    this.strokeWidth = 0;
    this.startX = -1;
    this.startY = -1;
    this.endX = -1;
    this.endY = -1;
    // let el = <HTMLElement>document.getElementsByClassName('drawnCircle')[0];
    // if (el) {
    //   el.remove();
    // }
    // el = <HTMLElement>document.getElementsByClassName('drawnLine')[0];
    // if (el) {
    //   el.remove();
    // }
  }

  // <svg style="position: absolute;top: 0px;background-color: blue;height: 586px;left: 0px;width: 341px;">
  //    <circle cx="20" cy="20" r="5" stroke="black" stroke-width="3" fill="black"></circle>
  //  <circle cx="340" cy="586" r="10" stroke="black" stroke-width="3" fill="black"></circle>

  //     <line x1="20" y1="20" x2="340" y2="586" style="stroke: #000000;stroke-width: 4px;"></line>
  //   Sorry, your browser does not support inline SVG.
  // </svg>

  ngOnDestroy() {
    if (this.currentImageSub) {
      this.currentImageSub.unsubscribe();
    }
    this.deviceService.clearImageInterval();
  }
}
