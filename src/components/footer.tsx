import { createSignal, onMount, Show, For } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Types matching your tables
type FooterInfo = {
  id: string;
  brand_start: string;
  brand_end: string;
  slogan: string;
  address_line1: string | null;
  address_line2: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
};

type SocialLink = {
  id: string;
  label: string;
  icon: string;
  url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

// ✅ Database schema for Supabase v2
type Database = {
  public: {
    Tables: {
      footer_info: {
        Row: FooterInfo;
        Insert: Omit<FooterInfo, "id" | "created_at">;
        Update: Partial<Omit<FooterInfo, "id" | "created_at">>;
      };
      footer_social_links: {
        Row: SocialLink;
        Insert: Omit<SocialLink, "id" | "created_at">;
        Update: Partial<Omit<SocialLink, "id" | "created_at">>;
      };
    };
  };
};

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default function Footer() {
  const [info, setInfo] = createSignal<FooterInfo | null>(null);
  const [socials, setSocials] = createSignal<SocialLink[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchFooter = async () => {
    setLoading(true);
    setError(null);

    try {
      const [infoRes, socialsRes] = await Promise.all([
        supabase
          .from("footer_info")
          .select("*")
          .eq("is_active", true)
          .limit(1)
          .single(),
        supabase
          .from("footer_social_links")
          .select("*")
          .eq("is_active", true)
          .order("sort_order", { ascending: true })
      ]);

      if (infoRes.error) console.error("Footer info error:", infoRes.error.message);
      else setInfo(infoRes.data ?? null);

      if (socialsRes.error) console.error("Socials error:", socialsRes.error.message);
      else setSocials(socialsRes.data ?? []);

    } catch (err) {
      console.error("Network error:", err);
      setError("Network error — check your Supabase connection.");
    }

    setLoading(false);
  };

  onMount(() => fetchFooter());

  return (
    <footer class="bg-gray-300 py-12 px-10">
      <Show
        when={!loading()}
        fallback={
          <p class="text-center text-gray-500 animate-pulse py-6">Loading...</p>
        }
      >
        <Show
          when={!error()}
          fallback={
            <div class="text-center space-y-2 py-6">
              <p class="text-red-500 text-sm">{error()}</p>
              <button
                onClick={fetchFooter}
                class="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
              >
                Retry
              </button>
            </div>
          }
        >
          <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

            {/* Logo & Slogan */}
            <div class="text-center md:text-left space-y-4">
              <div class="text-3xl md:text-4xl font-serif tracking-wide">
                <span class="font-light text-gray-700">
                  {info()?.brand_start ?? "Amonic"}
                </span>
                <span class="font-bold text-pink-600">♡</span>
                <span class="font-bold text-gray-700">
                  {info()?.brand_end ?? "Nails"}
                </span>
              </div>
              <p class="text-gray-600">
                {info()?.slogan ?? ""}
              </p>
            </div>

            {/* Contact */}
            <div class="border-l border-r px-10 space-y-3 text-gray-700">
              <p class="flex items-center gap-3">
                {info()?.address_line1 ?? ""}, <br />
                {info()?.address_line2 ?? ""}
              </p>
              <p class="flex items-center gap-3 text-pink-500">
                ✉ {info()?.email ?? ""}
              </p>
              <p class="flex items-center gap-3 text-pink-500">
                ☎ {info()?.phone ?? ""}
              </p>
            </div>

            {/* Social Icons — dynamic from DB */}
            <div class="flex justify-center md:justify-end gap-4 flex-wrap">
              <For each={socials()}>
                {(social) => (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    class="w-10 h-10 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition-transform duration-200 hover:scale-110 font-semibold"
                  >
                    {social.icon}
                  </a>
                )}
              </For>
            </div>

          </div>
        </Show>
      </Show>
    </footer>
  );
}