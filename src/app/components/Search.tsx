import React , {Component }from 'react';
import './Search.css';
import { SearchProps , SearchCriteria} from '../../react-app-env';

export class Search extends Component<SearchProps, SearchCriteria> {
  constructor(props: SearchProps) {
    super(props); 
    this.state = { keywords: 'online title search', engine: 1 };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleKeyWordChange = this.handleKeyWordChange.bind(this);
  }

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.props.Search(this.state);
  };

  handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({engine : parseInt(e.target.value)});
  }

  handleKeyWordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({keywords: e.target.value});
  }

  render(): JSX.Element { 
    return (
      <div className="Search-bar">
        <form onSubmit={this.handleSubmit}>
          <input name="keywords" value={this.state.keywords} type="text" onChange={this.handleKeyWordChange} maxLength={200} />
          <select name="engine" onChange={this.handleSelectChange} defaultValue={this.state.engine}>
            <option value="1">Google</option>
            <option value="2">Bing</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
