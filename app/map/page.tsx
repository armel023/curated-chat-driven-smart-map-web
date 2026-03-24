import HeaderSection from "./header-section";
import MainSection from "./main-section";
import GuestNoticeOverlay from "./guest-notice-overlay";

export default function MapPage() {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <HeaderSection />

      {/* Main Content */}
      <MainSection />

      {/* Guest Notice */}
      <GuestNoticeOverlay />
    </div>
  );
}
