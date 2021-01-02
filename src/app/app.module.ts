import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC56qKypnJgM6MNa63lXuFHiQ7ogGew9Fw",
      authDomain: "pos-notifications-c4a42.firebaseapp.com",
      projectId: "pos-notifications-c4a42",
      storageBucket: "pos-notifications-c4a42.appspot.com",
      messagingSenderId: "533919698271",
      appId: "1:533919698271:web:02dc93b5a628279f09baea",
      measurementId: "G-TBDQXKZ6JN"
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
