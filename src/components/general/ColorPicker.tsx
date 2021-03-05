import { FC, useState } from 'react';
import { Box, styled } from '@material-ui/core';
import { SketchPicker } from 'react-color';

export const generateRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ColorButton = styled(Box)({
  padding: '5px',
  background: '#fff',
  borderRadius: '1px',
  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
  display: 'inline-block',
  cursor: 'pointer',
  '&>div': {
    width: '35px',
    height: '35px',
    borderRadius: '2px',
    backgroundColor: (props: any) => props.color,
  },
});

const ColorPopover = styled(Box)({
  position: 'absolute',
  zIndex: 2,
  '&>div': {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
});

interface IColorPickerProps {
  color: string;
  onChangeColor?: (color: string) => void;
}
const ColorPicker: FC<IColorPickerProps> = ({ color, onChangeColor }) => {
  const [display, setDisplay] = useState(false);

  return (
    <div>
      <ColorButton color={color} onClick={() => setDisplay(!display)}>
        <div />
      </ColorButton>
      {display && (
        <ColorPopover>
          <div onClick={() => setDisplay(false)} />
          <SketchPicker color={color} onChange={(c) => onChangeColor(c.hex)} />
        </ColorPopover>
      )}
    </div>
  );
};

export default ColorPicker;
