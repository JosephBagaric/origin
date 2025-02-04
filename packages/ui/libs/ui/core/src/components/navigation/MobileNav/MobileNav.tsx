import { EnergyWebLogo } from '@energyweb/origin-ui-assets';
import { BoxProps, Drawer, List, PaperProps } from '@mui/material';
import React, { FC, ReactNode } from 'react';
import { CloseButton } from '../../buttons';
import { IconLink } from '../../icons';
import { UsernameAndOrg, UsernameAndOrgProps } from '../../layout';
import { TMenuSection, NavBarSection } from '../NavBarSection';
import { useStyles } from './MobileNav.styles';

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  userAndOrgData: UsernameAndOrgProps;
  isAuthenticated: boolean;
  menuSections: TMenuSection[];
  icon?: ReactNode;
  iconWrapperProps?: BoxProps;
  paperProps?: PaperProps;
}

export const MobileNav: FC<MobileNavProps> = ({
  open,
  onClose,
  menuSections,
  isAuthenticated,
  userAndOrgData,
  icon,
  iconWrapperProps,
  paperProps,
}) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="left"
      open={open}
      variant="persistent"
      className={classes.drawer}
      PaperProps={paperProps}
    >
      <CloseButton onClose={onClose} />
      <IconLink url="/" wrapperProps={iconWrapperProps}>
        {icon ? icon : <EnergyWebLogo className={classes.logo} />}
      </IconLink>
      {isAuthenticated && (
        <UsernameAndOrg className={classes.userAndOrg} {...userAndOrgData} />
      )}
      <List className={classes.list}>
        {menuSections?.map(({ sectionTitle, rootUrl, show, menuList }) => (
          <NavBarSection
            closeMobileNav={onClose}
            key={sectionTitle}
            sectionTitle={sectionTitle}
            isOpen={true}
            rootUrl={rootUrl}
            show={show}
            menuList={menuList}
          />
        ))}
      </List>
    </Drawer>
  );
};
