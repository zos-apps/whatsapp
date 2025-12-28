import React, { useState } from 'react';

interface WhatsAppProps {
  onClose: () => void;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

interface Message {
  id: string;
  text: string;
  time: string;
  sent: boolean;
  read: boolean;
}

const mockChats: Chat[] = [
  { id: '1', name: 'Family Group', avatar: '👨‍👩‍👧‍👦', lastMessage: 'Mom: See you this weekend!', time: '10:30 AM', unread: 5 },
  { id: '2', name: 'Alice', avatar: '👩', lastMessage: 'That sounds great!', time: '9:45 AM', unread: 0 },
  { id: '3', name: 'Work Team', avatar: '💼', lastMessage: 'John: Meeting at 3pm', time: 'Yesterday', unread: 12 },
  { id: '4', name: 'Bob', avatar: '👨', lastMessage: 'Thanks for the help!', time: 'Yesterday', unread: 0 },
  { id: '5', name: 'Gym Buddies', avatar: '🏋️', lastMessage: 'Chris: Leg day tomorrow?', time: 'Tuesday', unread: 3 },
];

const mockMessages: Message[] = [
  { id: '1', text: 'Hey! How are you?', time: '9:30 AM', sent: false, read: true },
  { id: '2', text: 'I\'m doing great, thanks! Just finished a big project.', time: '9:32 AM', sent: true, read: true },
  { id: '3', text: 'That\'s awesome! We should celebrate 🎉', time: '9:35 AM', sent: false, read: true },
  { id: '4', text: 'Definitely! Dinner this weekend?', time: '9:40 AM', sent: true, read: true },
  { id: '5', text: 'That sounds great!', time: '9:45 AM', sent: false, read: true },
];

const WhatsApp: React.FC<WhatsAppProps> = ({ onClose }) => {
  const [chats] = useState(mockChats);
  const [messages] = useState(mockMessages);
  const [selectedChat, setSelectedChat] = useState<string | null>('2');
  const [newMessage, setNewMessage] = useState('');

  const selectedChatData = chats.find(c => c.id === selectedChat);

  return (
    <div className="h-full flex bg-[#111b21]">
      {/* Chat List */}
      <div className="w-[400px] flex flex-col border-r border-[#2a373f]">
        <div className="h-14 bg-[#202c33] flex items-center justify-between px-4">
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex gap-4 text-[#aebac1]">
            <button className="hover:text-white">👥</button>
            <button className="hover:text-white">💬</button>
            <button className="hover:text-white">⋮</button>
          </div>
        </div>

        <div className="p-2">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full px-4 py-2 bg-[#202c33] rounded-lg text-sm text-white placeholder:text-[#8696a0] focus:outline-none"
          />
        </div>

        <div className="flex-1 overflow-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors
                ${selectedChat === chat.id ? 'bg-[#2a3942]' : 'hover:bg-[#202c33]'}
              `}
            >
              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-2xl shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0 border-b border-[#2a373f] pb-3">
                <div className="flex justify-between">
                  <span className="text-white font-medium">{chat.name}</span>
                  <span className={`text-xs ${chat.unread > 0 ? 'text-[#00a884]' : 'text-[#8696a0]'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-sm text-[#8696a0] truncate">{chat.lastMessage}</span>
                  {chat.unread > 0 && (
                    <span className="bg-[#00a884] text-black text-xs font-medium px-1.5 py-0.5 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat View */}
      {selectedChatData ? (
        <div className="flex-1 flex flex-col">
          <div className="h-14 bg-[#202c33] flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl">
                {selectedChatData.avatar}
              </div>
              <div>
                <div className="text-white font-medium">{selectedChatData.name}</div>
                <div className="text-xs text-[#8696a0]">online</div>
              </div>
            </div>
            <div className="flex gap-4 text-[#aebac1]">
              <button className="hover:text-white">📹</button>
              <button className="hover:text-white">📞</button>
              <button className="hover:text-white">🔍</button>
              <button className="hover:text-white">⋮</button>
            </div>
          </div>

          <div
            className="flex-1 overflow-auto p-4 space-y-2"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23182229\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
          >
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[65%] px-3 py-2 rounded-lg ${
                  msg.sent ? 'bg-[#005c4b]' : 'bg-[#202c33]'
                }`}>
                  <p className="text-white">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs text-[#8696a0]">{msg.time}</span>
                    {msg.sent && (
                      <span className="text-xs text-[#53bdeb]">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#202c33] p-3 flex items-center gap-3">
            <button className="text-[#8696a0] hover:text-white text-xl">😊</button>
            <button className="text-[#8696a0] hover:text-white text-xl">📎</button>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 px-4 py-2 bg-[#2a3942] rounded-lg text-white placeholder:text-[#8696a0] focus:outline-none"
            />
            <button className="text-[#8696a0] hover:text-white text-xl">
              {newMessage ? '📤' : '🎤'}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#222e35]">
          <div className="text-center text-[#8696a0]">
            <div className="text-6xl mb-4">📱</div>
            <h2 className="text-3xl text-white/80 mb-2">WhatsApp Web</h2>
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsApp;
