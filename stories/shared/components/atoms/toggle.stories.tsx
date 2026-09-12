import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Toggle, ToggleItem } from "@/shared-components/atoms/toggle";

const meta = {
  title: "Shared/Atoms/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toggle defaultValue={["email"]}>
      <ToggleItem value="email">Email</ToggleItem>
      <ToggleItem value="phone">Phone</ToggleItem>
    </Toggle>
  ),
};

export const ThreeItems: Story = {
  render: () => (
    <Toggle defaultValue={["individual"]}>
      <ToggleItem value="individual">Individual</ToggleItem>
      <ToggleItem value="distributor">Distributor</ToggleItem>
      <ToggleItem value="factory">Factory</ToggleItem>
    </Toggle>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toggle defaultValue={["email"]} disabled>
      <ToggleItem value="email">Email</ToggleItem>
      <ToggleItem value="phone">Phone</ToggleItem>
    </Toggle>
  ),
};
