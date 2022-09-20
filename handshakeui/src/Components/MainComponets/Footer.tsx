import * as React from "react";
import classes from "../../Styles/Footer.module.scss";
import logo from "../../photos/handshake_logo.png";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Outlet } from "react-router-dom";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <div>
      <Outlet />
      <div className={classes.footer}>
        <div
          className={`${classes.container} ${classes.grid} ${classes.grid__footer}`}
        >
          <div className={classes.logo__col}>
            <a href="#" className={classes.footer__logo}>
              <img className={classes.logo} alt="Handshake logo" src={logo} />
            </a>

            <ul className={classes.social__links}>
              <li>
                <a className={classes.footer__link} href="#">
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a className={classes.footer__link} href="#">
                  <FacebookTwoToneIcon />
                </a>
              </li>
              <li>
                <a className={classes.footer__link} href="#">
                  <TwitterIcon />
                </a>
              </li>
            </ul>

            <p className={classes.copyright}>
              Copyright &copy; <span className="year">2022</span> by Handhshake,
              Inc. All rights reserved.
            </p>
          </div>

          <div className={classes.address__col}>
            <p className={classes.footer__heading}>Contact us</p>
            <address className={classes.contacts}>
              <p className={classes.address}>
                623 Harrison St., 2nd Floor, San Francisco, CA 94107
              </p>
              <p>
                <a className={classes.footer__link} href="tel:415-201-6370">
                  415-201-6370
                </a>
                <br />
                <a
                  className={classes.footer__link}
                  href="mailto:hello@handshake.com"
                >
                  hello@handshake.com
                </a>
              </p>
            </address>
          </div>

          <nav className={classes.nav__col}>
            <p className={classes.footer__heading}>Account</p>
            <ul className={classes.footer__nav}>
              <li>
                <a className={classes.footer__link} href="#">
                  Create account
                </a>
              </li>
              <li>
                <a className={classes.footer__link} href="#">
                  Sign in
                </a>
              </li>
            </ul>
          </nav>

          <nav className={classes.nav__col}>
            <p className={classes.footer__heading}>Company</p>
            <ul className={classes.footer__nav}>
              <li>
                <a className={classes.footer__link} href="#">
                  About
                </a>
              </li>
              <li>
                <a className={classes.footer__link} href="#">
                  How it works
                </a>
              </li>
            </ul>
          </nav>

          <nav className={classes.nav__col}>
            <p className={classes.footer__heading}>Resources</p>
            <ul className={classes.footer__nav}>
              <li>
                <a className={classes.footer__link} href="#">
                  Help center
                </a>
              </li>
              <li>
                <a className={classes.footer__link} href="#">
                  Privacy & terms
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
