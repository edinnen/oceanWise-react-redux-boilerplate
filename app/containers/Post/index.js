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

import makeSelectPost from './selectors';

export class Post extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      loading: true,
      data: {},
    };
  }


  componentWillMount() {
    // Say that we are done loading, set our data to the postData object with the key that matches our slug
    // Here we use ramda's path command to get the data stored within props.post.postData where the key is equal to props.match.params.postSlug
    this.setState({ loading: false, data: R.path([this.props.match.params.postSlug], this.props.post.postData) });
  }

  render() {
    const { data } = this.state;

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
        <H1>{data.title}</H1>
        <span>Author: {data.metadata.author.title}</span><br /><br />
        <img style={box.img} alt="Hero" src={data.metadata.hero.imgix_url} />
        <div
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: data.content,
          }}
        />
      </div>
    );
  }

}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  post: makeSelectPost(),
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
