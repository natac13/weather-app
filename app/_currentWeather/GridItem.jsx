import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

function GridItem({ classname, title, value, units, extra }) {
  return (
    <div className={classname}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body1">
        {value}
        {units ? (
          <span>
            {units} {extra}
          </span>
        ) : null}
      </Typography>
    </div>
  );
}

GridItem.propTypes = {
  classname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  units: PropTypes.string,
  extra: PropTypes.string,
};

GridItem.defaultProps = {
  value: null,
  units: null,
  extra: null,
};

export default GridItem;
