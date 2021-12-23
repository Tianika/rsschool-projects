import {
  QuestionAboutArtist,
  QuestionAboutPicture,
  GameOverWindow,
  ResultWindow,
  GrandResultWindow,
} from '../pages';
import {
  Bullet,
  AnswerBtnForArtist,
  AnswerImages,
  QuestionImage,
} from '../components';
import { shuffle, randomNumber } from './general';
import { playSound } from './sound';
import { Timer } from './Timer';
import { Answer } from './Answer';
import {
  START_VALUES,
  TYPE_GAME,
  TIMER_ON_OFF,
  ANSWER,
  SOUNDS,
  SAVE_RESULT,
  fetchAsync
} from '../../utils';

export class Game {
  constructor(round, typeGame) {
    this.questionNumber = START_VALUES.startQuestionNum;
    this.score = START_VALUES.startScoreNum;
    this.roundResult = [];
    this.answers = [];
    this.bullets = ['', '', '', '', '', '', '', '', '', ''];
    this.round = round;
    this.typeGame = typeGame;
    this.beginSlice =
      round * START_VALUES.questionsPerRound + this.questionNumber;
    this.time = localStorage.roundDuration;
  }

  run() {
    this.runRound();
  }

  async runRound() {
    const images = await fetchAsync('../../data/images.json');

    this.images = images.slice(
      this.beginSlice,
      this.beginSlice + START_VALUES.questionsPerRound
    );

    // ---------- artist quiz
    if (this.typeGame === TYPE_GAME.artist) {
      const questionAboutArtist = new QuestionAboutArtist();
      questionAboutArtist.run();

      //добавляем картину
      this.question = this.images[this.questionNumber];
      const questionImage = new QuestionImage(this.question.imageNum);
      questionImage.renderQuestion();

      //добавляем ответы
      this.rightAnswer = this.question.author;
      this.answers.push(this.rightAnswer);
      this.addAnswersToArtists();

      this.answersContainer = document.querySelector(
        '.question-artist-answers'
      );
    }

    // -------------picture quiz
    if (this.typeGame === TYPE_GAME.picture) {
      const questionAboutPicture = new QuestionAboutPicture();
      questionAboutPicture.run();

      this.question = this.images[this.questionNumber];
      this.rightAnswer = this.question.author;
      document.querySelector('.question-author').innerText = this.rightAnswer;

      // добавляем 4 картины для ответов
      this.answers.push([this.rightAnswer, this.question.imageNum]);
      this.addAnswersToPictures();

      this.answersContainer = document.querySelector(
        '.question-picture-answers'
      );
    }

    // ------------общее
    //добавляем буллеты
    this.addBullets();

    //таймер выключен
    if (localStorage.timerOnOff === TIMER_ON_OFF.off) {
      const timerBtn = document.querySelector('.timer-button');
      timerBtn.style.display = 'none';

      const answer = new Answer(this);
      answer.listenAnswer();
    }

    //таймер включен
    if (localStorage.timerOnOff === TIMER_ON_OFF.on) {
      const timer = new Timer(this);
      timer.timerOn();

      //слушаем кнопки, прерывающие игру
      const homeBtn = document.querySelector('.home-button');
      const categoryBtn = document.querySelector('.category-button');
      const settingsBtn = document.querySelector('.settings-button');

      homeBtn.addEventListener('click', () => {
        timer.isEnable = false;
      });
      categoryBtn.addEventListener('click', () => {
        timer.isEnable = false;
      });
      settingsBtn.addEventListener('click', () => {
        timer.isEnable = false;
      });

      //слушаем ответ
      const answer = new Answer(this);
      answer.listenAnswer(timer);
    }
  }

  addBullets() {
    const container = document.querySelector('.bullet-container');

    for (let i = 0; i < 10; i++) {
      const bullet = new Bullet(this.bullets[i]);

      container.innerHTML += bullet.renderBullet();
    }
  }

  async addAnswersToArtists() {
    const container = document.querySelector('.question-artist-answers');

    const images = await fetchAsync('../../data/images.json');

    while (this.answers.length < ANSWER.length) {
      let author = images[randomNumber(images.length - 1)].author;

      if (!this.answers.includes(author)) {
        this.answers.push(author);
      }
    }

    this.answers = shuffle(this.answers);
    this.answers.forEach((answer) => {
      const newAnswer = new AnswerBtnForArtist(answer, this.rightAnswer);
      const renderedAnswer = newAnswer.renderAnswer();
      container.innerHTML += renderedAnswer;
    });
  }

  async addAnswersToPictures() {
    const images = await fetchAsync('../../data/images.json');

    while (this.answers.length < ANSWER.length) {
      let image = images[randomNumber(images.length - 1)];

      if (this.answers[0][0] !== image.author) {
        this.answers.push([image.author, image.imageNum]);
      }
    }

    this.answers = shuffle(this.answers);

    this.answers.forEach((answer, i, arr) => {
      new AnswerImages(answer[0], this.rightAnswer).renderAnswer(i, answer[1]);
    });
  }

  listerNextBtn() {
    const nextBtn = document.querySelector('.button-next');

    nextBtn.addEventListener('click', () => {
      playSound(SOUNDS.soundBtn);

      if (this.questionNumber === START_VALUES.questionsPerRound) {
        this.saveResults();

        if (document.querySelector('.modal-answer')) {
          document.querySelector('.modal-answer').remove();
        }

        const mainScreen = document.querySelector('.main-screen');

        if (this.score === START_VALUES.startScoreNum) {
          const result = new GameOverWindow();
          mainScreen.insertAdjacentHTML('afterEnd', result.render());
          playSound(SOUNDS.gameLost);
        } else if (this.score < START_VALUES.questionsPerRound) {
          const result = new ResultWindow();
          mainScreen.insertAdjacentHTML('afterEnd', result.render());
          const resultScore = document.querySelector('.modal-result-score');
          resultScore.innerHTML = this.score;
          playSound(SOUNDS.soundWin);
        } else if (this.score === START_VALUES.questionsPerRound) {
          const result = new GrandResultWindow();
          mainScreen.insertAdjacentHTML('afterEnd', result.render());
          playSound(SOUNDS.grandWin);
        }

        return;
      }
      this.runRound();
    });
  }

  saveResults() {
    const resultForSave = {};
    resultForSave['score'] = this.score;
    resultForSave['hide'] = SAVE_RESULT.cardScore;
    resultForSave['play'] = SAVE_RESULT.play;
    resultForSave['images'] = [...this.bullets];
    resultForSave['roundResult'] = [...this.roundResult];

    const arrayResults = JSON.parse(localStorage.resultsArtQuiz);

    arrayResults[this.round] = resultForSave;
    localStorage.resultsArtQuiz = JSON.stringify(arrayResults);
  }
}

export default Game;
