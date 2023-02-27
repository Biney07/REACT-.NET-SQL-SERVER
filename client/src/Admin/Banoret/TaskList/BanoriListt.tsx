import { ArrowDropDownCircleOutlined, Delete } from "@mui/icons-material";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Button, Paper, CircularProgress} from "@mui/material";
import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { Banori, BanoriParams } from "../../../models/banori";
import { banoriSelectors, fetchBanoretAsync } from "../../../Pages/Catalog/CatalogSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hook";
import CreateBanori from "../CreateTask/CreateBanori";
import BanoriPopup from "../ViewTask/BanoriPopup";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import "./task-list.scss";

const BanoriListt: React.FC = () => {
  const banoret = useAppSelector(banoriSelectors.selectAll);
  const { banoretLoaded} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  const [banoriat, setBanoriat] = useState<Banori[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenpop, setIsOpenpop] = useState<boolean>(false);
  const [selectedBanori, setSelectedBanori] = useState<Banori | null>(null);
  const [loading, setLoading] = useState<{[id: number]: boolean}>({});
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc">("name-asc");
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

useEffect(() => {
  if (!banoretLoaded) {
    dispatch(fetchBanoretAsync());
  } else {
    // set banoriat state with the data fetched from the API
    setBanoriat(banoret);
  }
}, [banoretLoaded, dispatch, banoret]);

 const handleDelete = async (id: number) => {
  setLoading(prevLoading => ({...prevLoading, [id]: true}));
  await agent.Banoret.delete(id);
  setLoading(prevLoading => ({...prevLoading, [id]: false}));
  window.location.reload();
};

const sortByName = () => {
  if (sortBy === "name-asc") {
    setBanoriat([...banoret].sort((a, b) => b.name.localeCompare(a.name)));
    setSortBy("name-desc");
  } else {
    setBanoriat([...banoret].sort((a, b) => a.name.localeCompare(b.name)));
    setSortBy("name-asc");
  }
};


  return (
    <>
      <h1>Banorët</h1>
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
              <TableCell onClick={sortByName}>
                <Button color="inherit">Name</Button>
                {sortBy === "name-asc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Profession</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(             
              banoriat?.map((banori) => (
                <TableRow key={banori.id}>
                  <TableCell>{banori.id}</TableCell>
                  <TableCell> {banori.relationshipStatus ? "I Martuar" : "Single"}</TableCell>
                  <TableCell>{banori.age}</TableCell>
                  <TableCell>{banori.name}</TableCell>
                  <TableCell>
                    <img src={banori.pictureUrl} alt={banori.name} height="50" />
                  </TableCell>
                  <TableCell>{banori.price}</TableCell>
                  <TableCell>{banori.profesioni}</TableCell>
                  <TableCell>
                    <Button className='ButtonAdmin' onClick={() => handleDelete(banori.id)} variant="contained" startIcon={<Delete />}  disabled={loading[banori.id]}>  {loading[banori.id] ? <CircularProgress size={24} /> : 'Delete'}</Button>
                    <Button className='ButtonAdmin' onClick={() => {
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
