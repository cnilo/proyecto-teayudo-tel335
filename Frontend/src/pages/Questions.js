import React, { useState, useEffect } from 'react';
import PageTitle from '../components/Typography/PageTitle';
import { Link } from 'react-router-dom';
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
} from '@windmill/react-ui';

import axios from 'axios';


function Questions() {
  const [pageTable1, setPageTable1] = useState(1);
  const [dataTable1, setDataTable1] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/questions`); // Cambia la URL según tu backend
        const questions = response.data;
        setDataTable1(questions);
        setTotalResults(questions.length);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };

    fetchData();
  }, []);

  function onPageChangeTable1(p) {
    setPageTable1(p);
  }

  return (
    <>
      <PageTitle>Preguntas</PageTitle>
      <div className="flex flex-row-reverse py-4 m-px">
        <div>
          <Button tag={Link} to="/app/addquestion">
            Añadir pregunta
          </Button>
        </div>
        
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Paciente</TableCell>
              <TableCell>Pregunta</TableCell>
              <TableCell></TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable1
              .slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage)
              .map((question, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{question.userName}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{question.questionText}</span>
                  </TableCell>
                  <TableCell>
                    <Button tag={Link} to={`/app/questions/${question._id}`}>Ver</Button>
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

export default Questions;
