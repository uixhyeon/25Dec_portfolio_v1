const addClassOnScroll = (element) => element && element.classList.add("come-in");

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
            // 링크 처리: Project, Design, Contact는 별도 페이지로 바로 이동
            let href = item.href;
            if (item.href === "#team-projects" || item.href === "#personal-projects") {
                href = "projects.html"; // 프로젝트 페이지로 바로 이동
            } else if (item.href === "#design") {
                href = "design.html"; // 디자인 페이지로 바로 이동
            } else if (item.href === "#contact") {
                href = "contact.html"; // Contact 페이지로 바로 이동
            } else if (item.href.startsWith('#')) {
                href = `index.html${item.href}`; // 메인 페이지로
            }
            return `<li><a href="${href}" class="${classes.trim()}"${target}>${content}</a></li>`;
        })
        .join("");

    navRoot.innerHTML = `
        <div class="nav-wrapper">
            <div class="nav-container">
                <a href="nav.html" class="nav-logo">${navData.logo}<span class="logo-end">${logoAccent}</span></a>
            <ul class="nav-menu">${linksMarkup}</ul>
            </div>
        </div>
    `;
};

const renderHero = (heroData) => {
    const heroRoot = document.getElementById("hero");
    if (!heroRoot || !heroData) return;

    const topLabel = heroData.topLabel || "";
    const name = heroData.name || "";
    let description = heroData.description || "";
    
    // 밑줄 처리
    if (heroData.underlinedWords && heroData.underlinedWords.length > 0) {
        heroData.underlinedWords.forEach(word => {
            description = description.replace(
                new RegExp(`\\b${word}\\b`, 'g'),
                `<span class="hero-underlined">${word}</span>`
            );
        });
    }

    const bottomNavMarkup = (heroData.bottomNav || [])
        .map(item => {
            // Project, Design, Contact는 별도 페이지로
            let href = item.href;
            if (item.href === "#team-projects" || item.href === "#personal-projects") {
                href = "projects.html";
            } else if (item.href === "#design") {
                href = "design.html";
            } else if (item.href === "#contact") {
                href = "contact.html";
            }
            return `<a href="${href}" class="hero-nav-link">${item.label}</a>`;
        })
        .join("");

    heroRoot.innerHTML = `
        <div class="hero-content-wrapper">
            <div class="hero-top-label">${topLabel}</div>
            <div class="hero-name">
                ${name}
                <span class="hero-cursor"></span>
            </div>
            <div class="hero-description">${description}</div>
            <nav class="hero-bottom-nav">
                ${bottomNavMarkup}
            </nav>
        </div>
    `;
};

