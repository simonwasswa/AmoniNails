import SalonOverview from "../components/overView";
import SalonBanner from "../components/saloonBanner";
import SalonGallery from "../components/gallery";

export default function GalleryPage() {
  return (
    <div>
      <SalonOverview />
      <SalonBanner />
      <SalonGallery />
    </div>
  );
}