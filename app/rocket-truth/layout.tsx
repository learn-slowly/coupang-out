import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로켓의 진실 - 멈추지 않는 기계의 비밀",
  description: "쿠팡의 혁신 뒤에 숨겨진 25명의 죽음, 3370만명의 개인정보 유출, 그리고 당신의 책임을 묻는 인터랙티브 웹 다큐멘터리.",
  openGraph: {
    title: "로켓의 진실 - 멈추지 않는 기계의 비밀",
    description: "편리함의 대가는 누가 치르고 있습니까? 쿠팡의 어두운 이면을 파헤치는 인터랙티브 다큐멘터리.",
    images: [
      {
        url: "/assets/factory_conveyor_belt_1766288487225.png", // 대표 이미지로 사용
        width: 1200,
        height: 630,
        alt: "로켓의 진실 - 멈추지 않는 기계",
      },
    ],
  },
};

export default function RocketTruthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
