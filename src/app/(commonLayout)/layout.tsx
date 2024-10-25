import type { Metadata } from "next";

import Navbar2 from "./components/page/home/Navbar2";

export const metadata: Metadata = {
  title: "Apollo Gears",
  description: "Next Level Riding Sharing Service",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar2></Navbar2>
      {children}
      {/* <Footer></Footer> */}
    </div>
  );
}
