import {HttpClient} from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class FirebaseApi {
  private baseUrl: string = "https://myeliteteam-3fd4c.firebaseio.com/";
  private currentTourney: any = {};
  private tourneyData = {};

  constructor(public http: Http) {
    
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(this.baseUrl + '/tournaments.json').subscribe(res => resolve(res.json()));
    })
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any>{
    if(!forceRefresh && this.tourneyData[tourneyId]){
      this.currentTourney = this.tourneyData[tourneyId];
      return Observable.of(this.currentTourney);
    }

    return this.http.get(this.baseUrl + "/tournaments-data/" + tourneyId + ".json")
      .map(response => {
        this.tourneyData[tourneyId] = response.json();
        this.currentTourney = this.tourneyData[tourneyId];
        return this.currentTourney;
      });
  }

  refreshCurrentTourney(){
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }

  getCurrentTourney() {
    return this.currentTourney;
  }

}
