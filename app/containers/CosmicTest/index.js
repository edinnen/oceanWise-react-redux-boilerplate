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
import moment from 'moment';

import H1 from 'components/H1';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import injectReducer from 'utils/injectReducer';

import config from '../../cosmicConfig';
import makeSelectCosmicTest from './selectors';
import reducer from './reducer';
import { listLoaded, postLoaded } from './actions';

export class CosmicTest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      loading: false,
      data: '',
      postData: {},
    };
    this.getPages = this.getPages.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  componentWillMount() {
    const store = this.props.cosmictest; // Load the Redux reducer state into 'store'
    this.setState({ loading: true });

    if (store.timestamp < (moment().unix() - 300) || store.postList.length === 0) { // If timestamp in store is 5 minutes old or if the postList length in store is 0...
      this.getPages(); // Pull data from the server
    } else {
      this.setState({ loading: false, data: store.postList, postData: store.postData }); // Loaded data less than 5 minutes ago, so just pull from the store
    }
  }

  // Get the post data and store it in the state.
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
      this.props.dispatch(listLoaded(this.state.data));
      this.state.data.map((page) => {
        this.getPost(page.slug);
        return true;
      });
    });
  }

  getPost(slug) {
    const query = '{ object(bucket_slug: "' + config.bucket.slug + '", slug: "' + slug + '"){title, modifiedAt: modified_at, content, metadata, order} }'; // eslint-disable-line prefer-template
    axios.post('https://graphql.cosmicjs.com/v1', {
      query: query, // eslint-disable-line object-shorthand
      contentType: 'application/graphql',
    })
    .then((res) => {
      const data = this.state.postData;
      data[slug] = res.data.data.object;
      this.setState({
        postData: data,
        loading: false,
      });
      this.props.dispatch(postLoaded(slug, this.state.postData));
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
  cosmictest: PropTypes.object.isRequired,
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
