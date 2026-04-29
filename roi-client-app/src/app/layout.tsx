// @ts-nocheck
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/main.scss";
import Providers from "./providers";

config.autoAddCss = false;

export const metadata = {
  title: "Return on Investment System",
  description: "Return on Investment System - Client dashboard",
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
