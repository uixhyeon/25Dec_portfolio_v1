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
                href = "projects.html"; // 프로젝트 페이지로
            } else if (item.href === "#design") {
                href = item.href; // 현재 페이지 내 앵커
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

const createDesignItem = (project) => {
    const listItem = document.createElement("li");
    listItem.className = "design-item";
    
    const link = document.createElement("a");
    link.className = "design-card";
    link.href = project.url || "#";
    if (project.url) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    } else {
        link.onclick = (e) => {
            e.preventDefault();
            return false;
        };
    }
    
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "design-image";
    if (project.backgroundImage) {
        imageWrapper.style.backgroundImage = `url(${project.backgroundImage})`;
    }
    if (project.backgroundColor) {
        imageWrapper.style.backgroundColor = project.backgroundColor;
    }
    
    const info = document.createElement("div");
    info.className = "design-info";
    
    const title = document.createElement("h3");
    title.className = "design-title";
    title.textContent = project.title;
    
    const description = document.createElement("p");
    description.className = "design-description";
    description.textContent = project.description;
    
    info.appendChild(title);
    info.appendChild(description);
    link.appendChild(imageWrapper);
    link.appendChild(info);
    listItem.appendChild(link);
    
    return listItem;
};

const renderDesign = (designs, sectionId, labelText, titleText) => {
    const designRoot = document.getElementById(sectionId);
    if (!designRoot) return;
    
    if (!designs || !designs.length) {
        designRoot.innerHTML = "";
        return;
    }
    
    const label = document.createElement("div");
    label.className = "section-label";
    label.textContent = labelText;
    label.style.marginLeft = "5%";
    label.style.marginBottom = "2em";
    
    const title = document.createElement("h2");
    title.textContent = titleText;
    title.style.paddingTop = "0";
    title.style.paddingLeft = "5%";
    title.style.paddingRight = "5%";
    title.style.paddingBottom = "2em";
    
    const container = document.createElement("div");
    container.className = "design-grid";
    
    designRoot.innerHTML = "";
    designRoot.appendChild(label);
    designRoot.appendChild(title);
    
    const fragment = document.createDocumentFragment();
    designs.forEach((design) => fragment.appendChild(createDesignItem(design)));
    container.appendChild(fragment);
    designRoot.appendChild(container);
};

const initDesign = () => {
    const siteContent = window.siteContent;
    if (!siteContent || Object.keys(siteContent).length === 0) {
        // data.js가 아직 로드되지 않았으면 잠시 후 다시 시도
        setTimeout(initDesign, 100);
        return;
    }
    
    // 네비게이션 렌더링
    if (siteContent.navigation) {
        renderNavigation(siteContent.navigation);
    }
    
    // 디자인 섹션 렌더링
    if (siteContent.design !== undefined) {
        renderDesign(siteContent.design || [], "design", "DESIGN", "디자인");
    }
};

window.addEventListener("DOMContentLoaded", () => {
    initDesign();
});

