import * as React from "react";
import Card from "./Card";
import Banner from "./Banner";
import classes from "../../Styles/Home.module.scss";
import England from "../../photos/england.jpg";
import Germany from "../../photos/germany.jpg";
import Spain from "../../photos/spain.jpg";
import Usa from "../../photos/usa.jpg";
import Hungary from "../../photos/hungary.jpg";
import Romania from "../../photos/romania.jpg";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div className={classes.home}>
      <Banner />
      <div className={classes.home__section}>
        <Card countrySrc={England} countryName="England" />
        <Card countrySrc={Germany} countryName="Germany" />
        <Card countrySrc={Spain} countryName="Spain" />
      </div>
      <div className={classes.home__section}>
        <Card countrySrc={Usa} countryName="USA" />
        <Card countrySrc={Hungary} countryName="Hungary" />
        <Card countrySrc={Romania} countryName="Romania" />
      </div>
    </div>
  );
};

export default Home;
