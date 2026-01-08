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
            // 링크 처리
            let href = item.href;
            if (item.href === "#team-projects" || item.href === "#personal-projects") {
                href = item.href; // 현재 페이지 내 앵커
            } else if (item.href === "#design") {
                href = "design.html"; // 디자인 페이지로
            } else if (item.href === "#contact") {
                href = "contact.html"; // Contact 페이지로
            } else if (item.href.startsWith("#")) {
                href = `index.html${item.href}`; // 메인 페이지로
            }
            return `<li><a href="${href}" class="${classes.trim()}"${target}>${content}</a></li>`;
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

const createProjectItem = (project) => {
    const slug = project.id || project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const listItem = document.createElement("li");
    listItem.className = "project-card";

    const link = document.createElement("a");
    link.href = `project.html?id=${slug}`;
    link.className = "project-link";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "project-image-wrapper";

    const image = document.createElement("div");
    image.className = "project-image";
    if (project.backgroundImage) {
        image.style.backgroundImage = `url(${project.backgroundImage})`;
    }
    if (project.backgroundColor) {
        image.style.backgroundColor = project.backgroundColor;
    }

    const content = document.createElement("div");
    content.className = "project-content";

    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = project.title || "";

    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.description || "";

    content.appendChild(title);
    content.appendChild(description);

    imageWrapper.appendChild(image);
    link.appendChild(imageWrapper);
    link.appendChild(content);
    listItem.appendChild(link);

    return listItem;
};

const renderProjects = (projects, sectionId, labelText, titleText) => {
    const projectsRoot = document.getElementById(sectionId);
    if (!projectsRoot) return;
    
    projectsRoot.innerHTML = "";
    
    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "section-main-title";
    sectionTitle.textContent = titleText || "프로젝트";
    
    if (!projects || !projects.length) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "프로젝트를 추가해주세요.";
        emptyMessage.style.color = "#9ca3af";
        emptyMessage.style.fontSize = "0.875em";
        emptyMessage.style.marginTop = "2em";
        projectsRoot.appendChild(sectionTitle);
        projectsRoot.appendChild(emptyMessage);
        return;
    }
    
    const projectsList = document.createElement("ul");
    projectsList.className = "projects-list";
    
    const fragment = document.createDocumentFragment();
    projects.forEach((project) => {
        const projectItem = createProjectItem(project);
        fragment.appendChild(projectItem);
    });
    projectsList.appendChild(fragment);
    
    projectsRoot.appendChild(sectionTitle);
    projectsRoot.appendChild(projectsList);
};

const initProjects = () => {
    const siteContent = window.siteContent;
    if (!siteContent || Object.keys(siteContent).length === 0) {
        // data.js가 아직 로드되지 않았으면 잠시 후 다시 시도
        setTimeout(initProjects, 100);
        return;
    }
    
    // 네비게이션 렌더링
    if (siteContent.navigation) {
        renderNavigation(siteContent.navigation);
    }
    
    // 프로젝트 섹션들 렌더링
    if (siteContent.teamProjects !== undefined) {
        renderProjects(siteContent.teamProjects || [], "team-projects", "TEAM PROJECTS", "팀 프로젝트");
    }
    if (siteContent.personalProjects !== undefined) {
        renderProjects(siteContent.personalProjects || [], "personal-projects", "PERSONAL PROJECTS", "개인 프로젝트");
    }
};

window.addEventListener("DOMContentLoaded", () => {
    initProjects();
});

