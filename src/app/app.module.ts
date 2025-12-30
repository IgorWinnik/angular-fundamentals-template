import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { ComponentNameComponent } from './component-name/component-name.component';

import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';

/* ===== NGRX ===== */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

@NgModule({
  declarations: [AppComponent, CourseInfoComponent, ComponentNameComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,

    /* ===== NGRX Store & Effects ===== */
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
