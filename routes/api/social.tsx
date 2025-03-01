import { Handlers } from "$fresh/server.ts";
import { getSocial } from "../../utils/contact.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const social = await getSocial();
    return new Response(JSON.stringify(social), {
      headers: { "Content-Type": "application/json" },
    });
  },
}; 