/**
 * 모든 콘텐츠는 이 객체만 수정하면 됩니다.
 * 필요한 경우 항목을 추가/삭제하거나 텍스트를 바꾸세요.
 * 
 * 구조 설명:
 * - navigation: 사이드바 메뉴 (필수)
 * - hero: 전체 화면 히어로 섹션
 * - about: 자기소개 섹션
 * - teamProjects: 팀 프로젝트 배열 (빈 배열 [] 가능)
 * - personalProjects: 개인 프로젝트 배열 (빈 배열 [] 가능)
 * - design: 디자인 프로젝트 배열 (빈 배열 [] 가능)
 * - contact: 연락처 정보
 * 
 * 프로젝트 추가 방법:
 * 각 배열에 객체를 추가하세요. 예시:
 * {
 *     title: "프로젝트 제목",
 *     description: "프로젝트 설명",
 *     role: "역할",
 *     period: "기간",
 *     team: "팀 정보",
 *     url: "GitHub 링크",
 *     backgroundImage: "./imgs/이미지.png",
 *     backgroundColor: "#f5f5f5",
 *     contributions: ["기여 내용 1", "기여 내용 2"],
 *     achievements: ["성과 1", "성과 2"],
 *     techStack: ["기술1", "기술2"]
 * }
 */
