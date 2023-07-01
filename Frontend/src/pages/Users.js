import React, { useState, useEffect } from 'react'
import axios from 'axios'

import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Avatar,
  Pagination,
} from '@windmill/react-ui'


function Users() {
  const [pageTable1, setPageTable1] = useState(1)
  const [dataTable1, setDataTable1] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const resultsPerPage = 10

  useEffect(() => {
    // Function to fetch users data from the server
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`)
        const users = response.data
        setTotalResults(users.length)
        setDataTable1(users.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
      } catch (error) {
        console.error('Error fetching users data:', error)
      }
    }

    fetchUsersData()
  }, [pageTable1])

  const onPageChangeTable1 = (p) => {
    setPageTable1(p)
  }

  return (
    <>
      <PageTitle>Usuarios</PageTitle>

      <SectionTitle></SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Usuario</TableCell>
              <TableCell>Rol</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable1.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.nombre}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.rol}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Users
