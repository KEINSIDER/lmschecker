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
    width: "auto", // 버튼 너비 자동 설정
    margin: "0 10px", // 버튼 간격 조정
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
   jsonOutput: {
    width: "100%",
    height: "200px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "12px",
    backgroundColor: "#f4f4f4",
    fontSize: "16px",
    color: "#333",
    whiteSpace: "pre-wrap",
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
  const [charCount, setCharCount] = useState(0); // 공백만 제외한 글자 수
  const [status, setStatus] = useState(""); // 상태 메시지 추가
  const [jsonOutput, setJsonOutput] = useState(""); // 🔹 JSON 출력 상태 추가
  const [showTooltip, setShowTooltip] = useState(false);
  const maxBytes = 2600;

  const calculateBytes = (input) => {
    const encoder = new TextEncoder();
    return encoder.encode(input).length;
  };
  
 const calculateCharacters = (input) => {
  return input.replace(/\s/g, "").length; // 공백만 제외하고 글자 수 세기
};
  
   const handleChange = (e) => {
  const inputText = e.target.value;
  const bytes = calculateBytes(inputText);
  const chars = calculateCharacters(inputText); // 공백만 제외한 글자 수 계산
  setText(inputText);
  setByteCount(bytes);
  setCharCount(chars); // 글자 수 업데이트
  setStatus(""); // 입력할 때마다 상태 초기화
};

const maxChars = 1000;  // 글자 수 최대값
  
 const handleClick = () => {
  if (byteCount <= maxBytes && charCount <= maxChars) {
    setStatus("✅ OK TO GO!");
  } else {
    setStatus("❌ Too Many Bytes or Characters!");
  }
};

   const convertToJson = () => {
    const jsonData = {
      MESSAGE: text,
    };
   setText(JSON.stringify(jsonData, null, 2)); // 🔹 JSON을 입력창에 직접 출력
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
     <div style={styles.byteCount} className="mb-4">
         Character Count (Excl. spaces): {charCount} / {maxChars}
       </div>

      {/* 검증 하기 버튼 */}
     <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: "10px" }}>
     <button
     style={styles.button}
     onClick={handleClick} // ✅ 툴팁 포함된 Verify 버튼 유지
     onMouseOver={() => setShowTooltip(true)}
     onMouseOut={() => setShowTooltip(false)}
     >
     Verify
     </button>

  <button style={styles.button} onClick={convertToJson}>
    Convert to JSON
  </button>

  {/* ✅ 툴팁 */}
  <div
    style={{
      ...styles.tooltip,
      ...(showTooltip ? styles.tooltipVisible : {}),
    }}
  >
    최대 {maxBytes}바이트, {maxChars}자 까지 입력 가능
  </div>
</div>

        {/* JSON 출력 */}
        {jsonOutput && (
          <textarea readOnly value={jsonOutput} style={styles.jsonOutput} />
        )}

        {/* 상태 메시지 */}
        {status && <div style={styles.statusMessage}>{status}</div>}
      </div>
    </div>
  );
}
