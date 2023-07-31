import Navbar from "@components/Navbar";
import Provider from "@components/Providers";
import "@styles/globals.css";

export const metadata = {
  title: "forms auth",
};

interface RootLayoutProps {
  children: React.ReactElement;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="pt-br">
      <body>
        <Provider>
          <Navbar />
          <div className="w-100">{children}</div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
