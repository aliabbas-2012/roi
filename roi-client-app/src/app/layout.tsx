// @ts-nocheck
import "../styles/main.scss";
import Providers from "./providers";

export const metadata = {
  title: "ROI Client App",
  description: "ROI customer dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
