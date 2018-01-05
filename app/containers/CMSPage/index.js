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
import R from 'ramda';

import Header from 'components/Header';
import injectReducer from 'utils/injectReducer';
import makeSelectCMSPage from './selectors';
import { makeSelectHomePage } from '../HomePage/selectors'; // Load in the homepage selector so we can access its state
import reducer from './reducer';

export class CMSPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const page = R.path(['homepage', 'pageData', this.props.match.params.pageSlug], this.props); // Load in the object we want into the 'page' constant

    return (
      <div>
        <Helmet>
          <title>{page.title}</title>
          <meta name="description" content="Description of CMS Page" />
        </Helmet>
        <Header />
        <div
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: page.content,
          }}
        />
      </div>
    );
  }
}

CMSPage.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cmspage: makeSelectCMSPage(),
  homepage: makeSelectHomePage(), // Load the homepage's state to our props so we can access what we want
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
