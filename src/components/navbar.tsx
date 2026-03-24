import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";
import { HiOutlinePhone } from "solid-icons/hi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [showChatModal, setShowChatModal] = createSignal(false);

  const toggleMenu = () => setMenuOpen(!menuOpen());
  const closeMenu = () => setMenuOpen(false);

  // ✅ CALL BUTTON
  const handleCall = () => {
    window.location.href = "tel:+256702478359";
  };

  const closeChatModal = () => setShowChatModal(false);

  // ✅ WHATSAPP BUTTON
  const handleWhatsApp = () => {
    const waNumber = "256702478359";
    const prefilledMsg = "Hello! I'd like to book a nail appointment 💅";
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(prefilledMsg)}`;
    window.location.href = url;
    closeChatModal();
  };

  return (
    <>
      {/* HEADER */}
      <header class="fixed top-0 left-0 right-0 z-300 flex items-center justify-between px-6 md:px-16 py-6 bg-white/80 backdrop-blur-md shadow-sm">
        <div class="text-2xl md:text-4xl font-serif tracking-wide">
          <span class="font-light text-gray-700">Amonic</span>
          <span class="font-bold text-pink-600">♡</span>
          <span class="font-bold text-gray-700">Nails</span>
        </div>

        <div class="hidden md:flex items-center gap-10">
          <nav class="flex items-center gap-10 text-sm md:text-base tracking-widest uppercase font-medium">
            <A href="/" class="text-pink-600 font-semibold hover:text-pink-700 transition">Home</A>
            <A href="/services" class="text-gray-700 hover:text-pink-600 transition">Services</A>
            <A href="/about" class="text-gray-700 hover:text-pink-600 transition">About</A>
            <A href="/blog" class="text-gray-700 hover:text-pink-600 transition">Blog</A>
            <A href="/gallery" class="text-gray-700 hover:text-pink-600 transition">Gallery</A>
          </nav>

          {/* CALL BUTTON */}
          <div class="flex items-center gap-5">
            <button
              onClick={handleCall}
              class="text-gray-700 hover:text-pink-600 transition text-2xl"
              title="Call us"
              aria-label="Call us"
            >
              <HiOutlinePhone />
            </button>
          </div>
        </div>

        <button class="md:hidden text-pink-600 text-3xl z-400" onClick={toggleMenu}>
          {menuOpen() ? "✕" : "☰"}
        </button>
      </header>

      {/* MOBILE MENU */}
      <Show when={menuOpen()}>
        <div class="fixed inset-0 z-250 bg-black/70 backdrop-blur-sm flex items-center justify-center md:hidden">
          <div class="bg-white w-[85%] max-w-sm rounded-2xl shadow-2xl flex flex-col items-center gap-8 py-12 text-lg uppercase tracking-widest">
              <A href="/" onClick={closeMenu} class="text-black hover:text-pink-600 transition">Home</A>
              <A href="/about" onClick={closeMenu} class="text-black hover:text-pink-600 transition">About</A>
              <A href="/services" onClick={closeMenu} class="text-black hover:text-pink-600 transition">Services</A>
              <A href="/blog" onClick={closeMenu} class="text-black hover:text-pink-600 transition">Blog</A>
              <A href="/gallery" onClick={closeMenu} class="text-black hover:text-pink-600 transition">Gallery</A>

            <div class="flex gap-16 mt-6">
              <button
                onClick={handleWhatsApp}
                class="flex flex-col items-center text-black hover:text-pink-600 transition"
              >
                <HiOutlinePhone size={32} />
                <span class="text-sm mt-1">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </Show>

      {/* MODAL */}
      <Show when={showChatModal()}>
        <div class="fixed inset-0 z-500 bg-black/60 flex items-center justify-center p-4" onClick={closeChatModal}>
          <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div class="bg-pink-300 text-white px-6 py-4 flex justify-between items-center">
              <h3 class="text-lg font-semibold">Get in Touch 💅</h3>
              <button onClick={closeChatModal}>×</button>
            </div>

            <div class="p-6">
              <p class="text-gray-600 mb-6 text-center">
                Chat with us directly on WhatsApp
              </p>
              <button
                onClick={handleWhatsApp}
                class="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                WhatsApp Chat Now
              </button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}