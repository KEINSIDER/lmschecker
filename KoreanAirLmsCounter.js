import { useState } from "react";

// 🔹 스타일 지정 (색상 & 크기 강제 적용)
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#57BBEB !important", // 🔥 강제 적용
    color: "#051766 !important", // 🔥 강제 적용
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px !important", // 🔥 강제 적용
    width: "100%",
  },
  textarea: {
    width: "100%", // 넓이 100%로 설정
    height: "600px", // 높이를 크게 설정
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "12px",
    backgroundColor: "#DBE2E9 !important", // 🔥 강제 적용
    fontSize: "18px !important", // 🔥 강제 적용
    color: "#051766 !important", // 🔥 강제 적용
  },
  byteCount: {
    marginTop: "12px",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "16px !important", // 🔥 강제 적용
    color: "#051766 !important", // 🔥 강제 적용
  },
  header: {
    fontSize: "26px !important", // 🔥 강제 적용
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#051766 !important", // 🔥 강제 적용
  },
  statusMessage: {
    marginTop: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#051766",
  },
};

export default function KoreanAirLMSCounter() {
  const [text, setText] = useState("");
  const [byteCount, setByteCount] = useState(0);
  const [status, setStatus] = useState(""); // 상태 메시지 추가
  const maxBytes = 2760;

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

  const handleClick = () => {
    if (byteCount <= maxBytes) {
      setStatus("OK TO GO!"); // 한도 이내일 경우
    } else {
      setStatus("Too Many Bytes!"); // 한도 초과일 경우
    }
  };

  return (
    <div style={styles.container}>
      {/* 🔹 상단 제목 */}
      <h1 style={styles.header}>Korean Air x Insider LMS Text Counter</h1>

      {/* 🔹 입력창 및 바이트 카운터 */}
      <div className="w-full max-w-full p-6 shadow-lg rounded-lg bg-white">
        <textarea
          placeholder="메시지를 입력하세요..."
          value={text}
          onChange={handleChange}
          style={styles.textarea}
        />
        <div style={styles.byteCount}>
          바이트 수: {byteCount} / {maxBytes}
        </div>

        {/* 검증 완료 버튼 */}
        <button
          style={styles.button}
          disabled={byteCount > maxBytes}
          onClick={handleClick} // 버튼 클릭 시 상태 메시지 변경
        >
          검증 완료
        </button>

        {/* 상태 메시지 */}
        {status && <div style={styles.statusMessage}>{status}</div>}
      </div>
    </div>
  );
}
