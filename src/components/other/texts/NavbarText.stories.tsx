import type { Meta, StoryObj } from '@storybook/nextjs';

import NavbarText from './NavbarText';

const meta = {
  component: NavbarText,
} satisfies Meta<typeof NavbarText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};