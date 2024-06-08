import { Component } from '@angular/core';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  gameStarted:boolean=false;
  questions: any[]=[

    {
      question:'OMI est : ',
      options:['Office of Maritine Industry ','Online Music Instrument ','Open Messaging Interface'],
      answer:'Office of Maritine Industry ',
      selected:null
    },
    {
      question:'Combien de Ports Principaux le Maroc posséde-t-il le long de sa cote atlantique ?',
      options:['2','4','6','8'],
      answer:'4',
      selected:null
    },
    {
      question:'Quel est le nom de plus grand chantier naval du Maroc situé Casablanca ',
      options:['CMN','SOMARO','CDM','SAMIR'],
      answer:'SOMARO',
      selected:null
    },
    {
      question:'Quel est le plus drand port maritime au Maroc au termes de trafic de marchandises?',
      options:['Casablanca','Tanger Med','Tanger Ville ','Agadir'],
      answer:'Tanger Med',
      selected:null
    },
    {
      question:'Quel est le nom principal  port de pèche  du Maroc situé sur la cote atlantique  ',
      options:['Casablanca','Nador','Safi','Eljadida'],
      answer:'Safi',
      selected:null
    },
    {
      question:'Quelle est la ville portuaire marocaine qui est un important centre de péche et de transformation du poisson , notamment de la sardine  ',
      options:['Agadir','El Jadida','Essaouira','Larache'],
      answer:'Essaouira',
      selected:null
    },
    {
      question:'Quel est  ville cotiére marocaine est connue pour son important complexe industruel et son port en eau profonde  ',
      options:['Rabat','Tanger ','Casablanca','Agadir'],
      answer:'Casablanca',
      selected:null
    },
    {
      question:'Quel est le nombre approximatif de kilometres de cote que posséde le Maroc , à la fois sur océan Atlantique et la mer Méditerranée',
      options:['1000 km','2500 km','3500 km','5000 km'],
      answer:'2500 km',
      selected:null
    },
    {
      question:'Quelle est la principale activité économique du port Tanger Med ',
      options:['Transport de passagers','Commerce de conteneurs','industrie de péche','exploitation du pétrole et du gaz'],
      answer:'Commerce de conteneurs',
      selected:null
    },
    {
      question:'Quel est le grand terminal à conteneurs du port de Casablanca ',
      options:['TTC','TCA','TTT','T2M'],
      answer:'TTC',
      selected:null
    },
    {
      question:'Quel est la mission principale de l Agence Nationale des Ports ANP du Maroc ',
      options:['Promouvoir le tourisme cotier','Gerer les aéroports du pays','Développer et gérer les infrastructures portuaires','Superviser industrie de la péche maritine'],
      answer:'Développer et gérer les infrastructures portuaires',
      selected:null
    },
  ];
  score:number=0;
  timeLeft:number=20;
  timeId:any;
  ngOnInit()
  {
    this.startTimer();
  }
  startGame()
  {
    this.gameStarted=true;
    this.startTimer();
  }
  submitQuiz()
  {
    this.score=0;
    this.questions.forEach(question=>{
      if(question.selected === question.answer)
        {
          this.score++;
        }
    });
   if(this.score === this.questions.length)
    {
      clearInterval(this.timeId);
      // on arrete le minuteur
      alert("Félicitations! Vous avez gagner !");
      this.gameStarted=false;
    }
  }
  startTimer()
{
  this.timeLeft=120; // le miniteur est de 60 s
  this.timeId=setInterval(()=>{
    this.timeLeft--;
    if(this.timeLeft ===0)
      {
        clearInterval(this.timeId);
        alert("Temps écoulé! Vous avez perdu.");
        this.gameStarted=false;
      }
  },1000);
  
}

}
