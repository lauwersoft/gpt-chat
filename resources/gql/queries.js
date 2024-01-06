import gql from 'graphql-tag'

const usersQuery = gql`
    query Users {
        users {
            id
        }
    }`

export {
    usersQuery,
}