window.siteContent = {
    header: {
        id: {
            name: "UixHyeon",
            birthdate: "1998.01.01"
        },
        position: "Frontend Developer",
        description: "Vue.js 프로젝트를 만들고 있습니다.",
        contact: {
            email: "uixhyeon@gmail.com",
            github: "https://github.com/uixhyeon",
            portfolio: "https://uixhyeon.github.io",
            blog: "https://blog.uixhyeon.com"
        }
    },
    navigation: {
        logo: "UixHyeon",
        logoAccent: "_",
        links: [
            { label: "About", href: "#about" },
            { label: "Project", href: "#team-projects" },
            { label: "Design", href: "#design" },
            { label: "Contact", href: "#contact" }
        ]
    },
    hero: {
        topLabel: "FRONTEND DEVELOPER",
        name: "UixHyeon",
        description: "I am a developer who always thinks, communicates, and solves problems.",
        underlinedWords: ["thinks", "communicates", "solves problems"],
        bottomNav: [
            { label: "About", href: "#about" },
            { label: "Project", href: "#team-projects" },
            { label: "Design", href: "#design" },
            { label: "Contact", href: "#contact" }
        ]
    },
    about: {
        title: "안녕하세요, UixHyeon입니다",
        subtitle: "프론트엔드 개발자",
        description: "Vue.js를 중심으로 웹 애플리케이션을 개발하고 있습니다. 사용자 경험을 중시하며, 깔끔하고 직관적인 인터페이스를 만드는 것을 좋아합니다.",
        skills: ["Vue.js", "JavaScript", "HTML/CSS", "Firebase", "Git"],
        interests: ["웹 개발", "UI/UX 디자인", "사용자 경험 개선"]
    },
    teamProjects: [
        {
            title: "GigStash",
            description: "짐 보관 예약 서비스",
            role: "Frontend Developer",
            period: "2025.11 - 2025.12",
            team: "Total Team Size: 3 People (2 FE, 1 BE)",
            url: "https://github.com/uixhyeon/gigstash",
            backgroundImage: "./imgs/gigstash.png",
            backgroundColor: "#f5f5f5",
            contributions: [
                "Kakao Map API를 활용한 지도 검색 기능 구현",
                "Firebase를 이용한 예약 데이터 실시간 관리",
                "반응형 웹 디자인 적용"
            ],
            achievements: [
                "지도 검색 성능 최적화로 로딩 시간 50% 단축",
                "사용자 예약 흐름 개선으로 전환율 20% 향상"
            ],
            techStack: ["Vue 3", "JavaScript", "Firebase", "Kakao Map API"]
        },
        {
            title: "마타주",
            description: "관리자 대시보드",
            role: "Frontend Developer",
            period: "2025.10",
            team: "Total Team Size: 4 People (2 FE, 2 BE)",
            url: "https://github.com/uixhyeon/mataju",
            backgroundImage: "./imgs/mataju.png",
            backgroundColor: "#f0f0f0",
            contributions: [
                "Chart.js를 활용한 통계 그래프 시각화 구현",
                "관리자 권한별 접근 제어 기능 개발",
                "데이터 필터링 및 검색 기능 구현"
            ],
            achievements: [
                "대시보드 로딩 속도 개선으로 사용자 만족도 향상",
                "반응형 차트 구현으로 모바일 접근성 개선"
            ],
            techStack: ["Vue 3", "Chart.js", "JavaScript", "Firebase"]
        },
        {
            title: "국중박",
            description: "예약 캘린더 서비스",
            role: "Frontend Developer",
            period: "2025.09",
            team: "Total Team Size: 3 People (2 FE, 1 BE)",
            url: "https://github.com/uixhyeon/gukjungbak",
            backgroundImage: "./imgs/gukjungbak.png",
            backgroundColor: "#e8f4f8",
            contributions: [
                "FullCalendar 라이브러리를 활용한 일정 관리 기능 구현",
                "예약 가능 시간대 표시 및 예약 프로세스 개발",
                "실시간 예약 상태 동기화 기능 구현"
            ],
            achievements: [
                "캘린더 UI/UX 개선으로 예약 오류 30% 감소",
                "모바일 최적화로 모바일 예약 비율 증가"
            ],
            techStack: ["Vue 3", "FullCalendar", "JavaScript", "Firebase"]
        }
    ],
    personalProjects: [
        {
            title: "STX Clone",
            description: "기업 사이트 퍼블리싱",
            role: "Frontend Developer",
            period: "2025.04",
            team: "개인 프로젝트",
            url: "https://github.com/uixhyeon/stx-clone",
            backgroundImage: "./imgs/stx.png",
            backgroundColor: "#f5f5f5",
            contributions: [
                "기업 사이트 메인 페이지 퍼블리싱",
                "애니메이션 효과 구현",
                "반응형 레이아웃 적용"
            ],
            achievements: [
                "원본 디자인 재현도 95% 달성",
                "크로스 브라우저 호환성 확보"
            ],
            techStack: ["HTML", "CSS", "JavaScript"]
        },
        {
            title: "10x10 Clone",
            description: "쇼핑몰 UI 구현",
            role: "Frontend Developer",
            period: "2025.05",
            team: "개인 프로젝트",
            url: "https://github.com/uixhyeon/10x10-clone",
            backgroundImage: "./imgs/10x10.png",
            backgroundColor: "#ffffff",
            contributions: [
                "쇼핑몰 메인 페이지 레이아웃 구현",
                "상품 목록 및 상세 페이지 UI 개발",
                "장바구니 기능 구현"
            ],
            achievements: [
                "원본 사이트와 유사한 UI 구현",
                "반응형 디자인 적용"
            ],
            techStack: ["Vue 3", "JavaScript", "HTML/CSS"]
        },
        {
            title: "Whale Clone",
            description: "웹 브라우저 UI 클론",
            role: "Frontend Developer",
            period: "2025.06",
            team: "개인 프로젝트",
            url: "https://github.com/uixhyeon/whale-clone",
            backgroundImage: "./imgs/whale.png",
            backgroundColor: "#e8f4f8",
            contributions: [
                "브라우저 메인 UI 레이아웃 구현",
                "탭 및 북마크 기능 UI 개발",
                "반응형 디자인 적용"
            ],
            achievements: [
                "원본 브라우저 UI 재현",
                "인터랙션 효과 구현"
            ],
            techStack: ["HTML", "CSS", "JavaScript"]
        },
        {
            title: "Toss Clone",
            description: "금융 서비스 UI 구현",
            role: "Frontend Developer",
            period: "2025.03",
            team: "개인 프로젝트",
            url: "https://github.com/uixhyeon/toss-clone",
            backgroundImage: "./imgs/toss.png",
            backgroundColor: "#ffffff",
            contributions: [
                "금융 서비스 메인 페이지 UI 구현",
                "카드 컴포넌트 디자인 및 개발",
                "스크롤 애니메이션 효과 적용"
            ],
            achievements: [
                "원본과 유사한 인터랙션 구현",
                "모바일 최적화 완료"
            ],
            techStack: ["Vue 3", "JavaScript", "HTML/CSS"]
        },
        {
            title: "코드아카이브",
            description: "개발 코드 스니펫 저장 서비스",
            role: "Frontend Developer",
            period: "2025.08",
            team: "개인 프로젝트",
            url: "https://github.com/uixhyeon/codearchive",
            backgroundImage: "./imgs/codearchive.png",
            backgroundColor: "#f9f9f9",
            contributions: [
                "코드 스니펫 CRUD 기능 구현",
                "태그 기반 검색 및 필터링 기능 개발",
                "코드 하이라이팅 기능 적용"
            ],
            achievements: [
                "로컬 스토리지 활용으로 오프라인 접근 가능",
                "직관적인 UI로 사용자 편의성 향상"
            ],
            techStack: ["Vue 3", "JavaScript", "LocalStorage"]
        },
        {
            title: "리퀴드 텍스트",
            description: "텍스트 에디터 및 메모 앱",
            role: "Frontend Developer",
            period: "2025.07",
            team: "개인 프로젝트",
            url: "https://github.com/uixhyeon/liquid-text",
            backgroundImage: "./imgs/liquid-text.png",
            backgroundColor: "#fff5e6",
            contributions: [
                "텍스트 에디터 기능 구현",
                "메모 카테고리 및 폴더 관리 기능 개발",
                "실시간 자동 저장 기능 구현"
            ],
            achievements: [
                "빠른 검색 기능으로 사용자 생산성 향상",
                "간결한 UI로 사용자 경험 개선"
            ],
            techStack: ["Vue 3", "JavaScript", "Marked.js"]
        }
    ],
    design: [
        {
            title: "브랜드 아이덴티티 디자인",
            description: "포트폴리오 브랜딩 및 로고 디자인",
            role: "Designer",
            period: "2025.12",
            team: "개인 프로젝트",
            url: "",
            backgroundImage: "./imgs/brand-design.png",
            backgroundColor: "#f5f5f5",
            contributions: [
                "브랜드 컬러 시스템 구축",
                "로고 디자인 및 변형 작업",
                "타이포그래피 시스템 설계"
            ],
            achievements: [
                "일관된 브랜드 아이덴티티 구축",
                "다양한 미디어에 적용 가능한 디자인 시스템 완성"
            ],
            techStack: ["Figma", "Adobe Illustrator", "Adobe Photoshop"]
        },
        {
            title: "웹사이트 UI/UX 디자인",
            description: "반응형 웹사이트 디자인 및 프로토타이핑",
            role: "UI/UX Designer",
            period: "2025.11",
            team: "개인 프로젝트",
            url: "",
            backgroundImage: "./imgs/web-design.png",
            backgroundColor: "#f0f0f0",
            contributions: [
                "사용자 플로우 설계 및 와이어프레임 제작",
                "반응형 디자인 시스템 구축",
                "인터랙션 프로토타입 제작"
            ],
            achievements: [
                "사용자 테스트를 통한 UX 개선",
                "개발자와의 협업을 위한 디자인 시스템 문서화"
            ],
            techStack: ["Figma", "Adobe XD", "Principle"]
        },
        {
            title: "모바일 앱 디자인",
            description: "모바일 앱 UI 디자인 및 프로토타이핑",
            role: "UI Designer",
            period: "2025.10",
            team: "개인 프로젝트",
            url: "",
            backgroundImage: "./imgs/mobile-design.png",
            backgroundColor: "#e8f4f8",
            contributions: [
                "모바일 앱 화면 디자인",
                "아이콘 및 일러스트 제작",
                "프로토타입을 통한 사용자 테스트"
            ],
            achievements: [
                "iOS/Android 가이드라인 준수",
                "직관적인 네비게이션 구조 설계"
            ],
            techStack: ["Figma", "Sketch", "Framer"]
        }
    ],
    learning: {
        title: "공부중",
        technologies: ["React", "TypeScript"]
    },
    contact: {
        name: "UixHyeon",
        info: [
            "uixhyeon@gmail.com",
            "프론트엔드 개발자"
        ],
        links: [
            { label: "GitHub", href: "https://github.com/uixhyeon", icon: "github" },
            { label: "Instagram", href: "https://instagram.com/uixhyeon", icon: "instagram" },
            { label: "블로그", href: "https://blog.uixhyeon.com", icon: "blog" }
        ],
        copyright: "© 2025 UixHyeon. All rights reserved."
    }
};
