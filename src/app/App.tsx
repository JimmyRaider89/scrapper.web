/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './App.css';
import api from '../common/api'
import { Result, Search } from './components'
import { SearchCriteria, ResultProps } from '../react-app-env';
import { LoadStatus } from '../common/enums';

export default class App extends React.Component<any, ResultProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      status: LoadStatus.NotLoaded,
      ranking: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(criteria: SearchCriteria): Promise<void> {
    try{
      this.setState({status: LoadStatus.Loading});
      const result = await api.search(criteria)
      if(result.status === 200){
        this.setState({status: LoadStatus.Loaded, ranking: result.data});
      }
      else{
        this.setState({status: LoadStatus.Error});
      }
    }
    catch(err){
      this.setState({status: LoadStatus.Error});
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div className="App-container">
          <p>Search</p>
          <Search Search={this.handleSubmit} />
          <Result status={this.state.status } ranking={this.state.ranking} />
        </div>
      </div>
    );
  }
}
