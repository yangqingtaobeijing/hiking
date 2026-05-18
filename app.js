// ============================
// SVG Icons
// ============================
const ICONS = {
  location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  distance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6l-6 6-6-6"/><path d="M12 12v6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 21l4-10 4 10"/><path d="M2 21l6-14 4 8"/><path d="M14 15l4-9 4 14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>',
  externalLink: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  shirt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10h12V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  bus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 21v-2"/><path d="M17 21v-2"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>'
};

// ============================
// App State
// ============================
let currentFilter = { level: 'all', region: 'all' };
let currentTrail = null;

// ============================
// Router
// ============================
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash || '#/';
  const [path, query] = hash.slice(1).split('?');

  // Parse query params
  const params = new URLSearchParams(query || '');
  if (path === '/' && params.get('level')) {
    currentFilter.level = params.get('level');
  }

  if (path === '/') {
    renderHome();
  } else if (path.startsWith('/trail/')) {
    const trailId = path.split('/')[2];
    renderTrailDetail(trailId);
  } else if (path === '/resources') {
    renderResources();
  } else if (path === '/about') {
    renderAbout();
  } else {
    renderHome();
  }

  // Update active nav link
  document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
    const page = link.dataset.page;
    link.classList.toggle('active',
      (page === 'home' && (path === '/' || path.startsWith('/trail/'))) ||
      (page === 'resources' && path === '/resources') ||
      (page === 'about' && path === '/about')
    );
  });

  // Close mobile menu
  document.getElementById('mobileMenu').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================
// Render: Home
// ============================
function renderHome() {
  const app = document.getElementById('app');
  const filtered = filterTrails();

  app.innerHTML = `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>探索世界<br>从脚下开始</h1>
        <p class="hero-subtitle">精选国内外 12 条经典徒步路线，从入门到进阶，开启你的山野之旅</p>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-num">${TRAILS.length}</div>
            <div class="hero-stat-label">精选路线</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">${TRAILS.filter(t => t.region === 'domestic').length}</div>
            <div class="hero-stat-label">国内路线</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">${TRAILS.filter(t => t.region === 'international').length}</div>
            <div class="hero-stat-label">国际路线</div>
          </div>
        </div>
        <a href="#trails" class="hero-cta" onclick="event.preventDefault();document.getElementById('trails').scrollIntoView({behavior:'smooth'})">
          浏览路线 ${ICONS.arrow}
        </a>
      </div>
      <div class="hero-scroll">${ICONS.chevronDown}</div>
    </section>

    <!-- Trail Listing -->
    <section class="section" id="trails">
      <div class="section-header">
        <div class="section-tag">路线总览</div>
        <h2 class="section-title">精选徒步路线</h2>
        <p class="section-desc">覆盖国内外经典路线，从轻松惬意到硬核挑战，总有一条适合你</p>
      </div>

      <!-- Filters -->
      <div class="filter-bar">
        <button class="filter-btn ${currentFilter.region === 'all' ? 'active' : ''}" data-filter="region" data-value="all">全部</button>
        <button class="filter-btn ${currentFilter.region === 'domestic' ? 'active' : ''}" data-filter="region" data-value="domestic">国内</button>
        <button class="filter-btn ${currentFilter.region === 'international' ? 'active' : ''}" data-filter="region" data-value="international">国际</button>
        <span style="width:1px;height:24px;background:var(--color-border);margin:0 8px"></span>
        <button class="filter-btn ${currentFilter.level === 'all' ? 'active' : ''}" data-filter="level" data-value="all">全部难度</button>
        <button class="filter-btn ${currentFilter.level === 'beginner' ? 'active' : ''}" data-filter="level" data-value="beginner">初级</button>
        <button class="filter-btn ${currentFilter.level === 'intermediate' ? 'active' : ''}" data-filter="level" data-value="intermediate">中级</button>
        <button class="filter-btn ${currentFilter.level === 'advanced' ? 'active' : ''}" data-filter="level" data-value="advanced">高级</button>
      </div>

      <!-- Trail Grid -->
      <div class="trail-grid">
        ${filtered.map(trail => renderTrailCard(trail)).join('')}
      </div>
      ${filtered.length === 0 ? '<p style="text-align:center;color:var(--color-text-secondary);padding:40px 0">暂无匹配的路线，试试其他筛选条件</p>' : ''}
    </section>
  `;

  // Bind filter events
  app.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const filterType = btn.dataset.filter;
      const value = btn.dataset.value;
      currentFilter[filterType] = value;
      renderHome();
      // Scroll to trails section
      setTimeout(() => {
        document.getElementById('trails')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    });
  });

  // Bind card clicks
  app.querySelectorAll('.trail-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.hash = `/trail/${card.dataset.id}`;
    });
  });

  initFadeAnimations();
}

function filterTrails() {
  return TRAILS.filter(trail => {
    if (currentFilter.level !== 'all' && trail.level !== currentFilter.level) return false;
    if (currentFilter.region !== 'all' && trail.region !== currentFilter.region) return false;
    return true;
  });
}

