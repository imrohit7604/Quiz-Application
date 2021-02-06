import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {


public result:any;
  constructor(private quizService: QuizService, private router: Router) {
     
   }

  ngOnInit() {
    if (parseInt(localStorage.getItem('qnProgress')) == 10) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      this.result=localStorage.getItem('correctAsnwers');
    }

    else
      this.router.navigate(['/quiz']);
  }


  OnSubmit() {

      this.restart();
    
  }

  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    localStorage.setItem('correctAsnwers', "0");
    this.router.navigate(['/register']);
  }

}
