import React, { FC } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useStyles } from './Requirements.styles';

interface IPermissionRule {
  label: string;
  passing: boolean;
}

export interface RequirementsProps {
  rules: IPermissionRule[];
  title: string;
}

export const Requirements: FC<RequirementsProps> = ({
  rules,
  title,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Typography variant="body1">{title}</Typography>
      <List>
        {rules?.map((rule) => (
          <ListItem key={rule.label} role={undefined} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={rule.passing}
                tabIndex={-1}
                disableRipple
                disabled
              />
            </ListItemIcon>
            <ListItemText primary={rule.label} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
