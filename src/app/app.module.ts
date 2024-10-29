import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroService } from './registro.service'; 

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [RegistroService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
