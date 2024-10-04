import {createClient} from '@sanity/client';

const client = createClient({
    projectId: 'xjl8t3th',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-09-30',
    token: 'skEpf9hxpWLcjbKrvyZ7gum9G93e5Mxp33gXAHiABZqp3E0yISI6WOhC54FSOFzVH7VbDnOa5fKDLLk9ySiTCapcXyu5OQkdz4a8CR3o9h7Rj4w8uKTPG0stXhkerYYkmj8JrwRTaOGmetU7oz8d8YWssFtPo9K3o552pkAK5VzpZBbmNb9a',
    withCredentials: false,
    'Access-Control-Allow-Credentials' : 'false'
});

export default client;