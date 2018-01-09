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
import makeSelectCosmicTest, { makeSelectLocale } from './selectors';
import reducer from './reducer';
import { listLoaded } from './actions';

export class CosmicTest extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      loading: false,
      data: '',
    };
    this.getPosts = this.getPosts.bind(this);
  }

  componentWillMount() {
    const store = this.props.cosmictest; // Load the Redux reducer state into 'store'
    this.setState({ loading: true });

    if (store.timestamp < (moment().unix() - 300) || store.postList.length === 0 || store.localeChange) { // If timestamp in store is 5 minutes old or if the postList length in store is 0...
      this.getPosts(); // Pull data from the server
    } else {
      this.setState({ loading: false, data: store.postList, postData: store.postData }); // Loaded data less than 5 minutes ago, so just pull from the store
    }
  }

  /**
   * Gets the post of the passed slug, store it to state, and dispatch POST_LOADED
   *
   * @param  {string} slug The slug of the post to pull
   *
   */
  getPosts() {
    // Get objects of type 'posts'. From these pull the slug and title

    axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object-type/posts?locale=' + this.props.locale) // eslint-disable-line prefer-template
    .then((res) => {
      const uniqueData = [];
      res.data.objects.map((item) => {
        const found = uniqueData.some((data) => { // eslint-disable-line
          return data.slug === item.slug;
        });
        if (!found) { uniqueData.push(item); }
        return true;
      });
      this.setState({
        data: uniqueData,
        loading: false,
      });
      this.props.dispatch(listLoaded(this.state.data));
    })
    // Default to the English version if the current locale does not exist for this object type
    .catch(() => {
      axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object-type/posts?locale=en') // eslint-disable-line prefer-template
      .then((res) => {
        const uniqueData = [];
        res.data.objects.map((item) => {
          const found = uniqueData.some((data) => { // eslint-disable-line
            return data.slug === item.slug;
          });
          if (!found) { uniqueData.push(item); }
          return true;
        });
        this.setState({
          data: uniqueData,
          loading: false,
        });
        this.props.dispatch(listLoaded(this.state.data));
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
  cosmictest: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cosmictest: makeSelectCosmicTest(),
  locale: makeSelectLocale(),
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