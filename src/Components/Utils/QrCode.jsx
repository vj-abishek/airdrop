import React, { useEffect, useRef } from 'react';
import QrCreator from 'qr-creator';
import PropTypes from 'prop-types';

export default function App(props) {
  const { value, radius, Level, fill, background, size } = props;
  const qrCode = useRef();

  useEffect(() => {
    const element = qrCode.current;
    QrCreator.render(
      {
        text: value,
        radius, // 0.0 to 0.5
        ecLevel: Level, // L, M, Q, H
        fill, // foreground color
        background, // color or null for transparent
        size, // in pixels
      },
      element,
    );
  }, [qrCode, value, radius, Level, fill, background, size]);

  return <canvas ref={qrCode} title={value} />;
}

App.defaultProps = {
  value: 'Hello world',
  size: 128,
  radius: 0.5,
  Level: 'M',
  fill: '#536DFE',
  background: null,
};

App.propTypes = {
  value: PropTypes.string,
  size: PropTypes.number,
  radius: PropTypes.number,
  Level: PropTypes.string,
  fill: PropTypes.string,
  background: PropTypes.string,
};
