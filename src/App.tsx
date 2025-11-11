import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Nav />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
