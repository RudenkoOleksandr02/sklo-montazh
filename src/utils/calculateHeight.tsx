import React from "react";

export const calculateHeight = (ref: React.RefObject<any>): any | number => {
    if (ref.current) {
        return ref.current.scrollHeight;
    }
    return 0;
};