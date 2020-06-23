import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggable = React.forwardRef(
  ({ labelClosed, labelOpened, className, children }, ref) => {
    const [open, setOpen] = useState(false);

    const toggleVisibility = () => {
      setOpen(!open);
    };

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <>
        {open && children}
        <button onClick={toggleVisibility} className={className || ''}>
          {open ? labelOpened : labelClosed}
        </button>
      </>
    );
  }
);

Toggable.propTypes = {
  labelClosed: PropTypes.string.isRequired,
  labelOpened: PropTypes.string.isRequired,
};

Toggable.displayName = 'Togglable';

export default Toggable;
