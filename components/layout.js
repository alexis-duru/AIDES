import Navbar from "./navbar";
import Footer from "./footer";
import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
