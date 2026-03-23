import nail2 from "../assets/nail2.jpg";

const blogs = [
  {
    image: nail2,
    title: "Can zinc be a cure for skin Acne?",
    date: "19.07.2023",
    description:
      "It’s not always possible to have a nail polish remover on you, everywhere. This is why we’re gonna guide you on a couple of other ways to take it off, just as..."
  },
  {
    image: nail2,
    title: "What a Non-toxic Nail Polish Is?",
    date: "19.07.2023",
    description:
      "In the last few years the world’s gone mad (in a good sense) for all things organic. This includes all things essential, counting things essential for women, such as their nail polish..."
  },
  {
    image: nail2,
    title: "Top Colors for Nail Polish",
    date: "19.07.2023",
    description:
      "Considering just how much women love diversity, especially when it comes to a visual appearance – America’s nail polish companies have come up with numerous ways to create new shades and colors..."
  }
];

export default function BlogSection() {
  return (
    <section class="relative bg-gray-100 py-20 px-6 md:px-16">

      {/* Title */}
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-900">
          Recent Blog Entries:
        </h2>
      </div>

      {/* Blog Cards */}
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        {blogs.map((blog) => (
          <div class="group">

            {/* Image */}
            <div class="overflow-hidden rounded-lg">
              <img
                src={blog.image}
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
                {blog.date}
              </p>

              <p class="text-gray-600 leading-relaxed">
                {blog.description}
              </p>

              {/* bottom line */}
              <div class="w-24 h-[3px] bg-pink-500 mt-4"></div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}