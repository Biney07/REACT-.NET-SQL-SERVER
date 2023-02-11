import React, { useState } from 'react';

interface Photo {
    publicId: string;
}

const Photo: React.FC = () => {
    const [photo, setPhoto] = useState<Photo | null>(null);

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('https://localhost:7226/api/Photo/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        setPhoto({ publicId: result.publicId });
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            {photo && (
                <img src={`https://res.cloudinary.com/martesa-jone/${photo.publicId}`} />
            )}
        </div>
    );
};

export default Photo;
