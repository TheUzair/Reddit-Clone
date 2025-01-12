import AdSection from "@/components/AdSection";
import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-50 dark:bg-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-64 p-4 hidden lg:block">
          <Sidebar />
        </div>

        {/* Feed and Right Section */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-8 gap-4 p-4">
          {/* Feed */}
          <div className="col-span-1 lg:col-span-6">
            <Feed />
          </div>

          {/* Right Section */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
            <div className="lg:sticky lg:top-4">
              <AdSection />
            </div>
            <div className="lg:mt-auto lg:sticky lg:top-[calc(100vh-200px)]">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
