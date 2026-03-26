import { createSignal, onMount, onCleanup } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

type GalleryImage = {
  image_url: string;
  caption: string;
};

export default function SalonGallery() {
  const [images, setImages] = createSignal<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = createSignal<number | null>(null);

  const selected = () =>
    selectedIndex() !== null ? images()[selectedIndex()!] : null;

  const handleKey = (e: KeyboardEvent) => {
    if (selectedIndex() === null) return;

    switch (e.key) {
      case "Escape":
        setSelectedIndex(null);
        break;
      case "ArrowLeft":
        setSelectedIndex((prev) =>
          prev === 0 ? images().length - 1 : (prev ?? 0) - 1
        );
        break;
      case "ArrowRight":
        setSelectedIndex((prev) =>
          prev === images().length - 1 ? 0 : (prev ?? 0) + 1
        );
        break;
    }
  };

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("image_url, caption")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch gallery:", error);
      return;
    }

    setImages(data || []);
  };

  onMount(() => {
    fetchGallery();
    window.addEventListener("keydown", handleKey);
  });

  onCleanup(() => window.removeEventListener("keydown", handleKey));

  return (
    <section class="bg-linear-to-b from-gray-50 to-gray-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 tracking-tight">
          Our Salon Moments
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {images().map((img, idx) => (
            <div
              class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              onClick={() => setSelectedIndex(idx)}
            >
              <div class="aspect-4/5 md:aspect-3/4 overflow-hidden">
                <img
                  src={img.image_url}
                  alt={img.caption}
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                <h3 class="text-white text-xl font-semibold drop-shadow-md">{img.caption}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected() && (
        <div
          class="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setSelectedIndex(null)}
        >
          <button
            class="absolute top-5 right-5 md:top-8 md:right-8 text-white text-5xl hover:text-gray-300 transition-colors focus:outline-none z-10"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close"
          >
            ×
          </button>

          <button
            class="hidden sm:block absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-gray-300 transition-colors px-5 py-10 focus:outline-none z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((p) => (p === 0 ? images().length - 1 : (p ?? 0) - 1));
            }}
          >
            ‹
          </button>

          <button
            class="hidden sm:block absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white text-6xl hover:text-gray-300 transition-colors px-5 py-10 focus:outline-none z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((p) => (p === images().length - 1 ? 0 : (p ?? 0) + 1));
            }}
          >
            ›
          </button>

          <div class="flex flex-col items-center max-w-[95vw] max-h-[95vh]">
            <img
              src={selected()!.image_url}
              alt={selected()!.caption}
              class="max-w-full max-h-[90vh] md:max-h-[65vh] object-contain rounded-xl shadow-2xl transition-all duration-300"
            />
            <div class="mt-5 text-center text-white">
              <p class="text-2xl md:text-3xl font-medium drop-shadow-lg">{selected()!.caption}</p>
              <p class="text-gray-400 mt-2 text-base md:text-lg">
                {selectedIndex()! + 1} of {images().length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}