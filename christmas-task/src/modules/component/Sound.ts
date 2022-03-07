class Sound {
  isPlay: boolean;
  audio: HTMLAudioElement;

  constructor(audio: HTMLAudioElement) {
    this.isPlay = false;
    this.audio = audio;
  }

  playSound(soundBtn: HTMLButtonElement): void {
    if (localStorage.isSoundForTreePage) {
      this.isPlay = JSON.parse(localStorage.isSoundForTreePage);

      if (this.isPlay) {
        this.audio.play();
        soundBtn.classList.add('active');
      }
    }

    soundBtn.addEventListener('click', (): void => {
      if (!this.isPlay) {
        this.playAudio(soundBtn);
      } else {
        this.muteAudio(soundBtn);
      }
    });

    this.audio.addEventListener('ended', (): void => {
      this.muteAudio(soundBtn);
    });
  }

  playAudio(soundBtn: HTMLButtonElement): void {
    this.audio.play();
    soundBtn.classList.add('active');
    this.isPlay = true;
    localStorage.isSoundForTreePage = JSON.stringify(this.isPlay);
  }

  muteAudio(soundBtn: HTMLButtonElement): void {
    this.audio.pause();
    soundBtn.classList.remove('active');
    this.isPlay = false;
    localStorage.isSoundForTreePage = JSON.stringify(this.isPlay);
  }
}

export default Sound;
