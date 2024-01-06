<template>
    <v-container>
        <ul v-if="!loading && result.users">
            <li v-for="user in result.users.data" :key="user.id">
                <div>{{ user.id }} - {{ user.name }} - {{ user.email }}</div>
            </li>
        </ul>
    </v-container>
</template>

<script>
import {usersQuery} from "../gql/queries";
import {useQuery} from "@vue/apollo-composable";

export default {
    setup() {
        const {result, loading, fetchMore} = useQuery(usersQuery);

        Echo.channel('something').listen('BroadcastingEvent', (e) => {
            console.log(e);
        });

        return {
            result,
            loading,
            fetchMore,
        }
    }
}
</script>
