import {createClient} from '@sanity/client';

const client = createClient({
    projectId: 'xjl8t3th',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-09-30',
    token: import.meta.env.VITE_SANITY_KEY,
    withCredentials: false,
    'Access-Control-Allow-Credentials' : 'false'
});

export default client;