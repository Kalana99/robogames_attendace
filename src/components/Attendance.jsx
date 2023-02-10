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
            <h1>Attendace</h1>
            <ListGroup as="ul" numbered>
                {
                    teams && teams.map(team => {
                        return (
                            <div className="team-container">
                                <h4>{team.teamName}</h4>
                                <p>{team.leader}</p>
                                <span>{team.isPresent ? "Present" : "Absent"}</span>
                            </div>

                            // <Card style={{ width: '18rem' }}>
                            //     <Card.Body>
                            //         <Card.Title>{team.teamName}</Card.Title>
                            //         <Card.Subtitle className="mb-2 text-muted">{team.leader}</Card.Subtitle>
                            //         <Badge bg="primary" pill>
                            //             {team.isPresent ? "Present" : "Absent"}
                            //         </Badge>
                            //     </Card.Body>
                            // </Card>
                            // <ListGroup.Item
                            //     as="li"
                            //     className="d-flex justify-content-between align-items-start"
                            // >
                            //     <div className="ms-2 me-auto">
                            //         <div className="fw-bold">{team.teamName}</div>
                            //         {team.leader}
                            //     </div>
                            //     <Badge bg="primary" pill>
                            //         {team.isPresent ? "Present" : "Absent"}
                            //     </Badge>
                            // </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </>
    );
};

export default Attendance;