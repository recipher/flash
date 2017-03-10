import React from 'react';
import Radium from 'radium';
import color from 'color';
import { Info, Warning, Err, Notify } from '@recipher/icons';

const COLORS = {
  info: '#4d8796'
, warning: '#fbbd08'
, error: '#a95252'
, notify: '#21ba45'
};

const ICONS = {
  info: Info
, error: Err
, warning: Warning
, notify: Notify
};

const Message = Radium(({ flash }) => {
  const colour = COLORS[flash.type];

  const styles = {
    base: {
      fontSize: 19
    , fontWeight: '400'
    , lineHeight: '1.3em'
    , padding: 20
    , backgroundColor: color(colour).lighten(0.6).hexString()
    , color: color(colour).darken(0.25).hexString()
    }
  };

  const Icon = ICONS[flash.type];

  return (
    <div style={styles.base}>
      <Icon colour={color(colour).darken(0.25).hexString()} allowHover={false}/>
      <span style={{paddingBottom: 25}}> {flash.text}</span>
    </div>
  );
});

export default Radium(({ flash, onClose }) => {
  const active = flash.text !== '' && flash.active;

  const styles = {
    base: {
      width: '100%'
    , zIndex: 1032
    , overflow: 'hidden'
    , position: 'absolute'
    , opacity: 0
    , transform: 'translate3D(0, -120px, 0)'
    , transition: 'opacity 250ms ease-in, transform 500ms ease-in'
    , borderBottom: '1px solid ' + color(colours[flash.type]).lighten(0.25).hexString()
    }
  , active: {
      opacity: 0.95
    , transform: 'translate3D(0, 0, 0)'
    , transition: 'opacity 400ms ease-out, transform 500ms ease-out'
    }
  , canClose: {
      cursor: 'pointer'
    }
  };

  return (
    <div style={[ styles.base, active && styles.active, onClose && styles.canClose ]} onClick={onClose}>
      <Message flash={flash}/>
    </div>
  );
});
