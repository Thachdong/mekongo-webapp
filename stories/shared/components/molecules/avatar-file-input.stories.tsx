import * as React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { AvatarFileInput } from "@/shared-components/molecules/avatar-file-input";

const meta = {
  title: "Shared/Molecules/AvatarFileInput",
  component: AvatarFileInput,
  parameters: { layout: "centered" },
} satisfies Meta<typeof AvatarFileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledAvatarFileInput(
  props: React.ComponentProps<typeof AvatarFileInput>
) {
  const [file, setFile] = React.useState<File | null>(props.value ?? null);
  return <AvatarFileInput {...props} value={file} onChange={setFile} />;
}

export const Default: Story = {
  render: (args) => <ControlledAvatarFileInput {...args} />,
};

export const Disabled: Story = {
  render: (args) => <ControlledAvatarFileInput {...args} disabled />,
};
