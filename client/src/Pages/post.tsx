import axios from 'axios';
export default function post() {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newImage = { img: "ali" }
        try {
            const response = await axios.post(`https://localhost:7226/api/Images`, newImage);
            console.log(response);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type='submit' >POST</button>
            </form>
        </>
    );

}