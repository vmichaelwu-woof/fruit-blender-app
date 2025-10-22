import "./globals.css";
import "../styles/components.css";
import SDKInitializer from "./SDKInitializer";

export const metadata = {
  title: "Fruit Blender",
  description: "Create delicious fruit smoothies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SDKInitializer />
        {children}
      </body>
    </html>
  );
}
