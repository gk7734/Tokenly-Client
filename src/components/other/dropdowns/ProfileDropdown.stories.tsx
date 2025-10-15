import type { Meta, StoryObj } from '@storybook/nextjs';

import ProfileDropdown from './ProfileDropdown';

const meta = {
  component: ProfileDropdown,
} satisfies Meta<typeof ProfileDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};