import React, { FC } from 'react';
import { StyledLabel } from './styled';
import { CheckboxProps } from './interfaces';

const Checkbox: FC<CheckboxProps> = (props) => (
  <StyledLabel>
    <input {...props} type="checkbox" />
    <span>{props.label}</span>
  </StyledLabel>
);

export default Checkbox;
