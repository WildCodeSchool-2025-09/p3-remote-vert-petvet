import { useEffect, useState } from "react";
import type { Patient } from "../types/Pet";

interface VetDashboard {
  dashboard: {
    patients: Patient[];
  };
}

type Todo = {
  id: number;
  content: string;
  done: boolean;
};

function VetDashboard({ dashboard }: VetDashboard) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("vetTodos");

    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vetTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;

    setTodos([...todos, { id: Date.now(), content: newTodo, done: false }]);

    setNewTodo("");
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const todoDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  return (
    <>
      <section>
        <h2>Mes patients</h2>
        {dashboard.patients.length === 0 && (
          <p>Vous n'avez aucun patient suivi, veuillez en ajouter.</p>
        )}
        {dashboard.patients.slice(0, 4).map((patient) => (
          <article key={patient.id}>
            <img src={patient.photo} alt={patient.name} />
            <h3>{patient.name}</h3>
            <p>
              {patient.ownerLastname} {patient.ownerFirstname}
            </p>
            <p>{patient.specie}</p>
            <p>{patient.breed}</p>
            <p>{patient.gender === "m" ? "♂" : "♀"}</p>
          </article>
        ))}
      </section>
      <section>
        <h2>A faire aujourd'hui</h2>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button type="button" onClick={addTodo}>
          Ajouter
        </button>
        {todos.length === 0 && <p>Aucune tâche à faire.</p>}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => todoDone(todo.id)}
              />
              <p>{todo.content}</p>
              <button type="button" onClick={() => deleteTodo(todo.id)}>
                <img src="/images/cross.png" alt="Suppression de la tâche" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default VetDashboard;
