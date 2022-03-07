import { SOUNDS, TIMER_ON_OFF } from '../../utils';

export async function playSound(type) {
  const sounds = {
    [SOUNDS.soundBtn]: './assets/sounds/zvuk-button.mp3',
    [SOUNDS.soundRightAnswer]: './assets/sounds/zvuk-pravilnogo-otveta.mp3',
    [SOUNDS.soundErrorAnswer]: './assets/sounds/zvuk-nevernogo-otveta.mp3',
    [SOUNDS.soundWin]: './assets/sounds/game-won.mp3',
    [SOUNDS.grandWin]: './assets/sounds/grand-pobeda-melodiya.mp3',
    [SOUNDS.gameLost]: './assets/sounds/game-lost.mp3',
  };

  const audio = new Audio();
  audio.src = sounds[type];

  if (localStorage['levelSoundArtQuiz']) {
    audio.volume = Number(localStorage['levelSoundArtQuiz']);
  }

  if (localStorage.soundMute === TIMER_ON_OFF.off) {
    audio.pause();
  } else {
    const playPromise = audio.play();

    if (playPromise !== null) {
      playPromise.catch(() => {
        audio.play();
      });
    }
  }
}
