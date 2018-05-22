import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { MyApp } from './app.component';
import {HttpModule, Http} from '@angular/http';
import {AgmCoreModule} from '@agm/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from '../pages/my-teams/my-teams';
import { GamePage } from '../pages/game/game';
import { TeamPage } from '../pages/team/team';
import { TeamDetailPage } from '../pages/team-detail/team-detail';
import { TournamentPage } from '../pages/tournament/tournament';
import { StandingsPage } from '../pages/standings/standings';
import { TeamHomePage } from '../pages/team-home/team-home';
import { FirebaseApi } from '../providers/firebase-api/firebase-api';
import { UserSettings} from '../providers/user-settings/user-settings';
import { MapPage } from '../pages/map/map';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamPage,
    TeamDetailPage,
    TournamentPage,
    StandingsPage,
    TeamHomePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBW53c8p8bOAn-avyKSWK6JH-nzIE4X4bQ'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamPage,
    TeamDetailPage,
    TournamentPage,
    StandingsPage,
    TeamHomePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseApi,
    UserSettings
  ]
})
export class AppModule {}
