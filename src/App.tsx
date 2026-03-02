import { useState } from 'react'
import './App.css'

const CATEGORIES = ['업무', '개인', '쇼핑', '공부', '기타']

interface Todo {
  id: number
  date: string
  category: string
  title: string
  detail: string
  done: boolean
}

const emptyForm = () => ({
  date: new Date().toISOString().slice(0, 10),
  category: CATEGORIES[0],
  title: '',
  detail: '',
})

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [form, setForm] = useState(emptyForm())

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addTodo = () => {
    if (!form.title.trim()) return
    setTodos([...todos, { id: Date.now(), ...form, title: form.title.trim(), done: false }])
    setForm(emptyForm())
  }

  const toggleDone = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="todo-app">
      <h1>Todo</h1>

      <div className="todo-form">
        <div className="form-row">
          <label>날짜</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>구분</label>
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label>제목</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="form-row">
          <label>상세내용</label>
          <textarea
            name="detail"
            value={form.detail}
            onChange={handleChange}
            placeholder="상세 내용을 입력하세요"
            rows={3}
          />
        </div>
        <button className="add-btn" onClick={addTodo}>추가</button>
      </div>

      <table className="todo-table">
        <thead>
          <tr>
            <th>완료</th>
            <th>날짜</th>
            <th>구분</th>
            <th>제목</th>
            <th>상세내용</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr><td colSpan={6} className="empty">할 일이 없습니다.</td></tr>
          )}
          {todos.map(todo => (
            <tr key={todo.id} className={todo.done ? 'done' : ''}>
              <td>
                <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo.id)} />
              </td>
              <td>{todo.date}</td>
              <td><span className="badge">{todo.category}</span></td>
              <td className="title-cell">{todo.title}</td>
              <td className="detail-cell">{todo.detail}</td>
              <td>
                <button className="del-btn" onClick={() => deleteTodo(todo.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
