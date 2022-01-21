import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.wrapper}>
        <div>
          <Link href="/">
            <a>Logo Da Empresa</a>
          </Link>
        </div>
        <ul>
          <li>
            <Link href="#">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Series</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>Filmes</a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export { Header };
