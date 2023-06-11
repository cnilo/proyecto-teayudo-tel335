import React, { useState, useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
} from '@windmill/react-ui'

import response from '../utils/demo/tableData'
import data from '../backend/db.json'
import Cookies from 'universal-cookie'
const cookies = new Cookies();
let dataFuncional = data.usuarios;
// make a copy of the data, for the second table


function Patients() {
  /**
   * DISCLAIMER: This code could be badly improved, but for the sake of the example
   * and readability, all the logic for both table are here.
   * You would be better served by dividing each table in its own
   * component, like Table(?) and TableWithActions(?) hiding the
   * presentation details away from the page view.
   */

  // setup pages control for every table
  const [pageTable1, setPageTable1] = useState(1)

  // setup data for every table
  const [dataTable1, setDataTable1] = useState([])


  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChangeTable1(p) {
    setPageTable1(p)
  }

  // pagination change control


  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable1(dataFuncional.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  // on page change, load new sliced data
  // here you would make another server request for new data

  const rol = cookies.get('rol');
  console.log(rol);
  if (rol === 'afi' || rol === 'nutricionista' || rol === 'nutricoach') {
    return (
      <>
        <PageTitle>Usuarios</PageTitle>

        <div class></div>

        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Paciente</TableCell>
                <TableCell>Email Paciente</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Rol</TableCell>

              </tr>
            </TableHeader>
            <TableBody>
              {dataTable1.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{user.nombre}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.apellido}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.email}>{user.email}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.telefono}>{user.telefono}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge  type={user.rol}>{user.rol.toUpperCase()}</Badge>
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
    );
  }

  else if (rol === 'okylife' || rol === 'admin') {
    return (
      <>
        <PageTitle>Usuarios</PageTitle>
        <div class="flex flex-row-reverse py-4 ">
          
            <Button  tag={Link} to="/app/addpatient" > 
              Añadir paciente
            </Button>
          <div class='mr-3'>
          <Button tag={Link} to="/app/deletepatient">
              Eliminar paciente
            </Button>
            </div>
        </div>
        <div class></div>

        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Paciente</TableCell>
                <TableCell>Email Paciente</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Rol</TableCell>

              </tr>
            </TableHeader>
            <TableBody>
              {dataTable1.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{user.nombre}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{user.apellido}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.email}>{user.email}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.telefono}>{user.telefono}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge type={user.rol}>{user.rol}</Badge>
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
}



export default Patients