const strings = {
  brandStart: "Amonic",
  brandEnd: "Nails",
  slogan: "Hundreds of Colors, Organic Nail Polish!",

  addressLine1: "5421 Najeera Kamwanyi",
  addressLine2: "Kira, Kampala, 2303",

  email: "simonwasswa33@amonicnails",
  phone: "+256 71 282 0001"
};

export default function Footer() {
  return (
    <footer class="bg-gray-300 py-12 px-10">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

        {/* Logo Section */}
        <div class="text-center md:text-left space-y-4">

          <div class="text-3xl md:text-4xl font-serif tracking-wide">
            <span class="font-light text-gray-700">{strings.brandStart}</span>
            <span class="font-bold text-pink-600">♡</span>
            <span class="font-bold text-gray-700">{strings.brandEnd}</span>
          </div>

          <p class="text-gray-600">
            {strings.slogan}
          </p>
        </div>

        {/* Contact Section */}
        <div class="border-l border-r px-10 space-y-3 text-gray-700">

          <p class="flex items-center gap-3">
            {strings.addressLine1}, <br />
            {strings.addressLine2}
          </p>

          <p class="flex items-center gap-3 text-pink-500">
            ✉ {strings.email}
          </p>

          <p class="flex items-center gap-3 text-pink-500">
            ☎ {strings.phone}
          </p>

        </div>

        {/* Social Icons */}
        <div class="flex justify-center md:justify-end gap-4">

          <div class="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
            F
          </div>

          <div class="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
            X
          </div>

          <div class="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
            G
          </div>

          <div class="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
            T
          </div>

          <div class="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center">
            I
          </div>

        </div>

      </div>
    </footer>
  );
}