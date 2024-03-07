import { Toaster } from "react-hot-toast";

import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

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
