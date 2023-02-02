import { storage } from '../firebaseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from 'react';
import axios from 'axios';






export default function FileUpload() {

  const [imgUrl, setImgUrl] = useState();
  const [progresspercent, setProgresspercent] = useState(0);
  
    const handleSubmit = async (e) => {
    e.preventDefault()
   
    const file = e.target[0]?.files[0]
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)

        });
      }
    );
    }
if(imgUrl!=null){
  console.log(imgUrl);
  let imgURL = "";
  console.log(imgURL);  
  const newImage = { img: imgUrl }
  axios.post('https://localhost:7226/api/Images', newImage)
  .then(function (response) {
    console.log(response);
  })
}


  return (
    <div className="App d-flex flex-column justify-content-center align-items-center m-5" >
      <div className="" style={{ width: "500px" }}>
        <form onSubmit={handleSubmit} className='form'>
          <input type="file" name='img' className="form-control" id="customFile" />
          <button type="submit" className="btn btn-danger mt-2">Upload</button>

        </form>
      </div>
      {
        !imgUrl &&

        <div className="progress mt-3" style={{ height: "25px", width: "500px" }}>
          <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${progresspercent}%` }} aria-valuenow={progresspercent} aria-valuemin={0} aria-valuemax={100}>{progresspercent}%</div>
        </div>
      }

      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />

      }

    </div>

  );
}
