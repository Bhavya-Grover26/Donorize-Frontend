import React, { useState , useEffect} from 'react';
import './AddEventOrg.css';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import NavbarOrg from '../NavbarOrg/NavbarOrg';

const AddEvent = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [shortdesc, setShortdesc] = useState('');
  const [objective, setObjective] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  useEffect(()=>{
    if(url){
      fetch('/createevent', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          name,
        shortdesc,
        objective,
        pic:url,
        date
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Server response:", data);
          if (data.error) {
            M.toast({ html: data.error, classes: 'red darken-3' });
              console.log("posting error:", data.error);
          } else {
              console.log("Navigating to /dashboard");
              navigate("/dashboard");
          }
        })
    }
  },[url])

  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setFile(file);
  };

  const postDetails = () => {
    const fileInput = document.getElementById("imageUpload");
    const file = fileInput.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "donation");
    data.append("cloud_name", "dlg5t6eca");

    fetch("https://api.cloudinary.com/v1_1/dlg5t6eca/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

      
  };

  return (
    <div className='Addd'>
      <NavbarOrg />
      <div className="Addevent">
        <div className="LeftSection">
          <label htmlFor="imageUpload" className="UploadButton">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            className="UploadInput"
            onChange={handleChange}
            accept="image/*"
          />
          {selectedImage && (
            <div className="PreviewContainer">
            <img src={selectedImage} alt="Preview" className="PreviewImage" />
          </div>
          )}
        </div>
        <div className="RightSection">
          {/* Add your form inputs for event name, short description, long description, and maximum objectives */}
          <input type="text" placeholder="Event Name" className="EventInput" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea placeholder="Short Description" className="ShortDescriptionTextArea" value={shortdesc} onChange={(e) => setShortdesc(e.target.value)}></textarea>
          <input type="text" placeholder="Objective" className="MaximumObjectivesInput" value={objective} onChange={(e) => setObjective(e.target.value)} />
          <input type="text" placeholder="Date" className="DateInput" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="button-container5">
          <button
            className="btn waves-effect waves-light #64b5f6 blue darken-1 submit-button"
            onClick={() => postDetails()}
          >
            Submit post
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddEvent;
