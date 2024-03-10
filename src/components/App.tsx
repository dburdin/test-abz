import { Toaster } from "react-hot-toast";
import { lazy } from "react";

const Header = lazy(() =>
  import("./Header").then(({ Header }) => ({
    default: Header,
  }))
);
const Main = lazy(() =>
  import("./Main").then(({ Main }) => ({
    default: Main,
  }))
);
const Footer = lazy(() =>
  import("./Footer").then(({ Footer }) => ({
    default: Footer,
  }))
);

export const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Main />
      {/* not necessarily in this case, but if footer existed as usual */}
      <Footer />
    </>
  );
};
