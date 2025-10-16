import type { Meta, StoryObj } from '@storybook/nextjs';

import Feed from './Feed';

const meta = {
  component: Feed,
} satisfies Meta<typeof Feed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};