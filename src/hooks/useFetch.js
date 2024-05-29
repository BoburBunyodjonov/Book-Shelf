import axios from "axios";
import {
    useEffect,
    useState
} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            const token = sessionStorage.getItem("token");
            const headers = {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            };

            const response = await axios.get(url, {
                headers
            });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return {
        data,
        loading,
        error,
        fetchData
    };
};

export default useFetch;
