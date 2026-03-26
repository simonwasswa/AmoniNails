import { createSignal, onMount, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type SalonImage = {
  image_url: string;
  caption?: string;
};

export default function SalonImageSection() {
  const [image, setImage] = createSignal<SalonImage | null>(null);

  // Fetch the latest image from the database
  const fetchImage = async () => {
    const { data, error } = await supabase
      .from("salon_image_section")   // your table in the database
      .select("image_url, caption")
      .order("position", { ascending: true }) // optional ordering
      .limit(1)
      .single();

    if (error) {
      console.error("Failed to fetch salon image:", error);
      return;
    }

    setImage(data);
  };

  onMount(() => fetchImage());

  return (
    <section class="w-full bg-gray-300 py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 items-center">

        {/* Left side empty */}
        <div></div>

        {/* Right side image */}
        <Show
          when={image()}
          fallback={<p class="text-center py-10 text-gray-700">Loading...</p>}
        >
          <div class="overflow-hidden">
            <img
              src={image()!.image_url}
              alt={image()!.caption ?? "Salon Image"}
              class="w-full h-300px sm:h-400px md:h-450px lg:h-500px object-cover object-right transition-transform duration-700 hover:scale-110"
            />
          </div>
        </Show>

      </div>
    </section>
  );
}