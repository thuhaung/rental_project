import React, { useEffect, useState } from 'react'
import "./ImageUpload.css";
import icon from "../../assets/images-icon.png";
import axios from "axios";

function ImageUpload({ onClickImage, onSubmit }) {
    const [files, setFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const handler = async (e) => {
        /*
        setFiles([]);
        for (let i in e.target.files) {
            setFiles(prev => [...prev, e.target.files[i]]);
        }
        
        const selectedFiles = e.target.files;
        console.log(selectedFiles);
        const selectedFilesArray = Array.from(selectedFiles);
        const imageArray = selectedFilesArray.map(file => {
            return URL.createObjectURL(file);
        })
        setSelectedImages(imageArray);*/
        const files = e.target.files;
        previewFile(files);
    }

    const previewFile = (files) => {
        for (let i in files) {
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                console.log(reader.result);
                setSelectedImages(prev => [...prev, reader.result]);
            }
        }  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/advertisement/upload-image",
                    selectedImages, 
                    { withCredentials: true })
                    .then((response) => {
                        if (response.data) {
                            console.log("ok");
                        }
                    }).catch((error) => {
                        console.log(error.message);
                    })
        
    }

    useEffect(() => {
        onClickImage(selectedImages)
    }, [selectedImages]);

    
    return (
        <div className="rental-image-wrapper">
            {
                selectedImages.length > 0 ?
                <div className="rental-image-upload-wrapper">
                    <div className="rental-image-upload">
                        <h2>Add up to 5 photos</h2>
                        <label className="rental-image-upload-label" style={{display: selectedImages.length === 5 ? "none" : "block"}}>
                            <input type="file" multiple onChange={handler} accept="image/png, image/jpeg, image/jpg, image/webp"/>
                            Upload
                        </label>
                    </div>
                    <div className="rental-image-list">
                        {
                            selectedImages && 
                            
                            selectedImages.map((image, index) => {
                                return (
                                    <div key={index} className="rental-image-specific">
                                        <img src={image} alt={`img-${index}`} />
                                        <button className="rental-image-remove-btn" onClick={() => {setSelectedImages(selectedImages.filter((item) => item !== image)); setFiles(files.filter((item, i) => i !== index))}}>Remove</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                :
                <div className="rental-image-first-upload-wrapper">
                    <div className="rental-image-upload-first-time">
                        <div className="rental-image-upload-first-time-illustration">
                            <img src={icon} alt="image-upload"/>
                            <h2>Add up to 5 photos</h2>
                        </div>
                        <label className="rental-image-first-time-upload-label">
                            <input type="file" multiple onChange={handler} accept="image/png, image/jpeg, image/jpg, image/webp"/>
                            <u>Upload from your device</u>
                        </label>
                    </div>
                </div>
            }
        </div>
    )
}

export default ImageUpload
