import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Placeholder components - will be implemented in later tasks
const ChatList = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Chat List</h1>
    <p>Chat list will be implemented here</p>
  </div>
)

const ChatWindow = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">Chat Window</h1>
    <p>Chat window will be implemented here</p>
  </div>
)

const NewChat = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold">New Chat</h1>
    <p>New chat screen will be implemented here</p>
  </div>
)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ChatList />} />
          <Route path="/chat/:id" element={<ChatWindow />} />
          <Route path="/new-chat" element={<NewChat />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
