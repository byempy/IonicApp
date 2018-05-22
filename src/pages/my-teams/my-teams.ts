import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TournamentPage } from '../tournament/tournament';
import { FirebaseApi } from '../../providers/firebase-api/firebase-api';
import { TeamHomePage } from '../team-home/team-home';
import { UserSettings } from '../../providers/user-settings/user-settings';

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebase:FirebaseApi,
    public loadingController: LoadingController,
    private userSettings: UserSettings) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

   goToTournament(){
    this.navCtrl.push(TournamentPage);
  }

  favoriteTapped($event, favorite){
    let loader = this.loadingController.create({
      content: "Getting data...",
      spinner:"crescent",
      dismissOnPageChange: true
    });
    loader.present();
    this.firebase.getTournamentData(favorite.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team))
  }

  ionViewDidEnter(){
    this.favorites = this.userSettings.getAllFavorites();
  }

}
