import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listener } from '@angular/core/src/render3/instructions';

@Injectable()
export class QuizService {
  //---------------- Properties---------------
  readonly rootUrl = 'https://quizapi.io';
  qns: any[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  params:any;
  
  //---------------- Helper Methods---------------
  constructor(private http: HttpClient) { }
  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  

  //---------------- Http Methods---------------

  

  getQuestions() {
  return this.http.get(this.rootUrl + '/api/v1/questions?apiKey=Ku199GwYuMoSNr7eHaPB1ketcV5QRmEUfZ4SWXbH&category=Linux&limit=10');
   
   
    
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }

}
