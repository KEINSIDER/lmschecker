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
    <div className="flex flex-col items-center p-6" style={{ backgroundColor: "#FFFFFF" }}>
      {/* 왼쪽 KOREAN AIR 로고 추가 */}
      <div className="flex justify-between w-full items-center mb-6">
        <img
          src="https://www.koreanair.com/global/common/img/airline/logo_kr.png"
          alt="Korean Air Logo"
          className="h-12"
        />
        <h1 className="text-2xl font-bold" style={{ color: "#051766", fontFamily: "'Noto Sans', sans-serif" }}>
          Korean Air x Insider LMS Text Counter
        </h1>
        {/* 오른쪽 Insider 로고 추가 */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Insider_Logo.svg/2048px-Insider_Logo.svg.png"
          alt="Insider Logo"
          className="h-12"
        />
      </div>

      <Card className="w-full max-w-2xl p-4">
        <CardContent>
          {/* 입력창 배경색 변경 */}
          <Textarea
            className="w-full h-40 p-2 border rounded"
            placeholder="메시지를 입력하세요..."
            value={text}
            onChange={handleChange}
            style={{ backgroundColor: "#DBE2E9" }}
          />
          {/* 바이트 수 색상 변경 */}
          <div className="mt-2 text-right font-semibold" style={{ color: "#051766" }}>
            바이트 수: {byteCount} / {maxBytes}
          </div>
          {/* 버튼 배경색과 글자색 변경 */}
          <Button
            className="mt-4 w-full"
            style={{
              backgroundColor: "#57BBEB",
              color: "#051766",
            }}
            disabled={byteCount > maxBytes}
          >
            검증 완료
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
