/**
*
* Post
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import H1 from 'components/H1';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import config from '../../cosmicConfig';


class Post extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      loading: false,
      passed: props.match.params,
      data: '',
    };
  }


  componentWillMount() {
    this.setState({ loading: true });
    this.getData();
  }

  getData() {
    // Get all the neccessary data from objects with the slug passed from the route variable
    const query = '{ object(bucket_slug: "' + config.bucket.slug + '", slug: "' + this.state.passed.postSlug + '"){title, modifiedAt: modified_at, content, metadata, order} }'; // eslint-disable-line prefer-template
    axios.post('https://graphql.cosmicjs.com/v1', {
      query: query, // eslint-disable-line object-shorthand
      contentType: 'application/graphql',
    })
    .then((res) => {
      this.setState({
        data: res.data.data.object,
        loading: false,
      });
    });
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
  match: PropTypes.object,
};

export default Post;
