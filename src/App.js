import React, { useState } from 'react';

export default function App() {
  const [logs, setLogs] = useState([]);
  const [form, setForm] = useState({
    date: '', aircraft: '', duration: '', pic: false, dual: false,
    night: false, glider: false, ifr: false, multi: false
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const addLog = () => {
    if (!form.date || !form.aircraft || !form.duration) return;
    setLogs([...logs, form]);
    setForm({
      date: '', aircraft: '', duration: '', pic: false, dual: false,
      night: false, glider: false, ifr: false, multi: false
    });
  };

  const totals = logs.reduce((acc, log) => {
    const hrs = parseFloat(log.duration);
    acc.total += hrs;
    if (log.pic) acc.pic += hrs;
    if (log.night) acc.night += hrs;
    if (log.glider) acc.glider += hrs;
    return acc;
  }, { total: 0, pic: 0, night: 0, glider: 0 });

  return (
    <div className="container">
      <h1>Flight Log</h1>
      <div className="form">
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="aircraft" placeholder="Aircraft Type" value={form.aircraft} onChange={handleChange} />
        <input name="duration" placeholder="Hours" type="number" value={form.duration} onChange={handleChange} />
        <label><input type="checkbox" name="pic" checked={form.pic} onChange={handleChange}/> PIC</label>
        <label><input type="checkbox" name="dual" checked={form.dual} onChange={handleChange}/> Dual</label>
        <label><input type="checkbox" name="night" checked={form.night} onChange={handleChange}/> Night</label>
        <label><input type="checkbox" name="glider" checked={form.glider} onChange={handleChange}/> Glider</label>
        <label><input type="checkbox" name="ifr" checked={form.ifr} onChange={handleChange}/> IFR</label>
        <label><input type="checkbox" name="multi" checked={form.multi} onChange={handleChange}/> Multi-Engine</label>
        <button onClick={addLog}>Add Flight</button>
      </div>
      <div className="summary">
        <h2>Totals</h2>
        <p>Total Hours: {totals.total}</p>
        <p>PIC: {totals.pic}</p>
        <p>Night: {totals.night}</p>
        <p>Glider: {totals.glider}</p>
      </div>
      <table>
        <thead>
          <tr><th>Date</th><th>Aircraft</th><th>Hours</th><th>PIC</th><th>Night</th><th>Glider</th></tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.date}</td>
              <td>{log.aircraft}</td>
              <td>{log.duration}</td>
              <td>{log.pic ? '✓' : ''}</td>
              <td>{log.night ? '✓' : ''}</td>
              <td>{log.glider ? '✓' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}