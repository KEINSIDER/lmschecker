import { useState } from "react";

// 스타일 추가
const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
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
};

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#f8f9fa",
};

const headerStyles = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
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
    <div style={containerStyles}>
      <h1 style={headerStyles}>Korean Air x Insider LMS Text Counter</h1>
      <textarea
        style={textareaStyles}
        placeholder="메시지를 입력하세요..."
        value={text}
        onChange={handleChange}
      />
      <div style={{ marginBottom: "10px" }}>
        바이트 수: {byteCount} / {maxBytes}
      </div>
      <button
        style={buttonStyles}
        disabled={byteCount > maxBytes}
      >
        검증 완료
      </button>
    </div>
  );
}
