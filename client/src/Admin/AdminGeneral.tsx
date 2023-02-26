import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hook';
import { banoriSelectors, fetchBanoretAsync, addSelectedBanori, removeSelectedBanori, updateBanoretArray } from '../Pages/Catalog/CatalogSlice';
import LoadingComponent from '../Components/LoadingComponent';
import axios from 'axios';
import { Banori } from '../models/banori';
import { Nominimet } from '../models/nominimet';

function AdminGeneral() {
  const dispatch = useAppDispatch();
  const banoret = useAppSelector(banoriSelectors.selectAll);
  const selectedBanoret = useAppSelector(state => state.catalog.selectedBanoret);
  const [checkedItems, setCheckedItems] = useState(new Set(selectedBanoret.map(banori => banori.id)));

  useEffect(() => {
    dispatch(fetchBanoretAsync());
  }, [dispatch]);

 const handleCheckboxChange = (id: number, event: any) => {
  const isChecked = event.target.checked;
  if (isChecked) {
    dispatch(addSelectedBanori(banoret.find(banori => banori.id === id)));
    setCheckedItems(checkedItems.add(id));
  } else {
    dispatch(removeSelectedBanori({ id }));
    checkedItems.delete(id);
    setCheckedItems(new Set(checkedItems));
  }
};


const saveSelectedBanori = (selectedBanori: Banori[]): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const nominimet: Nominimet = {
      Banoret: selectedBanori.map(banori => {
        return {
          id: banori.id,
          name: banori.name,
          biografia: banori.biografia,
          price: banori.price,
          pictureUrl: banori.pictureUrl,
          age: banori.age,
          RelationshipStatus: banori.RelationshipStatus,
          profesioni: banori.profesioni,
          cloudanaryPublicId: banori.pictureUrl
        };
      }),
    };

    axios.post('https://localhost:7226/api/Nominimet', nominimet)
      .then(response => {
        console.log('Saved successfully:', response.data);
        // Dispatch an action to update the store, if needed
        dispatch(updateBanoretArray(selectedBanori));
        resolve(); // resolve the promise on success
      })
      .catch(error => {
        console.error('Error while saving:', error);
        reject(error); // reject the promise on error
      });
  });
};

const handleSaveClick = async () => {
  const selectedBanoriIds = Array.from(checkedItems);
  const selectedBanori = banoret.filter((banori) =>
    selectedBanoriIds.includes(banori.id)
  );
  console.log(selectedBanori);

  await new Promise<void>(resolve => {
    saveSelectedBanori(selectedBanori);
    resolve();
  });

  // Clear the checked items
  setCheckedItems(new Set());
};



  if (!banoret) {
    return <LoadingComponent message="Loading banoret..." />;
  }

  return (
    <div className="admin-layout">
      <h1 style={{ fontFamily: "New Beauty" }}>Admin Dashboard</h1>
      <div className="admin-content">
        {banoret.map((banori) => (
          <div style={{backgroundColor: 'var(--blue)', width: "250px", margin:'20px 20px 0px 0px',  borderRadius:'30px'}}>
            <input
              type="checkbox"
              id={`checkbox-${banori.id}`}
              checked={checkedItems.has(banori.id)}
                onChange={(event: any) => handleCheckboxChange(banori.id, event)}
            />
            <label htmlFor={`checkbox-${banori.id}`}>
              <img key={banori.id} src={banori.pictureUrl} style={{ width: "250px", borderRadius:'30px'}} />
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
}

export default AdminGeneral;
