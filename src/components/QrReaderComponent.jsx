import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { updateDoc, doc, collection } from "firebase/firestore";

import { db } from '../javascript/firebase';
import NavBarComp from './NavBarComp';
import { useNavigate } from "react-router-dom/dist";

const QrReaderComponent = () => {

    const navigate = useNavigate();
    const [data, setData] = useState('No result');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('no error');

    const writeData = async () => {

        console.log(data);

        try {
            const docRef = doc(db, "teams", data);

            const update_data = {
                isPresent: true
            };

            let result = await updateDoc(docRef, update_data);
            navigate('/');
        } 
        catch (e) {

            console.error("Error updating document: ", e);
            setIsError(true);
            setError(e);
        }
    }

    return (
        <>
            <NavBarComp></NavBarComp>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                        // writeData();
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100%' }}
            />
            <p>{data}</p>
            <span>{error}</span>
            <br />
            <button onClick={writeData}>update</button>
        </>
    );
};

export default QrReaderComponent;