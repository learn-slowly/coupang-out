export type IssueCategory = 'labor' | 'privacy' | 'unfair-practice' | 'union-busting';

export interface Issue {
    id: string;
    category: IssueCategory;
    title: string;
    subtitle: string;
    description: string;
    facts: string[];
    sources: { title: string; url: string }[];
    shareImages: {
        instagram: string;    // 1080x1080
        instagramStory: string; // 1080x1920
        twitter: string;      // 1200x675
        facebook: string;     // 1200x630
    };
    shareText: {
        instagram: string;
        twitter: string;
        facebook: string;
        kakao: string;
    };
    hashtags: string[];
}

export const issuesData: Issue[] = [
    {
        id: 'labor-1',
        category: 'labor',
        title: '25명의 죽음',
        subtitle: '과로사, 더 이상 남의 일이 아닙니다',
        description: '2020년 이후 쿠팡에서 25명의 노동자가 사망했습니다. 압도적인 산재율과 죽음을 부르는 노동 환경.',
        facts: [
            '물류업계 평균 대비 산재율이 10배 이상 높습니다.',
            '주 72시간에 달하는 살인적인 노동 시간이 강요됩니다.',
            '혹서기/혹한기 냉난방 시설 미비로 인한 온열질환 속출.',
            '심야 로켓배송을 위한 생체리듬 파괴 노동.'
        ],
        sources: [
            { title: '한겨레: 쿠팡 노동자 사망의 진실', url: 'https://www.hani.co.kr' },
            { title: '공공운수노조 쿠팡지부 성명서', url: 'http://kctu.org' }
        ],
        shareImages: {
            instagram: '/og-image.png', // Placeholder
            instagramStory: '/og-image.png',
            twitter: '/og-image.png',
            facebook: '/og-image.png'
        },
        shareText: {
            instagram: `쿠팡에서 2020년 이후 25명이 사망했습니다.\n주 72시간 과로 노동, 더 이상 방치할 수 없습니다.\n\n자세히 보기: coupang-out.com/why\n\n#쿠팡아웃 #쿠팡불매 #노동자의생명 #과로사`,
            twitter: `쿠팡 노동자 25명 사망 (2020~)\n주 72시간 과로 노동\n\n우리의 편의가 누군가의 생명을 앗아갑니다.\n\n#쿠팡아웃 #쿠팡불매\ncoupang-out.com/why`,
            facebook: `쿠팡의 진실: 25명의 죽음\n\n2020년 이후 과로사로 목숨을 잃은 노동자가 25명.\n주 72시간 노동, 산재율은 한국 평균의 10배입니다.\n\n더 이상 침묵할 수 없습니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 노동자 25명 사망 | 쿠팡아웃`
        },
        hashtags: ['쿠팡아웃', '쿠팡불매', '노동자의생명', '과로사']
    },
    {
        id: 'privacy-1',
        category: 'privacy',
        title: '3,370만 개인정보 유출',
        subtitle: '국민 65%의 정보가 유출되었습니다',
        description: '단일 기업 최대 규모의 개인정보 유출 사고. 당신의 정보도 포함되어 있을 수 있습니다.',
        facts: [
            '3,370만 건의 개인정보가 중국 등으로 유출된 정황.',
            '5개월간 유출 사실을 인지하지 못하고 방치했습니다.',
            '지난 5년간 4차례 유출 사고 발생, 배상은 0건.',
            '블랙리스트(취업제한 명단) 불법 관리 의혹.'
        ],
        sources: [
            { title: 'MBC 뉴스데스크 보도', url: 'https://imnews.imbc.com' }
        ],
        shareImages: {
            instagram: '/og-image.png',
            instagramStory: '/og-image.png',
            twitter: '/og-image.png',
            facebook: '/og-image.png'
        },
        shareText: {
            instagram: `쿠팡 3,370만 개인정보 유출.\n국민 65%의 정보가 5개월간 무방비 상태였습니다.\n\n자세히 보기: coupang-out.com/why\n\n#쿠팡개인정보유출 #쿠팡아웃 #개인정보보호`,
            twitter: `쿠팡 3,370만 개인정보 유출\n- 국민 65% 규모\n- 5개월간 방치\n- 5년간 4차례 유출\n\n당신의 정보도 포함되어 있습니다.\n\n#쿠팡아웃 #개인정보유출\ncoupang-out.com/why`,
            facebook: `쿠팡 3,370만 개인정보 유출 사건\n\n단일 기업 최근 10년 최대 규모.\n5개월간 방치, 고객 민원으로 뒤늦게 발각.\n지난 5년간 4차례 유출, 배상 0건.\n\n우리의 정보를 지킬 수 없다면 거부합니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 3,370만 개인정보 유출 | 쿠팡아웃`
        },
        hashtags: ['쿠팡개인정보유출', '쿠팡아웃', '개인정보보호']
    },
    {
        id: 'unfair-1',
        category: 'unfair-practice',
        title: '갑질과 불공정',
        subtitle: '소상공인과 납품업체를 울리는 횡포',
        description: '독점적 지위를 이용해 납품단가를 후려치고, 자사 PB 상품을 불공정하게 우대합니다.',
        facts: [
            '자사 PB 상품 검색 순위 조작 (공정위 과징금 1400억 부과).',
            '납품업체에 타 플랫폼 판매가 인상 강요 (경영 간섭).',
            '판매자 동의 없는 일방적 반품 정책으로 손실 전가.',
            '입점 업체 상품 디자인 도용 의혹.'
        ],
        sources: [
            { title: '공정거래위원회 보도자료', url: 'https://www.ftc.go.kr' }
        ],
        shareImages: {
            instagram: '/og-image.png',
            instagramStory: '/og-image.png',
            twitter: '/og-image.png',
            facebook: '/og-image.png'
        },
        shareText: {
            instagram: `쿠팡의 갑질.\n납품업체에 타 플랫폼 가격 조정 강요.\n공정위 과징금 32억 9,700만원.\n\n자세히 보기: coupang-out.com/why\n\n#쿠팡아웃 #쿠팡갑질 #공정거래`,
            twitter: `쿠팡 갑질 문제:\n- 납품업체 가격 조정 강요\n- 중소업체 유사제품 판매\n- 직원 리뷰 조작\n\n공정위 과징금 32억 9,700만원\n\n#쿠팡아웃 #공정거래\ncoupang-out.com/why`,
            facebook: `쿠팡의 갑질 행태\n\n납품업체에 타 플랫폼 가격 조정 강요.\n중소업체 유사제품 판매, 직원 리뷰 조작.\n공정거래위원회 과징금 32억 9,700만원.\n\n중소상인이 무너지면 우리 모두가 무너집니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 갑질 문제 | 쿠팡아웃`
        },
        hashtags: ['쿠팡아웃', '쿠팡갑질', '공정거래']
    },
    {
        id: 'union-1',
        category: 'union-busting',
        title: '노조 탄압',
        subtitle: '노동자의 목소리를 듣지 않는 기업',
        description: '노동자의 목소리를 조직적으로 묵살합니다',
        facts: [
            '노조 가입 직원에 대한 표적 감사 및 괴롭힘.',
            '취업제한 블랙리스트 운용 (노조 활동가 재취업 불가).',
            '노사 협의 거부 및 시간 끌기, 부당노동행위.',
            '현장 휴대전화 반입 금지 등 과도한 통제.'
        ],
        sources: [
            { title: '민주노총 고발 자료', url: 'http://nodong.org' }
        ],
        shareImages: {
            instagram: '/og-image.png',
            instagramStory: '/og-image.png',
            twitter: '/og-image.png',
            facebook: '/og-image.png'
        },
        shareText: {
            instagram: `쿠팡의 노조 탄압.\n노조활동 방해, 단체협약 미이행.\n노동자의 목소리를 묵살합니다.\n\n자세히 보기: coupang-out.com/why\n\n#쿠팡아웃 #노조탄압 #노동권`,
            twitter: `쿠팡 노조 탄압:\n- 노조활동 방해\n- 단체협약 미이행\n- 노동자 목소리 묵살\n\n노동권은 헌법이 보장하는 기본권입니다.\n\n#쿠팡아웃 #노동권\ncoupang-out.com/why`,
            facebook: `쿠팡의 노조 탄압\n\n노조활동 방해, 단체협약 미이행.\n노동자의 정당한 권리 행사를 막고 있습니다.\n\n노동권은 헌법이 보장하는 기본권입니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 노조 탄압 문제 | 쿠팡아웃`
        },
        hashtags: ['쿠팡아웃', '노조탄압', '노동권']
    }
];

export const categoryLabels: Record<IssueCategory, string> = {
    'labor': '노동 문제',
    'privacy': '개인정보 유출',
    'unfair-practice': '갑질/불공정',
    'union-busting': '노조 탄압'
};
