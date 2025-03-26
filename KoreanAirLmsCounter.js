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
    padding: "24px 40px", // 버튼 크기 두 배로 증가
    backgroundColor: "#57BBEB !important", // 🔥 강제 적용
    color: "#051766 !important", // 🔥 강제 적용
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px !important", // 🔥 강제 적용
    width: "100%",
    position: "relative",
    display: "block", // 버튼 가운데 정렬을 위해 block 지정
    margin: "0 auto", // 가운데 정렬
  },
  textarea: {
    width: "100%", // 넓이 100%로 설정함
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
    marginBottom: "20px", // 🔹 버튼과 간격 추가
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
   tooltip: {
    visibility: "hidden",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "5px 10px",
    borderRadius: "5px",
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
    whiteSpace: "nowrap",
  },
  tooltipVisible: {
    visibility: "visible",
    opacity: 1,
  },
};

export default function KoreanAirLMSCounter() {
  const [text, setText] = useState("");
  const [byteCount, setByteCount] = useState(0);
  const [status, setStatus] = useState(""); // 상태 메시지 추가
  const [showTooltip, setShowTooltip] = useState(false);
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
    setStatus(""); // 🔹 입력할 때마다 상태 초기화
  };

 const handleClick = () => {
    if (byteCount <= maxBytes) {
      setStatus("✅ OK TO GO!");
    } else {
      setStatus("❌ Too Many Bytes!");
    }
  };

  return (
    <div style={styles.container}>
      {/* 🔹 상단 제목 */}
      <h1 style={styles.header}>Korean Air LMS Byte Checker</h1>

     {/* 🔹 입력창 & 바이트 카운터 & 버튼 */}
    <div className="w-full max-w-screen-xl p-6 shadow-lg rounded-lg bg-white">
        <textarea
          placeholder="메시지를 입력하세요..."
          value={text}
          onChange={handleChange}
          style={styles.textarea}
        />
      <div style={styles.byteCount} className="mb-4">
          Byte Count: {byteCount} / {maxBytes}
        </div>

      {/* 검증 완료 버튼 */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={styles.button}
            onClick={handleClick} // 버튼 클릭 시 상태 메시지 변경
            onMouseOver={() => setShowTooltip(true)}
            onMouseOut={() => setShowTooltip(false)}
          >
            Verify
          </button>
          <div
            style={{
              ...styles.tooltip,
              ...(showTooltip ? styles.tooltipVisible : {}),
            }}
          >
            최대 {maxBytes}바이트까지 입력 가능
          </div>
        </div>

        {/* 상태 메시지 */}
        {status && <div style={styles.statusMessage}>{status}</div>}
      </div>
    </div>
  );
}