function renderTrailCard(trail) {
  const levelInfo = LEVEL_MAP[trail.level];
  const regionInfo = REGION_MAP[trail.region];

  return `
    <article class="trail-card fade-in" data-id="${trail.id}">
      <div class="trail-card-img">
        <img src="${trail.image}" alt="${trail.name}" loading="lazy">
        <div class="trail-card-badge">
          <span class="badge ${levelInfo.css}">${levelInfo.label}</span>
          <span class="badge badge-region">${regionInfo}</span>
        </div>
      </div>
      <div class="trail-card-body">
        <h3 class="trail-card-name">${trail.name}</h3>
        <div class="trail-card-location">${trail.location}</div>
        <p class="trail-card-desc">${trail.summary}</p>
        <div class="trail-card-meta">
          <span class="trail-meta-item">${ICONS.distance} ${trail.distance}</span>
          <span class="trail-meta-item">${ICONS.clock} ${trail.duration}</span>
          <span class="trail-meta-item">${ICONS.mountain} ${trail.elevation}</span>
        </div>
      </div>
      <div class="trail-card-arrow">${ICONS.arrow}</div>
    </article>
  `;
}

// ============================
// Render: Trail Detail
// ============================
function renderTrailDetail(trailId) {
  const trail = TRAILS.find(t => t.id === trailId);
  if (!trail) {
    renderHome();
    return;
  }

  const app = document.getElementById('app');
  const levelInfo = LEVEL_MAP[trail.level];
  const regionInfo = REGION_MAP[trail.region];

  app.innerHTML = `
    <!-- Detail Hero -->
    <section class="detail-hero">
      <div class="detail-hero-bg" style="background-image:url('${trail.image}')"></div>
      <div class="detail-hero-overlay"></div>
      <div class="detail-hero-content">
        <div class="detail-breadcrumb">
          <a href="#/">路线总览</a>
          <span>${ICONS.chevronRight}</span>
          <span>${trail.name}</span>
        </div>
        <h1 class="detail-title">${trail.name}</h1>
        <p class="detail-subtitle">${trail.location} · ${trail.bestSeason}</p>
        <div class="detail-badges">
          <span class="badge ${levelInfo.css}">${levelInfo.label}</span>
          <span class="badge badge-region">${regionInfo}</span>
        </div>
      </div>
    </section>

    <!-- Detail Body -->
    <div class="detail-body">
      <div class="detail-grid">
        <!-- Main Content -->
        <div class="detail-main">
          <!-- Overview -->
          <div class="detail-section">
            <h2 class="detail-section-title">路线概况</h2>
            ${trail.description}
          </div>

          <!-- Clothing -->
          <div class="detail-section">
            <h2 class="detail-section-title">衣 — 装备建议</h2>
            <ul>
              ${trail.clothing.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- Food -->
          <div class="detail-section">
            <h2 class="detail-section-title">食 — 饮食指南</h2>
            <ul>
              ${trail.food.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- Accommodation -->
          <div class="detail-section">
            <h2 class="detail-section-title">住 — 住宿推荐</h2>
            <ul>
              ${trail.accommodation.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- Transportation -->
          <div class="detail-section">
            <h2 class="detail-section-title">行 — 交通指南</h2>
            <ul>
              ${trail.transportation.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <!-- Warnings -->
          ${trail.warnings.length > 0 ? `
          <div class="detail-section">
            <h2 class="detail-section-title">注意事项</h2>
            <div class="warning-box">
              <div class="warning-box-title">⚠️ 安全提醒</div>
              <ul>
                ${trail.warnings.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          ` : ''}

          <!-- Resources -->
          ${trail.resources.length > 0 ? `
          <div class="detail-section">
            <h2 class="detail-section-title">相关资源</h2>
            <div class="resource-grid">
              ${trail.resources.map(res => `
                <a href="${res.url}" target="_blank" rel="noopener" class="resource-card">
                  <div class="resource-card-type">${res.type}</div>
                  <div class="resource-card-title">${res.title}</div>
                  <div class="resource-card-link">访问</div>
                </a>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>

        <!-- Sidebar -->
        <div class="detail-sidebar">
          <!-- Quick Info -->
          <div class="info-card">
            <div class="info-card-header">${ICONS.mountain} 路线信息</div>
            <div class="info-card-body">
              <div class="info-grid">
                <div>
                  <div class="info-item-label">总距离</div>
                  <div class="info-item-value">${trail.distance}</div>
                </div>
                <div>
                  <div class="info-item-label">预计时长</div>
                  <div class="info-item-value">${trail.duration}</div>
                </div>
                <div>
                  <div class="info-item-label">海拔高度</div>
                  <div class="info-item-value">${trail.elevation}</div>
                </div>
                <div>
                  <div class="info-item-label">最佳季节</div>
                  <div class="info-item-value">${trail.bestSeason}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Highlights -->
          <div class="info-card">
            <div class="info-card-header">${ICONS.star} 路线亮点</div>
            <div class="info-card-body">
              <div style="display:flex;flex-wrap:wrap;gap:6px">
                ${trail.highlights.map(h => `<span class="badge badge-region">${h}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Difficulty -->
          <div class="info-card">
            <div class="info-card-header">${ICONS.alert} 难度等级</div>
            <div class="info-card-body">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
                <span class="badge ${levelInfo.css}" style="font-size:14px;padding:6px 16px">${levelInfo.label}</span>
              </div>
              <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.6;margin:0">
                ${trail.level === 'beginner' ? '适合所有体能水平，无需专业装备和经验' :
                  trail.level === 'intermediate' ? '需要一定体力基础和户外经验，建议提前训练' :
                  '需要丰富的户外经验和良好体能，可能涉及技术性路段'}
              </p>
            </div>
          </div>

          <!-- Back Button -->
          <a href="#/" class="hero-cta" style="display:flex;justify-content:center;text-align:center;width:100%">
            ← 返回全部路线
          </a>
        </div>
      </div>
    </div>
  `;

  initFadeAnimations();
}

// ============================
// Render: Resources
// ============================
function renderResources() {
  const app = document.getElementById('app');
  const categories = Object.values(RESOURCES);

  app.innerHTML = `
    <section class="section" style="margin-top:64px">
      <div class="section-header">
        <div class="section-tag">资源导航</div>
        <h2 class="section-title">探索更多</h2>
        <p class="section-desc">精选国内外权威户外资源，帮你建立系统的徒步知识体系</p>
      </div>

      ${categories.map(cat => `
        <div class="resource-category fade-in">
          <h3 class="resource-category-title">${cat.title}</h3>
          <p class="resource-category-desc">${cat.desc}</p>
          <div class="resource-grid">
            ${cat.items.map(item => `
              <a href="${item.url}" target="_blank" rel="noopener" class="resource-card">
                <div class="resource-card-type">${item.type}</div>
                <h4 class="resource-card-title">${item.title}</h4>
                <p class="resource-card-desc">${item.desc}</p>
                <div class="resource-card-link">访问网站</div>
              </a>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </section>
  `;

  initFadeAnimations();
}

// ============================
// Render: About
// ============================
function renderAbout() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="section" style="margin-top:64px">
      <div class="section-header">
        <div class="section-tag">关于</div>
        <h2 class="section-title">山径探索</h2>
        <p class="section-desc">探索世界，从脚下开始</p>
      </div>

      <div class="about-content fade-in">
        <h2>关于我们</h2>
        <p>山径探索是一个徒步路线信息聚合平台，致力于为户外爱好者提供全面、实用的徒步路线信息。我们精选了国内外 12 条经典徒步路线，从入门级的田园漫步到挑战级的高海拔穿越，覆盖不同难度和地域。</p>

        <p>每条路线都包含详尽的"衣食住行"信息，帮助你做好充分的出行准备。同时，我们汇集了权威的户外网站、经典书籍和优秀纪录片资源，助你建立系统的户外知识体系。</p>

        <h2>路线分级标准</h2>
        <p><strong>初级：</strong>适合所有体能水平的徒步者，路线标识清晰，无需专业装备，一天内可完成或沿途有完善的食宿条件。</p>
        <p><strong>中级：</strong>需要一定的体力基础和户外经验，可能涉及中等海拔（3,000-4,500 米）或多日露营，建议提前进行体能训练。</p>
        <p><strong>高级：</strong>需要丰富的高海拔徒步经验、良好的体能和技术装备，可能涉及 4,500 米以上海拔、技术性路段或极端天气条件。</p>

        <div class="disclaimer-box">
          <h3>免责声明</h3>
          <p>本站所有信息仅供参考，不构成任何出行建议。徒步活动存在固有风险，包括但不限于：高海拔反应、恶劣天气、地形危险、野生动物等。出行前请：</p>
          <ul style="list-style:decimal;padding-left:20px;margin-top:8px">
            <li style="margin-bottom:6px">充分了解路线信息和自身能力</li>
            <li style="margin-bottom:6px">购买适当的旅行和户外保险</li>
            <li style="margin-bottom:6px">告知他人你的行程计划</li>
            <li style="margin-bottom:6px">携带必要的安全装备和通讯工具</li>
            <li style="margin-bottom:6px">尊重当地环境和文化</li>
          </ul>
          <p style="margin-top:12px;font-weight:500;color:var(--color-accent)">安全第一，量力而行，享受山野之美。</p>
        </div>
      </div>
    </section>
  `;

  initFadeAnimations();
}

// ============================
// Animations
// ============================
function initFadeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
    // Fallback: ensure elements become visible even if observer doesn't fire
    setTimeout(() => el.classList.add('visible'), 800);
  });
}

// ============================
// Navbar Scroll Effect
// ============================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ============================
// Back to Top
// ============================
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = ICONS.up;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// ============================
// Init
// ============================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBackToTop();
  initRouter();
});
