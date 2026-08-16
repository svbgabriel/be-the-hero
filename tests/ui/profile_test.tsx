import { assertEquals } from "@std/assert";
import Profile from "@/routes/profile/index.tsx";
import { render } from "preact-render-to-string";

Deno.test("UI - Profile Page - should render the profile page correctly", async () => {
  const pageFn = Profile as unknown as (ctx: Record<string, unknown>) => Promise<Parameters<typeof render>[0]>;
  const vnode = await pageFn({});
  const html = render(vnode);

  // Check for the presence of the logo
  assertEquals(html.includes("/logo.svg"), true);
  assertEquals(html.includes('alt="Be The Hero"'), true);

  // Check for navigation elements
  assertEquals(html.includes('href="/incidents/new"'), true);
  assertEquals(html.includes("Register new case"), true);

  // Check for list title
  assertEquals(html.includes("<h1>Registered cases</h1>"), true);
});
