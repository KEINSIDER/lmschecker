import { useState } from "react";

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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Korean Air x Insider LMS Text Counter</h1>
      <textarea
        style={{ width: "80%", height: "100px", marginBottom: "10px" }}
        placeholder="메시지를 입력하세요..."
        value={text}
        onChange={handleChange}
      />
      <div>바이트 수: {byteCount} / {maxBytes}</div>
      <button disabled={byteCount > maxBytes} style={{ marginTop: "10px" }}>
        검증 완료
      </button>
    </div>
  );
}
