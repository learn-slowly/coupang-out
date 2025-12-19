export type IssueCategory = 'labor' | 'privacy' | 'unfair-practice' | 'union-busting';

export interface Issue {
    id: string;
    category: IssueCategory;
    title: string;
    subtitle: string;
    description: string;
    facts: string[];
    laws?: string[]; // Added field
    sources: { title: string; url: string }[];
    shareImages: {
        instagram: string;
        instagramStory: string;
        twitter: string;
        facebook: string;
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
    // 1. Privacy
    {
        id: 'privacy-1',
        category: 'privacy',
        title: '3,370만 명 개인정보 유출',
        subtitle: '국민 65%의 정보가 무단 노출되었습니다',
        description: '약 3,370만 개 고객 계정의 이름, 전화번호 등 개인정보가 외부에 무단 노출되어 스미싱, 보이스피싱 등 2차 피해로 이어진 역대급 보안 사고입니다.',
        facts: [
            '피해 규모 약 3,370만 계정 (중국 등으로 유출 정황).',
            '11월 18일 인지 후 조사 과정에서 확인, 정부 민관합동조사단 조사 중.',
            '유출된 정보로 인한 "쿠팡 배송/쿠폰" 미끼 문자 및 보이스피싱 급증.',
            '비밀번호 등 민감 정보 포함 여부에 대한 우려 지속.'
        ],
        laws: [
            '개인정보보호법 제28조의2 (안전성 확보 의무)',
            '개인정보보호법 제29조 (안전조치 의무)',
            '정보통신망법 (개인정보 보호조치 의무)',
            '전자금융거래법 (전자적 침해사고 방지 의무)'
        ],
        sources: [
            { title: '매일신문: 1인당 10만원 배상 시 3조원', url: 'https://www.imaeil.com/page/view/2025113000050842352' },
            { title: '중앙일보: 3370만 개인정보 무단 노출', url: 'https://www.joongang.co.kr/article/25386202' },
            { title: '다음뉴스: 과징금 수조원대 나올까', url: 'https://v.daum.net/v/20251201053146055' }
        ],
        shareImages: {
            instagram: '/og-image.png',
            instagramStory: '/og-image.png',
            twitter: '/og-image.png',
            facebook: '/og-image.png'
        },
        shareText: {
            instagram: `쿠팡 3,370만 개인정보 유출.\n국민 65%의 정보가 털렸습니다.\n스미싱, 보이스피싱 2차 피해 주의하세요.\n\n자세히 보기: coupang-out.com/why\n\n#쿠팡개인정보유출 #쿠팡아웃 #보안사고`,
            twitter: `쿠팡 3,370만 명 개인정보 유출\n- 국민 65% 규모 피해\n- 2차 스미싱 피해 급증\n- 안전조치 의무 위반 의혹\n\n내 정보는 안전한가요?\n#쿠팡아웃 #개인정보유출\ncoupang-out.com/why`,
            facebook: `쿠팡 역대급 개인정보 유출 사고\n\n무려 3,370만 계정의 정보가 유출되었습니다.\n국민 65%가 피해자일 수 있습니다.\n정부 조사 진행 중, 2차 피해에 주의하세요.\n\ncoupang-out.com/why`,
            kakao: `쿠팡 3,370만 명 개인정보 유출 심각 | 쿠팡아웃`
        },
        hashtags: ['쿠팡개인정보유출', '정보보호', '쿠팡아웃', '보안불감증']
    },

    // 2. Labor (Health & Night Work)
    {
        id: 'labor-1',
        category: 'labor',
        title: '새벽배송과 건강 위협',
        subtitle: '밤 11시 59분부터 시작되는 죽음의 레이스',
        description: '0~7시 전면 새벽배송 시스템은 노동자의 생체 리듬을 파괴합니다. 높은 노동강도와 장시간 심야 노동은 과로사와 직결됩니다.',
        facts: [
            '유일하게 0~7시 전국 단위 새벽배송 운영 (과도한 노동강도).',
            '밤 11시 59분 주문도 다음 날 새벽배송해야 하는 압박 구조.',
            '노조 요구: "0~5시 초심야 배송 제한" 및 건강권 보장.',
            '2020년 이후 사망 노동자 25명 중 17명이 과로사 추정.'
        ],
        laws: [
            '산업안전보건법 제5조 (사업주의 안전·보건조치 의무)',
            '근로기준법 제52조 (연장근로 제한), 제56조 (야간수당)',
            'WHO/ILO 국제 기준 위반 소지 (야간노동 규제)'
        ],
        sources: [
            { title: '프레시안: 왜 택배기사는 말할 수 없는가', url: 'https://www.pressian.com/pages/articles/2025110607473967127' },
            { title: '한겨레: 노동자를 잡는 시간', url: 'https://www.hani.co.kr/arti/society/labor/1229437.html' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `새벽배송의 편리함 뒤에 숨겨진 진실.\n매일 밤 노동자들은 생명을 담보로 달립니다.\n2020년 이후 25명 사망.\n\n#쿠팡아웃 #과로사 #새벽배송`,
            twitter: `쿠팡의 심야노동 실태\n- 0~7시 전면 새벽배송\n- 25명 사망 (17명 과로사 추정)\n\n편리함이 누군가의 고통이 되어서는 안 됩니다.\ncoupang-out.com/why`,
            facebook: `죽음의 새벽배송을 멈춰주세요.\n\n쿠팡의 혁신은 노동자의 피로 만들어집니다.\n심야노동 제한과 건강권 보장이 필요합니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 새벽배송 노동자의 눈물 | 쿠팡아웃`
        },
        hashtags: ['과로사', '새벽배송', '노동건강권', '쿠팡아웃']
    },

    // 3. Labor (Industrial Accidents)
    {
        id: 'labor-2',
        category: 'labor',
        title: '과로사와 산업재해',
        subtitle: '산재율 1위, 죽음의 사업장',
        description: '반복되는 돌연사와 산재는 개인의 질병이 아닌 구조적 문제입니다. 쿠팡의 산재율은 전체 평균의 9배에 달합니다.',
        facts: [
            '쿠팡 본사 산재율 5.92% (전체 평균 0.65%의 9배).',
            '연속 야간 근무 후 사망 사례 다수 (근로복지공단 인정)',
            '제주 8일 연속 야간근무(타인 ID 도용) 등 불법적 관행.',
            '산재 발생 후 보고 소홀 및 은폐 의혹.'
        ],
        laws: [
            '산업안전보건법 제5조 (안전조치 의무)',
            '근로기준법 제53조 (연장근로 한도 위반)',
            '산업재해보상보험법 (재해조사 협조 의무)'
        ],
        sources: [
            { title: 'MBC: 쿠팡 또 과로사', url: 'https://imnews.imbc.com/replay/2025/nwtoday/article/6774307_36807.html' },
            { title: '경향신문: 과로사 침묵하는 쿠팡', url: 'https://www.khan.co.kr/article/202511171622001' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `산재율 전체 평균의 9배.\n쿠팡은 죽음의 사업장인가요?\n반복되는 과로사와 산재, 이제 멈춰야 합니다.\n\n#쿠팡아웃 #산재공화국 #노동자보호`,
            twitter: `쿠팡 산재율 5.92% (평균의 9배)\n구조적 과로가 사람을 잡습니다.\n연속 야간근무, 쪼개기 계약...\n\n#쿠팡아웃 #노동인권\ncoupang-out.com/why`,
            facebook: `가장 많은 사람이 다치고 죽는 곳, 쿠팡.\n\n산재율이 평균의 9배입니다.\n죽지 않고 일할 권리를 요구합니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 산재율 1위의 진실 | 쿠팡아웃`
        },
        hashtags: ['산업재해', '안전한일터', '쿠팡불매']
    },

    // 4. Union Busting (Blacklist)
    {
        id: 'union-1',
        category: 'union-busting',
        title: '취업 블랙리스트 운용',
        subtitle: '16,450명의 이름이 적힌 비밀 장부',
        description: '자사의 입맛에 맞지 않는 노동자들의 재취업을 영구히 막는 블랙리스트. 헌법이 보장한 근로권을 심각하게 침해합니다.',
        facts: [
            '16,450명 명단 관리 (이름, 연락처, ID 포함).',
            '사유: "정상적 업무수행 불가" 등 자의적 기재.',
            '노조원 20명, 언론인 71명 등 "비판 세력" 포함.',
            '실제 재취업 과정에서 자동 탈락 시스템 확인.'
        ],
        laws: [
            '근로기준법 제40조 (취업 방해의 금지)',
            '노동조합법 제81조 (부당노동행위)',
            '개인정보보호법 (동의 없는 정보 수집/활용)',
            '헌법 제32조 (근로권 침해)'
        ],
        sources: [
            { title: '한겨레: 1만6450명 블랙리스트', url: 'https://www.hani.co.kr/arti/society/labor/1128310.html' },
            { title: '참여연대: 블랙리스트의 실체', url: 'https://www.peoplepower21.org/stablelife/1960551' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `16,450명의 블랙리스트.\n쿠팡은 노동자를 감시하고 배제합니다.\n당신의 이름도 있을지 모릅니다.\n\n#쿠팡블랙리스트 #취업방해 #쿠팡아웃`,
            twitter: `쿠팡 취업 블랙리스트 16,450명\n- 노조원, 언론인 포함\n- 평생 재취업 불가\n\n대한민국 헌법 위에 있는 기업입니까?\n#쿠팡아웃 #블랙리스트\ncoupang-out.com/why`,
            facebook: `쿠팡의 비밀 장부, 블랙리스트.\n\n1만 6천 명의 노동권을 박탈했습니다.\n한 번 찍히면 영원히 아웃되는 시스템.\n이것이 혁신입니까?\ncoupang-out.com/why`,
            kakao: `쿠팡 블랙리스트 사건 정리 | 쿠팡아웃`
        },
        hashtags: ['블랙리스트', '노동탄압', '인권침해']
    },

    // 5. Union Busting (Whistleblower Oppression)
    {
        id: 'union-2',
        category: 'union-busting',
        title: '공익제보자 입막음',
        subtitle: '진실을 말한 자에게 고소와 압수수색을',
        description: '블랙리스트를 폭로한 공익제보자를 오히려 영업비밀 누설로 고소하고, 경찰 압수수색까지 동원하며 입 막으려 합니다.',
        facts: [
            '블랙리스트 폭로자 대상 형사 고소 및 압수수색.',
            '노동계: "실체는 수사 안 하고 제보자만 탄압".',
            '유족에게 사고 관련 정보(CCTV 등) 제공 거부.',
            '사건 축소 및 은폐 의혹 지속 제기.'
        ],
        laws: [
            '공익신고자보호법 제8조 (불이익 조치 금지)',
            '공익신고자보호법 제15조 (비밀보장)',
            '형법 (증거인멸, 업무상 과실)'
        ],
        sources: [
            { title: '민변: 편파적 경찰 수사 규탄', url: 'https://www.minbyun.or.kr/?p=59185' },
            { title: '한겨레: 처벌 외면한 당국', url: 'https://www.hani.co.kr/arti/society/labor/1136517.html' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `제보자는 죄인이 아닙니다.\n쿠팡은 블랙리스트 신고자를 고소하고 압수수색했습니다.\n적반하장 식 대응을 규탄합니다.\n\n#공익제보자보호 #쿠팡아웃`,
            twitter: `적반하장 쿠팡:\n블랙리스트 만든 건 놔두고 제보자만 압수수색?\n\n공익제보자를 보호하지 않는 사회.\n#쿠팡아웃 #언론탄압\ncoupang-out.com/why`,
            facebook: `진실을 밝힌 대가가 구속 위기인가요?\n\n쿠팡은 공익제보자를 형사 고발하며 입을 막고 있습니다.\n우리가 제보자를 지켜야 합니다.\ncoupang-out.com/why`,
            kakao: `공익제보자가 탄압받는 현실 | 쿠팡아웃`
        },
        hashtags: ['공익제보', '언론탄압', '정의구현']
    },

    // 6. Unfair Practice (Gapjil against Sellers)
    {
        id: 'unfair-1',
        category: 'unfair-practice',
        title: '소상공인 대상 갑질',
        subtitle: '플랫폼의 지배력으로 판매자를 쥐어짭니다',
        description: '중소 판매자에게 불리한 수수료를 강요하고, 자사 PB 상품을 밀어주기 위해 알고리즘을 조작합니다.',
        facts: [
            '납품업체에 타 플랫폼 판매가 인상 강요 (경영 간섭).',
            '"단가 후려치기" 거부 시 로켓배송 납품 중단 보복.',
            '짝퉁/유사 상품 방치로 정품 판매자 피해 속출.',
            '미국 집단소송: "파트너 착취 구조" 쟁점화.'
        ],
        laws: [
            '대규모유통업법 (지위 남용 금지)',
            '공정거래법 제23조 (불공정거래행위)',
            '표시광고법 (부당 광고)'
        ],
        sources: [
            { title: '뉴스타파: 대리점 내부 자료 폭로', url: 'https://newstapa.org/article/QCCWE' },
            { title: '레데스크: 짝퉁 줄줄이', url: 'https://www.ledesk.co.kr/view.php?uid=6196' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `쿠팡의 갑질, 소상공인의 눈물.\n최저가 강요, 일방적 페널티.\n혁신이라는 이름의 착취입니다.\n\n#쿠팡갑질 #소상공인보호 #쿠팡아웃`,
            twitter: `쿠팡 갑질 실태:\n- 타사 가격 인상 강요\n- 자사 PB 상품 밀어주기\n- 일방적 정산 지연\n\n공정위 제재도 무시하는 행태.\n#쿠팡아웃\ncoupang-out.com/why`,
            facebook: `플랫폼의 횡포를 고발합니다.\n\n쿠팡은 입점 업체에게 부당한 조건을 강요하고 있습니다.\n상생 없는 성장은 독점일 뿐입니다.\ncoupang-out.com/why`,
            kakao: `쿠팡의 소상공인 갑질 | 쿠팡아웃`
        },
        hashtags: ['갑질근절', '상생협력', '공정거래']
    },

    // 7. Unfair Practice (Consumer Deception)
    {
        id: 'unfair-2',
        category: 'unfair-practice',
        title: '소비자 기만과 조작',
        subtitle: '가짜가 진짜를 밀어내는 검색창',
        description: '광고비를 낸 상품이나 유사 상표(짝퉁)를 상단에 노출시켜 소비자의 합리적인 선택을 방해합니다.',
        facts: [
            '유명 브랜드 검색 시 유사 상표(짝퉁) 상단 노출.',
            '광고 표기를 흐릿하게 하여 소비자를 오인 유도.',
            '임직원 동원 리뷰 조작으로 PB상품 띄우기.',
            '쿠팡 사칭 피싱/미끼 문자 급증으로 소비자 피해.'
        ],
        laws: [
            '표시광고법 (기만적 표시 금지)',
            '전자상거래법 (거짓/과장 광고 금지)',
            '상표법 (유사 상표 책임)'
        ],
        sources: [
            { title: '조선일보: 쿠팡 사칭 미끼 문자 주의', url: 'https://www.chosun.com/economy/tech_it/2025/12/03/QJO5AGILSRBSBFGM3AQUDSCGAU/' },
            { title: '레데스크: 검색 시스템 부실', url: 'https://www.ledesk.co.kr/view.php?uid=6196' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `검색했더니 짝퉁이 상단에?\n쿠팡의 검색 결과는 믿을 수 없습니다.\n소비자를 기만하는 알고리즘.\n\n#소비자기만 #쿠팡불매`,
            twitter: `쿠팡의 소비자 기만:\n- 짝퉁/유사상품 상단 노출\n- 직원 동원 리뷰 조작\n- 광고 구분 모호\n\n속지 마세요.\n#쿠팡아웃\ncoupang-out.com/why`,
            facebook: `당신이 본 별점 5점, 진짜일까요?\n\n직원들이 조직적으로 쓴 리뷰일 수 있습니다.\n소비자의 눈을 가리는 조작 행위를 고발합니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 검색 조작과 짝퉁 문제 | 쿠팡아웃`
        },
        hashtags: ['소비자권리', '호갱노노', '조작논란']
    },

    // 8. Unfair Practice (Corruption/Lobbying)
    {
        id: 'unfair-3',
        category: 'unfair-practice',
        title: '관피아 로비 의혹',
        subtitle: '5년간 44명의 고위 공직자 영입',
        description: '공정위, 고용부 등 감독 기관 출신 공무원을 대거 영입하여 강력한 로비 방패막이를 구축했다는 의혹이 있습니다.',
        facts: [
            '5년간 4급 이상 고위 공무원 44명 영입 (전관예우).',
            '노동부 출신 임원이 근로감독관 술/식사 접대 포착.',
            '강남에 대관 전담 조직을 두고 정부/언론 관리 의혹.',
            '특별근로감독 무마 시도 정황 (이해충돌).'
        ],
        laws: [
            '청탁금지법 (금품수수 금지)',
            '공직자윤리법 (취업제한)',
            '형법 (뇌물죄)',
            '이해충돌방지법'
        ],
        sources: [
            { title: '동아일보: 고위 공무원 44명 영입', url: 'https://www.donga.com/news/Opinion/article/all/20251201/132880340/2' },
            { title: '세계일보: 공무원 접대 로비 의혹', url: 'https://www.segye.com/newsView/20250708515777' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `5년간 고위공무원 44명 영입.\n쿠팡의 성장은 '로비' 덕분이었나요?\n노동부 출신이 근로감독관을 접대하는 현실.\n\n#관피아 #정경유착 #쿠팡아웃`,
            twitter: `쿠팡의 로비 네트워크:\n- 고위공무원 44명 영업\n- 근로감독관 접대\n- 대관 조직 운영\n\n법 위에 군림하려는 기업.\n#쿠팡아웃 #전관예우\ncoupang-out.com/why`,
            facebook: `감독관에게 술 사는 임원.\n알고보니 노동부 출신 선배였습니다.\n\n쿠팡이 법망을 피하는 비결, '전관예우'입니까?\n철저한 수사가 필요합니다.\ncoupang-out.com/why`,
            kakao: `쿠팡의 관피아 로비 의혹 | 쿠팡아웃`
        },
        hashtags: ['로비의혹', '전관예우', '부패척결']
    },

    // 9. Union Busting (Negotiation Delay)
    {
        id: 'union-3',
        category: 'union-busting',
        title: '교섭 해태와 노조 무시',
        subtitle: '대화의 문을 걸어 잠근 기업',
        description: '헌법이 보장한 노동조합의 교섭 요구를 묵살하고, 형식적인 태도로 일관하며 노조를 고사시키려 합니다.',
        facts: [
            '수년간 임금/단체교섭 지연 및 불성실 태도.',
            '노조 간부 징계 및 현장 출입 통제.',
            '필수 교섭 사항 논의 거부.',
            '노조를 대화 파트너로 인정하지 않는 적대적 경영.'
        ],
        laws: [
            '노동조합법 제81조 (성실교섭 의무 위반)',
            '노동조합법 제29조 (단체교섭권 침해)'
        ],
        sources: [
            { title: '경향신문: 노동계 특별근로감독 촉구', url: 'https://www.khan.co.kr/article/202402191544001' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `대화를 거부하는 기업, 쿠팡.\n수년째 노조와의 교섭을 회피합니다.\n상식적인 대화조차 불가능한 곳.\n\n#노조혐오 #쿠팡아웃 #노동존중`,
            twitter: `쿠팡은 노조를 인정하지 않습니다.\n- 교섭 해태\n- 노조가입 방해\n- 간부 징계\n\n글로벌 스탠다드라더니 노조혐오는 1등.\n#쿠팡아웃\ncoupang-out.com/why`,
            facebook: `대화 대신 탄압을 선택한 쿠팡.\n\n노조와의 교섭을 거부하고 시간을 끕니다.\n상생 의지가 전혀 없는 기업입니다.\ncoupang-out.com/why`,
            kakao: `쿠팡 노조 무시와 교섭 해태 | 쿠팡아웃`
        },
        hashtags: ['노조권리', '성실교섭', '노동자단결']
    },

    // 10. Union Busting (Oppression)
    {
        id: 'union-4',
        category: 'union-busting',
        title: '공권력 동원한 탄압',
        subtitle: '수갑 채워 연행하는 회사',
        description: '본사 항의 방문 시 경찰력을 과도하게 동원하여 노동자를 연행하고, 형사 고소로 겁박합니다.',
        facts: [
            '본사 점거 농성 시 경찰 특공대급 진압 및 연행.',
            '평화적 시위자에게 수갑 채워 연행 (인권 침해 논란).',
            '업무방해죄 고소 남발로 노조 활동 위축 시도.',
            '기업과 공권력의 결탁 의혹.'
        ],
        laws: [
            '집시법 (집회의 자유 침해)',
            '형법 (공무집행방해 남용)',
            '공익신고자보호법 (불이익 조치)'
        ],
        sources: [
            { title: '민변: 편파수사 규탄', url: 'https://www.minbyun.or.kr/?p=59185' },
            { title: '경향신문: 노동계 반발', url: 'https://www.khan.co.kr/article/202402191544001' }
        ],
        shareImages: { instagram: '/og-image.png', instagramStory: '/og-image.png', twitter: '/og-image.png', facebook: '/og-image.png' },
        shareText: {
            instagram: `노동자에게 수갑을 채우는 쿠팡.\n정당한 항의를 공권력으로 짓밟았습니다.\n여기가 21세기 대한민국 맞습니까?\n\n#노동탄압 #공권력남용 #쿠팡아웃`,
            twitter: `쿠팡 본사 앞의 수갑.\n해고 노동자의 절규를 경찰력으로 막았습니다.\n기업이 부르면 경찰이 달려오는 나라.\n\n#쿠팡아웃 #폭력진압\ncoupang-out.com/why`,
            facebook: `수갑과 방패로 막은 노동자의 입.\n\n쿠팡은 대화 대신 공권력을 동원했습니다.\n인권이 사라진 현장, 우리가 증인입니다.\ncoupang-out.com/why`,
            kakao: `쿠팡의 공권력 동원 탄압 | 쿠팡아웃`
        },
        hashtags: ['폭력진압', '집회의자유', '인권수호']
    }
];

export const categoryLabels: Record<IssueCategory, string> = {
    'labor': '노동/건강권',
    'privacy': '개인정보 유출',
    'unfair-practice': '불공정/갑질/로비',
    'union-busting': '노조탄압/블랙리스트'
};
