import { useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { collection, getDocs } from "firebase/firestore";

import NavBarComp from './NavBarComp';
import { db } from '../javascript/firebase';

const Attendance = () => {

    const [teams, setTeams] = useState([]);

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

    return (
        <>
            <NavBarComp></NavBarComp>
            <h1>Attendance</h1>
            <ListGroup as="ul" numbered>
                {
                    teams && teams.map(team => {
                        return (
                            <div className="team-container">
                                <h4>{team.teamName}</h4>
                                <p>{team.leader}</p>
                                <p>{team.category}</p>
                                <span>{team.isPresent ? "Present" : "Absent"}</span>
                                <br />
                            </div>
                        )
                    })
                }
            </ListGroup>
        </>
    );
};

export default Attendance;