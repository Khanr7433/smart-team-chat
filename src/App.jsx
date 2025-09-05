import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'

// Placeholder components - will be implemented in later tasks
const ChatList = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Your Conversations</h2>
    <p className="text-gray-600">Chat list will be implemented here</p>
  </div>
)

const ChatWindow = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Chat Messages</h2>
    <p className="text-gray-600">Chat window will be implemented here</p>
  </div>
)

const NewChat = () => (
  <div className="p-4">
    <h2 className="text-xl font-semibold mb-4">Start New Chat</h2>
    <p className="text-gray-600">New chat screen will be implemented here</p>
  </div>
)

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ChatList />} />
          <Route path="/chat/:id" element={<ChatWindow />} />
          <Route path="/new-chat" element={<NewChat />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
