import { useState } from 'react'
import './App.css'

export default function TODOApp() {

    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all');
    const [tasks, setTasks] = useState([
        {id: 1, text: 'Studiare i componenti React', completed: false},
        {id: 2, text: 'Capire useState e useEffect', completed: false},
        {id: 3, text: 'Costruire questa app da zero', completed: false},
    ]);

    //Actions

    function addTask() {
        const text = input.trim();
        if (!text) return;
        const newTask = {id: Date.now(), text, completed: false};
        setTasks([...tasks, newTask]);
        setInput('');
    }

    function toggleTask(id) {
        setTasks(tasks.map((t) => t.id === id ? {...t, completed: !t.completed } : t));

    }

    function deleteTask(id) {
        setTasks(tasks.filter((t) => t.id !== id));
    }

    function handleAddButton(e) {
        if (e.key === "Enter") addTask();

    }

    const visibleTasks = tasks.filter((t) => {
        if (filter === "active") return !t.done;
        if (filter === "done") return t.done;
        return true;
    });

    const completedCount = tasks.filter((t) => t.completed).length;

    //Items Render

    return (
        <div 
            style={{
                minHeight: "100vh",
                background: "#f9fafb",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "60px 16px",
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >

            <div style={{ width: "100%", maxWidth: 480 }}v>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                    La Mia TODO List
                </h1>
                <p style={{ color: "#6b7280", marginBottom: 24 }}>
                    {completedCount} di {tasks.length} completati
                </p>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                    <input value={input}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleAddButton}
                            placeholder="Aggiungi un nuovo task..."
                            style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: "1px solid #d1d5db",
                            fontSize: 15,
                            outline: "none",
                    }}
                    />
                    <button
                        onClick={addTask}
                        style={{
                        padding: "10px 20px",
                        borderRadius: 10,
                        border: "none",
                        background: "#16a34a",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 15,
                        cursor: "pointer",
                        }}
                    >
                        Aggiungi
                    </button>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    {["all","active","done"].map((f) => (
                        <button key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: "6px 16px",
                                borderRadius: 999,
                                border: "1px solid",
                                borderColor: filter === f ? "#16a34a" : "#d1d5db",
                                background: filter === f ? "#16a34a" : "#fff",
                                color: filter === f ? "#fff" : "#6b7280",
                                fontWeight: filter === f ? 600 : 400,
                                fontSize: 14,
                                cursor: "pointer",
                            }}
                        >
                            {f === "all" ? "Tutti" : f ==="active" ? "Attivi" : "Completati"}
                        </button>
                    ))}
                    
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {visibleTasks.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#9ca3af", marginTop: 32 }}>
                            Nessunt task da mostrare qui!

                        </p>
                    ) : (
                        visibleTasks.map((task) => (
                            <TaskItem 
                                key={task.id}
                                task={task}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                            />
                        ))
                    )}

                </ul>
            </div>
      </div>
    )
}

