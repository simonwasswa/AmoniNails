import { createSignal, onMount, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Type matching your service_manicure table
type ServiceManicure = {
  id: string;
  title: string;
  description: string;
  expanded_content: string | null;
  features: string[] | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

// ✅ Database schema type for Supabase v2
type Database = {
  public: {
    Tables: {
      service_manicure: {
        Row: ServiceManicure;
        Insert: Omit<ServiceManicure, "id" | "created_at">;
        Update: Partial<Omit<ServiceManicure, "id" | "created_at">>;
      };
    };
  };
};

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// 🔍 Temporary debug — remove after confirming env vars are loaded
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase KEY:", supabaseKey);

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default function Service2() {
  const [service, setService] = createSignal<ServiceManicure | null>(null);
  const [expanded, setExpanded] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchService = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("service_manicure")
        .select("*")
        .eq("is_active", true)
        .limit(1)
        .single();

      if (error) {
        // Detailed Supabase error logging
        console.error("Supabase error code:", error.code);
        console.error("Supabase error message:", error.message);
        console.error("Supabase error details:", error.details);
        setError(`${error.code}: ${error.message}`);
      } else if (!data) {
        setError("No active service found.");
      } else {
        setService(data);
      }
    } catch (err) {
      // Catches network-level errors like "Failed to fetch"
      console.error("Network error:", err);
      setError(
        "Network error — please check your Supabase URL and internet connection."
      );
    }

    setLoading(false);
  };

  onMount(() => fetchService());

  return (
    <section class="py-16 px-6 sm:px-10 md:px-16 bg-gray-50">
      <Show
        when={!loading() && service() && !error()}
        fallback={
          <div class="text-center py-10">
            {loading() ? (
              <p class="text-gray-500 animate-pulse">Loading service...</p>
            ) : error() ? (
              <div class="text-red-500 space-y-2">
                <p class="font-semibold">Something went wrong:</p>
                <p class="text-sm">{error()}</p>
                <button
                  onClick={fetchService}
                  class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
                >
                  Retry
                </button>
              </div>
            ) : (
              <p class="text-gray-500">No active service found.</p>
            )}
          </div>
        }
      >
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* Left Image */}
          <div class="w-full overflow-hidden rounded-lg shadow-lg">
            <img
              src={service()!.image_url ?? "/fallback.jpg"}
              alt={service()!.title}
              class="w-full h-300px sm:h-400px md:h-450px] lg:h-500px object-cover transition-transform duration-700 hover:scale-110"
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
              <p class="text-gray-600 mb-4 mt-2">
                {service()!.expanded_content ?? ""}
              </p>

              <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 text-sm sm:text-base">
                {(service()!.features ?? []).map((feature) => (
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
              <span
                class={`transition-transform duration-300 ${expanded() ? "rotate-180" : ""}`}
              >
                ▼
              </span>
            </button>
          </div>
        </div>
      </Show>
    </section>
  );
}