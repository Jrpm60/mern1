import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

const SmartDoor = () => {
  const [db, setDb] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}` //sql-wasm.wasm = SQLite engine compiled to run in browsers
    }).then(SQL => {
      const db = new SQL.Database(); // Crear db en memoria

  
      db.run(
        `CREATE TABLE IF NOT EXISTS logs 
        (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doorId TEXT,
        userId NUMBER,
        status TEXT,
        fecha_In DATE,
        fecha_Out DATE        
        );`
    );      
  
      setDb(db);
    }).catch(err => {
      console.error("Error initializing SQL.js:", err);
    });
  }, []);

  const simulateLockAction = () => {
    if (!db) return;

    const doorId = 'front_door';
    const userId = 'admin';
    const status = Math.random() > 0.5 ? 'locked' : 'unlocked';
    const fechaIn = new Date().toISOString();
    const fechaOut = new Date().toISOString();

    db.run(
      'INSERT INTO logs (doorId, userId, status, fecha_In, fecha_Out) VALUES (?, ?, ?, ?, ?);',
      [doorId, userId, status, fechaIn, fechaOut]
    );

    const res = db.exec('SELECT * FROM logs;');
    if (res[0]) {
      const cols = res[0].columns;
      const values = res[0].values;
      const formatted = values.map(row =>
        Object.fromEntries(row.map((val, idx) => [cols[idx], val]))
      );
      setLogs(formatted);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Smart Door Lock Logs</h2>
      <button onClick={simulateLockAction}>Simular Lock/Unlock</button>
      
      <ul>
        {logs.map((log, idx) => (
          <li key={idx}>
            <strong>{log.timestamp}</strong> — {log.doorId} / {log.userId} / {log.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartDoor;