// 네비게이션 렌더링
const renderNavigation = (navData) => {
    const navRoot = document.getElementById("site-nav");
    if (!navRoot || !navData) return;

    const logoAccent = navData.logoAccent || "";
    const linksMarkup = (navData.links || [])
        .map((item, index, array) => {
            const isLast = index === array.length - 1;
            const isButton = item.button || isLast;
            const classes = [
                item.noUnderline ? "no-link" : "",
                item.iconClass ? "no-link" : "",
                isButton ? "nav-button" : ""
            ]
                .filter(Boolean)
                .join(" ");
            const content = item.iconClass ? `<i class="${item.iconClass}"></i>` : item.label;
            const target = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
            return `<li><a href="${item.href}" class="${classes.trim()}"${target}>${content}</a></li>`;
        })
        .join("");

    navRoot.innerHTML = `
        <div class="nav-wrapper">
            <div class="nav-container">
                <a href="index.html" class="nav-logo">${navData.logo}<span class="logo-end">${logoAccent}</span></a>
                <ul class="nav-menu">${linksMarkup}</ul>
            </div>
        </div>
    `;
};

// 프로젝트 상세 페이지 렌더링
const renderProjectDetail = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    if (!projectId) {
        document.getElementById('project-detail').innerHTML = '<p>프로젝트를 찾을 수 없습니다.</p>';
        return;
    }
    
    // 모든 프로젝트 배열에서 찾기
    const allProjects = [
        ...(window.siteContent.teamProjects || []),
        ...(window.siteContent.personalProjects || []),
        ...(window.siteContent.design || [])
    ];
    
    // 프로젝트 찾기 (id 또는 title 기반)
    const project = allProjects.find(p => {
        const slug = p.id || p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        return slug === projectId;
    });
    
    if (!project) {
        document.getElementById('project-detail').innerHTML = '<p>프로젝트를 찾을 수 없습니다.</p>';
        return;
    }
    
    const detailRoot = document.getElementById('project-detail');
    
    detailRoot.innerHTML = `
        <div class="project-detail-container">
            <a href="index.html" class="back-link">← 돌아가기</a>
            
            <div class="project-detail-header">
                <h1 class="project-detail-title">${project.title}</h1>
                <p class="project-detail-description">${project.description}</p>
            </div>
            
            ${project.backgroundImage ? `
                <div class="project-detail-image">
                    <div class="project-image" style="background-image: url(${project.backgroundImage}); background-color: ${project.backgroundColor || '#f5f5f5'};"></div>
                </div>
            ` : ''}
            
            <div class="project-detail-info">
                ${project.role ? `<div class="detail-info-item"><strong>역할:</strong> ${project.role}</div>` : ''}
                ${project.period ? `<div class="detail-info-item"><strong>기간:</strong> ${project.period}</div>` : ''}
                ${project.team ? `<div class="detail-info-item"><strong>팀:</strong> ${project.team}</div>` : ''}
            </div>
            
            ${project.contributions ? `
                <div class="project-detail-section">
                    <h2 class="detail-section-title">주요 기여 및 담당 기능</h2>
                    <ul class="detail-list">
                        ${Array.isArray(project.contributions) 
                            ? project.contributions.map(item => `<li>${item}</li>`).join('')
                            : `<li>${project.contributions}</li>`
                        }
                    </ul>
                </div>
            ` : ''}
            
            ${project.achievements ? `
                <div class="project-detail-section">
                    <h2 class="detail-section-title">성과</h2>
                    <ul class="detail-list">
                        ${Array.isArray(project.achievements) 
                            ? project.achievements.map(item => `<li>${item}</li>`).join('')
                            : `<li>${project.achievements}</li>`
                        }
                    </ul>
                </div>
            ` : ''}
            
            ${project.techStack && project.techStack.length > 0 ? `
                <div class="project-detail-section">
                    <h2 class="detail-section-title">기술 스택</h2>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span class="tech-tag">#${tech}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${project.url ? `
                <div class="project-detail-links">
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link-button">
                        GitHub 보기 →
                    </a>
                </div>
            ` : ''}
        </div>
    `;
};

window.addEventListener("DOMContentLoaded", () => {
    if (window.siteContent && window.siteContent.navigation) {
        renderNavigation(window.siteContent.navigation);
    }
    renderProjectDetail();
});

