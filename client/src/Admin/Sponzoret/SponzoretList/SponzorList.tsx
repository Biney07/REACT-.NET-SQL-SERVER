import { Delete } from "@mui/icons-material";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Button, Paper, CircularProgress} from "@mui/material";
import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { Sponzor } from "../../../models/sponzor";
import CreateSponzor from "../SponzoretCreate/CreateSponzor";
import SponzorEdit from "../SponzoretEdit/SponzorEdit";
import "./task-list.scss";

const SponzorList: React.FC = () => {
  const [sponzors, setSponzors] = useState<Sponzor[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenpop, setIsOpenpop] = useState<boolean>(false);
  const [selectedSponzor, setSelectedSponzor] = useState<Sponzor | null>(null);
  const [loading, setLoading] = useState<{[id: number]: boolean}>({});


  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    setLoading(prevLoading => ({...prevLoading, [id]: true}));
    await agent.Banoret.delete(id);
    setLoading(prevLoading => ({...prevLoading, [id]: false}));
    window.location.reload();
    };

  useEffect(() => {
    agent.Sponzors.get().then((response) => {
      setSponzors(response);
    });
  }, []);

  return (
    <>
      <h1>Sponsors</h1>
      <button className="card-layout__add" onClick={handleOpen}>
        + Add Sponsor
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              sponzors?.map((sponzor) => (
                <TableRow key={sponzor.id}>
                  <TableCell>{sponzor.id}</TableCell>
                  <TableCell>{sponzor.name}</TableCell>
                  <TableCell>{sponzor.email}</TableCell>
                  <TableCell>{sponzor.startDate}</TableCell>
                  <TableCell>{sponzor.endDate}</TableCell>
                  <TableCell>{sponzor.notes}</TableCell>
                  <TableCell>
                    <img src={sponzor.pictureUrl} alt={sponzor.name} height="50" />
                  </TableCell>
                  <TableCell>
                  <Button className='ButtonAdmin' onClick={() => handleDelete(sponzor.id)} variant="contained" startIcon={<Delete />}  disabled={loading[sponzor.id]}>  {loading[sponzor.id] ? <CircularProgress size={24} /> : 'Delete'}</Button>
                    <Button className='ButtonAdmin' onClick={() => {
                      setSelectedSponzor(sponzor);
                      setIsOpenpop(true);
                    }} variant="contained">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedSponzor &&
      
      <SponzorEdit
        isOpen={isOpenpop}
        setIsOpen={setIsOpenpop}
        sponzor={selectedSponzor}
      />
      }
     
      <CreateSponzor setIsOpen={setIsOpen} isOpen={isOpen} /> 
    </>
  );
};

export default SponzorList;
