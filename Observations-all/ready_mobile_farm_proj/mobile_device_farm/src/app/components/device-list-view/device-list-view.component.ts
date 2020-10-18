import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-list-view',
  templateUrl: './device-list-view.component.html',
  styleUrls: ['./device-list-view.component.scss'],
})
export class DeviceListViewComponent implements OnInit, OnDestroy {
  showDetailedList = false;
  constructor(private deviceService: DeviceService) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
