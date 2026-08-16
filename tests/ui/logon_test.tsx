import { assertEquals } from "@std/assert";
import Logon from "@/routes/index.tsx";
import { render } from "preact-render-to-string";

Deno.test("UI - Logon Page - should render the logon page correctly", () => {
  const html = render(<Logon />);

  // Check for the presence of the logo and heroes image
  assertEquals(html.includes("/logo.svg"), true);
  assertEquals(html.includes('alt="Be The Hero"'), true);
  assertEquals(html.includes("/heroes.png"), true);
  assertEquals(html.includes('alt="Heroes"'), true);

  // Check for the presence of the logon form title
  assertEquals(html.includes("<h1>Log in</h1>"), true);

  // Check for input and button
  assertEquals(html.includes('placeholder="Your ID"'), true);
  assertEquals(html.includes('type="text"'), true);
  assertEquals(html.includes("Log in</button>"), true);

  // Check for registration link
  assertEquals(html.includes('href="/register"'), true);
  assertEquals(html.includes("I don't have an account"), true);
});
