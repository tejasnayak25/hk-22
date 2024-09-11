"use client";

import { useParams } from "next/navigation";

export default function Place() {
    let { id } = useParams();
    return (
        <>
            <p>{id}</p>
        </>
    )
}