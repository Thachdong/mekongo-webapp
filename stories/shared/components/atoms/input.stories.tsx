import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/shared-components/atoms/input";

const meta = {
  title: "Shared/Atoms/Input",
  component: Input,
  parameters: { layout: "centered" },
  args: {
    placeholder: "Type something...",
  },
  render: (args) => (
    <div className="w-64">
      <Input {...args} />
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "hello@example.com" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "disabled" },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "invalid value" },
};
