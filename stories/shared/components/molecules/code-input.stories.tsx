import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { CodeInput } from "@/shared-components/molecules/code-input";

const meta = {
  title: "Shared/Molecules/CodeInput",
  component: CodeInput,
  parameters: { layout: "centered" },
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? "");
    return <CodeInput {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof CodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: "123456" },
};

export const Disabled: Story = {
  args: { value: "123456", disabled: true },
};

export const Invalid: Story = {
  args: { value: "12", "aria-invalid": true },
};
