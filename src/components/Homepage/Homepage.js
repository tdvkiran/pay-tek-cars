import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import styles from './Homepage.module.css';
import LandingCarImage from '../../assets/landing-page-car.png';
import cityBg from '../../assets/city-bg.png';

function Homepage({ history }) {
  const redirectToCarsPage = () => {
    history.push('/cars');
  };
  return (
    <div className={styles.HomepageContainer}>
      <img className={styles.cityBg} src={cityBg} alt="city-bg" />
      <div className={`${styles.textContainer} ${styles.flexContainer}`}>
        <h1 className={styles.landingText}>Find the Simplest way to Drive Revolution With</h1>
        <img
          src="https://com-tekioncloud-cdms-global.s3-us-west-1.amazonaws.com/DMS/common/paytek.svg"
          alt="paytek logo"
          className={styles.payTekLogo}
        />
      </div>
      <div className={`${styles.flexContainer} ${styles.imageContainer}`}>
        <button className={styles.buttonText} onClick={redirectToCarsPage}>
          Get started <ArrowForward fontSize="medium" />
        </button>
        <img src={LandingCarImage} alt="Landing car" className={styles.landingPageImageContainer} />
      </div>
    </div>
  );
}

export default Homepage;
