import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {createApp, h, provide} from 'vue';
import App from "./App.vue";
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { ApolloClients } from '@vue/apollo-composable'
import { createApolloProvider } from '@vue/apollo-option'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Pusher = Pusher;
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
    // wsHost: import.meta.env.VITE_PUSHER_HOST,
    wsHost: 'localhost',
    wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
    wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
});

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: import.meta.env.VITE_GRAPHQL_URL,
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp({
    setup () {
        provide(ApolloClients, {
            default: apolloClient,
        })
    },
    render: () => h(App),
});

app.use(vuetify)
app.mount('#app');
app.use(apolloProvider)

