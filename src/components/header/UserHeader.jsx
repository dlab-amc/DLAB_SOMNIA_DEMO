import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Alarm } from '../../assets/resource/icons/alarm.svg';
import { ReactComponent as Submit } from '../../assets/resource/icons/submit.svg';
import { ReactComponent as Logout } from '../../assets/resource/icons/logout.svg';
import { ReactComponent as LogoDark } from '../../assets/resource/images/Logo_Dark.svg';

import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { userLogout } from '../../stores/user/user.slice';
import S from './Header.styled';
import LanguageToggle from '../common/LanguageToggle';
import { useI18n } from '../../assets/i18n';
import { PLATFORM } from '../../config/platform';

const UserHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitDropdownVisible, setSubmitDropdownVisible] = useState(false);

  const { userId, isLogined, notificationCount } = useAppSelector(
    (state) => state.userSlice.user
  );
  const { t } = useI18n();

  useEffect(() => {
    if (!isLogined) {
      setDropdownOpen(false);
      setSubmitDropdownVisible(false);
    }
  }, [isLogined]);

  const handleClickLogout = () => {
    dispatch(userLogout());
    navigate('/');
  };

  const submitPageLinkURLs = [
    '/submit/details',
    '/submit/upload',
    '/submit/parameters',
  ];

  return (
    <S.Container>
      <S.SlotStart>
        <S.Title>
          <Link to='/' aria-label={PLATFORM.shortName}>
            <LogoDark className='header-logo' aria-hidden />
          </Link>
        </S.Title>
      </S.SlotStart>
      <S.SlotCenter>
        <ul className='header-nav'>
          <li>
            <S.FocusLink to='/'>{t('home')}</S.FocusLink>
          </li>
          <li>
            <S.FocusLink to='/about'>{t('about')}</S.FocusLink>
          </li>
          <li
            className='dropdown-wrap'
            onMouseEnter={() => setSubmitDropdownVisible(true)}
            onMouseLeave={() => setSubmitDropdownVisible(false)}
          >
            <S.FocusLink
              to='/submit/guide'
              className={`submit-link ${
                submitPageLinkURLs.includes(location.pathname) ? 'active' : ''
              }`}
            >
              {t('submit')}
            </S.FocusLink>
            {isSubmitDropdownVisible && (
              <div className='dropdown-menu'>
                <Link to='/submit/guide' className='dropdown-item'>
                  {t('submitGuide')}
                </Link>
                <Link to='/submit/details' className='dropdown-item'>
                  {t('submitFiles')}
                </Link>
              </div>
            )}
          </li>
          <li>
            <S.FocusLink to='/contact'>{t('contact')}</S.FocusLink>
          </li>
        </ul>
      </S.SlotCenter>
      <S.SlotEnd>
        <div className='header-login'>
            {isLogined ? (
              <div className='login-wrap'>
                <div
                  className='hover-wrap'
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className='user-wrap'>
                    <div className='user-id'>
                      <strong className='id'>{userId}</strong>
                      <span>{t('userHonorific')}</span>
                    </div>
                    {isDropdownOpen && (
                      <div className='user-id-dropdown'>
                        <Link to='/mypage' className='dropdown-menu'>
                          {t('mypage')}
                        </Link>
                        <button
                          className='dropdown-menu logout-button'
                          onClick={handleClickLogout}
                        >
                          <span className='icon'>
                            <Logout />
                          </span>
                          <span className='text'>{t('logout')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className='icon-menus'>
                  <div className='icon-tooltip-wrap'>
                    <S.FocusLink
                      to='/submit/list'
                      aria-label={t('submitList')}
                      onClick={(e) => e.currentTarget.blur()}
                    >
                      <Submit />
                    </S.FocusLink>
                    <span className='icon-tooltip' role='tooltip'>
                      {t('submitList')}
                    </span>
                  </div>
                  <div className='icon-tooltip-wrap'>
                    <S.FocusLink
                      to='/notification'
                      aria-label={t('notification')}
                      onClick={(e) => e.currentTarget.blur()}
                    >
                      <Alarm />
                      {notificationCount > 0 && (
                        <span className='count'>{notificationCount}</span>
                      )}
                    </S.FocusLink>
                    <span className='icon-tooltip' role='tooltip'>
                      {t('notification')}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className='non-login-wrap'>
                <Link className='login-btn' to='/login'>
                  {t('login')}
                </Link>
              </div>
            )}
          </div>

        <div className='lang-toggle'>
          <LanguageToggle />
        </div>
      </S.SlotEnd>
    </S.Container>
  );
};

export default UserHeader;
