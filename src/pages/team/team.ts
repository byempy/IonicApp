import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamDetailPage } from '../team-detail/team-detail';
import { TeamHomePage } from '../team-home/team-home';
import { FirebaseApi } from '../../providers/firebase-api/firebase-api';
import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {

  public teams : any= [];
  private allTeams: any;
  private allTeamDivisions: any;
  public queryText: string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private firebase: FirebaseApi,
      public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: "Getting data...",
      spinner: "crescent"
    })

    loader.present().then(() => {
      this.firebase.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
  
        this.allTeamDivisions = 
          _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
  
        this.teams = this.allTeamDivisions;
        console.log("division teams", this.teams);

        loader.dismiss();
      });
    })

  }

  public itemTapped($event, team):void{
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams(){
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if(teams.length){
        filteredTeams.push({divisionName: td.divisionName, divisionTeams: teams});
      }
    });
    this.teams = filteredTeams;
  }

}
