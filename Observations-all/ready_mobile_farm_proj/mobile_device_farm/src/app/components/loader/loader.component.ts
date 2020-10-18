
import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="showLoader" class="loader-parent">
        <div>
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
             {{ message }}
        </div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
    public showLoader = false;
    public message = '';
    constructor(private loader: LoadingService) {
        loader.loadingObservable.subscribe(() => {
            this.showLoader = loader.isApiCallInProgress;
            this.message = loader.msg;
        });
    }

}
