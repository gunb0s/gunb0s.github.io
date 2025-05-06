import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김보성 - Kotlin 서버 개발자",
  description:
    "AI 기반 Agent 시스템과 인프라에 관심 있는 Kotlin 서버 개발자 김보성의 포트폴리오입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
