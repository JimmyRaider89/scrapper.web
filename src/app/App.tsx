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
      ranking: null,
      errors: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(criteria: SearchCriteria): Promise<void> {
    try{
      this.setState({status: LoadStatus.Loading});
      const result = await api.search(criteria);
      this.setState({status: LoadStatus.Loaded, ranking: result.data});
    }
    catch(err){
      const response = err.response;

      if(response && response.status === 400)
      {
        const errors = [] as string[];
        Object.keys(response.data.errors).forEach(x => {
          errors.push(...response.data.errors[x]);
        })

        this.setState({status: LoadStatus.BadRequest, errors});
      }
      else{
        this.setState({status: LoadStatus.Error});
      }
    }
  }

  render(): JSX.Element {
    return (
      <div className="App">
        <div className="App-container">
          <p>Search</p>
          <Search Search={this.handleSubmit} />
          <Result status={this.state.status } ranking={this.state.ranking} errors={this.state.errors} />
        </div>
      </div>
    );
  }
}
