import { Delete } from "@mui/icons-material";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Button, Paper, CircularProgress} from "@mui/material";
import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { Prime } from "../../../models/prime";
import PrimeCreate from "../PrimeCreate/PrimeCreate";
import PrimeEdit from "../PrimeEdit/PrimeEdit";
import EditIcon from '@mui/icons-material/Edit';
import "./task-list.scss";

const PrimeList: React.FC = () => {
  const [primes, setPrimes] = useState<Prime[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenpop, setIsOpenpop] = useState<boolean>(false);
  const [selectedPrime, setSelectedPrime] = useState<Prime | null>(null);
  const [loading, setLoading] = useState<{[id: number]: boolean}>({});
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

const handleDelete = async (id: number) => {
  setLoading(prevLoading => ({...prevLoading, [id]: true}));
  await agent.Primes.delete(id);
  setLoading(prevLoading => ({...prevLoading, [id]: false}));
  window.location.reload();
};

  useEffect(() => {
    agent.Primes.get().then((response) => {
      setPrimes(response);
    });
  }, []);

  return (
    <>
      <h1>Primee</h1>
      <button className="card-layout__add" onClick={handleOpen}>
        + Shto prime
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Lojtaret</TableCell>
              <TableCell>Banoret</TableCell>
              <TableCell>Week</TableCell>
              <TableCell>Video URL</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              primes?.map((prime: Prime) => (
                <TableRow key={prime.id}>
                  <TableCell>{prime.id}</TableCell>
                  <TableCell>{prime.title}</TableCell>
                  <TableCell>{prime.description}</TableCell>  
                  <TableCell>{prime.lojrat}</TableCell>  
                  <TableCell>{prime.banoret}</TableCell>  
                  <TableCell>{prime.week}</TableCell>  
                  <TableCell>{prime.videoURL}</TableCell>
                  <TableCell>{prime.date}</TableCell>
                  <TableCell>
                    <Button className='ButtonAdmin' onClick={() => handleDelete(prime.id)} variant="contained" startIcon={<Delete />}  disabled={loading[prime.id]}> {loading[prime.id] ? <CircularProgress size={24} /> : 'Delete'}</Button>
                    <Button className='ButtonAdmin' onClick={() => {
                      setSelectedPrime(prime);
                      setIsOpenpop(true);
                    }} variant="contained" startIcon={<EditIcon />}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedPrime &&
        <PrimeEdit
          isOpen={isOpenpop}
          setIsOpen={setIsOpenpop}
          prime={selectedPrime}
        />
      }
      <PrimeCreate setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default PrimeList;
