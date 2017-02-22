import React from 'react';


export default props => {
    var {reasonArray} = props;

    if (!reasonArray || !reasonArray.length) {
        return <div className="reasons" />;
    }

    return (
        <div className="reasons" style={{marginTop: `-${props.topMargin}`}}>
            Imported By:
            <ul>
                {reasonArray.map(reason => {
                    return <li>{reason.module}</li>;
                })}
            </ul>
        </div>
    );
};
