import { useEffect, useState } from "react";

//custom hook
const useFetch = (url) => {
    // hooks
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //prevents fetch if another fetch is running?
        const abortCont = new AbortController();

        //only to simulate an actual application taking time to serve data
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(response => {
                    if (!response.ok) {
                        throw Error('Could not fetch the data from that resource')
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 1000)

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;