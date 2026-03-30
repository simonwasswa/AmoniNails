import { createSignal, onMount, Show, For } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Type matching your exact blogs table
type Blog = {
  id: string;
  title: string;
  author: string | null;
  content: string;
  image_url: string | null;
  published_at: string;
  is_active: boolean;
};

// ✅ Database schema type for Supabase v2
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

// ✅ Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default function BlogSection() {
  const [blogs, setBlogs] = createSignal<Blog[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, author, content, image_url, published_at, is_active")
        .eq("is_active", true)
        .order("published_at", { ascending: false })
        .limit(3); 

      if (error) {
        console.error("Supabase error:", error.message);
        setError(error.message);
      } else {
        setBlogs(data ?? []);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error — check your Supabase connection.");
    }

    setLoading(false);
  };

  onMount(() => fetchBlogs());

  // Truncate content for card preview
  const preview = (content: string) =>
    content.length > 180 ? content.slice(0, 180) + "..." : content;

  // Format date to "19.07.2023" style
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  return (
    <section class="relative bg-gray-100 py-20 px-6 md:px-16">

      {/* Title */}
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900">
          Recent Blog Entries:
        </h2>
      </div>

      <Show
        when={!loading()}
        fallback={
          <p class="text-center py-10 text-gray-500 animate-pulse">
            Loading blogs...
          </p>
        }
      >
        <Show
          when={!error()}
          fallback={
            <div class="text-center py-10 space-y-3">
              <p class="text-red-500 font-semibold">Something went wrong:</p>
              <p class="text-red-400 text-sm">{error()}</p>
              <button
                onClick={fetchBlogs}
                class="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm transition"
              >
                Retry
              </button>
            </div>
          }
        >
          <Show
            when={blogs().length > 0}
            fallback={
              <p class="text-center py-10 text-gray-500">No blogs found.</p>
            }
          >
            {/* Blog Cards */}
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <For each={blogs()}>
                {(blog) => (
                  <div class="group">

                    {/* Image */}
                    <div class="overflow-hidden rounded-lg">
                      <img
                        src={blog.image_url ?? "/fallback.jpg"}
                        alt={blog.title}
                        class="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div class="mt-6 space-y-3">

                      <h3 class="text-xl font-semibold text-gray-900">
                        {blog.title}
                      </h3>

                      <p class="text-sm text-gray-400">
                        {formatDate(blog.published_at)}
                      </p>

                      <p class="text-gray-600 leading-relaxed">
                        {preview(blog.content)}
                      </p>

                      {/* Bottom line */}
                      <div class="w-24 h-0.75 bg-pink-500 mt-4"></div>

                    </div>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </Show>
      </Show>

    </section>
  );
}