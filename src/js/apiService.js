import axios from 'axios';

const API_KEY = '21677950-a4a5f84606af054d030ec0d2d';
axios.defaults.baseURL = 'https://pixabay.com/api';

export default class ImgFinder {
  constructor() {
    this.api_key = API_KEY;
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPicture() {
    if (!this.searchQuery) {
      console.log('ImgFinder: searchQuery === null');
    }
    return await axios
      .get(
        `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.api_key}`,
      )
      .then(r => r.data.hits);
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(q) {
    this.searchQuery = q;
  }
}
