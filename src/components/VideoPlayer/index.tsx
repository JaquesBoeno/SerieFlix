import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

// Import Icons
import playIcon from './assets/icons/play/on.svg';
import pauseIcon from './assets/icons/play/off.svg';
import advanceIcon from './assets/icons/time/advance.svg';
import goBackIcon from './assets/icons/time/go-back.svg';
import muteOnIcon from './assets/icons/volume/0.svg';
import muteOffIcon from './assets/icons/volume/2.svg';
import maximizeIcon from './assets/icons/maximize/on.svg';
import minimizeIcon from './assets/icons/maximize/off.svg';

type props = {
  source: string;
};

const Player: React.FC<props> = ({ source }) => {
  const VideoRef = useRef<HTMLVideoElement>(null);
  const TimeBarRef = useRef<HTMLDivElement>(null);
  const TimeWatchedRef = useRef<HTMLDivElement>(null);
  const ContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximize, setIsMaximize] = useState(false);
  const [timeString, setTimeString] = useState('00:00:00 / 00:00:00');
  const [isMute, setIsMute] = useState(false);

  const changePlaying = () => {
    if (!VideoRef.current) return;
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      VideoRef.current.pause();
    } else if (!isPlaying) {
      VideoRef.current.play();
    }
  };

  const changeMaximize = () => {
    if (!VideoRef.current) return;
    setIsMaximize(!isMaximize);

    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const changeMute = () => {
    if (!VideoRef.current) return;
    setIsMute(!isMute);
    VideoRef.current.muted = !isMute;
  };

  const advanceTime = () => {
    if (!VideoRef.current) return;

    if (VideoRef.current.currentTime + 15 <= VideoRef.current.duration)
      VideoRef.current.currentTime = VideoRef.current.currentTime + 15;
    else VideoRef.current.currentTime = VideoRef.current.duration - 1;
  };

  const goBackTime = () => {
    if (!VideoRef.current) return;

    if (VideoRef.current.currentTime - 15 >= 0)
      VideoRef.current.currentTime = VideoRef.current.currentTime - 15;
    else VideoRef.current.currentTime = 0;
  };

  const updatePlayer = (isMoving) => {
    if (!isMoving) {
      var duration = VideoRef.current.duration;
      var currentTime = VideoRef.current.currentTime;

      var durationString = convertDurationToTimeString(duration);
      var currentTimeString = convertDurationToTimeString(currentTime);

      setTimeString(`${currentTimeString} / ${durationString}`);

      if (!TimeWatchedRef.current) return;

      var percentage = (currentTime / duration) * 100;

      TimeWatchedRef.current.style.width = `${percentage}%`;
    }
  };

  useEffect(() => {
    if (!VideoRef.current) return;
    if (!TimeBarRef.current) return;
    if (!ContainerRef.current) return;
    if (!TimeWatchedRef.current) return;

    var canMove = true;
    var isMoving = false;

    updatePlayer(isMoving);

    setInterval(() => {
      updatePlayer(isMoving);
    }, 1000);

    // DeskTop

    TimeBarRef.current.addEventListener('mousedown', (e) => {
      canMove = true;

      ContainerRef.current.addEventListener('mousemove', (e) => {
        if (canMove) {
          isMoving = true;
          var duration = VideoRef.current.duration;
          var progress =
            (e.offsetX * duration) / TimeBarRef.current.offsetWidth;
          const percentage = (progress * 100) / duration;

          if (percentage <= 100)
            TimeWatchedRef.current.style.width = `${percentage}%`;
          VideoRef.current.currentTime = progress;

          if (!isPlaying) {
            VideoRef.current.pause();
          }
        }
      });
    });

    ContainerRef.current.addEventListener('mouseup', (e) => {
      canMove = false;
      isMoving = false;
    });

    // Mobile

    TimeBarRef.current.addEventListener('touchstart', (e) => {
      canMove = true;

      TimeBarRef.current.addEventListener('touchmove', (e) => {
        e.preventDefault();
        var touchX =
          e.changedTouches.item(0).clientX -
          (ContainerRef.current.clientWidth - TimeBarRef.current.clientWidth) /
            2;

        if (canMove) {
          isMoving = true;
          var duration = VideoRef.current.duration;
          var progress = (touchX * duration) / TimeBarRef.current.offsetWidth;
          const percentage = (progress * 100) / duration;

          if (percentage <= 100)
            TimeWatchedRef.current.style.width = `${percentage}%`;
          VideoRef.current.currentTime = progress;
        }

        if (!isPlaying) {
          VideoRef.current.pause();
        }
      });
    });

    ContainerRef.current.addEventListener('touchend', (e) => {
      canMove = false;
      isMoving = false;
    });

    VideoRef.current.play();
  }, []);

  return (
    <div ref={ContainerRef} className={styles.VideoPlayer}>
      <video ref={VideoRef} autoPlay poster="http://192.168.100.94:3080/video">
        <source src={source} type="video/mp4" />
      </video>

      <div className={styles.controls}>
        <div className={styles.controlsWrapper}>
          <div className={styles.leftBox}>
            <p className={styles.time}>{timeString}</p>
          </div>

          <div className={styles.centerBox}>
            <button onClick={goBackTime} className={styles.timeControl}>
              <Image
                src={goBackIcon}
                width="32"
                height="32"
                alt=""
                draggable={false}
              />
            </button>

            <button className={styles.play} onClick={changePlaying}>
              {isPlaying ? (
                <Image
                  src={playIcon}
                  width="24"
                  height="24"
                  alt=""
                  draggable={false}
                />
              ) : (
                <Image
                  src={pauseIcon}
                  width="24"
                  height="24"
                  alt=""
                  draggable={false}
                />
              )}
            </button>

            <button onClick={advanceTime} className={styles.timeControl}>
              <Image
                src={advanceIcon}
                width="32"
                height="32"
                alt=""
                draggable={false}
              />
            </button>
          </div>

          <div className={styles.rightBox}>
            <div className={styles.volume}>
              <button onClick={changeMute} className={styles.mute}>
                {isMute ? (
                  <Image
                    src={muteOnIcon}
                    width="24"
                    height="24"
                    alt=""
                    draggable={false}
                  />
                ) : (
                  <Image
                    src={muteOffIcon}
                    width="24"
                    height="24"
                    alt=""
                    draggable={false}
                  />
                )}
              </button>
            </div>

            <button onClick={changeMaximize} className={styles.maximize}>
              {isMaximize ? (
                <Image
                  src={maximizeIcon}
                  width="24"
                  height="24"
                  alt=""
                  draggable={false}
                />
              ) : (
                <Image
                  src={minimizeIcon}
                  width="24"
                  height="24"
                  alt=""
                  draggable={false}
                />
              )}
            </button>
          </div>
        </div>
        <div ref={TimeBarRef} className={styles.rangeTimeContainer}>
          <div className={styles.time}></div>
          <div ref={TimeWatchedRef} className={styles.timeWatched}></div>
        </div>
      </div>
    </div>
  );
};

export { Player };
