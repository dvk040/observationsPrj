import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { DeviceService } from 'src/app/services/device.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  userdetails: any;

  currentSerialNo;
  deviceDetails;
  currentDevice;
  constructor(private authService: AuthService, private router: Router, private usersService: UsersService, private deviceService: DeviceService,
    private api: ApiService,
    ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.usersService.userDetails.subscribe((data) => {
     this.userdetails = data;
    });

    this.currentDevice = this.deviceService.currentDevice;
    this.deviceDetails = this.currentDevice;
    if (this.deviceDetails) {
      this.deviceService.getDeviceScreenshots(this.currentDevice);
    }
    
  }

  public onLogout(){
    //this.router.navigate(['/login']);
    this.authService.logout();
    
    let data = {
      id: this.currentDevice.id,
      usageStatus: false,
    };

    let reqData = {
      data,
      endPoint: "devices/usageStatus",
    };
    // this.loader.showLoader();

    this.api.apiCall(reqData).subscribe(
      (res: any) => {
       
        // $('#disconnectModal').modal('hide');
        // this.router.navigate(['/deviceListView']);
        this.deviceService.clearImageInterval(true);
        // this.loader.hideLoader();
        this.deviceDetails.isInUse = false;
        if (res.data) {
          if (res.data.length) {
          }
        } else {
          alert(res.error);
        }
      },
      (err) => {
        // this.loader.hideLoader();

        alert("Something went wrong..");
      }
    );

  }
  
}
