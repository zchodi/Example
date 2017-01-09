/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import Input from './Input';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import ContListItem from 'containers/RepoListItem/ContListItem';

import { loadConts } from '../App/actions';
import { changeContent } from './action';
import { selectContent } from './selector';
import {  _selectConts , _selectLoading, _selectError } from 'containers/App/selectors';

export class NewsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() 
  {   
    if ( false )
    {
      //this.props.onSubmitFormContent();
    }
  }

  render() {
    let mainContent_Content = null;
    // Show a loading indicator when we're loading
    // if ( this.props._loading) 
    // {
    //   mainContent_Content = (<List component={LoadingIndicator} />);

    // // Show an error if there is one
    // } 
    // else if ( this.props._error) 
    // {
    //   const ErrorComponent = () => (
    //     <ListItem item={'Something went wrong, please try again!'} />
    //   );
    //   mainContent_Content = (<List component={ErrorComponent} />);

    // // If we're not loading, don't have an error and there are repos, show the repos
    // } 
    // else if ( this.props.conts !== false ) 
    // {
    //   mainContent_Content = (<List items={this.props.conts} component={ContListItem} />);
    // }

    return (
      <article>
        <div>
            <form >
              <label htmlFor="content">
                <Input
                  id="content"
                  type="text"
                  placeholder="mxstbr"
                  onChange={e=> console.log(e.target.value)}
                />
              </label>
            </form>
            {mainContent_Content}
        </div>
      </article>
    );
  }
}

NewsPage.propTypes = {
  _loading: React.PropTypes.bool,
  _error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  conts: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  content: React.PropTypes.string,
  onChangeContent: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeContent: (evt) => dispatch(changeContent(evt.target.value)),
    onSubmitFormContent: (evt) => 
    {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadConts());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  conts: _selectConts(),
  content: selectContent(),
  _loading: _selectLoading(),
  _error: _selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
