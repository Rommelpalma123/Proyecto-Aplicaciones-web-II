import axios from 'axios';

const instance = axios.create({

    baseUrl: 'http://localhost:9000/api/chat',
})

export default instance;