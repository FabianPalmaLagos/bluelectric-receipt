import React from 'react';

const ScrollViewMock = ({ children, ...props }) => {
  return React.createElement('div', {
    'data-testid': 'scroll-view-mock',
    ...props
  }, children);
};

export default ScrollViewMock; 