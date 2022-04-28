import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function IconCheckboxes() {
  return (
    <div>
      <Checkbox {...label} icon={<VisibilityOffOutlinedIcon />} checkedIcon={<VisibilityOffIcon />} />
    </div>
  );
}