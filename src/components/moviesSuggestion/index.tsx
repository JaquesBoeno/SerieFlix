import Image from 'next/image';
import { ReactNode, useRef } from 'react';
import styles from './styles.module.scss';

type props = {
  children?: ReactNode;
  Name: string;
};

const MoviesSuggestion: React.FC<props> = ({ Name }) => {
  const scrollRef = useRef<HTMLDivElement>();
  const movieWrapperRef = useRef<HTMLDivElement>();

  var index = 0;

  const nextTrailer = () => {
    console.log(movieWrapperRef.current.clientWidth);
    if (!scrollRef.current) return;
    if (!movieWrapperRef.current) return;

    if (index + 1 < Math.ceil(24 / 5)) index++;
    else index = 0;

    scrollRef.current.scrollTo({
      left: movieWrapperRef.current.clientWidth * 5 * index,
      behavior: 'smooth',
    });
  };

  const prevTrailer = () => {
    console.log(movieWrapperRef.current.clientWidth);
    if (!scrollRef.current) return;
    if (!movieWrapperRef.current) return;

    if (index - 1 >= 0) index--;
    else index = Math.ceil(24 / 5) - 1;

    scrollRef.current.scrollTo({
      left: movieWrapperRef.current.clientWidth * 5 * index,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.moviesSuggestionContainer}>
      <h2>{Name}:</h2>
      <div>
        <button onClick={prevTrailer}>
          <Image
            src="/assets/icons/arrow-left.svg"
            width={32}
            height={32}
            alt=""
          />
        </button>
        <div ref={scrollRef}>
          <div className={styles.moviesContainer}>
            <div ref={movieWrapperRef} className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div ref={movieWrapperRef} className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div ref={movieWrapperRef} className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
            <div className={styles.movieWrapper}>
              <div className={styles.movieBanner}></div>
            </div>
          </div>
        </div>
        <button onClick={nextTrailer}>
          <Image
            src="/assets/icons/arrow-right.svg"
            width={32}
            height={32}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export { MoviesSuggestion };
