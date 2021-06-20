import React, { useContext, useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "../assets/scss/audio-player.scss";
import "react-h5-audio-player/lib/styles.css";
import { DurationContext } from "../App";
import { useAtom } from "jotai";
import { decaSecondAtom, secondAtom, speedAtom, timerIdAtom } from "../utils/atoms";
import Util from "../utils/util";

interface IOwnProps {
}

const AudioPlayerComps: React.FunctionComponent<IOwnProps> = ( ) => {
  const audioRef = useRef(null);
  const [timerId, setTimerId] = useAtom(timerIdAtom);
  const [second, setSecond] = useAtom(secondAtom);
  const [decaSecond, setDecaSecond] = useAtom(decaSecondAtom);
  const [speed, setSpeed] = useAtom(speedAtom);
  const [startTimer, setStartTimer] = useState(0);

  const time = second + decaSecond / 1000;
  const { setDuration } = useContext(DurationContext);

  useEffect(() => {
    // @ts-ignore
    audioRef.current.audio.current.currentTime = time;
  }, [time]);

  useEffect(() => {
    // @ts-ignore
    let audio = audioRef.current.audio.current;

    audio.preload = "metadata";
    audio.onloadedmetadata = () => {
      setDuration(Math.round(audio.duration));
    };
  }, []);

  useEffect(() => {
    if (decaSecond >= 999) {
      setSecond((second) => second + 1);
      setDecaSecond(0);
    }
    setDecaSecond((decaSecond) => decaSecond + speed);
  }, [startTimer]);

  const onPlay = () => {
    const timerId = window.setInterval(
      () => setStartTimer((startTimer) => startTimer + 1),
      40
    );
    setTimerId(timerId);
  };

  const onPause = () => {
    window.clearInterval(timerId);
    setStartTimer(0);
  };

  const onEnded = () => {
    window.clearInterval(timerId);
    setSecond(0);
    setDecaSecond(0);
  };

  useEffect(() => {
    if (second < 0) {
      setSecond(0);
      setDecaSecond(0);
    }
  }, [second]);

  const onRewind = () => {
    setSecond((second) => second - 10);
  };

  const onSpeed = () =>{
    if(speed===80){
      setSpeed(20)
      return
    }
    setSpeed(speed+20)
  }

  return (
    <div className="audio-player">
      <AudioPlayer
        src={'music/music.wav'}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        ref={audioRef}
      />
      <div className="audio-controls">
        <div
          className="forward"
          onClick={() => setSecond((second) => second + 10)}
        >
          <img src={Util.publicUrl("/images/rotate-right.svg")} className="forward-button" />
        </div>
        <div className="rewind" onClick={onRewind}>
          <img src={Util.publicUrl("/images/rotate-left.svg")} className="rewind-button" />
        </div>
        <div>
          <div
            className="speed"
            onClick={onSpeed}
          >
            {(speed*0.025).toFixed(2)}x
          </div>
        </div>
        <div className="share">
          <img src={Util.publicUrl("/images/share.png")} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerComps;
