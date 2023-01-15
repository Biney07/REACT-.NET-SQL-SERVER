import { map } from "@firebase/util";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Card from "../Components/Card";
import Post from "./post";

interface Item {
    id: number;
    img: string;
}

const Home: React.FC = () => {
    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get<Item[]>("https://localhost:7226/api/Images");
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
        <div>
            <div style={{ margin: '51px', display: 'flex', flexDirection: 'row', flexWrap: "wrap", alignItems: "flex-start" }}>
             {data.map(item => (
               <Card name="Protein Bar" url={item.img} description="Proteins are large, complex molecules that perform a vast array of functions in the body" />
             ))}
            </div>
           
        </div>
        <Post/>
        </>
    );
}
export default Home
// export default function Home {
  
    
//         const [data, setData] = useState([]);

//         useEffect(() => {
//             async function fetchData() {
//                 try {
//                     const response = await axios.get("https://localhost:7226/api/Images");
//                     setData(response.data);
//                 } catch (error) {
//                     console.log(error);
//                 }
//             }
//             fetchData();
//         }, []);
    

   
//     return (
//         <>
//            
//             {data.map(item => (
//                 <div key={item.id}>
//                     <p>{item.img}</p>
//                 </div>
//             ))}
//         </>
//     );


// }

// function useEffect(arg0: () => void, arg1: never[]) {
//     throw new Error("Function not implemented.");
// }
