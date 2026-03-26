import { createSignal, onMount, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Type matching your service_pedicure table
type ServicePedicure = {
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
      service_pedicure: {
        Row: ServicePedicure;
        Insert: Omit<ServicePedicure, "id" | "created_at">;
        Update: Partial<Omit<ServicePedicure, "id" | "created_at">>;
      };
    };
  };
};

// ✅ Supabase client — generic goes here, not on .from()
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// 🔍 Temporary debug — remove after confirming env vars load correctly
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase KEY:", supabaseKey);

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default function Services1() {
  const [service, setService] = createSignal<ServicePedicure | null>(null);
  const [expanded, setExpanded] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchService = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("service_pedicure")  // ✅ no generic here
        .select("*")
        .eq("is_active", true)
        .limit(1)
        .single();

      if (error) {
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
      setError("Network error — please check your Supabase URL and internet connection.");
    }

    setLoading(false);
  };

  onMount(fetchService);

  return (
    <section class="bg-gray-200 py-30 px-8 md:px-16">
      <Show
        when={!loading()}
        fallback={<p class="text-center py-10 text-gray-500 animate-pulse">Loading...</p>}
      >
        <Show
          when={!error()}
          fallback={
            <div class="text-center py-10 space-y-3">
              <p class="text-red-500 font-semibold">Something went wrong:</p>
              <p class="text-red-400 text-sm">{error()}</p>
              <button
                onClick={fetchService}
                class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
              >
                Retry
              </button>
            </div>
          }
        >
          <Show
            when={service()}
            fallback={<p class="text-center py-10 text-gray-500">No service found.</p>}
          >
            <div class="text-center mb-16">
              <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-800">
                {service()!.title}
              </h2>
              <p class="mt-4 text-gray-600 max-w-xl mx-auto">
                Our professional masseurs will do their best to soothe and calm your body & mind!
              </p>
            </div>

            <div class="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Text */}
              <div>
                <h3 class="text-4xl font-serif font-bold text-gray-800 mb-6">
                  {service()!.title}
                </h3>
                <p class="text-gray-600 mb-4">{service()!.description}</p>

                <div
                  class={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expanded()
                      ? "max-h-500px opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-4"
                  }`}
                >
                  <p class="text-gray-600 mb-6 mt-4">
                    {service()!.expanded_content ?? ""}
                  </p>
                  <p class="text-lg text-gray-700 mb-4">
                    We currently provide the following services:
                  </p>
                  <ul class="space-y-2 text-gray-600 mb-8 list-disc pl-5">
                    {(service()!.features ?? []).map((f) => (
                      <li>{f}</li>
                    ))}
                  </ul>
                </div>

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
                  src={service()!.image_url ?? "/fallback.jpg"}
                  alt={service()!.title}
                  class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </Show>
        </Show>
      </Show>
    </section>
  );
}