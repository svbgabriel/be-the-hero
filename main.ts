import { App, staticFiles } from "fresh";
import { type State } from "@/utils.ts";
import { getCookies } from "@std/http/cookie";

export const app = new App<State>();

// Enable Fresh static file serving
app.use(staticFiles());

// Session middleware
app.use(async (ctx) => {
  const cookies = getCookies(ctx.req.headers);
  ctx.state.ongId = cookies.session || ctx.req.headers.get("authorization") || undefined;
  return await ctx.next();
});

// Include file-system based routes here
app.fsRoutes();
