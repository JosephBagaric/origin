import {
  CircularProgress,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TableCell,
} from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import React, { PropsWithChildren, ReactElement, SyntheticEvent } from 'react';
import { TableActionData } from '../../../containers';
import { useStyles } from './TableComponentActions.styles';
import { useTableActionsEffects } from './TableComponentsActions.effects';

export interface TableComponentActionsProps<Id> {
  id: Id;
  actions: TableActionData<Id>[];
}

export type TTableComponentActions = <Id>(
  props: PropsWithChildren<TableComponentActionsProps<Id>>
) => ReactElement;

export const TableComponentActions: TTableComponentActions = ({
  id,
  actions,
}) => {
  const classes = useStyles();
  const { open, setOpen, handleMobileOpen } = useTableActionsEffects();
  const anyActionLoading = actions?.some((action) => action.loading);

  if (!actions) return <TableCell />;

  return (
    <TableCell className={classes.cell}>
      <div className={classes.wrapper}>
        <SpeedDial
          FabProps={{ className: classes.speedDialButton }}
          ariaLabel={`speed-dial-${id}`}
          icon={<SpeedDialIcon icon={<MoreHoriz />} />}
          onClose={() => setOpen(false)}
          onMouseOver={() => setOpen(true)}
          onClick={(event: React.SyntheticEvent<Element, Event>) =>
            handleMobileOpen(event)
          }
          open={open}
          className={classes.speedDial}
        >
          {actions.map((action) => (
            <SpeedDialAction
              tooltipOpen
              key={action.name + id}
              icon={action.loading ? <CircularProgress /> : action.icon}
              tooltipTitle={action.name}
              FabProps={{ disabled: anyActionLoading }}
              onClick={(event: SyntheticEvent) => {
                event.stopPropagation();
                action.onClick(id);
              }}
              classes={{
                fab: classes.speedDialActionButton,
                staticTooltipLabel: classes.speedDialActionTooltip,
              }}
            />
          ))}
        </SpeedDial>
      </div>
    </TableCell>
  );
};
