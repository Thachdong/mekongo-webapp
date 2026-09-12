import { cookies } from "next/headers";
import { ComponentType } from "react";

/**
 * Wraps a server component, reading accessToken from cookies (server-side
 * only) and injecting it as a prop — the single place cookies are read for
 * this purpose, per CONSTITUTION.md 3.
 */
export function withServerToken<P extends object>(
  Component: ComponentType<P & { token?: string }>,
) {
  return async function WithServerToken(props: P) {
    const token = (await cookies()).get("accessToken")?.value;

    return <Component {...props} token={token} />;
  };
}
