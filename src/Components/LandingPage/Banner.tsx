import * as React from "react";
import { Button } from "@mui/material";
import classes from "../../Styles/Banner.module.scss";

interface IBannerProps {}

const Banner: React.FunctionComponent<IBannerProps> = (props) => {
  return (
    <div className={classes.banner}>
      <div className={classes.banner__info}>
        <h1>Find, Connect, Enjoy</h1>
        <h5>Exchange your property with other owners in the whole World</h5>
        <Button variant="outlined">Explore</Button>
      </div>
    </div>
  );
};

export default Banner;
