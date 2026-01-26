"use client";

import { useState } from "react";

export default function HideNav(){
    const [IsDisplay, setDisplay] = useState(false);

    return (
        <div>
            <button onClick={() => setDisplay(!IsDisplay)}>
                {IsDisplay ? "Hide" : "Show"}
            </button>
        </div>
    );
}