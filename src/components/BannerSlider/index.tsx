import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const BannerSlider: React.FC = () => {
  const bannerContainerRef = useRef<HTMLDivElement>();
  const bannerRef = useRef<HTMLDivElement>();

  const res = [{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }];

  var Index = 0;

  const next = () => {
    if (!bannerContainerRef.current) return;
    if (!bannerRef.current) return;

    if (Index + 1 < 4) Index++;
    else Index = 0;
    bannerContainerRef.current.scrollTo({
      top: 0,
      left: bannerRef.current.scrollWidth * Index,
    });
  };

  const switchBanner = (index: number) => {
    if (!(index >= 0)) return;
    if (!bannerContainerRef.current) return;
    if (!bannerRef.current) return;

    bannerContainerRef.current.scrollTo({
      top: 0,
      left: bannerRef.current.scrollWidth * index,
    });

    Index = index;
  };

  useEffect(() => {
    setInterval(() => {
      next();
    }, 10000);
  }, []);

  return (
    <>
      <div className={styles.BannerContainer}>
        <div className={styles.buttonContainer}>
          {res.map((current, key) => {
            const Key = key;
            return <button key={key} onClick={() => switchBanner(Key)} />;
          })}
        </div>

        <div ref={bannerContainerRef} className={styles.bannerWrapper}>
          {res.map((current, key) => {
            return (
              <div ref={bannerRef} key={key} className={styles.banner}>
                {current.title}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { BannerSlider };
