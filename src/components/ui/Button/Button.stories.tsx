// src/components/Button/Button.stories.tsx

import React from 'react';
import { Meta } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import Button from './Button';

interface ButtonProps {
    onClick: () => void;
    text: string;
  }

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template = (args: ButtonProps) => <Button {...args} />;

export const Primary = () => (
  <Button
    text={text('Text', 'Primary Button')}
    onClick={() => {
      alert('Primary button clicked');
    }}
  />
);

export const Secondary = () => (
  <Button
    text={text('Text', 'Secondary Button')}
    onClick={() => {
      alert('Secondary button clicked');
    }}
  />
);
