import { createSignal, onMount, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Type matching your hero_section table
type HeroSection = {
  id: string;
  title1: string;
  title2: string;
  description: string;
  button_text: string;
  image_url: string | null;
  image_alt: string | null;
  whatsapp_number: string;
  whatsapp_message: string;
  is_active: boolean;
  created_at: string;
};

// ✅ Database schema type for Supabase v2
type Database = {
  public: {
    Tables: {
      hero_section: {
        Row: HeroSection;
        Insert: Omit<HeroSection, "id" | "created_at">;
        Update: Partial<Omit<HeroSection, "id" | "created_at">>;
      };
    };
  };
};

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default function HeroSection() {
  const [hero, setHero] = createSignal<HeroSection | null>(null);
  const [animate, setAnimate] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchHero = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("hero_section")
        .select("*")
        .eq("is_active", true)
        .limit(1)
        .single();

      if (error) {
        console.error("Supabase error:", error.message);
        setError(error.message);
      } else if (!data) {
        setError("No active hero section found.");
      } else {
        setHero(data);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error — check your Supabase URL and connection.");
    }

    setLoading(false);
  };

  const handleWhatsApp = () => {
    const waNumber = hero()?.whatsapp_number ?? "256702478359";
    const prefilledMsg = hero()?.whatsapp_message ?? "Hello! I'd like to book a nail appointment 💅";
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(prefilledMsg)}`;
    window.location.href = url;
  };

  onMount(async () => {
    await fetchHero();
    setTimeout(() => setAnimate(true), 200);
  });

  return (
    <section class="relative min-h-screen overflow-hidden pt-24 md:pt-32 px-4 md:px-20 lg:px-32 pb-20">

      <Show when={!loading()} fallback={
        <div class="flex items-center justify-center min-h-screen">
          <p class="text-gray-500 animate-pulse text-lg">Loading...</p>
        </div>
      }>
        <Show when={!error()} fallback={
          <div class="flex flex-col items-center justify-center min-h-screen space-y-3">
            <p class="text-red-500 font-semibold">Something went wrong:</p>
            <p class="text-red-400 text-sm">{error()}</p>
            <button
              onClick={fetchHero}
              class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
            >
              Retry
            </button>
          </div>
        }>
          <Show when={hero()}>

            {/* Background */}
            <div
              class="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
              style={{ "background-image": `url(${hero()!.image_url ?? ""})` }}
            ></div>

            <div class="absolute inset-0 -z-20 bg-white/60 backdrop-blur-sm"></div>

            {/* Big watermark text */}
            <h1 class="absolute -left-4 md:left-6 top-20 md:top-24 text-[140px] md:text-[220px] lg:text-[280px] font-bold text-gray-200 opacity-30 select-none pointer-events-none leading-none">
              Beauty
            </h1>

            <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-7xl mx-auto">

              {/* TEXT */}
              <div class="max-w-xl lg:max-w-2xl space-y-6 md:space-y-8 text-center lg:text-left">

                <h1
                  class={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900 ${
                    animate() ? "animate-slide-left delay-1" : "opacity-0"
                  }`}
                >
                  {hero()!.title1}
                  <br class="hidden sm:block" />
                  {hero()!.title2}
                </h1>

                <p
                  class={`text-gray-600 text-lg md:text-xl leading-relaxed max-w-prose mx-auto lg:mx-0 ${
                    animate() ? "animate-slide-left delay-2" : "opacity-0"
                  }`}
                >
                  {hero()!.description}
                </p>

                {/* BOOK NOW BUTTON */}
                <div class="pt-4">
                  <button
                    onClick={handleWhatsApp}
                    class={`bg-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold
                    transition-all duration-300
                    hover:bg-pink-600
                    hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]
                    hover:-translate-y-1
                    ${animate() ? "animate-slide-left delay-3" : "opacity-0"}`}
                  >
                    {hero()!.button_text}
                  </button>
                </div>

              </div>

              {/* IMAGE */}
              <div
                class={`w-full lg:w-3/5 xl:w-1/2 ${
                  animate() ? "animate-slide-right delay-2" : "opacity-0"
                }`}
              >
                <div class="overflow-hidden rounded-2xl shadow-2xl border-8 border-white/60">
                  <img
                    src={hero()!.image_url ?? ""}
                    alt={hero()!.image_alt ?? "Hero image"}
                    class="w-full h-600px md:h-680px object-cover transition-transform duration-700 hover:scale-110"
                    loading="eager"
                  />
                </div>
              </div>

            </div>

            {/* Decorations */}
            <div class="absolute bottom-10 right-10 w-16 h-16 md:w-24 md:h-24 bg-linear-to-br from-pink-400 to-red-500 rounded-full opacity-40 blur-2xl animate-pulse pointer-events-none"></div>
            <div class="absolute top-40 left-20 w-20 h-20 md:w-32 md:h-32 bg-linear-to-br from-purple-400 to-pink-500 rounded-full opacity-30 blur-3xl animate-pulse pointer-events-none"></div>

          </Show>
        </Show>
      </Show>

    </section>
  );
}