// InvestmentTable.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import InvestmentTable from './InvestmentTable';
import { Investment } from '../../../types';

interface InvestmentTableProps {
    investments: Investment[];
    handleDetailsClick: (investmentId: string) => void;
}
export default {
  title: 'Components/InvestmentTable',
  component: InvestmentTable,
} as Meta;

const investments: Investment[] = [
  {
      id: '1', owner: 'John Doe', date: '2024-01-01', initialValue: 1000,
      withdrawals: []
  },
  {
      id: '2', owner: 'Jane Smith', date: '2024-02-01', initialValue: 2000,
      withdrawals: []
  },
  {
      id: '3', owner: 'Mike Johnson', date: '2024-03-01', initialValue: 1500,
      withdrawals: []
  },
];

const handleDetailsClick = (investmentId: string) => {
  console.log(`Clicked details for investment ID: ${investmentId}`);
};

const Template: StoryFn<InvestmentTableProps> = (args) => <InvestmentTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  investments,
  handleDetailsClick,
};
