import { createSignal, onMount, Show } from "solid-js";
import { createClient } from "@supabase/supabase-js";

// ✅ Supabase client setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Blog = {
  id: string;
  title: string;
  author?: string;
  content: string;
  image_url?: string;
  published_at: string;
};

export default function BlogS() {
  const [blogs, setBlogs] = createSignal<Blog[]>([]);
  const [loading, setLoading] = createSignal(true);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, author, content, image_url, published_at")
      .eq("is_active", true)
      .order("published_at", { ascending: false })
      .limit(10); // adjust number of blogs if needed

    if (error) {
      console.error("Failed to fetch blogs:", error);
      setLoading(false);
      return;
    }

    setBlogs(data || []);
    setLoading(false);
  };

  onMount(() => fetchBlogs());

  return (
    <section class="bg-gray-100 pr-8 py-30 px-6 md:px-18">
      <Show
        when={!loading()}
        fallback={<p class="text-center py-10 text-gray-700">Loading blogs...</p>}
      >
        <div class="max-w-9xl mx-auto flex flex-col gap-14">
          {blogs().map((blog) => (
            <div class="flex flex-col md:flex-row gap-8 items-center border-b pb-10">
              
              {/* Image */}
              <div class="w-full md:w-1/2">
                <img
                  src={blog.image_url ?? ""}
                  alt={blog.title}
                  class="w-full h-62.5 md:h-75 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div class="w-full md:w-1/2">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                  {blog.title}
                </h2>

                <p class="text-sm text-gray-500 mt-2">
                  By <span class="text-red-500">{blog.author ?? "Admin"}</span> &nbsp; {new Date(blog.published_at).toLocaleDateString()}
                </p>

                <p class="text-gray-600 mt-4 leading-relaxed">
                  {blog.content.length > 200 ? blog.content.slice(0, 200) + "..." : blog.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Show>
    </section>
  );
}