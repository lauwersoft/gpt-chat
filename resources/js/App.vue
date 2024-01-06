<template>
    <div class="container">
        Websocket test
    </div>
</template>

<script>
import {usersQuery} from "../gql/queries";
import {useQuery} from "@apollo/client";

export default {
    setup() {
        const {result, loading, fetchMore} = useQuery(usersQuery, {
            variables: {
                page: 1,
                limit: 10,
            }
        });

        Echo.channel('something').listen('BroadcastingEvent', (e) => {
            console.log(e);
        });


    }
}
</script>
