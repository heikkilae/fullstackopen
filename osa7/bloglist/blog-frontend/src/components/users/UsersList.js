import React from 'react'
import { Link } from 'react-router-dom'
import {
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const UserTable = ({ users, style }) => {
  return (
    <VStack {...style}>
      <Heading as='h3' size='lg'>Users</Heading>
      {users && users.length > 0 ?
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>user</Th>
              <Th>blogs created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user =>
              <Tr key={user.id}>
                <Td>
                  <Link to={`/users/${user.id}`} > {user.name}</Link>
                </Td>
                <Td>{user.blogs.length}</Td>
              </Tr>)}
          </Tbody>
        </Table>
        : null}
    </VStack>
  )
}

export default UserTable
