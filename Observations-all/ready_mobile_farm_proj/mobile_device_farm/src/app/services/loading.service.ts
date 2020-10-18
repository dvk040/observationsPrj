/******************************************************************************************************
 *
 * Loader service
 * Description: Show loader based when there is action or an api call
 * Created Date: 01/07/2018
 *
 ******************************************************************************************************/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoadingService {
  public isApiCallInProgress = false;
  public msg: string;
  public loadingObservable = new Subject();

  public showLoader(msg = 'loading') {
    this.isApiCallInProgress = true;
    this.msg = msg;
    this.loadingObservable.next(this.isApiCallInProgress);
  }

  public hideLoader() {
    this.isApiCallInProgress = false;
    this.loadingObservable.next(this.isApiCallInProgress);
  }
}
