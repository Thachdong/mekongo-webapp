import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/shared-components/atoms/input";
import { Label } from "@/shared-components/atoms/label";

const meta = {
  title: "Shared/Atoms/Label",
  component: Label,
  parameters: { layout: "centered" },
  args: {
    children: "Email",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-1.5">
      <Label htmlFor="story-email">Email</Label>
      <Input id="story-email" placeholder="you@example.com" />
    </div>
  ),
};