const createProjectItem = (project) => {
    // 프로젝트 slug 생성
    const slug = project.id || project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const listItem = document.createElement("li");
    listItem.className = "project-card";

    // 카드를 링크로 감싸기
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
    
    // 섹션 제목 추가 (위계구조 명확화)
    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "section-main-title";
    sectionTitle.textContent = titleText || "프로젝트";
    
    // 프로젝트가 없을 때 안내 메시지
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

const buildSectionWrapper = (sectionData) => {
    const wrapper = document.createElement("div");
    wrapper.className = "text-wrap animate-text";
    if (sectionData.label) {
        const label = document.createElement("div");
        label.className = "section-label";
        label.textContent = sectionData.label;
        wrapper.appendChild(label);
    }
    if (sectionData.title) {
        const heading = document.createElement("h2");
        heading.innerHTML = sectionData.title;
        wrapper.appendChild(heading);
    }
    return wrapper;
};


const renderContact = (contactData) => {
    const contactRoot = document.getElementById("contact");
    if (!contactRoot || !contactData) return;
    
    const divider = document.createElement("div");
    divider.className = "section-divider";
    
    const footer = document.createElement("footer");
    footer.className = "contact-footer";
    
    // 전체를 하나의 컬럼으로 표시
    const contactContainer = document.createElement("div");
    contactContainer.className = "contact-container";
    
    // 이름
    const nameBox = document.createElement("div");
    nameBox.className = "contact-name-box";
    nameBox.textContent = contactData.name || "UixHyeon";
    contactContainer.appendChild(nameBox);
    
    // 정보 리스트 (이메일, 직업)
    if (contactData.info && contactData.info.length > 0) {
        const infoList = document.createElement("div");
        infoList.className = "contact-info-list";
        contactData.info.forEach((item) => {
            const infoItem = document.createElement("div");
            infoItem.className = "contact-info-item";
            infoItem.textContent = item;
            infoList.appendChild(infoItem);
        });
        contactContainer.appendChild(infoList);
    }
    
    // 저작권
    if (contactData.copyright) {
        const copyright = document.createElement("div");
        copyright.className = "contact-copyright";
        copyright.textContent = contactData.copyright;
        contactContainer.appendChild(copyright);
    }
    
    // 링크 리스트 (GitHub, Instagram, 블로그)
    if (contactData.links && contactData.links.length > 0) {
        const linksList = document.createElement("div");
        linksList.className = "contact-links-list";
        contactData.links.forEach((linkItem) => {
            if (!linkItem.href) return; // href가 없으면 스킵
            
            const link = document.createElement("a");
            link.href = linkItem.href;
            link.className = "contact-link-item";
            if (linkItem.href.startsWith("http")) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            
            if (linkItem.icon) {
                const icon = document.createElement("i");
                icon.className = `fa-brands fa-${linkItem.icon}`;
                if (linkItem.icon === "envelope") {
                    icon.className = "fa-regular fa-envelope";
                }
                link.appendChild(icon);
            }
            
            const label = document.createElement("span");
            label.textContent = linkItem.label;
            link.appendChild(label);
            
            linksList.appendChild(link);
        });
        contactContainer.appendChild(linksList);
    }
    
    footer.appendChild(contactContainer);
    contactRoot.innerHTML = "";
    contactRoot.appendChild(divider);
    contactRoot.appendChild(footer);
};

const initScrollAnimations = () => {
    let scrollPos = window.scrollY;
    const about = document.querySelector("#about > .text-wrap");
    const tech = document.querySelector("#Tech > .text-wrap");
    const awards = document.querySelector("#awards > .text-wrap");
    const sections = [
        { element: about, offset: () => about?.offsetHeight - 200 || 0 },
        { element: tech, offset: () => (tech?.offsetHeight || 0) + 300 },
        { element: awards, offset: () => (awards?.offsetHeight || 0) + 700 }
    ];

    const handleScroll = () => {
        scrollPos = window.scrollY;
        sections.forEach((section) => {
            if (section.element && scrollPos >= section.offset()) {
                addClassOnScroll(section.element);
            }
        });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
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
    
    const divider = document.createElement("div");
    divider.className = "section-divider";
    
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
    designRoot.appendChild(divider);
    designRoot.appendChild(label);
    designRoot.appendChild(title);
    
    const fragment = document.createDocumentFragment();
    designs.forEach((design) => fragment.appendChild(createDesignItem(design)));
    container.appendChild(fragment);
    designRoot.appendChild(container);
};

const renderHeader = (headerData) => {
    const headerRoot = document.createElement("section");
    headerRoot.className = "resume-header";
    headerRoot.id = "resume-header";
    
    const table = document.createElement("table");
    table.className = "header-table";
    
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["ID /", "POSITION /", "DESCRIPTION /", "CONTACT /"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    const tbody = document.createElement("tbody");
    const dataRow = document.createElement("tr");
    
    const idCell = document.createElement("td");
    idCell.innerHTML = `${headerData.id.name}<br>${headerData.id.birthdate}`;
    
    const positionCell = document.createElement("td");
    positionCell.textContent = headerData.position;
    
    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = headerData.description;
    
    const contactCell = document.createElement("td");
    contactCell.innerHTML = `${headerData.contact.email}<br><a href="${headerData.contact.github}" target="_blank">${headerData.contact.github.replace("https://", "")}</a>`;
    
    dataRow.appendChild(idCell);
    dataRow.appendChild(positionCell);
    dataRow.appendChild(descriptionCell);
    dataRow.appendChild(contactCell);
    tbody.appendChild(dataRow);
    
    table.appendChild(thead);
    table.appendChild(tbody);
    headerRoot.appendChild(table);
    
    const detailSection = document.createElement("div");
    detailSection.className = "header-detail";
    
    ["ID /", "POSITION /", "DESCRIPTION /", "CONTACT /"].forEach((label, index) => {
        const detailItem = document.createElement("div");
        detailItem.className = "detail-item";
        const detailLabel = document.createElement("div");
        detailLabel.className = "detail-label";
        detailLabel.textContent = label;
        const detailContent = document.createElement("div");
        detailContent.className = "detail-content";
        
        if (index === 0) {
            detailContent.innerHTML = `${headerData.id.name}<br>${headerData.id.birthdate}`;
        } else if (index === 1) {
            detailContent.textContent = headerData.position;
        } else if (index === 2) {
            detailContent.textContent = headerData.description;
        } else {
            detailContent.innerHTML = `${headerData.contact.email}<br><a href="${headerData.contact.github}" target="_blank">${headerData.contact.github.replace("https://", "")}</a>`;
        }
        
        detailItem.appendChild(detailLabel);
        detailItem.appendChild(detailContent);
        detailSection.appendChild(detailItem);
    });
    
    headerRoot.appendChild(detailSection);
    
    const main = document.querySelector("main");
    if (main) {
        main.insertBefore(headerRoot, main.firstChild);
    }
};

const renderAbout = (aboutData) => {
    const aboutRoot = document.getElementById("about");
    if (!aboutRoot || !aboutData) return;

    aboutRoot.innerHTML = `
        <div class="about-container">
            <div class="about-content">
                <h1 class="about-title">${aboutData.title || ""}</h1>
                <p class="about-subtitle">${aboutData.subtitle || ""}</p>
                <p class="about-description">${aboutData.description || ""}</p>
                <div class="about-details">
                    <div class="about-detail-item">
                        <h3 class="about-detail-label">기술 스택</h3>
                        <div class="about-tags">
                            ${(aboutData.skills || []).map(skill => `<span class="about-tag">${skill}</span>`).join("")}
                        </div>
                    </div>
                    <div class="about-detail-item">
                        <h3 class="about-detail-label">관심 분야</h3>
                        <div class="about-tags">
                            ${(aboutData.interests || []).map(interest => `<span class="about-tag">${interest}</span>`).join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const renderSite = (data) => {
    // 네비게이션 (필수)
    if (data.navigation) {
    renderNavigation(data.navigation);
    }
    
    // 히어로 섹션 (전체 화면)
    if (data.hero) {
    renderHero(data.hero);
    }
    
    // About 섹션
    if (data.about) {
    renderAbout(data.about);
    }
    
    // 프로젝트, 디자인, Contact는 별도 페이지로 이동 (projects.html, design.html, contact.html)
};

window.addEventListener("DOMContentLoaded", () => {
    const siteContent = window.siteContent;
    console.log("Site content loaded:", siteContent);
    if (!siteContent || Object.keys(siteContent).length === 0) {
        console.error("siteContent is empty or not loaded!");
        return;
    }
    renderSite(siteContent);
});