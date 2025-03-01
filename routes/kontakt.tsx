import { Handlers, PageProps } from "$fresh/server.ts";
import { MainLayout } from "../components/MainLayout.tsx";
import { Contact, Social } from "../types/contact.ts";
import { getContact, getSocial } from "../utils/contact.ts";

interface ContactPageData {
  contact: Contact | null;
  social: Social | null;
}

export const handler: Handlers<ContactPageData> = {
  async GET(_req, ctx) {
    const [contact, social] = await Promise.all([
      getContact(),
      getSocial()
    ]);
    return ctx.render({ contact, social });
  },
};

export default function ContactPage({ data }: PageProps<ContactPageData>) {
  const { contact, social } = data;

  if (!contact) {
    return (
      <MainLayout>
        <p>Contact information not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="max-w-3xl">
        <h1 class="text-3xl font-sans mb-6">{contact.title}</h1>
        
        <div class="mb-8" dangerouslySetInnerHTML={{ __html: contact.content }} />
        
        {contact.email && (
          <div class="mb-6">
            <p class="text-xl font-sans">
              <a href={`mailto:${contact.email}`} class="hover:underline">
                {contact.email}
              </a>
            </p>
          </div>
        )}
        
        {social && (
          <div class="flex space-x-4 mt-8">
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" class="text-xl hover:underline">
                LinkedIn
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" class="text-xl hover:underline">
                Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 