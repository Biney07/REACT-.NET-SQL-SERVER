import { Delete } from "@mui/icons-material";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Button, Paper, CircularProgress} from "@mui/material";
import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { Moment } from "../../../models/moment";
import MomentCreate from "../MomentCreate/MomentCreate";
import MomentEdit from "../MomentEdit/MomentEdit";
import EditIcon from '@mui/icons-material/Edit';
import "./task-list.scss";

const MomentList: React.FC = () => {
  const [moments, setMoments] = useState<Moment[] | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenpop, setIsOpenpop] = useState<boolean>(false);
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [loading, setLoading] = useState<{[id: number]: boolean}>({});
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

const handleDelete = async (id: number) => {
  setLoading(prevLoading => ({...prevLoading, [id]: true}));
  await agent.Moments.delete(id);
  setLoading(prevLoading => ({...prevLoading, [id]: false}));
  window.location.reload();
};

  useEffect(() => {
    agent.Moments.get().then((response) => {
      setMoments(response);
    });
  }, []);

  return (
    <>
      <h1>Momente</h1>
      <button className="card-layout__add" onClick={handleOpen}>
        + Shto moment
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Video URL</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              moments?.map((moment: Moment) => (
                <TableRow key={moment.id}>
                  <TableCell>{moment.id}</TableCell>
                  <TableCell>{moment.title}</TableCell>
                  <TableCell>{moment.description}</TableCell>  
                  <TableCell>{moment.videoURL}</TableCell>
                  <TableCell>{moment.date}</TableCell>
                  <TableCell>
                    <Button className='ButtonAdmin' onClick={() => handleDelete(moment.id)} variant="contained" startIcon={<Delete />}  disabled={loading[moment.id]}> {loading[moment.id] ? <CircularProgress size={24} /> : 'Delete'}</Button>
                    <Button className='ButtonAdmin' onClick={() => {
                      setSelectedMoment(moment);
                      setIsOpenpop(true);
                    }} variant="contained" startIcon={<EditIcon />}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedMoment &&
        <MomentEdit
          isOpen={isOpenpop}
          setIsOpen={setIsOpenpop}
          moment={selectedMoment}
        />
      }
      <MomentCreate setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default MomentList;
