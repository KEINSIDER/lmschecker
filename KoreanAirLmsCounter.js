import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";  // 상대경로로 수정
import { Textarea } from "../components/ui/textarea";  // 상대경로로 수정
import { Button } from "../components/ui/button";  // 상대경로로 수정

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
    <div className="flex flex-col items-center p-6">
      <header className="flex justify-between items-center w-full">
        <img
          src="/KoreanAirLogo.png"  // 로고 경로, 프로젝트 내 저장된 위치에 맞게 수정
          alt="Korean Air Logo"
          className="w-16"
        />
        <h1 className="text-2xl font-bold mb-4 text-[#051766]">Korean Air x Insider LMS Text Counter</h1>
        <img
          src="/InsiderLogo.png"  // 로고 경로, 프로젝트 내 저장된 위치에 맞게 수정
          alt="Insider Logo"
          className="w-16"
        />
      </header>
      <Card className="w-full max-w-2xl p-4 bg-[#DBE2E9]">
        <CardContent>
          <Textarea
            className="w-full h-40 p-2 border rounded bg-[#DBE2E9]"
            placeholder="메시지를 입력하세요..."
            value={text}
            onChange={handleChange}
          />
          <div className="mt-2 text-right font-semibold text-[#051766]">
            바이트 수: {byteCount} / {maxBytes}
          </div>
          <Button
            className="mt-4 w-full bg-[#57BBEB] text-[#051766] hover:bg-[#3a8dbf]"
            disabled={byteCount > maxBytes}
          >
            검증 완료
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
