import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthWrapper from "@/components/AuthWrapper";
import { CarProvider } from "./context/carsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DriveLoop App",
  description: "Your car-sharing revolution",
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <CarProvider>
        <html lang="en">
          <body className={`${inter.className} min-h-screen`}>
            <Header />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-h-[calc(100vh-132px)]">
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </CarProvider>
    </AuthWrapper>
  );
}
