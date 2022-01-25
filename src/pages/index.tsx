import Image from 'next/image';
import { useRef } from 'react';
import { BannerSlider } from '../components/BannerSlider';
import { MoviesSuggestion } from '../components/moviesSuggestion';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div className={styles.PageContainer}>
      <BannerSlider />
      <div className="Container">
        <MoviesSuggestion Name="Séries" />
        <MoviesSuggestion Name="Séries" />
        <MoviesSuggestion Name="Séries" />
        <MoviesSuggestion Name="Séries" />
      </div>
    </div>
  );
}
