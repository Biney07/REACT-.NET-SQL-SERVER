import { Delete } from "@mui/icons-material";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Button, Paper} from "@mui/material";
import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { Banori, BanoriParams } from "../../../models/banori";
import { banoriSelectors, fetchBanoretAsync } from "../../../Pages/Catalog/CatalogSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hook";
import CreateBanori from "../CreateTask/CreateBanori";
import BanoriPopup from "../ViewTask/BanoriPopup";
import "./task-list.scss";

const BanoriListt: React.FC = () => {
  const banoret = useAppSelector(banoriSelectors.selectAll);
  const { banoretLoaded} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  const [banoriat, setBanoriat] = useState();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenpop, setIsOpenpop] = useState<boolean>(false);
  const [selectedBanori, setSelectedBanori] = useState<Banori | null>(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!banoretLoaded) dispatch(fetchBanoretAsync());
}, [banoretLoaded, dispatch])

  const handleDelete = (id: number) => {
    agent.Banoret.delete(id)
    };


  // useEffect(() => {
  //   agent.Banoret.get().then((response) => {
  //     setBanoriat(response);
  //   });
  // }, []);

  return (
    <>
      <h1>Banoriat</h1>
      <button className="card-layout__add" onClick={handleOpen}>
        + Shto banori
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Relationship</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Profession</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              banoret?.map((banori) => (
                <TableRow key={banori.id}>
                  <TableCell>{banori.id}</TableCell>
                  <TableCell>{banori.RelationshipStatus}</TableCell>
                  <TableCell>{banori.age}</TableCell>
                  <TableCell>{banori.name}</TableCell>
                  <TableCell>
                    <img src={banori.pictureUrl} alt={banori.name} height="50" />
                  </TableCell>
                  <TableCell>{banori.price}</TableCell>
                  <TableCell>{banori.profesioni}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(banori.id)} variant="contained" startIcon={<Delete />}>Delete</Button>
                    <Button onClick={() => {
                      setSelectedBanori(banori);
                      setIsOpenpop(true);
                    }} variant="contained">Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedBanori &&
      
      <BanoriPopup
        isOpen={isOpenpop}
        setIsOpen={setIsOpenpop}
        banori={selectedBanori}
      />
      }
      <CreateBanori setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default BanoriListt;
