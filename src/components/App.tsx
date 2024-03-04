import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";

export const App = () => {
  return (
    <>
      <Header />
      <Main />
      {/* not necessarily in this case, but if footer existed as usual */}
      <Footer />
    </>
  );
};
