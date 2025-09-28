import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchOverlay from '../../components/ui/SearchOverlay';
import ConversationList from './components/ConversationList';
import MessageThread from './components/MessageThread';
import MessageInput from './components/MessageInput';
import ConversationDetails from './components/ConversationDetails';
import Icon from '../../components/AppIcon';


const ChatDashboard = () => {
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock current user
  const currentUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'online',
    role: 'user'
  };

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      type: 'direct',
      name: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      participants: [
        {
          id: 'user-2',
          name: 'Sarah Wilson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          status: 'online',
          role: 'user'
        }
      ],
      lastMessage: {
        id: 'msg-1',
        content: 'Hey! How are you doing today?',
        sender: { id: 'user-2', name: 'Sarah Wilson' },
        timestamp: new Date(Date.now() - 300000),
        type: 'text'
      },
      unreadCount: 2
    },
    {
      id: 'conv-2',
      type: 'group',
      name: 'Project Team',
      avatar: null,
      participants: [
        {
          id: 'user-3',
          name: 'Mike Johnson',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          status: 'online',
          role: 'admin'
        },
        {
          id: 'user-4',
          name: 'Emily Davis',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          status: 'away',
          role: 'user'
        },
        {
          id: 'user-5',
          name: 'Alex Chen',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          status: 'offline',
          role: 'user'
        }
      ],
      lastMessage: {
        id: 'msg-2',
        content: 'The deadline has been moved to next Friday',
        sender: { id: 'user-3', name: 'Mike Johnson' },
        timestamp: new Date(Date.now() - 1800000),
        type: 'text'
      },
      unreadCount: 0
    },
    {
      id: 'conv-3',
      type: 'direct',
      name: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      participants: [
        {
          id: 'user-6',
          name: 'David Brown',
          avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
          status: 'offline',
          role: 'user'
        }
      ],
      lastMessage: {
        id: 'msg-3',
        content: 'Thanks for the help with the presentation!',
        sender: { id: 'user-1', name: 'John Doe' },
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      },
      unreadCount: 0
    }
  ]);

  // Mock messages for active conversation
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      content: 'Hey! How are you doing today?',
      sender: {
        id: 'user-2',
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-2',
      content: 'I\'m doing great! Just finished working on the new project. How about you?',
      sender: currentUser,
      timestamp: new Date(Date.now() - 3300000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-3',
      content: 'That sounds awesome! I\'d love to hear more about it. Are you free for a quick call later?',
      sender: {
        id: 'user-2',
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 3000000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-4',
      content: 'Sure! I should be free around 3 PM. Does that work for you?',
      sender: currentUser,
      timestamp: new Date(Date.now() - 2700000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-5',
      content: 'Perfect! I\'ll send you a calendar invite. Looking forward to it! 🎉',
      sender: {
        id: 'user-2',
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      status: 'delivered'
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Set first conversation as active by default
    if (conversations?.length > 0 && !activeConversation) {
      setActiveConversation(conversations?.[0]);
    }
  }, [conversations, activeConversation]);

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    
    // Mark conversation as read
    setConversations(prev => 
      prev?.map(conv => 
        conv?.id === conversation?.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    // On mobile, hide conversation list when selecting a conversation
    if (isMobile) {
      setShowDetails(false);
    }
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      ...messageData,
      sender: currentUser,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation's last message
    setConversations(prev =>
      prev?.map(conv =>
        conv?.id === activeConversation?.id
          ? {
              ...conv,
              lastMessage: {
                id: newMessage?.id,
                content: messageData?.type === 'text' ? messageData?.content : 
                        messageData?.type === 'image' ? '📷 Photo' : '📎 File',
                sender: currentUser,
                timestamp: newMessage?.timestamp,
                type: messageData?.type
              }
            }
          : conv
      )
    );

    // Simulate message delivery status update
    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    // Simulate read status update
    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id
            ? { ...msg, status: 'read' }
            : msg
        )
      );
    }, 3000);
  };

  const handleEditMessage = (messageId, newContent) => {
    setMessages(prev =>
      prev?.map(msg =>
        msg?.id === messageId
          ? { ...msg, content: newContent, edited: true }
          : msg
      )
    );
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => prev?.filter(msg => msg?.id !== messageId));
  };

  const handleTyping = (typing) => {
    setIsTyping(typing);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearch = (searchResult) => {
    console.log('Search result:', searchResult);
    // Handle search result navigation
  };

  const notificationCounts = {
    messages: conversations?.reduce((total, conv) => total + conv?.unreadCount, 0),
    groups: 0,
    total: conversations?.reduce((total, conv) => total + conv?.unreadCount, 0)
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <Header 
        currentUser={currentUser}
        onNavigate={handleNavigation}
        notificationCounts={notificationCounts}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden mt-16">
        {/* Conversation List - Hidden on mobile when conversation is active */}
        <div className={`${isMobile && activeConversation ? 'hidden' : 'block'} ${isMobile ? 'w-full' : 'w-80'} flex-shrink-0`}>
          <ConversationList
            conversations={conversations}
            activeConversation={activeConversation}
            onConversationSelect={handleConversationSelect}
            currentUser={currentUser}
          />
        </div>

        {/* Message Thread */}
        <div className={`flex-1 flex flex-col ${isMobile && !activeConversation ? 'hidden' : 'block'}`}>
          <MessageThread
            conversation={activeConversation}
            messages={messages}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onEditMessage={handleEditMessage}
            onDeleteMessage={handleDeleteMessage}
          />
          
          {activeConversation && (
            <MessageInput
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
              isTyping={isTyping}
            />
          )}
        </div>

        {/* Conversation Details - Hidden on mobile */}
        {showDetails && !isMobile && (
          <ConversationDetails
            conversation={activeConversation}
            onClose={() => setShowDetails(false)}
            currentUser={currentUser}
          />
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobile && activeConversation && (
        <div className="fixed top-20 left-4 z-50">
          <button
            onClick={() => setActiveConversation(null)}
            className="p-2 bg-card border border-border rounded-lg shadow-lg hover:bg-accent/50 transition-colors duration-200"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
        </div>
      )}

      {/* Details Toggle Button */}
      {activeConversation && !isMobile && (
        <div className="fixed top-20 right-4 z-50">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 bg-card border border-border rounded-lg shadow-lg hover:bg-accent/50 transition-colors duration-200"
          >
            <Icon name={showDetails ? 'PanelRightClose' : 'PanelRightOpen'} size={20} />
          </button>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ChatDashboard;