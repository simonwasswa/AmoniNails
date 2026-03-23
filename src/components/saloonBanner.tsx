
import nail2 from "../assets/nail2.jpg";

export default function SalonImageSection() {
  return (
    <section class="w-full bg-gray-300 py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 items-center">

        {/* Left side empty */}
        <div></div>

        {/* Right side image */}
        <div class="overflow-hidden">
          <img
            src={nail2}
            alt="Manicure Service"
            class="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover object-right transition-transform duration-700 hover:scale-110"
          />
        </div>

      </div>
    </section>
  );
}

