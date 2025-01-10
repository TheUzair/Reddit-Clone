import AdSection from "@/components/AdSection";
import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-800 dark:border-gray-700">
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 p-4">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-8 gap-4">
          {/* Feed */}
          <div className="col-span-6 p-4">
            <Feed />
          </div>

          {/* Right Section */}
          <div className="col-span-2 p-4 relative">
            <AdSection />
            <div className="sticky top-[calc(100vh-200px)]">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}