import { createSignal } from "solid-js";
import nail2 from "../assets/nail2.jpg";

export default function Services1() {
  const [expanded, setExpanded] = createSignal(false);

  return (
    <section class="bg-gray-200 py-30 px-8 md:px-16">

      {/* Title */}
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-gray-800">
          Services
        </h2>
        <p class="mt-4 text-gray-600 max-w-xl mx-auto">
          Our professional masseurs will do their best to sooth and calm your
          body & mind!
        </p>
      </div>

      {/* Content */}
      <div class="grid md:grid-cols-2 gap-12 items-center">

        {/* Left Text Section */}
        <div>
          <h3 class="text-4xl font-serif font-bold text-gray-800 mb-6">
            Pedicure
          </h3>

          <p class="text-gray-600 mb-4">
            A pedicure is a luxurious and rejuvenating foot care treatment that transforms tired,
            rough feet into soft, smooth, and beautifully polished ones.
          </p>

          {/* Animated expandable section */}
          <div
            class={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded()
                ? "max-h-500px opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4"
            }`}
          >
            <p class="text-gray-600 mb-6 mt-4">
              We provide an ultimate, SPA induced services for refreshing your
              health and enhancing your aesthetics...
            </p>

            <p class="text-lg text-gray-700 mb-4">
              We currently provide the following services:
            </p>

            <ul class="space-y-2 text-gray-600 mb-8 list-disc pl-5">
              <li>Regular Pedicure</li>
              <li>
                Spa Pedicure Callus Removal + Mud Pack + Hot Towel Wraps +
                Lotion Massage
              </li>
              <li>Gel Pedicure</li>
              <li>French Pedicure</li>
            </ul>
          </div>

          {/* Button */}
          <button
            onClick={() => setExpanded(!expanded())}
            class="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            {expanded() ? "VIEW LESS" : "READ MORE"}

            {/* arrow */}
            <span
              class={`transition-transform duration-300 ${
                expanded() ? "rotate-180" : ""
              }`}
            >
              
            </span>
          </button>
        </div>

        {/* Right Image */}
        <div class="w-300px lg:w-4/5 xl:w-full mx-auto h-500px overflow-hidden rounded-md shadow-lg">
          <img
            src={nail2}
            alt="Pedicure Service"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

      </div>
    </section>
  );
}