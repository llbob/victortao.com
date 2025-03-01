import { extract } from "$std/front_matter/yaml.ts";
import { Contact, Social } from "../types/contact.ts";

export async function getContact(): Promise<Contact | null> {
  try {
    const mdContent = await Deno.readTextFile("contact.md");
    const { attrs, body } = extract(mdContent);
    const { title, email } = attrs as {
      title: string;
      email?: string;
    };
    
    return {
      title,
      email,
      content: body
    };
  } catch (error) {
    console.error("Error reading contact.md:", error);
    return null;
  }
}

export async function getSocial(): Promise<Social | null> {
  try {
    // This might not work in the browser context
    const jsonContent = await Deno.readTextFile("_data/social.json");
    return JSON.parse(jsonContent) as Social;
  } catch (error) {
    console.error("Error reading social.json:", error);
    return null;
  }
} 