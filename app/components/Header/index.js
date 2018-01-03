import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Button from 'components/Button';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import Banner from './banner.jpg';
import Container from './Container';
import Logo from './Logo';
import messages from './messages';
import DeskLogo from './logo.svg';
import MobiLogo from './logo-mobile.svg';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight, source: '' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    if (this.state.width > 768) {
      this.state.source = DeskLogo;
    } else {
      this.state.source = MobiLogo;
    }
  }

  render() {
    const { source } = this.state;
    return (
      <div>
        <A href="https://ocean.org">
          <Container>
            <Logo src={source} alt="Logo" />
            <Img src={Banner} alt="Ocean wise" />
          </Container>
        </A>
        <NavBar>
          <Link to="/">
            <Button id="home">
              <FormattedMessage {...messages.home} />
            </Button>
          </Link>
          <A href="http://www.material-ui.com/#/components/app-bar/">
            <Button id="invert-test" inverted>
              Material UI
            </Button>
          </A>
          <Link to="/cosmic">
            <Button id="cosmic">
              <FormattedMessage {...messages.cosmic} />
            </Button>
          </Link>
        </NavBar>
      </div>
    );
  }
}

export default Header;
