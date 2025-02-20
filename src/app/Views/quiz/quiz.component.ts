import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import questions from '../../../../public/questions.json';
import { QuestionList } from '../../Interfaces/question-list';
import { Question } from '../../Interfaces/question';
import { Option } from '../../Interfaces/option';
import { AnswerBody } from '../../Interfaces/answer-body';
@Component({
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  questionList: QuestionList[] = []
  started: boolean = false
  question!: Question
  playerOptions: Option[] = []
  index: number = 0
  answerBody!: AnswerBody
  ngOnInit(): void {
    if (this.questionList) {
      this.questionList.push(questions)
    }
  }

  startQuiz() {
    this.started = true
    this.question = this.questionList[0].questions[0]
    this.index++
  }

  selectOption(option: Option) {
    if (this.question.id < this.questionList[0].questions.length) {
      this.playerOptions.push(option)
      this.question = this.questionList[0].questions[(this.index++)]

    } else {
      this.selectAnswer(this.playerOptions)
    }
  }

  selectAnswer(options: Option[]) {
    const mostSelectedOption = options.reduce((a, b) => {
      const countA = options.filter((x) => x === a).length
      const countB = options.filter((x) => x === b).length
      return countA > countB ? a : b
    })
    switch (mostSelectedOption.id) {
      case 1:
        this.answerBody = {
          title: 'Sistema Operacional 💻',
          description: 'Você é organizado, confiável e essencial. Assim como um bom SO, as pessoas contam com você para manter as coisas funcionando.',
          imageUrl: 'https://www.scurra.com.br/blog/wp-content/uploads/2015/09/linux-windows-hosting.png'
        }
        break;
      case 2:
        this.answerBody = {
          title: 'Antivírus 🛡️',
          description: 'Você é a pessoa que sempre pensa nos riscos antes de agir. Sempre alerta, tenta proteger a si mesmo e aos outros contra problemas.',
          imageUrl: 'https://images7.memedroid.com/images/UPLOADED708/5fad0d55a7346.jpeg'
        }
        break;
      case 3:
        this.answerBody = {
          title: 'Um jogo 🎮',
          description: 'Você adora explorar novas possibilidades e se divertir. Para você, a vida é cheia de desafios e aventuras inesperadas.',
          imageUrl: 'https://media.gq-magazine.co.uk/photos/645b5c3c8223a5c3801b8b26/16:9/w_2560%2Cc_limit/100-best-games-hp-b.jpg'
        }
        break;
      case 4:
        this.answerBody = {
          title: 'Um bug 🪲',
          description: 'Caótico e imprevisível, sua vida é cheia de reviravoltas inesperadas. Às vezes, as coisas dão errado, mas você sempre encontra um jeito (ou pelo menos diverte os outros no processo).',
          imageUrl: 'https://http.cat/503'
        }
        break;
      default:
        this.answerBody = {
          title: 'Eita que deu errado, vamos tentar de novo ?',
          description: '',
          imageUrl: ''
        }

    }
  }
}