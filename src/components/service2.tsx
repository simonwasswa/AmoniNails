
import { createSignal } from "solid-js";
import nail2 from "../assets/nail2.jpg";

export default function Service2() {
  const [expanded, setExpanded] = createSignal(false);

  return (
    <section class="py-16 px-6 sm:px-10 md:px-16 bg-gray-50">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">

        {/* Left Image */}
        <div class="w-full overflow-hidden rounded-lg shadow-lg">
          <img
            src={nail2}
            alt="Manicure Service"
            class="w-full h-300px sm:h-400px md:h-450px lg:h-500px object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Right Text */}
        <div class="text-center md:text-left">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Manicure
          </h2>

          <p class="text-gray-600 mb-4 text-sm sm:text-base">
            While hand and nail care is usually restricted to just a few services,
            we’ve got a wide selection of various pedicure methods, just as well as
            the overall hands skin care treatments...
          </p>

          {/* Animated Expand Section */}
          <div
            class={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded()
                ? "max-h-400px opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-3"
            }`}
          >
            <p class="text-gray-600 mb-4 mt-2">Here’s a list of those:</p>

            <ul class="list-disc list-inside text-gray-600 space-y-2 mb-6 text-sm sm:text-base">
              <li>Acrylic Full Set</li>
              <li>Polish Change – Hands & Toes</li>
              <li>French Manicure</li>
              <li>Gradation</li>
              <li>Nails designs</li>
              <li>Nail Fix</li>
              <li>Gel Take Off</li>
              <li>Acrylic Take Off</li>
            </ul>
          </div>

          {/* Button */}
          <button
            onClick={() => setExpanded(!expanded())}
            class="mt-4 flex items-center gap-2 mx-auto md:mx-0 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
          >
            {expanded() ? "View Less" : "Read More"}

            {/* arrow */}
            <span
              class={`transition-transform duration-300 ${
                expanded() ? "rotate-180" : ""
              }`}
            >
              
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
