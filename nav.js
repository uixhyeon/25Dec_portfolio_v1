const renderSidebar = (navData) => {
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
            // 링크 처리: Project, Design, Contact는 별도 페이지로
            let href = item.href;
            if (item.href === "#team-projects" || item.href === "#personal-projects") {
                href = "projects.html";
            } else if (item.href === "#design") {
                href = "design.html";
            } else if (item.href === "#contact") {
                href = "contact.html";
            } else if (item.href.startsWith('#')) {
                href = `index.html${item.href}`;
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

const initNav = () => {
    const siteContent = window.siteContent;
    if (!siteContent || !siteContent.navigation) {
        setTimeout(initNav, 100);
        return;
    }
    renderSidebar(siteContent.navigation);
};

window.addEventListener("DOMContentLoaded", () => {
    initNav();
});

