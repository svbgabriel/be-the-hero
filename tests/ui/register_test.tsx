import { assertEquals } from "$std/assert/mod.ts";
import { asset } from "$fresh/runtime.ts";
import Register from "../../routes/register/index.tsx";
import { render } from "preact-render-to-string";

Deno.test("UI - Register Page - should render the register page correctly", () => {
  const html = render(<Register />);
  
  // Check for the presence of the logo
  assertEquals(html.includes('src="' + asset("/logo.svg") + '"'), true);
  assertEquals(html.includes('alt="Be The Hero"'), true);
  
  // Check for the presence of titles and descriptions
  assertEquals(html.includes('<h1>Register</h1>'), true);
  assertEquals(html.includes("help people find your NGO's cases"), true);
  
  // Check for back link
  assertEquals(html.includes('href="/"'), true);
  assertEquals(html.includes("Back"), true);
  
  // Check for form inputs in RegisterForm island
  assertEquals(html.includes('placeholder="NGO Name"'), true);
  assertEquals(html.includes('placeholder="Email"'), true);
  assertEquals(html.includes('placeholder="WhatsApp"'), true);
  assertEquals(html.includes('placeholder="City"'), true);
  assertEquals(html.includes('placeholder="State"'), true);
  
  // Check for register button
  assertEquals(html.includes('Register</button>'), true);
});
