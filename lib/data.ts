export type IssueCategory = 'labor' | 'privacy' | 'unfair-practice' | 'union-busting';

export interface Issue {
    id: string;
    category: IssueCategory;
    title: string;
    description: string;
    facts: string[];
    sources: { title: string; url: string }[];
}

export const issuesData: Issue[] = [
    {
        id: 'labor-1',
        category: 'labor',
        title: '압도적인 산재율과 과로사',
        description: '쿠팡의 물류센터 노동자들은 극한의 환경에서 일하고 있습니다.',
        facts: [
            '물류업계 평균 대비 산재율이 10배 이상 높습니다 (2020-2023 통계 기준).',
            '2020년 이후 확인된 과로사 및 사고 사망자는 25명에 달합니다.',
            '혹서기/혹한기에도 적절한 냉난방 시설이 갖춰지지 않은 곳이 많습니다.',
            '심야 로켓배송을 위한 주 7일, 최대 60시간(때로는 그 이상)의 노동이 강요됩니다.'
        ],
        sources: [
            { title: '한겨레: 쿠팡 노동자 사망의 진실', url: 'https://www.hani.co.kr' },
            { title: '공공운수노조 쿠팡지부 성명서', url: 'http://kctu.org' }
        ]
    },
    {
        id: 'privacy-1',
        category: 'privacy',
        title: '역대급 개인정보 유출',
        description: '회원의 소중한 정보가 안전하게 보호받지 못하고 있습니다.',
        facts: [
            '3,370만 건의 개인정보가 중국 등으로 유출된 정황이 있습니다.',
            '앱 내 과도한 권한 요구 및 무단 수집 의혹이 끊임없이 제기됩니다.',
            '블랙리스트(취업제한 명단) 작성을 통해 퇴직자나 노조 활동가의 개인정보를 불법 관리했습니다.'
        ],
        sources: [
            { title: 'MBC 뉴스데스크 보도', url: 'https://imnews.imbc.com' }
        ]
    },
    {
        id: 'unfair-1',
        category: 'unfair-practice',
        title: '납품업체 및 소상공인 갑질',
        description: '독점적 지위를 이용한 불공정 행위가 만연합니다.',
        facts: [
            '자사 PB 상품(곰곰 등)을 검색 상단에 노출되도록 알고리즘을 조작했습니다 (공정위 과징금 1400억 부과).',
            '입점 업체에게 최저가 보장을 강요하고 판매가를 통제했습니다.',
            '일방적인 반품 정책으로 소상공인에게 피해를 전가합니다.'
        ],
        sources: [
            { title: '공정거래위원회 보도자료', url: 'https://www.ftc.go.kr' }
        ]
    },
    {
        id: 'union-1',
        category: 'union-busting',
        title: '조직적인 노조 탄압',
        description: '노동자의 정당한 권리인 노동조합 활동을 방해합니다.',
        facts: [
            '노조 가입 직원에 대한 표적 감사 및 괴롭힘',
            '취업제한 블랙리스트 운용 (노조 활동 이력이 있는 사람 재취업 불가)',
            '노사 협의 거부 및 시간 끌기 전략'
        ],
        sources: [
            { title: '민주노총 고발 자료', url: 'http://nodong.org' }
        ]
    }
];

export const categoryLabels: Record<IssueCategory, string> = {
    'labor': '노동 문제',
    'privacy': '개인정보/보안',
    'unfair-practice': '불공정/갑질',
    'union-busting': '노조 탄압'
};
