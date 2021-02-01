import React from 'react';
import './Inputs.css';

const PictureInput = (props) => {

    // Create image preview if the image was already chosen
    let imagePreviewUrl = null;
    if (props.imgPreviewUrl) {
        imagePreviewUrl = (
            <div>
                <img className="ImagePreview" src={props.imgPreviewUrl}/>
            </div>
        )
    }

    let removeButon = null;
    if (props.imgPreviewUrl){
        removeButon = (
            <label className="RemovePictureButton">
                <input onClick={props.removePicture} type="button" />
                Remove Picture
            </label>
        );
    }

    return (
        <div className="PictureInput">
            <label>{props.labelText}</label>
            {imagePreviewUrl} 
            <div>
                <label className="custom-file-upload">
                    <input onChange={props.fileSelected} type="file" />
                    Upload Picture
                </label>
                {removeButon}
            </div>
        </div>
    )
}

export default PictureInput;