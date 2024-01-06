import gql from 'graphql-tag'

const usersQuery = gql`
    query Users {
        users {
            data {
                id
                name
                email
            }
        }
    }`

export {
    usersQuery,
}
