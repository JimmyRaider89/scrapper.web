import axios from 'axios'
import { SearchCriteria } from '../react-app-env';

const instance = axios.create({
  baseURL: 'http://localhost:32768',
  headers: {
    contentType: 'application/json',
  }
});

export default { 
  search:  async (criteria: SearchCriteria): Promise<any> =>
    await instance({
      'method': 'POST',
      'url':'/ranking',
      'data': criteria
    })
}
