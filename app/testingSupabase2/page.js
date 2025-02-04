"use client";

import { createClient } from "../../utils/supabase/client";
import { useEffect, useState } from "react";

export default function Test() {
    const [instruments, setInstruments] = useState([]);
    const [testword, setTestword] = useState("");

    useEffect(() => {
        // const fetchData = async () => {
        //     const supabase = createClient();
        //     const { data, error } = await supabase.from("instruments").select();
            
        //     if (error) {
        //         console.error("Error fetching instruments", error);
        //     } else { 
        //         setInstruments(data); 
        //         console.log("successfully fetched");
        //     }
        // };
        // fetchData();

        fetch("/api/instrumentTest")
            .then((res) => res.json())
            .then((instruments) => setInstruments(instruments));
        
        // const fetchData = async () => {
        //     try {
        //         const res = await fetch("/api/instrumentTest", {
        //             method: "GET",
        //         });

        //         const data = await res.json();
        //         setInstruments(data);

        //         console.log("fetched instruments through GET");
        //     } catch (error) {
        //         console.log("error fetching instruments through GET");
        //     }
        // }
        // fetchData();
    }, []);

    // const addData = async (testword) => {
    //     if (!testword) return;

    //     const supabase = createClient();
    //     const { error } = await supabase.from("instruments").insert({ name: testword })
        
    //     if (error) {
    //         console.error("there was error:", error);
    //     } else {
    //         console.log("successfully added?");
    //         setTestword("");
    //     }
    // };

    const handleSubmit = async () => {
        try {
            const instrumentData = {
                name: testword,
            };

            await fetch("/api/instrumentTest", {
                method: "POST",
                body: JSON.stringify(instrumentData),
            });
            console.log("successfully sent POST request");
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <>
            <p>add item to database: </p>
            <input
                type="text"
                id="testword"
                name="testword"
                placeholder="enter test word"
                className="rounded-lg p-1"
                value={testword}
                onChange={(e) => setTestword(e.target.value)}
            />
            <button 
                type="submit"
                onClick={() => handleSubmit()}
            >
                Submit
            </button>
            <p>data:</p>
            <pre>{JSON.stringify(instruments, null, 2)}</pre>
        </>
    );
}
