import "./globals.css";
import { Exo_2 } from 'next/font/google'
import BottomCredits from "@/component/bottomcredit";
import BGImage from "@/component/bgimage";

export const metadata = {
  title: "Wi-Fi Portal",
  description: "Wi-Fi login portal.",
  icons: {
    icon: '/favicon.png',
  },
};

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-exo2',
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${exo2.variable}`}>
      <body className="min-h-full flex flex-col">
        <div className="main-content">
          {children}
        </div>
        <BottomCredits />
        <BGImage src="/markus-stickling-ISP9CdRYS28-unsplash.jpg" />
      </body>
    </html>
  );
}