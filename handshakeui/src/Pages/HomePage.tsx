import Home from "../Components/LandingPage/Home";
import Footer from "../Components/MainComponets/Footer";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="app">
      <Home />
      <Footer />
    </div>
  );
};

export default HomePage;
