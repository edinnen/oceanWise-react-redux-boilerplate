/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RadioGroup, Radio } from 'react-radio-group';
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import Header from 'components/Header';
import H2 from 'components/H2';
import P from 'components/P';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import Wrapper from './Wrapper';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      radioValue: 'apple',
      checkValue: ['apple'],
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.getRadioState = this.getRadioState.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  getRadioState() {
    const { radioValue } = this.state;
    return radioValue;
  }

  handleRadioChange(value) {
    this.setState({ radioValue: value });
  }

  handleCheckChange(value) {
    this.setState({ checkValue: value });
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    const style = {
      marginLeft: '10px',
    };

    return (
      <article>
        <Header />
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <Wrapper>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <P>
              <FormattedMessage {...messages.startProjectMessage} />
            </P>
            <RadioGroup
              name="fruit"
              selectedValue={this.state.selectedValue}
              onChange={this.handleRadioChange}
            >
              <label htmlFor="apple" style={style}>
                <Radio value="apple" /> Apple
              </label>
              <label htmlFor="orange" style={style}>
                <Radio value="orange" /> Orange
              </label>
              <label htmlFor="watermelon" style={style}>
                <Radio value="watermelon" /> Watermelon
              </label>
            </RadioGroup>
            <CheckboxGroup
              checkboxDepth={2} // This is needed to optimize the checkbox group
              name="fruits"
              value={this.state.checkValue}
              onChange={this.handleCheckChange}
            >
              <label htmlFor="apple" style={style}>
                <Checkbox value="apple" /> Apple
              </label>
              <label htmlFor="orange" style={style}>
                <Checkbox value="orange" /> Orange
              </label>
              <label htmlFor="watermelon" style={style}>
                <Checkbox value="watermelon" /> Watermelon
              </label>
            </CheckboxGroup>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            <ReposList {...reposListProps} />
          </Section>
        </Wrapper>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
