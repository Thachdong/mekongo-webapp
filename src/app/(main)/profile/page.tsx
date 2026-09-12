import type { Metadata } from "next";

import { PAGES } from "@/shared/constants/page.constant";

export const metadata: Metadata = {
  title: PAGES.PROFILE.title,
};

export default function ProfilePage() {
  return <div className="p-8">Profile</div>;
}
