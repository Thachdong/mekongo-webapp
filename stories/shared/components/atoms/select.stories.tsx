import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared-components/atoms/select";

const meta = {
  title: "Shared/Atoms/Select",
  component: Select,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select defaultValue="INDIVIDUAL">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select profile type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="INDIVIDUAL">Individual</SelectItem>
        <SelectItem value="DISTRIBUTOR">Distributor</SelectItem>
        <SelectItem value="FACTORY">Factory</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select profile type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="INDIVIDUAL">Individual</SelectItem>
        <SelectItem value="DISTRIBUTOR">Distributor</SelectItem>
        <SelectItem value="FACTORY">Factory</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select defaultValue="INDIVIDUAL" disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select profile type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="INDIVIDUAL">Individual</SelectItem>
      </SelectContent>
    </Select>
  ),
};
