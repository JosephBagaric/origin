import React, { FC, memo } from 'react';
import { ThemeModeEnum } from '@energyweb/origin-ui-theme';
import { Box, Button, SwitchProps, Toolbar } from '@mui/material';
import { useStyles } from './DesktopTopBar.styles';
import { TopBarButtonData } from '../TopBar';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import clsx from 'clsx';

export interface DesktopTopBarProps {
  buttons: TopBarButtonData[];
  toolbarClassName?: string;
  themeSwitcher?: boolean;
  themeMode?: ThemeModeEnum;
  changeThemeMode?: () => void;
  themeSwitchProps?: Omit<SwitchProps, 'checked' | 'onChange'>;
}

export const DesktopTopBar: FC<DesktopTopBarProps> = memo(
  ({
    buttons,
    toolbarClassName,
    themeSwitcher = false,
    themeMode,
    changeThemeMode,
    themeSwitchProps,
  }) => {
    const classes = useStyles();
    return (
      <Toolbar className={clsx(classes.toolbar, toolbarClassName)}>
        <Box flexGrow={1} />
        {themeSwitcher && (
          <ThemeSwitcher
            selected={themeMode === ThemeModeEnum.Light}
            handleThemeChange={changeThemeMode}
            switchProps={themeSwitchProps}
          />
        )}
        {buttons
          ?.filter((v) => v.show !== false)
          .map(({ label, onClick }) => (
            <Button className={classes.button} key={label} onClick={onClick}>
              {label}
            </Button>
          ))}
      </Toolbar>
    );
  }
);
