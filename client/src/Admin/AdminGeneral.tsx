import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hook';
import { banoriSelectors, fetchBanoretAsync, addSelectedBanori, removeSelectedBanori, updateBanoretArray } from '../Pages/Catalog/CatalogSlice';
import LoadingComponent from '../Components/LoadingComponent';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';

function AdminGeneral() {
  const dispatch = useAppDispatch();
  const banoret = useAppSelector(banoriSelectors.selectAll);
  const banoretFiltered = banoret.filter((Banor) => Banor.eleminuar === false);
  const selectedBanoret = useAppSelector(state => state.catalog.selectedBanoret);
  const [checkedItems, setCheckedItems] = useState(new Set(selectedBanoret.map(banori => banori.id)));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchBanoretAsync());
  }, [dispatch]);

const handleCheckboxChange = (id: number, event: any) => {
  const isChecked = event.target.checked;
  const banoriIndex = banoret.findIndex(banori => banori.id === id);
  if (isChecked) {
    dispatch(addSelectedBanori(banoret[banoriIndex]));
    setCheckedItems(checkedItems.add(id));
  } else {
    dispatch(removeSelectedBanori({ id }));
    checkedItems.delete(id);
    setCheckedItems(new Set(checkedItems));
  }
};


const updateBanor = async (ii: number) => {
  try {
   
    const response = await axios.put(
      `https://localhost:7226/api/Banoret/api/banori/nominated/`,
      { id: ii, nominated: true },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};


const handleSaveClick = async () => {
  try {
    setIsLoading(true);
    for (const Banor of banoret) {
      if (Banor.eleminuar == false) {
        await axios.put(
          `https://localhost:7226/api/Banoret/api/banori/nominated/`,
          { id: Banor.id, nominated: false },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }
    }
    
    // Loop through the selected banoris and call the updateBanor function for each of them
    for (const banori of selectedBanoret) {
      console.log(banori.id);
      await updateBanor(banori.id);
    }

    // Clear the checked items and deselect the selected banoris
    // setCheckedItems(new Set());
    setIsLoading(false);
  } catch (error) {
    setIsLoading(false);
    console.error('Error while updating banoris:', error);
    // You can show an error message to the user here
  }
};
 console.log(banoret);

  if (!banoret) {
    return <LoadingComponent message="Loading banoret..." />;
  }

  return (
    <div className="admin-layout">
      <h1 className='NewBeauty'> Zgjedh te nominuarit</h1>
      <div className="admin-content">
        {banoretFiltered.map((banori) => (
        <div style={{backgroundColor: 'var(--blue)', width: "250px", margin:'20px 20px 0px 0px',  borderRadius:'30px'}}>
  <input
    type="checkbox"
    id={`checkbox-${banori.id}`}
    checked={checkedItems.has(banori.id)}
    onChange={(event: any) => handleCheckboxChange(banori.id, event)}
  />
  <label htmlFor={`checkbox-${banori.id}`}>
    <img
      key={banori.id}
      src={banori.pictureUrl}
      style={{ width: "250px", borderRadius:'30px',transition: 'filter 0.5s ease', filter: checkedItems.has(banori.id) ? 'none' : 'grayscale(100%)'}}
    />
  </label>
</div>
        ))}
      </div>
      <Button
      className='ButtonAdmin'
    variant="contained"
    color="primary"
    onClick={handleSaveClick}
    disabled={isLoading}
    startIcon={isLoading ? <CircularProgress size={20} /> : null}
  >
    Save
  </Button>
    </div>
  );
}

export default AdminGeneral;
