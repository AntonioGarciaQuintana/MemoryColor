import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Howl, Howler } from 'howler';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  buttonSeLecterd = 0;
  timeForDraw = 1000;
  gameRunning = false;
  runningSecuence = false;
  score = 0;
  totalRandomNumbers = 0;

  constructor(public alertController: AlertController) { }

  secuenceNumber = [];
  buttonsClickSecuence = [];

  initGame() {
    this.gameRunning = false;
    this.secuenceNumber = [];
    this.buttonsClickSecuence = [];
    this.score = 0;
    this.totalRandomNumbers = 0;
  }


  OnClickButton(selecterNumber: number) {
    this.buttonsClickSecuence.push(selecterNumber);
    this.playSoundButton();
    const result = this.isCorrectSecuence();

    if (!result) {
      this.showMessage();
    } else {
      this.score += 1;
      if (this.secuenceNumber.length === this.buttonsClickSecuence.length) {
        this.drawSecuence();
      }
    }
  }

  async showMessage() {
    this.playSoundLose();
    const alert = await this.alertController.create({
      header: 'You Loss ;(',
      subHeader: 'You total score: ' + this.score,
      message: 'Better luck next time. :D',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.initGame();
          }
        }]
    });

    await alert.present();
  }

  isCorrectSecuence() {
    for (let index = 0; index < this.buttonsClickSecuence.length; index++) {

      if (this.secuenceNumber[index] !== this.buttonsClickSecuence[index]) {
        return false;
      }

    }
    return true;
  }

  startGame() {
    this.initGame();
    this.gameRunning = true;
    this.drawSecuence();
  }

  drawSecuence() {
    this.totalRandomNumbers += 1;
    this.secuenceNumber = this.getRandomNumber();
    this.runningSecuence = true;
    this.secuenceNumber.forEach((element, index) => {
      const loopCount = this.timeForDraw * (index + 1);

      setTimeout(() => {
        this.buttonSeLecterd = element;
        this.playSoundSecuence();
      }, loopCount);
    });
    this.cleanTimeOutButton();
  }

  cleanTimeOutButton() {
    const timeOutTotal = ((this.timeForDraw * this.secuenceNumber.length) + 1000);
    setTimeout(() => {
      this.buttonSeLecterd = 0;
      this.runningSecuence = false;
      this.buttonsClickSecuence = [];
    }, timeOutTotal);
  }


  getRandomNumber() {
    const arrayNumbers = [];

    for (let index = 0; index < this.totalRandomNumbers; index++) {
      arrayNumbers.push(Math.floor(Math.random() * (9 - 1 + 1)) + 1);
    }

    return arrayNumbers;
  }


  playSoundButton() {
    const sound = new Howl({
      src: ['assets/sounds/secuence_button_sound.mp3']
    });

    sound.play();
  }

  playSoundLose() {
    const sound = new Howl({
      src: ['assets/sounds/you_lose.mp3']
    });

    sound.play();
  }

  playSoundSecuence() {
    const sound = new Howl({
      src: ['assets/sounds/secuence_draw_sound.mp3']
    });

    sound.play();
  }


}
