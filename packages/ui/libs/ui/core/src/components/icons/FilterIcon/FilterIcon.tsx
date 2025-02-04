import React from 'react';
import { useStyles } from './FilterIcon.styles';

/* eslint-disable-next-line */
export interface FilterIconProps {}

export function FilterIcon() {
  const classes = useStyles();
  return (
    <svg
      width="15"
      height="19"
      viewBox="0 0 15 19"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="Canvas" transform="translate(7022 2714)">
        <g id="Filter">
          <g id="Shape">
            <path
              className={classes.primaryColorFill}
              transform="translate(-7022 -2710.63)"
              d="M 0 0L 15 0L 15 2.14286L 8.57143 7.5L 8.57143 15L 6.42857 12.8571L 6.42857 7.5L 0 2.14286L 0 0Z"
            />
          </g>
          <g id="Shape">
            <path
              className={classes.primaryColorFill}
              transform="translate(-7022 -2714)"
              d="M 0 0L 15 0L 15 2L 0 2L 0 0Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default FilterIcon;
