// src/components/Testimonials.tsx
import { createSignal } from "solid-js";

const testimonials = [
  {
    name: "Jade Matthews",
    image: "https://i.pravatar.cc/150?img=1",
    text: "At first I was really scared to go play tennis at a brand new venue. But as it turns out it is quite easy to make friends here. I got along with a lot of the campers my age, and the camp staff were awesome!! We got to play tennis, swim, and play field games....",
  },
  {
    name: "Alex Johnson",
    image: "https://i.pravatar.cc/150?img=2",
    text: "This place is amazing! I met so many new friends and the activities were fun and engaging. Definitely recommend it to anyone looking to have a great experience.",
  },
  {
    name: "Sophia Lee",
    image: "https://i.pravatar.cc/150?img=3",
    text: "I loved my time here! The staff were supportive and friendly. I learned so much and made memories that will last forever.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = createSignal(0);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section class="relative px-6 py-16 md:px-20 lg:px-36 overflow-hidden bg-gray-100">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-700 mb-12">
          Testimonials
        </h2>

        <div class="relative">
          {/* Slides container */}
          <div class="overflow-hidden">
            <div
              class="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current() * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div class="w-full shrink-0 px-4">
                  <div class="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                    <div class="flex flex-col items-center">
                      <img
                        src={t.image}
                        alt={t.name}
                        class="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mb-8 border-4 border-pink-100 shadow-md"
                      />
                      <p class="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 italic">
                        "{t.text}"
                      </p>
                      <span class="text-pink-600 font-semibold text-xl">
                        {t.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            class="absolute top-1/2 left-0 md:left-4 -translate-y-1/2   rounded-full p-3 md:p-4 hover:bg-pink-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
            aria-label="Previous testimonial"
          >
            <span class="text-2xl md:text-3xl text-gray-600">&lsaquo;</span>
          </button>

          <button
            onClick={next}
            class="absolute top-1/2 right-0 md:right-4 -translate-y-1/2  rounded-full p-3 md:p-4 hover:bg-pink-50 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300"
            aria-label="Next testimonial"
          >
            <span class="text-2xl md:text-3xl text-gray-600">&rsaquo;</span>
          </button>
        </div>
      </div>
    </section>
  );
}