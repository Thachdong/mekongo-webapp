import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Textarea } from "@/shared-components/atoms/textarea";

const meta = {
  title: "Shared/Atoms/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  args: {
    placeholder: "Enter details...",
  },
  render: (args) => (
    <div className="w-72">
      <Textarea {...args} />
    </div>
  ),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "Some multi-line\ndetails go here." },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "disabled" },
};
