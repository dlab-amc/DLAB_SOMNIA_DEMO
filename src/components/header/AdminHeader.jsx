import React, { useEffect, useState } from 'react';
import S from './Header.styled';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Alarm } from '../../assets/resource/icons/alarm.svg';
import { useAppDispatch, useAppSelector } from '../../assets/hooks/useRedux';
import { ReactComponent as Logout } from '../../assets/resource/icons/logout.svg';
import { ReactComponent as LogoDark } from '../../assets/resource/images/Logo_Dark.svg';
import { adminLogout } from '../../stores/user/user.slice';
import LanguageToggle from '../common/LanguageToggle';
import { useI18n } from '../../assets/i18n';
import { PLATFORM } from '../../config/platform';

const AdminHeader = () => {
  // Temp Status
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  let { userId, isLogined, notificationCount } = useAppSelector(
    (state) => state.userSlice.admin
  );
  const { t, tf } = useI18n();

  useEffect(() => {
    if (!isLogined) setIsDropdownVisible(false);
  }, [isLogined]);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };
  const handleMouseLeave = (e) => {
    setIsDropdownVisible(false);
  };

  const handleClickLogout = () => {
    // Admin Logout
    dispatch(adminLogout());
    navigate('/admin/login');
  };

  return (
    <S.Container className='admin'>
      <S.SlotStart>
        <S.Title>
          <Link to='/admin' aria-label={`${PLATFORM.shortName} ${t('admin')}`}>
            <LogoDark className='header-logo' aria-hidden />
            <span className='tag'>{t('admin')}</span>
          </Link>
        </S.Title>
      </S.SlotStart>
      <S.SlotCenter>
        <ul className='header-nav'>
          <li>
            <S.FocusLink to='/admin' end>
              {t('home')}
            </S.FocusLink>
          </li>
          <li>
            <S.FocusLink to='/admin/task'>{tf('작업', 'Task')}</S.FocusLink>
          </li>
          <li>
            <S.FocusLink to='/admin/user'>{tf('유저', 'User')}</S.FocusLink>
          </li>
          <li>
            <S.FocusLink to='/admin/total/alarm'>{t('notification')}</S.FocusLink>
          </li>
        </ul>
      </S.SlotCenter>
      <S.SlotEnd>
        <div className='header-login'>
          {isLogined ? (
            <div className='login-wrap'>
              <div
                className='hover-wrap'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className='user-wrap'>
                  <div className='user-id'>
                    <strong className='id'>{userId}</strong>
                  </div>
                  {isDropdownVisible && (
                    <div className='user-id-dropdown'>
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
                <S.FocusLink to='/admin/notification'>
                  <Alarm />
                  {notificationCount > 0 ? (
                    <span className='count'>{notificationCount}</span>
                  ) : null}
                </S.FocusLink>
              </div>
            </div>
          ) : (
            <div className='non-login-wrap'>
              <S.FocusLink className='login-btn' to='/admin/login'>
                {t('login')}
              </S.FocusLink>
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

export default AdminHeader;
