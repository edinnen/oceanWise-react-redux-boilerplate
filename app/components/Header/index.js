import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
// Load in redux stuff to grab the parent container's state
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import Banner from './banner.jpg';
import Container from './Container';
import Logo from './Logo';
import messages from './messages';
import DeskLogo from './logo.svg';
import MobiLogo from './logo-mobile.svg';

// Import the CMSPage containers selector to borrow its state for rerendering the nav links on language change
import makeSelectCMSPage, { makeSelectLocation } from '../../containers/CMSPage/selectors';
import { makeSelectHomePage } from '../../containers/HomePage/selectors';

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
    // Where are we? Select the appropriate reducer for our route
    const location = this.props.location;
    let data;
    if (location.match(/\/.+/g)) { // If the route matches '/' with anything following it we are on a subpage, so load the CMS page reducer
      data = this.props.cmspage;
    } else {                       // The route is '/' so load the home page reducer
      data = this.props.homepage;
    }

    // Render our CMS page slugs into the navigation buttons
    const pageLinks = data.pageList.map((page) => {
      const url = '/' + page.slug; // eslint-disable-line prefer-template
      return (
        <Link to={url} key={page.slug}>
          <Button id="url">
            {page.title}
          </Button>
        </Link>
      );
    });

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
          {pageLinks}
        </NavBar>
      </div>
    );
  }
}

Header.propTypes = {
  cmspage: PropTypes.object,
  homepage: PropTypes.object.isRequired,
  location: PropTypes.string,
};

// This maps the parent's state to our prop as we imported the parent's selector!
const mapStateToProps = createStructuredSelector({
  cmspage: makeSelectCMSPage(),
  homepage: makeSelectHomePage(),
  location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Header);
