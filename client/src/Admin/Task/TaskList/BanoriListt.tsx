import React, { useState, useEffect } from "react";
import agent from "../../../API/agent";
import { Banori, BanoriParams } from "../../../models/banori";
import { banoriSelectors, fetchBanoretAsync } from "../../../Pages/Catalog/CatalogSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hook";
import CreateBanori from "../CreateTask/CreateBanori";
import BanoriCardd from "../TaskCard/BanoriCardd";
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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Relationship</th>
            <th>Age</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Profession</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {React.Children.toArray(
            banoret?.map((banori) => (
              <tr key={banori.id}>
                <td>{banori.id}</td>
                <td>{banori.RelationshipStatus}</td>
                <td>{banori.age}</td>
                <td>{banori.name}</td>
                <td>
                  <img src={banori.pictureUrl} alt={banori.name} height="50" />
                </td>
                <td>{banori.price}</td>
                <td>{banori.profesioni}</td>
                <td>
                  <button onClick={() => handleDelete(banori.id)}>Delete</button>
                  <button onClick={() => {
                    setSelectedBanori(banori);
                    setIsOpenpop(true);
                  }}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* <BanoriPopup
        isOpen={isOpenpop}
        setIsOpen={setIsOpenpop}
        banori={selectedBanori}
      /> */}
      <CreateBanori setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};

export default BanoriListt;
