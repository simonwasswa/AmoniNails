import { createSignal, onMount, Show, For } from "solid-js";
import { A } from "@solidjs/router";
import { createClient } from "@supabase/supabase-js";

// ✅ Shared shape across all 3 service tables
type ServiceRow = {
  id: string;
  title: string;
  description: string;
  expanded_content: string | null;
  features: string[] | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
};

// ✅ Database schema covering all 3 tables
type Database = {
  public: {
    Tables: {
      service_manicure: { Row: ServiceRow; Insert: Omit<ServiceRow, "id" | "created_at">; Update: Partial<Omit<ServiceRow, "id" | "created_at">>; };
      service_pedicure: { Row: ServiceRow; Insert: Omit<ServiceRow, "id" | "created_at">; Update: Partial<Omit<ServiceRow, "id" | "created_at">>; };
      service_waxing:   { Row: ServiceRow; Insert: Omit<ServiceRow, "id" | "created_at">; Update: Partial<Omit<ServiceRow, "id" | "created_at">>; };
    };
  };
};

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

type Tab = "manicure" | "pedicure" | "waxing";

// Map each tab to its table name
const tableMap: Record<Tab, "service_manicure" | "service_pedicure" | "service_waxing"> = {
  manicure: "service_manicure",
  pedicure: "service_pedicure",
  waxing:   "service_waxing"
};

// Grouped data shape
type GroupedData = Record<Tab, ServiceRow | null>;

export default function AboutUs() {
  const [activeTab, setActiveTab] = createSignal<Tab>("manicure");
  const [data, setData] = createSignal<GroupedData>({
    manicure: null,
    pedicure: null,
    waxing: null
  });
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all 3 tables in parallel
      const [manicureRes, pedicureRes, waxingRes] = await Promise.all([
        supabase.from("service_manicure").select("*").eq("is_active", true).limit(1).single(),
        supabase.from("service_pedicure").select("*").eq("is_active", true).limit(1).single(),
        supabase.from("service_waxing").select("*").eq("is_active", true).limit(1).single()
      ]);

      if (manicureRes.error) console.error("Manicure error:", manicureRes.error.message);
      if (pedicureRes.error) console.error("Pedicure error:", pedicureRes.error.message);
      if (waxingRes.error)   console.error("Waxing error:",   waxingRes.error.message);

      setData({
        manicure: manicureRes.data ?? null,
        pedicure: pedicureRes.data ?? null,
        waxing:   waxingRes.data   ?? null
      });

    } catch (err) {
      console.error("Network error:", err);
      setError("Network error — check your Supabase connection.");
    }

    setLoading(false);
  };

  onMount(() => fetchAll());

  // Current tab's data
  const current = () => data()[activeTab()];

  const tabs: Tab[] = ["manicure", "pedicure", "waxing"];

  return (
    <section class="bg-gray-100 overflow-hidden px-4 md:px-18">
      <div class="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-15 w-full h-full">

        {/* IMAGE — changes per tab */}
        <div class="w-[400px] lg:w-4/5 xl:w-full mx-auto h-[700px] overflow-hidden rounded-2xl shadow-2xl border-8 border-white/60">
          <img
            src={current()?.image_url ?? "/fallback.jpg"}
            alt={current()?.title ?? activeTab()}
            class="w-full h-full object-cover transition-all duration-700 hover:scale-110"
            loading="eager"
          />
        </div>

        {/* CONTENT */}
        <div class="space-y-8 flex flex-col justify-center">
          <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Do Nails & Waxing!
          </h2>

          {/* Tabs */}
          <div class="flex gap-8 border-b pb-3 text-lg">
            <For each={tabs}>
              {(tab) => (
                <button
                  onClick={() => setActiveTab(tab)}
                  class={`pb-2 transition ${
                    activeTab() === tab
                      ? "border-b-2 border-pink-500 font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )}
            </For>
          </div>

          {/* Dynamic Content */}
          <Show
            when={!loading()}
            fallback={<p class="text-gray-500 animate-pulse">Loading services...</p>}
          >
            <Show
              when={!error()}
              fallback={
                <div class="space-y-3">
                  <p class="text-red-500 font-semibold">Something went wrong:</p>
                  <p class="text-red-400 text-sm">{error()}</p>
                  <button
                    onClick={fetchAll}
                    class="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
                  >
                    Retry
                  </button>
                </div>
              }
            >
              <Show
                when={current()}
                fallback={
                  <p class="text-gray-400 text-sm">No data found for this service.</p>
                }
              >
                <div class="space-y-4">

                  {/* Title */}
                  <h3 class="text-3xl font-serif font-semibold text-gray-900">
                    {current()!.title}
                  </h3>

                  {/* Description */}
                  <p class="text-gray-600 leading-relaxed">
                    {current()!.description}
                  </p>

                  {/* Features list */}
                  <Show when={(current()!.features ?? []).length > 0}>
                    <p class="font-medium text-gray-800">Here's a list of those:</p>
                    <ul class="space-y-2">
                      <For each={current()!.features ?? []}>
                        {(feature) => (
                          <li class="flex items-center gap-2 text-gray-700">
                            <span class="text-pink-500 text-lg">*</span>
                            {feature}
                          </li>
                        )}
                      </For>
                    </ul>
                  </Show>

                </div>
              </Show>
            </Show>
          </Show>

          {/* About Us Button */}
          <A href="/about" class="mt-6 w-fit">
            <button class="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-semibold transition shadow-md">
              ABOUT US
            </button>
          </A>
        </div>

      </div>
    </section>
  );
}