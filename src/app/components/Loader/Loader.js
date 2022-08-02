import React from "react";
import ReactLoading from 'react-loading';

const Loader = ({ type, color }) => {
    return (
        <div className="overlays">
            <div className="centered">
                <ReactLoading type={type} color={color} height={667} width={375} />
            </div>
         </div>
    );

};

export default Loader;