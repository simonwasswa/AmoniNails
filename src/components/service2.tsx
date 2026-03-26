import { createSignal, onMount, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Type matching your service_manicure table
type ServiceManicure = {
  id: string;
  title: string;
  description: string;
  expanded_content: string;
  features: string[];      // text[] column in Supabase
  image_url: string;
  is_active: boolean;
  created_at: string;
};

export default function Service2() {
  const [service, setService] = createSignal<ServiceManicure | null>(null);
  const [expanded, setExpanded] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchService = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from<ServiceManicure>("service_manicure") // table name in your DB
      .select("*")
      .eq("is_active", true)
      .limit(1)
      .single();

    if (error) {
      console.error("Fetch error:", error.message);
      setError(error.message);
    } else if (!data) {
      setError("No active service found.");
    } else {
      setService(data);
    }

    setLoading(false);
  };

  onMount(() => fetchService());

  return (
    <section class="py-16 px-6 sm:px-10 md:px-16 bg-gray-50">
      <Show
        when={!loading() && service() && !error()}
        fallback={
          <p class="text-center py-10 text-gray-700">
            {loading() ? "Loading service..." : error() ?? "No service found."}
          </p>
        }
      >
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* Left Image */}
          <div class="w-full overflow-hidden rounded-lg shadow-lg">
            <img
              src={service()!.image_url}
              alt={service()!.title}
              class="w-full h-300px sm:h-400px md:h-450px lg:h-500px object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>

          {/* Right Text */}
          <div class="text-center md:text-left">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              {service()!.title}
            </h2>

            <p class="text-gray-600 mb-4 text-sm sm:text-base">
              {service()!.description}
            </p>

            {/* Animated Expand Section */}
            <div
              class={`overflow-hidden transition-all duration-500 ease-in-out ${
                expanded()
                  ? "max-h-400px opacity-100 translate-y-0"
                  : "max-h-0 opacity-0 -translate-y-3"
              }`}
            >
              <p class="text-gray-600 mb-4 mt-2">{service()!.expanded_content}</p>

              <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 text-sm sm:text-base">
                {service()!.features.map((feature) => (
                  <li>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <button
              onClick={() => setExpanded(!expanded())}
              class="mt-4 flex items-center gap-2 mx-auto md:mx-0 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              {expanded() ? "View Less" : "Read More"}

              {/* arrow */}
              <span
                class={`transition-transform duration-300 ${expanded() ? "rotate-180" : ""}`}
              ></span>
            </button>
          </div>
        </div>
      </Show>
    </section>
  );
}