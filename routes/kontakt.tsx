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
        <p class="text-lg text-gray-600">Contact information not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div class="container mx-auto px-4 py-8">
        
        <div class="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="prose prose-lg mb-8 md:mb-0" dangerouslySetInnerHTML={{ __html: contact.content }} />
          
          <div class="bg-black p-6">
            {contact.email && (
              <div class="mb-6">
                <h2 class="text-lg text-white font-semibold mb-3">Email</h2>
                <p class="text-md font-sans">
                  <a 
                    href={`mailto:${contact.email}`} 
                    class="break-words text-md link"
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            )}
            
            {social && (
              <div class="mt-8">
                <h2 class="text-lg text-white font-semibold mb-3">Sociale medier</h2>
                <div class="flex space-x-4">
                  {social.linkedin && (
                    <a 
                      href={social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="LinkedIn" 
                      class="link"
                    >
                      LinkedIn
                    </a>
                  )}
                  {social.instagram && (
                    <a 
                      href={social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Instagram" 
                      class="link"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 