import { useState } from "react";

// 인라인 스타일 정의
const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#57BBEB",
  color: "#051766",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

const textareaStyles = {
  width: "100%",
  height: "120px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginBottom: "10px",
  backgroundColor: "#DBE2E9",
};

export default function KoreanAirLMSCounter() {
  const [text, setText] = useState("");
  const [byteCount, setByteCount] = useState(0);
  const maxBytes = 2610;

  const calculateBytes = (input) => {
    const encoder = new TextEncoder();
    return encoder.encode(input).length;
  };

  const handleChange = (e) => {
    const inputText = e.target.value;
    const bytes = calculateBytes(inputText);
    setText(inputText);
    setByteCount(bytes);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      {/* 로고 및 제목 */}
      <div className="flex justify-between w-full max-w-3xl items-center mb-6">
        <img
          src="https://www.koreanair.com/global/common/img/airline/logo_kr.png"
          alt="Korean Air Logo"
          className="h-12"
        />
        <h1 className="text-2xl font-bold" style={{ color: "#051766", fontFamily: "Noto Sans, sans-serif" }}>
          Korean Air x Insider LMS Text Counter
        </h1>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Insider_Logo.svg/2048px-Insider_Logo.svg.png"
          alt="Insider Logo"
          className="h-12"
        />
      </div>

      {/* 입력창 및 바이트 카운터 */}
      <div className="w-full max-w-2xl p-6 shadow-lg rounded-lg bg-white">
        <textarea
          className="w-full h-40 p-2 border rounded"
          placeholder="메시지를 입력하세요..."
          value={text}
          onChange={handleChange}
          style={textareaStyles}
        />
        <div className="mt-2 text-right font-semibold" style={{ color: "#051766", fontFamily: "Noto Sans, sans-serif" }}>
          바이트 수: {byteCount} / {maxBytes}
        </div>
        <button
          style={buttonStyles}
          className="mt-4 w-full"
          disabled={byteCount > maxBytes}
        >
          검증 완료
        </button>
      </div>
    </div>
  );
}
