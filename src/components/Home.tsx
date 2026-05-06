import { createSignal, onMount, onCleanup, Show, For } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Type matching your hero_section table exactly
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
  slide_order: number;
  created_at: string;
};

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

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const SLIDE_INTERVAL = 5000;

export default function HeroSection() {
  const [slides, setSlides] = createSignal<HeroSection[]>([]);
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [animate, setAnimate] = createSignal(false);
  const [transitioning, setTransitioning] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  let intervalId: ReturnType<typeof setInterval> | null = null;

  // ─── Fetch all active slides from DB, ordered by slide_order ───────────────
  const fetchSlides = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("hero_section")
        .select("*")
        .eq("is_active", true)
        .order("slide_order", { ascending: true });

      if (error) {
        setError(error.message);
      } else if (!data || data.length === 0) {
        setError("No active slides found in the database.");
      } else {
        setSlides(data);
      }
    } catch (err) {
      setError("Network error — could not reach Supabase.");
    }

    setLoading(false);
  };

  // ─── Navigation ─────────────────────────────────────────────────────────────
  const goToSlide = (index: number) => {
    if (transitioning()) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTransitioning(false);
    }, 400);
  };

  const nextSlide = () => goToSlide((currentIndex() + 1) % slides().length);
  const prevSlide = () => goToSlide((currentIndex() - 1 + slides().length) % slides().length);

  const startAutoplay = () => { intervalId = setInterval(nextSlide, SLIDE_INTERVAL); };
  const stopAutoplay  = () => { if (intervalId) { clearInterval(intervalId); intervalId = null; } };
  const resetAutoplay = () => { stopAutoplay(); startAutoplay(); };

  // ─── WhatsApp — uses exactly what's in the DB row ───────────────────────────
  const handleWhatsApp = () => {
    const slide = slides()[currentIndex()];
    const url = `https://wa.me/${slide.whatsapp_number}?text=${encodeURIComponent(slide.whatsapp_message)}`;
    window.location.href = url;
  };

  // ─── Lifecycle ──────────────────────────────────────────────────────────────
  onMount(async () => {
    await fetchSlides();
    setTimeout(() => setAnimate(true), 200);
    startAutoplay();
  });

  onCleanup(() => stopAutoplay());

  const current = () => slides()[currentIndex()];

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <section class="relative min-h-screen overflow-hidden pt-24 md:pt-32 px-4 md:px-20 lg:px-32 pb-20">

      {/* ── Loading state ── */}
      <Show when={loading()}>
        <div class="flex items-center justify-center min-h-screen">
          <p class="text-gray-500 animate-pulse text-lg">Loading...</p>
        </div>
      </Show>

      {/* ── Error state ── */}
      <Show when={!loading() && error()}>
        <div class="flex flex-col items-center justify-center min-h-screen space-y-3">
          <p class="text-red-500 font-semibold">Something went wrong:</p>
          <p class="text-red-400 text-sm">{error()}</p>
          <button
            onClick={fetchSlides}
            class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
          >
            Retry
          </button>
        </div>
      </Show>

      {/* ── Slides loaded ── */}
      <Show when={!loading() && !error() && slides().length > 0}>

        {/* Fixed background per slide — crossfade via opacity */}
        <For each={slides()}>
          {(slide, i) => (
            <div
              class="fixed inset-0 -z-20 bg-cover bg-center transition-opacity duration-700"
              style={{
                "background-image": `url(${slide.image_url ?? ""})`,
                opacity: i() === currentIndex() ? "1" : "0",
              }}
            />
          )}
        </For>

        {/* Fixed overlay */}
        <div class="fixed inset-0 -z-10 bg-white/60 backdrop-blur-sm" />

        {/* Watermark */}
        <h1 class="absolute -left-4 md:left-6 top-20 md:top-24 text-[140px] md:text-[220px] lg:text-[280px] font-bold text-gray-200 opacity-30 select-none pointer-events-none leading-none">
          Beauty
        </h1>

        <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-7xl mx-auto">

          {/* ── Text ── */}
          <div class="max-w-xl lg:max-w-2xl space-y-6 md:space-y-8 text-center lg:text-left">

            {/* Title — from DB */}
            <h1
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900 transition-all duration-[400ms]"
              style={{
                opacity: transitioning() ? "0" : "1",
                transform: transitioning() ? "translateY(12px)" : "translateY(0)",
              }}
            >
              {current()?.title1}
              <br class="hidden sm:block" />
              {current()?.title2}
            </h1>

            {/* Description — from DB */}
            <p
              class="text-gray-600 text-lg md:text-xl leading-relaxed max-w-prose mx-auto lg:mx-0 transition-all duration-[400ms]"
              style={{
                opacity: transitioning() ? "0" : "1",
                transform: transitioning() ? "translateY(8px)" : "translateY(0)",
              }}
            >
              {current()?.description}
            </p>

            {/* Button — text from DB, action uses DB whatsapp fields */}
            <div class="pt-4">
              <button
                onClick={handleWhatsApp}
                class={`bg-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold
                  transition-all duration-300
                  hover:bg-pink-600
                  hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]
                  hover:-translate-y-1
                  ${animate() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                {current()?.button_text}
              </button>
            </div>

            {/* Dot indicators */}
            <div class="flex items-center gap-3 justify-center lg:justify-start pt-2">
              <For each={slides()}>
                {(_, i) => (
                  <button
                    onClick={() => { goToSlide(i()); resetAutoplay(); }}
                    class={`rounded-full transition-all duration-300 ${
                      i() === currentIndex()
                        ? "w-8 h-3 bg-pink-500"
                        : "w-3 h-3 bg-gray-300 hover:bg-pink-300"
                    }`}
                    aria-label={`Go to slide ${i() + 1}`}
                  />
                )}
              </For>
            </div>

          </div>

          {/* ── Image card ── */}
          <div
            class={`w-full lg:w-3/5 xl:w-1/2 transition-opacity duration-700 ${
              animate() ? "opacity-100" : "opacity-0"
            }`}
          >
            <div class="relative overflow-hidden rounded-2xl shadow-2xl border-8 border-white/60 group">

              {/* Image — from DB */}
              <img
                src={current()?.image_url ?? ""}
                alt={current()?.image_alt ?? ""}
                class="w-full h-[600px] md:h-[680px] object-cover transition-all duration-700 hover:scale-110"
                style={{ opacity: transitioning() ? "0" : "1" }}
                loading="eager"
              />

              {/* Prev arrow */}
              <button
                onClick={() => { prevSlide(); resetAutoplay(); }}
                class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-2xl text-gray-700 hover:text-pink-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                ‹
              </button>

              {/* Next arrow */}
              <button
                onClick={() => { nextSlide(); resetAutoplay(); }}
                class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-2xl text-gray-700 hover:text-pink-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                ›
              </button>

              {/* Slide counter */}
              <div class="absolute bottom-4 right-4 bg-black/40 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                {currentIndex() + 1} / {slides().length}
              </div>

            </div>
          </div>

        </div>

        {/* Decorations */}
        <div class="absolute bottom-10 right-10 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-40 blur-2xl animate-pulse pointer-events-none" />
        <div class="absolute top-40 left-20 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-30 blur-3xl animate-pulse pointer-events-none" />

      </Show>

    </section>
  );
}