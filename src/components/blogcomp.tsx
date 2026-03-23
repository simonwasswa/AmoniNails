import nail2 from "../assets/nail2.jpg";

export default function BlogS() {
  const blogs = [
    {
      title: "Can zinc be a cure for skin Acne?",
      author: "admin",
      date: "Posted 19.07.2023",
      text: "It's not always possible to have a nail polish remover on you, everywhere. This is why we're gonna guide you on a couple of other ways to take it off, just as well as the overall hands skin care treatments...",
      image: nail2,
    },
    {
      title: "Best nail care tips for healthy nails",
      author: "admin",
      date: "Posted 20.07.2023",
      text: "Taking care of your nails is important for maintaining a polished look. Regular trimming, moisturizing, and avoiding harsh chemicals can help keep your nails strong and beautiful...",
      image: nail2,
    },
    {
      title: "How to maintain gel polish",
      author: "admin",
      date: "Posted 22.07.2023",
      text: "Gel polish can last longer if properly maintained. Avoid peeling it off and always use cuticle oil to keep your nails hydrated and strong...",
      image: nail2,
    },
  ];

  return (
    <section class="bg-gray-100 pr-8 py-30 px-6 md:px-16">
      <div class="max-w-9xl mx-auto flex flex-col gap-14">
        {blogs.map((blog) => (
          <div class="flex flex-col md:flex-row gap-8 items-center border-b pb-10">
            
            {/* Image */}
            <div class="w-full md:w-1/2">
              <img
                src={blog.image}
                alt={blog.title}
                class="w-full h-[250px] md:h-[300px] object-cover rounded-lg"
              />
            </div>

            {/* Content */}
            <div class="w-full md:w-1/2">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                {blog.title}
              </h2>

              <p class="text-sm text-gray-500 mt-2">
                By <span class="text-red-500">{blog.author}</span> &nbsp; {blog.date}
              </p>

              <p class="text-gray-600 mt-4 leading-relaxed">
                {blog.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}