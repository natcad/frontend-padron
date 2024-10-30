// src/components/ResultsTable.jsx
import React from 'react';

const ResultsTable = ({ results }) => (
    <>
        {results.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Matrícula</th>
                        <th>Fecha afiliación</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((info, index) => (
                        <tr key={index}>
                            <td>{info.Nombre}</td>
                            <td>{info.Apellido}</td>
                            <td>{info.Matrícula}</td>
                            <td>{info['Fecha afiliación']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </>
);

export default ResultsTable;
