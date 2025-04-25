import React from "react";
import DateBlock from "./DateBlock";

const DateBlocks: React.FC = () => {
    return (
    <>
        {
            Array.from({ length: 7 }, (_, index) => (
                <DateBlock key={index} index={index} />
            ))
        }
    </>
    )
}

export default DateBlocks;