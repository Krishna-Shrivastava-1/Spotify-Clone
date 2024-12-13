// src/AudioManager.js
export class AudioManager {
    static audio = new Audio();
    
    static play(songUrl) {
      if (this.audio.src !== songUrl) {
        this.audio.src = songUrl;
        this.audio.play();
      } else {
        this.audio.paused ? this.audio.play() : this.audio.pause();
      }
    }
  
    static stop() {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }
  