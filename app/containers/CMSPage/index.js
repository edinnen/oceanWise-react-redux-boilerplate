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
import axios from 'axios';
import moment from 'moment';

import Header from 'components/Header';
import injectReducer from 'utils/injectReducer';
import config from '../../cosmicConfig';
import reducer from './reducer';
import { pageLoaded, listLoaded } from './actions';
import makeSelectCMSPage, { makeSelectLocale } from './selectors';

export class CMSPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      loading: true,
      pageData: {},
      slug: '',
      pageList: [],
    };
    this.getPage = this.getPage.bind(this);
    this.getPageList = this.getPageList.bind(this);
  }

  componentWillMount() {
    const store = this.props.cmspage;

    if (store.timestamp < (moment().unix() - 300) || store.pageList.length === 0 || store.localeChange) {
      this.getPageList();
    } else {
      this.setState({ pageList: store.pageList });
    }
    this.getPage(this.props.match.params.pageSlug);
    this.setState({ slug: this.props.match.params.pageSlug });
  }

  /**
   * Gets a list of all the pages from CosmicJS, store it to state, and dispatch LIST_LOADED
   *
   */
  getPageList() {
    // Get objects of type 'Page'. From these pull the slug and title
    axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object-type/pages?locale=' + this.props.locale) // eslint-disable-line
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
        pageList: uniqueData,
      });
      this.props.dispatch(listLoaded(this.state.pageList));
    })
    // Load English list if selected locale is not found
    .catch(() => {
      axios.get('https://api.cosmicjs.com/v1/' + config.bucket.slug + '/object-type/pages?locale=en') // eslint-disable-line
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
          pageList: uniqueData,
        });
        this.props.dispatch(listLoaded(this.state.pageList));
      });
    });
  }


  /**
   * Gets the page of the passed slug, store it to state, and dispatch PAGE_LOADED
   *
   * @param  {string} slug The slug of the page to pull
   *
   */
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

    // If the slug in the state is not the same as the slug passed to the route...
    // This ensures that pageData is refreshed when route is changed
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
  cmspage: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cmspage: makeSelectCMSPage(),
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
