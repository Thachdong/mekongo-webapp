import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PasswordInput } from "@/shared-components/molecules/password-input";

const meta = {
  title: "Shared/Molecules/PasswordInput",
  component: PasswordInput,
  parameters: { layout: "centered" },
  args: {
    placeholder: "Enter password",
  },
  render: (args) => (
    <div className="w-64">
      <PasswordInput {...args} />
    </div>
  ),
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Sup3rSecret!" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Sup3rSecret!" },
};

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "weak" },
};
