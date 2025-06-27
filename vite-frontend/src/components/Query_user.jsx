import {useState} from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async ({queryKey}) => {
    console.log(queryKey);
    const [, id] = queryKey;
    console.log("Fetching");
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(result => {
        return result.json()
    })
    .then(result => {
        return result;
    });
}


const Query = () => {
    const [userId, setUserId] = useState(1);
    const [submittedId, setSubmittedId] = useState(1);

    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', Number(submittedId)],
        queryFn: fetchUser,
        staleTime: 10000, // 10 seconds
        //refetchInterval: 10000,
        onSuccess: () => console.log('Data fetched/refetched'),
        onError: (err) => console.error('Fetch error:', err),
    });
    

    return (
        <>
            User Id: <input type="text" value={userId} onChange={(e)=>setUserId(e.target.value)}/>
            <button onClick={() => setSubmittedId(userId)}>Get</button>

            {isLoading && <div>Cargando...</div>}
            {error && <div>Error al cargar usuario</div>}
            {!isLoading && !error && (
            <div>{user.id} - {user.name}</div>
            )}
        </>
    )
}

export default Query