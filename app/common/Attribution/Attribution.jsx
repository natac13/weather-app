import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import style from './style.scss';

function Attribution(props) {
  const { photoId, photographer } = props;

  return (
    <Typography variant="body1" className={style.wrapper}>
      <a
        href={`https://upslapsh.com/photos/${photoId}`}
        className={style.photographer}
      >
        {photographer}
      </a>
      on
      <a href="https://upslapsh.com/" className={style.upsplash}>
        Upslapsh
      </a>
    </Typography>
  );
}

Attribution.propTypes = {
  photographer: PropTypes.string.isRequired,
  photoId: PropTypes.string.isRequired,
};

export default Attribution;
