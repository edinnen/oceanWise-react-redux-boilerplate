/**
 *
 * CosmicTest
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';

import H1 from 'components/H1';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import injectReducer from 'utils/injectReducer';

import config from '../../cosmicConfig';
import makeSelectCosmicTest from './selectors';
import reducer from './reducer';

export class CosmicTest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      loading: false,
      data: '',
    };
    this.getPages = this.getPages.bind(this);
  }


  // Set to loading then load the posts
  componentWillMount() {
    this.setState({ loading: true });
    this.getPages();
  }

  // Get the post data and store it in the state. TODO: Store this within redux!
  getPages() {
    // Get objects of type 'Post'. From these pull the slug and title
    const query = '{ objectsByType(bucket_slug: "' + config.bucket.slug + '", type_slug: "posts"){slug, title} }'; // eslint-disable-line prefer-template
    axios.post('https://graphql.cosmicjs.com/v1', {
      query: query, // eslint-disable-line object-shorthand
      contentType: 'application/graphql',
    })
    .then((res) => {
      this.setState({
        data: res.data.data.objectsByType,
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <H1>Loading...</H1>;
    }

    // Create buttons for each post
    const posts = this.state.data.map((page) => {
      const url = '/post/' + page.slug; // eslint-disable-line prefer-template
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
        <Helmet>
          <title>CosmicTest</title>
          <meta name="description" content="Description of CosmicTest" />
        </Helmet>
        <div>
          <Link to="/">
            <Button id="returnHome">
              Go Back
            </Button>
          </Link>
          <H1>Posts: </H1>
          <div>
            {posts}
          </div>
        </div>
      </div>
    );
  }
}

CosmicTest.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cosmictest: makeSelectCosmicTest(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cosmicTest', reducer });

export default compose(
  withReducer,
  withConnect,
)(CosmicTest);
