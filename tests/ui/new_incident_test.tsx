import { assertEquals } from "$std/assert/mod.ts";
import { asset } from "$fresh/runtime.ts";
import NewIncident from "../../routes/incidents/new.tsx";
import { render } from "preact-render-to-string";

Deno.test("UI - New Incident Page - should render the new incident page correctly", () => {
  const html = render(<NewIncident />);
  
  // Check for the presence of the logo
  assertEquals(html.includes('src="' + asset("/logo.svg") + '"'), true);
  assertEquals(html.includes('alt="Be The Hero"'), true);
  
  // Check for the presence of titles and descriptions
  assertEquals(html.includes('<h1>Register new case</h1>'), true);
  assertEquals(html.includes("Describe the case in detail"), true);
  
  // Check for back link
  assertEquals(html.includes('href="/profile"'), true);
  assertEquals(html.includes("Back to home"), true);
  
  // Check for form inputs in NewIncidentForm island
  assertEquals(html.includes('placeholder="Case Title"'), true);
  assertEquals(html.includes('<textarea placeholder="Description"'), true);
  assertEquals(html.includes('placeholder="Value in BRL"'), true);
  
  // Check for register button
  assertEquals(html.includes('Register</button>'), true);
});
