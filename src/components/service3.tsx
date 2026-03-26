import { createSignal, onMount, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Type matching your service_waxing table
type ServiceWaxing = {
  id: string;
  title: string;
  description: string;
  expanded_content: string;
  features: string[];      // text[] column in Supabase
  image_url: string;
  is_active: boolean;
  created_at: string;
};

export default function Services3() {
  const [service, setService] = createSignal<ServiceWaxing | null>(null);
  const [expanded, setExpanded] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchService = async () => {
    setLoading(true);
    setError(null);

    // ✅ Only one generic type parameter here
    const { data, error } = await supabase
      .from<ServiceWaxing>("service_waxing")
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
    <section class="bg-gray-200 py-20 px-8 md:px-16">
      <Show
        when={!loading() && service() && !error()}
        fallback={
          <p class="text-center py-10 text-gray-700">
            {loading() ? "Loading service..." : error() ?? "No service found."}
          </p>
        }
      >
        <div class="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Text Section */}
          <div>
            <h3 class="text-4xl font-serif font-bold text-gray-800 mb-6">
              {service()!.title}
            </h3>

            <p class="text-gray-600 mb-4">
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
              <p class="text-gray-600 mb-6 mt-2">
                {service()!.expanded_content}
              </p>

              <p class="text-lg text-gray-700 mb-4">
                We currently provide the following services:
              </p>

              <ul class="space-y-2 text-gray-600 mb-8 list-disc pl-5">
                {service()!.features.map((feature) => (
                  <li>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <button
              onClick={() => setExpanded(!expanded())}
              class="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              {expanded() ? "VIEW LESS" : "READ MORE"}
            </button>
          </div>

          {/* Right Image */}
          <div class="w-300px lg:w-4/5 xl:w-full mx-auto h-500px overflow-hidden rounded-md shadow-lg">
            <img
              src={service()!.image_url}
              alt={service()!.title}
              class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>
      </Show>
    </section>
  );
}