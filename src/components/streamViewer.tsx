"use client";

import { useEffect, useState } from "react";

const StreamViewer = ({ streamURL }: { streamURL: string }) => {
    const [imageSrc, setImageSrc] = useState(`${streamURL}?t=${Date.now()}`);
    const [isStreamActive, setIsStreamActive] = useState(true);

    // Function to reload the stream (e.g., on error or regular refresh)
    const reloadStream = () => {
        console.log("Reloading stream...");
        setImageSrc(`${streamURL}?t=${Date.now()}`); // Cache busting with timestamp
    };

    // Polling function to check if the stream is still up
    const checkStreamStatus = async () => {
        try {
            const response = await fetch("http://192.168.1.114:8081/status.json"); // Check without downloading the entire image
            if (!response.ok) {
                console.log("Stream is down, reloading...");
                setIsStreamActive(false);
                reloadStream(); // Reload the stream if it's down
            } else {
                setIsStreamActive(true);
            }
        } catch (error) {
            console.log("Error checking stream status:", error);
            setIsStreamActive(false);
            reloadStream(); // Handle error by attempting to reload
        }
    };

    // Poll the stream every 10 seconds
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const interval = setInterval(() => {
            checkStreamStatus();
        }, 10000); // Poll every 10 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    return (
        <div className="min-w-[640px] min-h-[480px] ">
            {isStreamActive ? (
                <img
                    src={imageSrc}
                    className="rounded-md"
                    alt="MPEG Stream"
                    onError={reloadStream} // Reload on image loading error
                    width={640}
                    height={480}
                />
            ) : (
                <div className="animate-pulse flex justify-center items-center rounded-md bg-stone-700/50 w-full h-full">
                    <p>Stream is down. Attempting to reconnect...</p>
                </div>
            )}
        </div>
    );
};

export default StreamViewer;
