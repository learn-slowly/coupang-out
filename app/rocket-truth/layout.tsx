import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로켓의 진실 | 쿠팡아웃",
  description: "편리함 뒤에 숨겨진 28명의 죽음, 그리고 3,370만 명의 개인정보 유출. 로켓배송의 검은 상자를 엽니다.",
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
