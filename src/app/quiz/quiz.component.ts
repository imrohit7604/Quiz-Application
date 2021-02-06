import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  objectKeys = Object.keys;
  constructor(private router: Router, private quizService: QuizService) { }

  ngOnInit() {  
    
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (list: any) => {
          for (let entry of list) {
                 let arr = [];  
         Object.keys(entry.answers).map(function(key){  
                 arr.push(entry.answers[key]);    
             return arr;  
         });  
         entry.answers=arr;
         let i=1;
         let ans;
         Object.keys(entry.correct_answers).map(function(key){      
             if(entry.correct_answers[key]==="true")
             ans=i;    
             i++;      
         }); 
         entry.correct_answer=ans;
        
         }
         // console.log(list);
          this.quizService.qns = list;
          this.startTimer();
        }
      );
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
  }

  Answer(qID, choice,correct_answer) {
    //console.log("choice",choice);
    //console.log("correct_answer",correct_answer);
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    let correct:number;
   correct =+localStorage.getItem('correctAsnwers');
    if(correct_answer===choice)
    correct++;
    localStorage.setItem('correctAsnwers', String(correct));
    //console.log(localStorage.getItem('correctAsnwers'));
    if (this.quizService.qnProgress == 10) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

}
