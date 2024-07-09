// Pagination.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Pagination from './Pagination';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: (pageNumber: number) => void;
  }
  

export default {
  title: 'Components/Pagination',
  component: Pagination,
} as Meta;

const Template: StoryFn<PaginationProps> = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  totalPages: 5,
  paginate: (pageNumber: number) => console.log(`Go to page ${pageNumber}`),
};
