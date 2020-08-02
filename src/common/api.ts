import axios from 'axios'
import { SearchCriteria } from '../react-app-env';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    contentType: 'application/json',
  }
});

export default { 
  search:  async (criteria: SearchCriteria): Promise<any> =>
    await instance.post('/ranking', criteria)
}
