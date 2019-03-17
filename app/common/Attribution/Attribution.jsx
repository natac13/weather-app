import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import style from './style.scss';

function Attribution(props) {
  const { photoId, photographer } = props;

  return (
    <div className={style.wrapper}>
      <Typography variant="caption">Background Photo by:</Typography>
      <Typography variant="body1" className={style.attribution}>
        <a
          href={`https://unsplash.com/photos/${photoId}`}
          className={style.photographer}
          target="_blank"
        >
          {photographer}
        </a>{' '}
        on{' '}
        <a
          href="https://unsplash.com/"
          className={style.upsplash}
          target="_blank"
        >
          Unsplash
        </a>
      </Typography>
    </div>
  );
}

Attribution.propTypes = {
  photographer: PropTypes.string.isRequired,
  photoId: PropTypes.string.isRequired,
};

export default Attribution;
