import * as React from "react";
import classes from "../../Styles/Card.module.scss";

interface ICardProps {
  countrySrc: string;
  countryName: string;
}

const Card: React.FunctionComponent<ICardProps> = ({
  countrySrc,
  countryName,
}) => {
  return (
    <div className={classes.card}>
      <img src={countrySrc} alt="Country" />
      <div className={classes.card__name}>
        <h2>{countryName}</h2>
      </div>
    </div>
  );
};

export default Card;
