import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { updateDoc, doc, collection, getDocs } from "firebase/firestore";

import { db } from '../javascript/firebase';
import NavBarComp from './NavBarComp';
import { useNavigate } from "react-router-dom/dist";

const QrReaderComponent = () => {

    const navigate = useNavigate();
    const [data, setData] = useState('No result');
    const [error, setError] = useState('no error');
    const [teams, setTeams] = useState([]);
    const [selected] = useState("environment");

    const fetchPost = async () => {

        const doc_refs = await getDocs(collection(db, "teams"))

        const res = []

        doc_refs.forEach(team => {
            res.push({
                id: team.id,
                ...team.data()
            })
        });
        setTeams(res);
    }

    useEffect(() => {
        fetchPost();
    }, [])

    const writeData = async () => {

        console.log(data);

        try {

            let scanned_team = {};

            for (let i = 0; i < teams.length; i++) {

                if (teams[i].id === data) {

                    scanned_team = teams[i];
                    break
                }
            }

            if (scanned_team.isPresent) {
                setError("Team is already present !");
            }
            else {
                const docRef = doc(db, "teams", data);

                const update_data = {
                    isPresent: true
                };

                let result = await updateDoc(docRef, update_data);
                console.log(result)
                navigate('/');
            }
        }
        catch (e) {

            console.error("Error updating document: ", e);
            setError(e);
        }
    }

    const clearData = () => {
        setData('No result');
        setError('no error');
    }

    return (
        <>
            <NavBarComp></NavBarComp>
            <QrReader
                facingMode={selected}
                delay={1000}
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
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
            <br />
            <button onClick={clearData}>clear</button>
        </>
    );
};

export default QrReaderComponent;