
import { createSignal } from "solid-js";
import nail2 from "../assets/nail2.jpg";

export default function Services3() {
  const [expanded, setExpanded] = createSignal(false);

  return (
    <section class="bg-gray-200 py-20 px-8 md:px-16">

      {/* Content */}
      <div class="grid md:grid-cols-2 gap-12 items-center">

        {/* Left Text Section */}
        <div>
          <h3 class="text-4xl font-serif font-bold text-gray-800 mb-6">
            Waxing
          </h3>

          <p class="text-gray-600 mb-4">
            Waxing is a vital way to keep your skin elastic, clean and smooth.
            Our SPA & skin care salon focuses on providing an excellent
            experience for anyone who wants to wax their facial or body skin.
          </p>

          {/* Animated Expand Section */}
          <div
            class={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded()
                ? "max-h-[400px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-3"
            }`}
          >
            <p class="text-gray-600 mb-6 mt-2">
              Currently, we offer a waxing service for the following body areas:
            </p>

            <p class="text-lg text-gray-700 mb-4">
              We currently provide the following services:
            </p>

            <ul class="space-y-2 text-gray-600 mb-8 list-disc pl-5">
              <li>Regular Pedicure</li>
              <li>Eyebrow Arch + Eyebrow Design + Full Arm Massage</li>
              <li>Full Face (Excludes Eyebrow)</li>
              <li>Full Leg</li>
              <li>Full Leg And a Brazilian</li>
            </ul>
          </div>

          {/* Button */}
          <button
            onClick={() => setExpanded(!expanded())}
            class="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            {expanded() ? "VIEW LESS" : "READ MORE"}

            {/* Arrow */}
            <span
              class={`transition-transform duration-300 ${
                expanded() ? "rotate-180" : ""
              }`}
            >
            </span>
          </button>
        </div>

        {/* Right Image */}
        <div class="w-[300px] lg:w-4/5 xl:w-full mx-auto h-[500px] overflow-hidden rounded-md shadow-lg">
          <img
            src={nail2}
            alt="Waxing Service"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

      </div>
    </section>
  );
}

