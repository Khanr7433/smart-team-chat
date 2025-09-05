import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import ErrorBoundary from './components/common/ErrorBoundary'
import { ToastProvider } from './components/common/Toast'
import { ChatListContainer } from './components/ChatList'
import { ChatWindowContainer } from './components/ChatWindow'
import { NewChatContainer } from './components/NewChat'

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ChatListContainer />} />
              <Route path="/chat/:id" element={<ChatWindowContainer />} />
              <Route path="/new-chat" element={<NewChatContainer />} />
            </Routes>
          </Layout>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
