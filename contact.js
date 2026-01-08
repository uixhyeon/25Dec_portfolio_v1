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
                href = "design.html"; // 디자인 페이지로
            } else if (item.href === "#contact") {
                href = item.href; // 현재 페이지 내 앵커
            } else if (item.href.startsWith('#')) {
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

const renderContact = (contactData) => {
    const contactRoot = document.getElementById("contact");
    if (!contactRoot || !contactData) return;
    
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
    contactRoot.appendChild(footer);
};

const initContact = () => {
    const siteContent = window.siteContent;
    if (!siteContent || Object.keys(siteContent).length === 0) {
        setTimeout(initContact, 100);
        return;
    }
    
    // 네비게이션 렌더링
    if (siteContent.navigation) {
        renderNavigation(siteContent.navigation);
    }
    
    // Contact 섹션 렌더링
    if (siteContent.contact) {
        renderContact(siteContent.contact);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    initContact();
});

