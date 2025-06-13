import React, { useState, useEffect } from 'react';

function FraudeBanco() {
    const [transacciones, setTransacciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransacciones = async () => {
            try {
                const GET_TRANSACCIONES_QUERY = `
                    query{
                    transacciones{
                        precio
                    }
                    }
                `;

                const response = await fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: GET_TRANSACCIONES_QUERY }),
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const result = await response.json();

                if (result.errors) {
                    throw new Error(result.errors.map(err => err.message).join(', '));
                }

                const transaccionesFiltradas = result.data.transacciones.filter(transaccion => {
                    const valor = parseFloat(transaccion.precio);
                    const esParticionCorrecta = transaccion.partition === 1;
                    const esValorElevado = valor > 10000;

                    return esParticionCorrecta && esValorElevado;
                });

                setTransacciones(transaccionesFiltradas);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransacciones();
    }, []);

    if (loading) {
        return <p style={{ padding: '20px' }}>Cargando transacciones...</p>;
    }

    if (error) {
        return <p style={{ padding: '20px', color: 'red' }}>Error al cargar transacciones: {error}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Lista de Posibles Fraudes</h2>
            <p>Filtrando transacciones de la **partición 1** y con valor superior a **10000**.</p>
            <ul style={{ marginTop: '10px' }}>
                {transacciones.length === 0 ? (
                    <li>No hay transacciones que cumplan el criterio de fraude.</li>
                ) : (
                    transacciones.map((t, index) => (
                        <li key={index}>Transacción: {t.precio} (Partición: {t.partition})</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default FraudeBanco;



