import { Card, Dialog } from '@blueprintjs/core';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePasswordForm from '~shared/components/changePasswordForm/changePassword.component';
import { ROUTER_KEYS } from '~shared/keys';
import { dialogStyles, primaryBtn } from '~shared/styles/common-styles';
import { useAuthStore } from '~store/auth.store';
import { profileWrapper, titleStyles } from './profile.styles';

const UserProfile = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useAuthStore();

  const handleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleLogout = (): void => {
    logOut();
    navigate(ROUTER_KEYS.LOGIN);
  };
  return (
    <div>
      <h2 className={titleStyles}>User Profile</h2>

      <Card className={profileWrapper}>
        <button type="button" className={primaryBtn} onClick={handleLogout}>
          Log uot
        </button>

        <button type="button" className={primaryBtn} onClick={handleOpen}>
          Change Password
        </button>
        <Dialog isOpen={isOpen} onClose={handleClose} className={dialogStyles}>
          <ChangePasswordForm handleClose={handleClose} />
        </Dialog>
      </Card>
    </div>
  );
};

export default UserProfile;
