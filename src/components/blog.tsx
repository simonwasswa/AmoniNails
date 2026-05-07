import { createSignal, onMount, Show, For } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Type matching your exact blogs table
type Blog = {
  id: string;
  title: string;
  author: string | null;
  content: string;
  image_url: string | null;
  section_bg_url: string | null;
  published_at: string;
  is_active: boolean;
};

type Database = {
  public: {
    Tables: {
      blogs: {
        Row: Blog;
        Insert: Omit<Blog, "id">;
        Update: Partial<Omit<Blog, "id">>;
      };
    };
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default function BlogSection() {
  const [blogs, setBlogs] = createSignal<Blog[]>([]);
  const [bgUrl, setBgUrl] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, author, content, image_url, section_bg_url, published_at, is_active")
        .eq("is_active", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Supabase error:", error.message);
        setError(error.message);
      } else {
        const rows = (data ?? []) as Blog[];
        setBlogs(rows);
        // ✅ Pull section background directly from the DB row
        if (rows.length > 0 && rows[0].section_bg_url) {
          setBgUrl(rows[0].section_bg_url);
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error — check your Supabase connection.");
    }

    setLoading(false);
  };

  onMount(() => fetchBlogs());

  const preview = (content: string) =>
    content.length > 180 ? content.slice(0, 180) + "..." : content;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  return (
    <section class="relative py-20 px-6 md:px-16 overflow-hidden">

      {/* ✅ background-attachment: fixed makes it stay static while scrolling */}
      <Show when={bgUrl()}>
        <div
          class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            "background-image": `url(${bgUrl()})`,
            "background-attachment": "fixed",
          }}
        />
      </Show>

      {/* Dark overlay for readability */}
      <div class="absolute inset-0 z-0 bg-black/60" />

      {/* All content sits above the background */}
      <div class="relative z-10">

        {/* Title */}
        <div class="text-center mb-16">
          <p class="text-pink-400 uppercase tracking-widest text-sm font-semibold mb-3">
            From Our Blog
          </p>
          <h2 class="text-4xl md:text-5xl font-serif font-bold text-white">
            Recent Blog Entries
          </h2>
          <div class="w-16 h-1 bg-pink-500 mx-auto mt-5 rounded-full" />
        </div>

        {/* Loading */}
        <Show when={loading()}>
          <p class="text-center py-10 text-white/60 animate-pulse">
            Loading blogs...
          </p>
        </Show>

        {/* Error */}
        <Show when={!loading() && error()}>
          <div class="text-center py-10 space-y-3">
            <p class="text-red-400 font-semibold">Something went wrong:</p>
            <p class="text-red-300 text-sm">{error()}</p>
            <button
              onClick={fetchBlogs}
              class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
            >
              Retry
            </button>
          </div>
        </Show>

        {/* Blog Cards */}
        <Show when={!loading() && !error()}>
          <Show
            when={blogs().length > 0}
            fallback={
              <p class="text-center py-10 text-white/60">No blogs found.</p>
            }
          >
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <For each={blogs()}>
                {(blog) => (
                  <div class="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1">

                    {/* Image */}
                    <div class="overflow-hidden h-56">
                      <img
                        src={blog.image_url ?? ""}
                        alt={blog.title}
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div class="p-6 space-y-3">

                      {/* Date & Author */}
                      <p class="text-xs text-pink-300 font-medium tracking-wide uppercase">
                        {formatDate(blog.published_at)}
                        <Show when={blog.author}>
                          {" "}&mdash; {blog.author}
                        </Show>
                      </p>

                      {/* Title */}
                      <h3 class="text-lg font-semibold text-white leading-snug group-hover:text-pink-300 transition-colors duration-200">
                        {blog.title}
                      </h3>

                      {/* Preview */}
                      <p class="text-white/70 text-sm leading-relaxed">
                        {preview(blog.content)}
                      </p>

                      {/* Pink accent line — grows on hover */}
                      <div class="w-10 h-0.5 bg-pink-500 mt-2 rounded-full transition-all duration-300 group-hover:w-20" />

                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>

      </div>
    </section>
  );
}