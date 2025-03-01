import { extract } from "$std/front_matter/yaml.ts";
import { CV } from "../types/cv.ts";

export async function getCV(): Promise<CV | null> {
  try {
    const mdContent = await Deno.readTextFile("about.md");
    const { attrs, body } = extract(mdContent);
    const { sections } = attrs as {
      sections: { title: string; items: string[] }[];
    };
    
    return {
      sections,
      content: body
    };
  } catch (error) {
    console.error("Error reading cv.md:", error);
    return null;
  }
} 