import { useState } from "react";
import { QrReader } from "react-qr-reader";

const Attendance = () => {

    const [data, setData] = useState('No result');

    const writeData = (data) => {
        console.log(data);
    }

    return (
        <>
            <QrReader
                onResult = {(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                        writeData(data);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100%' }}
            />
            <p>{data}</p>
            <p>attendance comp</p>
        </>
    );
};

export default Attendance;