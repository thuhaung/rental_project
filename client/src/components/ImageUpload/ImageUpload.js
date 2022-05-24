import React, { useState } from 'react'
import "./ImageUpload.css";
import icon from "../../assets/images-icon.png";
import axios from "axios";

function ImageUpload() {
    const [files, setFiles] = useState([]);

    const handler = (e) => {
        console.log(e.target.files);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        for (let i in e.target.files) {
            form.append("images", e.target.files[i]);
        }
        axios.post("http://localhost:5000/advertisement/upload-image", form, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }).then((response) => {
            if (response.ok) {
                console.log("ok");
            }
        }).catch((error) => {
            console.log(error.message);
        })
    }

    return (
        <div className="rental-image-upload">
            
            <div className="rental-image-upload-illustration">
                <img src={icon} alt="image-upload"/>
                <h2>Add at most 5 photos</h2>
            </div>
            <label className="rental-image-upload-label">
                <input type="file" multiple onChange={handleSubmit}/>
                <u>Upload from your device</u>
            </label>
        </div>
    )
}

export default ImageUpload
