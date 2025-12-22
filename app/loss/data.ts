export interface Story {
    id: string;
    theme: "overwork" | "blacklist" | "fake-goods" | "data-leak" | "algorithm";
    character: string;
    title: string;
    subtitle: string;
    content: string;
    stat: {
        label: string;
        value: number;
        unit: string;
    };
    highlight: string;
}

export const stories: Story[] = [
    {
        id: "story-1",
        theme: "overwork",
        character: "50대 택배기사 민수 씨",
        title: "새벽 4시의 심정지",
        subtitle: "편리함 뒤에 숨겨진 237개의 물량",
        content: "주 6일, 밤 9시부터 아침 7시까지. 식사도 휴식도 없이 '개처럼 뛰어야' 했던 그는 결국 쓰러졌습니다. 쿠팡은 과로사를 인정하지 않고 소송을 제기했습니다.",
        stat: { label: "남은 배송 물량", value: 237, unit: "개" },
        highlight: "심장이 멈춘 시간, 새벽배송은 멈추지 않았습니다.",
    },
    {
        id: "story-2",
        theme: "blacklist",
        character: "물류센터 노동자 지은 씨",
        title: "이름 없는 블랙리스트",
        subtitle: "엑셀 파일에 갇힌 16,450명의 삶",
        content: "노조 활동을 했다는 이유로 '정상 업무 불가' 낙인이 찍혔습니다. 제보자는 고소당했고, 경찰은 압수수색을 했습니다. 사과는 늦었고 피해는 현재진행형입니다.",
        stat: { label: "블랙리스트 등재", value: 16450, unit: "명" },
        highlight: "당신의 이름도 이 리스트에 있을지 모릅니다.",
    },
    {
        id: "story-3",
        theme: "fake-goods",
        character: "소비자 수진 & 혜영 씨",
        title: "가짜와의 전쟁",
        subtitle: "알고리즘이 추천한 위험",
        content: "유명 브랜드 속옷인 줄 알고 샀더니 짝퉁이었고, 정품인 줄 안 영양제는 가짜였습니다. 쿠팡은 '판매자 책임'이라며 뒤로 물러났습니다.",
        stat: { label: "플랫폼 책임", value: 0, unit: "%" },
        highlight: "오픈마켓의 면책 조항 뒤에 숨은 거대 플랫폼.",
    },
    {
        id: "story-4",
        theme: "data-leak",
        character: "탈퇴 회원 철민 씨",
        title: "3,370만 명의 유출",
        subtitle: "탈퇴해도 지워지지 않는 그림자",
        content: "4년 전 탈퇴했는데 스미싱 문자가 옵니다. 중국 해커의 손에 넘어간 내 정보. 전 국민의 과반수가 잠재적 보이스피싱 피해자가 되었습니다.",
        stat: { label: "개인정보 유출", value: 33700000, unit: "건" },
        highlight: "당신의 정보는 이미 공공재가 되었습니다.",
    },
    {
        id: "story-5",
        theme: "algorithm",
        character: "소상공인 하민씨",
        title: "64,250개의 장벽",
        subtitle: "기울어진 검색창과 투명인간이 된 셀러들",
        content: "쿠팡이 알고리즘을 조작해서 검색순위 상위에 고정 노출시킨 자기 상품(PB 및 직매입)의 수. 공정한 경쟁을 믿고 입점한 소상공인들의 상품은 보이지 않는 곳으로 밀려났습니다.",
        stat: { label: "상위 고정 노출", value: 64250, unit: "개" },
        highlight: "출처: 공정거래위원회 보도자료, 2024년 8월 최종 의결",
    },
];
