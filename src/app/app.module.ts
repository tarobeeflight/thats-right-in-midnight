import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './service/common.service';
import { Observable } from 'rxjs';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    Observable,
    ClipboardModule,
  ],
  providers: [
    CommonService
  ],
})
export class AppModule { }
