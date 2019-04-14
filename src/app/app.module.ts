import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PhotoDescriptionComponent } from './photo-description/photo-description.component';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      NavigationComponent,
      PhotoDescriptionComponent,
   ],
   imports: [
      BrowserModule,
      CommonModule,
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
