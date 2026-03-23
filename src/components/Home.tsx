import { createSignal } from "solid-js";
import nail2 from "../assets/nail2.jpg";

const strings = {
  title1: "Hundreds of Colors,",
  title2: "Organic Nail Polish!",
  description:
    "With its diverse list of members, professional equipment and lots of tidy courts the.",
  button: "BOOK NOW",
  image: nail2,
  imageAlt: "Woman with bold red nails and dramatic makeup"
};

export default function HeroSection() {
  const [animate, setAnimate] = createSignal(false);

  return (
    <section
      onMouseEnter={() => setAnimate(true)}
      class="relative min-h-screen overflow-hidden pt-24 md:pt-32 px-4 md:px-20 lg:px-32 pb-20"
    >

      {/* Fixed Background Image */}
      <div
        class="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
        style={{
          "background-image": `url(${strings.image})`
        }}
      ></div>

      {/* Overlay */}
      <div class="absolute inset-0 -z-10 bg-white/80 backdrop-blur-sm"></div>

      {/* Large Background Word */}
      <h1 class="absolute -left-4 md:left-6 top-20 md:top-24 text-[140px] md:text-[220px] lg:text-[280px] font-bold text-gray-200 opacity-30 select-none pointer-events-none leading-none">
        Beauty
      </h1>

      <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-7xl mx-auto">

        {/* TEXT SECTION */}
        <div class="max-w-xl lg:max-w-2xl space-y-6 md:space-y-8 text-center lg:text-left">

          <h1
            class={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight text-gray-900 ${
              animate() ? "animate-slide-left delay-1" : "opacity-0"
            }`}
          >
            {strings.title1}
            <br class="hidden sm:block" />
            {strings.title2}
          </h1>

          <p
            class={`text-gray-600 text-lg md:text-xl leading-relaxed max-w-prose mx-auto lg:mx-0 ${
              animate() ? "animate-slide-left delay-2" : "opacity-0"
            }`}
          >
            {strings.description}
          </p>

          <div class="pt-4">
            <button
              class={`bg-pink-500 text-white px-10 py-4 rounded-full text-lg font-semibold
              transition-all duration-300
              hover:bg-pink-600
              hover:shadow-[0_0_25px_rgba(236,72,153,0.7)]
              hover:-translate-y-1
              ${animate() ? "animate-slide-left delay-3" : "opacity-0"}`}
            >
              {strings.button}
            </button>
          </div>

        </div>

        {/* IMAGE SECTION */}
        <div
          class={`w-full lg:w-3/5 xl:w-1/2 ${
            animate() ? "animate-slide-right delay-2" : "opacity-0"
          }`}
        >
          <div class="overflow-hidden rounded-2xl shadow-2xl border-8 border-white/60">
            <img
              src={strings.image}
              alt={strings.imageAlt}
              class="w-full h-600px md:h-680px object-cover transition-transform duration-700 hover:scale-110"
              loading="eager"
            />
          </div>
        </div>

      </div>

      {/* Floating decoration */}
      <div class="absolute bottom-10 right-10 w-16 h-16 md:w-24 md:h-24 bg-linear-to-br from-pink-400 to-red-500 rounded-full opacity-40 blur-2xl animate-pulse pointer-events-none"></div>

      <div class="absolute top-40 left-20 w-20 h-20 md:w-32 md:h-32 bg-linear-to-br from-purple-400 to-pink-500 rounded-full opacity-30 blur-3xl animate-pulse pointer-events-none"></div>

    </section>
  );
}