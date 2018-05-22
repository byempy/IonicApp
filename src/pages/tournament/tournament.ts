import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamPage } from '../team/team';
import { FirebaseApi } from '../../providers/firebase-api/firebase-api';

@IonicPage()
@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html',
})
export class TournamentPage {

  public tournaments: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private firebase: FirebaseApi,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Getting tournaments...",
      spinner: "crescent"
    });

    loader.present().then(() => {
      this.firebase.getTournaments().then(data =>{
          this.tournaments = data;
          loader.dismiss();
        })
      });
    }

  public itemTapped($event, tourney):void{
    this.navCtrl.push(TeamPage, tourney);
  }
}
