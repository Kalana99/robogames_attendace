import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrReaderComponent = () => {

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
        </>
    );
};

export default QrReaderComponent;