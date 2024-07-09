import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TextInput from './TextInput';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date';
  error?: string | null;
  maxDate?: string;
  required?: boolean;
}

export default {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<TextInputProps> = (args) => {
  const [value, setValue] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    args.onChange(newValue);
  };

  return <TextInput {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'example',
  label: 'Example Input',
  type: 'text',
  error: null,
  required: true,
};

export const WithError = Template.bind({});
WithError.args = {
  id: 'error-example',
  label: 'Input with Error',
  type: 'text',
  error: 'Campo obrigatório',
  required: true,
};

export const DateInput = Template.bind({});
DateInput.args = {
  id: 'date-example',
  label: 'Date Input',
  type: 'date',
  error: null,
  required: true,
};
