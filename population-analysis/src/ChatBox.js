import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Xin chào! Tôi có thể giúp gì cho bạn về phân tích dân số?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    const userQuestion = input;
    setInput('');

    setTimeout(() => {
      const botReply = getBotReply(userQuestion);
      setMessages([...newMessages, { text: botReply, sender: 'bot' }]);
    }, 500);
  };

  const getBotReply = (question) => {
    const q = question.toLowerCase();
    
    // Câu hỏi về Việt Nam
    if (q.includes('việt nam') || q.includes('viet nam') || q.includes('vn')) {
      if (q.includes('dân số') || q.includes('dan so')) {
        return 'Việt Nam có dân số khoảng 98.8 triệu người (2024-2025). Đây là quốc gia đông dân thứ 15 thế giới.';
      }
      if (q.includes('tăng trưởng') || q.includes('tang truong')) {
        return 'Tỷ lệ tăng trưởng dân số Việt Nam là 0.76%/năm. Việt Nam đang ở giai đoạn "cơ cấu dân số vàng" với tỷ lệ lao động cao.';
      }
      if (q.includes('tuổi') || q.includes('gia')) {
        return 'Tuổi trung vị của Việt Nam là 32.5 tuổi. Dân số còn khá trẻ, tạo lợi thế về nguồn lao động.';
      }
      if (q.includes('sinh')) {
        return 'Tỷ lệ sinh của Việt Nam là 14.8‰ (14.8 trên 1000 người). Tỷ lệ này đang giảm dần theo xu hướng phát triển.';
      }
      if (q.includes('tử') || q.includes('chết')) {
        return 'Tỷ lệ tử của Việt Nam là 7.2‰. Tỷ lệ này thấp hơn nhiều so với tỷ lệ sinh, cho thấy dân số vẫn đang tăng.';
      }
      if (q.includes('2026') || q.includes('tương lai') || q.includes('dự báo')) {
        return 'Dự báo đến năm 2026, dân số Việt Nam sẽ tăng lên khoảng 99.5 triệu người. Bạn có thể xem chi tiết tại tab "Dự Báo"!';
      }
      return 'Việt Nam đang ở giai đoạn "cơ cấu dân số vàng" với 70% dân số trong độ tuổi lao động. Đây là cơ hội lớn cho phát triển kinh tế!';
    }
    
    // Câu hỏi về Nhật Bản
    if (q.includes('nhật') || q.includes('nhat') || q.includes('japan')) {
      if (q.includes('dân số')) {
        return 'Nhật Bản có 123.3 triệu dân nhưng đang suy giảm (-0.53%/năm). Đây là vấn đề nghiêm trọng của Nhật.';
      }
      if (q.includes('già') || q.includes('gia')) {
        return 'Nhật Bản là một trong những quốc gia già nhất thế giới với tuổi trung vị 49.1 tuổi. Hơn 28% dân số trên 65 tuổi.';
      }
      return 'Nhật Bản đang đối mặt với khủng hoảng già hóa dân số nghiêm trọng. Tỷ lệ sinh chỉ 6.9‰, thấp nhất trong các quốc gia được phân tích.';
    }
    
    // Câu hỏi về Nigeria
    if (q.includes('nigeria')) {
      if (q.includes('dân số')) {
        return 'Nigeria có 223.8 triệu dân và đang tăng trưởng cực nhanh (2.53%/năm). Dự kiến sẽ trở thành quốc gia đông dân thứ 3 thế giới vào 2050.';
      }
      if (q.includes('trẻ')) {
        return 'Nigeria có dân số rất trẻ với tuổi trung vị chỉ 18.6 tuổi. Hơn 40% dân số dưới 15 tuổi!';
      }
      return 'Nigeria đang ở giai đoạn bùng nổ dân số với tỷ lệ sinh cao (35.2‰). Đây là cả cơ hội và thách thức lớn.';
    }
    
    // Câu hỏi về Hoa Kỳ
    if (q.includes('mỹ') || q.includes('my') || q.includes('hoa kỳ') || q.includes('usa') || q.includes('america')) {
      return 'Hoa Kỳ có 341.8 triệu dân, tăng trưởng 0.43%/năm chủ yếu nhờ nhập cư. Tuổi trung vị là 38.9 tuổi.';
    }
    
    // Câu hỏi về Đức
    if (q.includes('đức') || q.includes('duc') || q.includes('germany')) {
      return 'Đức có 84.5 triệu dân, tuổi trung vị 47.8 tuổi. Dân số gần như không tăng (0.17%/năm) nhờ nhập cư bù đắp tỷ lệ sinh thấp.';
    }
    
    // Câu hỏi chung về dân số
    if (q.includes('dân số') || q.includes('dan so')) {
      return 'Ứng dụng này phân tích dân số của 5 quốc gia: Việt Nam, Nhật Bản, Nigeria, Hoa Kỳ và Đức. Bạn muốn biết về quốc gia nào?';
    }
    
    // Câu hỏi về dự báo
    if (q.includes('dự báo') || q.includes('du bao') || q.includes('tương lai') || q.includes('tuong lai')) {
      return 'Bạn có thể xem dự báo dân số chi tiết ở tab "Dự Báo". Tại đó bạn có thể tùy chỉnh tỷ lệ sinh, tỷ lệ tử và số năm dự báo!';
    }
    
    // Câu hỏi về tháp dân số
    if (q.includes('tháp') || q.includes('thap') || q.includes('pyramid')) {
      return 'Tab "Tháp Dân Số" hiển thị phân bố dân số theo độ tuổi và giới tính. Đây là công cụ quan trọng để hiểu cấu trúc dân số!';
    }
    
    // Câu hỏi về so sánh
    if (q.includes('so sánh') || q.includes('so sanh') || q.includes('khác nhau')) {
      return 'Tab "So Sánh" cho phép bạn đối chiếu các chỉ số dân số giữa 5 quốc gia: dân số, tăng trưởng, tuổi trung vị, tỷ lệ sinh/tử.';
    }
    
    // Câu hỏi về già hóa
    if (q.includes('già') || q.includes('gia') || q.includes('aging')) {
      return 'Nhật Bản và Đức đang già hóa nghiêm trọng. Việt Nam cũng sẽ già hóa nhanh trong 20-30 năm tới nếu tỷ lệ sinh tiếp tục giảm.';
    }
    
    // Câu hỏi về tăng trưởng
    if (q.includes('tăng') || q.includes('tang') || q.includes('growth')) {
      return 'Nigeria tăng nhanh nhất (2.53%/năm), Việt Nam tăng ổn định (0.76%), còn Nhật Bản và Đức đang suy giảm dân số.';
    }
    
    // Câu hỏi về AI
    if (q.includes('ai') || q.includes('trí tuệ')) {
      return 'AI giúp phân tích dữ liệu dân số từ nhiều nguồn, tạo dự báo chính xác và phát hiện xu hướng sớm. Dưới cùng trang có phần "AI và Nghiên Cứu Dân Số"!';
    }
    
    // Câu hỏi hướng dẫn
    if (q.includes('làm sao') || q.includes('lam sao') || q.includes('cách') || q.includes('how')) {
      return 'Bạn có thể:\n• Chọn quốc gia để xem dữ liệu\n• Chuyển tab để xem các phân tích khác nhau\n• Ở tab Dự Báo, kéo thanh trượt để tùy chỉnh tỷ lệ sinh/tử\n• So sánh các quốc gia ở tab So Sánh';
    }
    
    // Câu trả lời mặc định
    return 'Câu hỏi hay đấy! Bạn có thể khám phá các tab khác nhau để tìm hiểu thêm về:\n• Tổng Quan - Thống kê tổng quát\n• Dự Báo - Dự đoán tương lai\n• Tháp Dân Số - Cấu trúc độ tuổi\n• So Sánh - Đối chiếu các quốc gia\n\nHoặc hỏi tôi về một quốc gia cụ thể!';
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-all hover:scale-110 animate-bounce"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col" style={{ height: '500px' }}>
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-bold">Trợ lý AI Dân Số</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                }`}>
                  <p className="whitespace-pre-line text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi về dân số..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;