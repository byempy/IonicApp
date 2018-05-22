import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseApi } from '../../providers/firebase-api/firebase-api';
declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public map: any = {};

  constructor(private firebase: FirebaseApi, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.firebase.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };

    console.log(this.map);

  }

  goToDirections(){
    window.location = "geo:" + this.map.lat + "," + this.map.lng + ";u=35";

  }

}
