import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import { ChatListContainer } from './components/ChatList'
import { ChatWindowContainer } from './components/ChatWindow'

// Placeholder components - will be implemented in later tasks

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
          <Route path="/" element={<ChatListContainer />} />
          <Route path="/chat/:id" element={<ChatWindowContainer />} />
          <Route path="/new-chat" element={<NewChat />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
