/**
 *
 * Post
 *
 * Due to the way that we have set up the selector.js file in this container we are able to access the state of the parent container (in this case cosmicTest) via the props! Neat-o!
 * This makes it easy to save on having to pull data from the CMS more than necessary.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import H1 from 'components/H1';
import Button from 'components/Button';
import R from 'ramda';
import axios from 'axios';

import config from '../../cosmicConfig';
import makeSelectLocale from './selectors';
import { postLoaded } from './actions';

export class Post extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      loading: true,
      postData: {},
      slug: '',
    };
    this.getPost = this.getPost.bind(this);
  }


  componentWillMount() {
    this.getPost(this.props.match.params.postSlug);
  }

  /**
   * Gets the posts of the passed slug, store it to state, and dispatch POST_LOADED
   *
   * @param  {string} slug The slug of the post to pull
   *
   */
  getPost(slug) {
    // As CosmicJS's GraphQL implementation has no locale selector, here we use the REST API instead.
    axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object/' + slug + '?locale=' + this.props.locale) // eslint-disable-line prefer-template
    .then((res) => {
      const data = this.state.postData;
      data[slug] = res.data.object;
      this.setState({
        postData: data,
        loading: false,
      });
      this.props.dispatch(postLoaded(slug, this.state.postData));
    })
    // Catch if the post above is not found in the selected language, default to English instead
    .catch(() => {
      axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object/' + slug + '?locale=en') // eslint-disable-line prefer-template
      .then((res) => {
        const data = this.state.postData;
        data[slug] = res.data.object;
        this.setState({
          postData: data,
          loading: false,
        });
        this.props.dispatch(postLoaded(slug, this.state.postData));
      });
    });
  }

  render() {
    let { postData } = this.state;
    postData = R.path([this.props.match.params.postSlug], postData);
    const box = {
      main: {
        padding: '15px',
      },
      img: {
        maxWidth: '90vw',
        maxHeight: 'auto',
      },
    };

    if (this.state.loading) {
      return <H1>Loading...</H1>;
    }

    return (
      <div style={box.main}>
        <Link to="/cosmic">
          <Button id="returnButton">
            Go Back
          </Button>
        </Link>
        {/* Render all the post data! */}
        <H1>{postData.title}</H1>
        <span>Author: {postData.metadata.author.title}</span><br /><br />
        <img style={box.img} alt="Hero" src={postData.metadata.hero.imgix_url} />
        <div
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: postData.content,
          }}
        />
      </div>
    );
  }

}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  // post: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // post: makeSelectPost(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Post);
