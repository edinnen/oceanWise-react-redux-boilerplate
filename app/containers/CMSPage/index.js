/**
 *
 * Cmspage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import R from 'ramda';
import axios from 'axios';

import Header from 'components/Header';
import injectReducer from 'utils/injectReducer';
import { makeSelectHomePage } from '../HomePage/selectors'; // Load in the homepage selector so we can access its state
import config from '../../cosmicConfig';
import reducer from './reducer';
import { pageLoaded } from './actions';
import makeSelectCMSPage, { makeSelectLocale } from './selectors';

export class CMSPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      loading: true,
      pageData: {},
      slug: '',
    };
    this.getPage = this.getPage.bind(this);
  }

  componentWillMount() {
    this.getPage(this.props.match.params.pageSlug);
    this.setState({ slug: this.props.match.params.pageSlug });
  }

  getPage(slug) {
    // As CosmicJS's GraphQL implementation has no locale selector, here we use the REST API instead.
    axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object/' + slug + '?locale=' + this.props.locale) // eslint-disable-line prefer-template
    .then((res) => {
      this.setState({
        pageData: res.data.object,
        slug: slug, // eslint-disable-line object-shorthand
        loading: false,
      });
      this.props.dispatch(pageLoaded(slug, this.state.pageData));
    })
    // Catch if the page above is not found in the selected language ,default to English instead
    .catch(() => {
      axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object/' + slug + '?locale=en') // eslint-disable-line prefer-template
      .then((res) => {
        this.setState({
          pageData: res.data.object,
          slug: slug, // eslint-disable-line object-shorthand
          loading: false,
        });
        this.props.dispatch(pageLoaded(slug, this.state.pageData));
      });
    });
  }

  render() {
    const { pageData, slug } = this.state;

    if (slug !== this.props.match.params.pageSlug) {
      this.getPage(this.props.match.params.pageSlug);
    }

    return (
      <div>
        <Helmet>
          <title>{pageData.title}</title>
          <meta name="description" content="Description of CMS Page" />
        </Helmet>
        <Header />
        <div
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: pageData.content,
          }}
        />
      </div>
    );
  }
}

CMSPage.propTypes = {
  match: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cmspage: makeSelectCMSPage(),
  homepage: makeSelectHomePage(), // Load the homepage's state to our props so we can access what we want
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cmspage', reducer });

export default compose(
  withReducer,
  withConnect,
)(CMSPage);
