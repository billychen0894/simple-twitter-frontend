import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import { debounce } from 'lodash';

import MainHeader from 'shared/components/Navigation/MainHeader';
import Button from 'shared/components/UIElements/Button';
import NavLinks from 'shared/components/Navigation/NavLinks';
import { ReactComponent as SiteLogo } from 'assets/icons/logoIcon.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logoutIcon.svg';
import { ReactComponent as TweetPostBtn } from 'assets/icons/tweetIcon.svg';
import { ModalContentContext } from 'contexts/ModalContentContext';
import styles from 'shared/components/Navigation/MainNavigation.module.scss';

function MainNavigation() {
  const location = useLocation();
  const [isMediumScreen, setIsMediumScreen] = useState(
    window.innerWidth < 1200
  );

  const modalContentCtx = useContext(ModalContentContext);
  const { handleModalClick } = modalContentCtx;

  const handleModalType = () => {
    handleModalClick('compose');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth < 1200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MainHeader>
      <div className={styles.mainNavigation}>
        <div className={styles.navLinks}>
          <NavLink to="/home" className={styles.logoWrapper}>
            <SiteLogo className={styles.logo} />
          </NavLink>
          <nav className={styles.navLinksWrapper}>
            <NavLinks />
          </nav>
          <div className={styles.btnWrapper}>
            <Button
              to="/compose/tweet"
              state={{ background: location, action: 'TWEET' }}
              className={styles.tweetBtn}
              onClick={handleModalType}
            >
              {isMediumScreen ? <TweetPostBtn /> : '推文'}
            </Button>
          </div>
        </div>
        <div className={styles.logout}>
          <div className={styles.logoutIcon}>
            <LogoutIcon />
          </div>
          <div className={styles.logoutText}>
            <span>登出</span>
          </div>
        </div>
      </div>
    </MainHeader>
  );
}

export default MainNavigation;
