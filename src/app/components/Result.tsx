import React from 'react';
import { ResultProps } from '../../react-app-env';
import { LoadStatus } from '../../common/enums';
import { mapEngine } from '../../common/helper';
import UnOrderdList from './List'

import './Result.css';

export const Result: React.SFC<ResultProps> = ({status, ranking}: ResultProps): JSX.Element => 
  <div className={`${status !== LoadStatus.NotLoaded? 'result': ''}`}>
    {
      status === LoadStatus.Loading &&
        <div className="sp sp-circle">
        </div>
    }
    {
      status === LoadStatus.Error &&
        <div>
          <p>Oh Snap!! Something went wrong.  Please try again.</p>
        </div>
    }
    {
      status === LoadStatus.Loaded && ranking &&
        <div>
          <p>Results for key word search: &quot;{ ranking.keyWords }&quot; using search engine { mapEngine(ranking.searchEngine) }</p>
          {
            ranking.positions.length > 0 &&
            <UnOrderdList items={ranking.positions}/>
          }
          {
            ranking.positions.length === 0 &&
            <p>Unfortunately the website did not rank with the key words.</p>
          }
          
        </div>
    }
  </div>