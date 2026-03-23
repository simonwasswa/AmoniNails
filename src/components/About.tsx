import { createSignal } from "solid-js";
import nail2 from "../assets/nail2.jpg";
import { A } from "@solidjs/router";

type Tab = "manicure" | "pedicure" | "waxing";

export default function AboutUs() {
  const [activeTab, setActiveTab] = createSignal<Tab>("manicure");

  const content = {
    manicure: {
      title: "Manicure",
      text: "While hand and nail care is usually restricted to just a few services, we’ve got a wide selection of various manicure methods, just as well as the overall hands skin care treatments.",
      services: ["Regular Manicure", "Spa Manicure"]
    },

    pedicure: {
      title: "Pedicure",
      text: "Our pedicure services help maintain healthy feet and beautiful nails with relaxing treatments.",
      services: ["Classic Pedicure", "Spa Pedicure"]
    },

    waxing: {
      title: "Waxing",
      text: "Professional waxing services leaving your skin smooth and clean with long-lasting results.",
      services: ["Face Waxing", "Body Waxing"]
    }
  };

  return (
    <section class="bg-gray-100  overflow-hidden px-4 md:px-24">

      <div class="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-15 w-full h-full">

        {/* IMAGE */}
        <div class="W-[400px] lg:w-4/5 xl:w-2/2 mx-auto H-[700px] lg:h-[700px] xl:h-[800px]  overflow-hidden rounded-2xl shadow-2xl border-8 border-white/60">
          <img
            src={nail2}
            alt="Beauty model with manicure"
            class="w-full object-cover transition-transform duration-700 hover:scale-110"
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

            <button
              onClick={() => setActiveTab("manicure")}
              class={`pb-2 transition ${
                activeTab() === "manicure"
                  ? "border-b-2 border-pink-500 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Manicure
            </button>

            <button
              onClick={() => setActiveTab("pedicure")}
              class={`pb-2 transition ${
                activeTab() === "pedicure"
                  ? "border-b-2 border-pink-500 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Pedicure
            </button>

            <button
              onClick={() => setActiveTab("waxing")}
              class={`pb-2 transition ${
                activeTab() === "waxing"
                  ? "border-b-2 border-pink-500 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Waxing
            </button>

          </div>

          {/* Dynamic Content */}
          <div class="space-y-4">

            <h3 class="text-3xl font-serif font-semibold text-gray-900">
              {content[activeTab()].title}
            </h3>

            <p class="text-gray-600 leading-relaxed">
              {content[activeTab()].text}
            </p>

            <p class="font-medium text-gray-800">
              Here’s a list of those:
            </p>

            <ul class="space-y-2">
              {content[activeTab()].services.map((service) => (
                <li class="flex items-center gap-2 text-gray-700">
                  <span class="text-pink-500 text-lg">*</span>
                  {service}
                </li>
              ))}
            </ul>

          </div>

          {/* Button */}
          <A href="/about">
              <button class="mt-6 bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-semibold transition shadow-md w-fit">
                 ABOUT US
             </button>
          </A>

        </div>

      </div>

    </section>
  );
}