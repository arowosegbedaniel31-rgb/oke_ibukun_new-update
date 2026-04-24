const monthLabels = {
  january: 'January',
  february: 'February',
  march: 'March',
  april: 'April',
  may: 'May',
  june: 'June',
  july: 'July',
  august: 'August',
  september: 'September',
  october: 'October',
  november: 'November',
  december: 'December'
};

const monthThemes = {
  january: 'Fresh beginnings, prayer, and renewed focus.',
  february: 'Community care, encouragement, and fellowship.',
  march: 'Teaching, growth, and youth connection.',
  april: 'Celebration, resurrection hope, and shared service.',
  may: 'Training, mentoring, and ministry strength.',
  june: 'Midyear reflection, care, and family connection.',
  july: 'Children, creativity, and joyful worship.',
  august: 'Outreach, service, and visible compassion.',
  september: 'Blessing, momentum, and prayerful support.',
  october: 'Thanksgiving, milestones, and church family joy.',
  november: 'Gratitude, outreach, and reflection.',
  december: 'Celebration, carols, and hopeful transition.'
};

const monthShort = {
  january: 'jan',
  february: 'feb',
  march: 'mar',
  april: 'apr',
  may: 'may',
  june: 'jun',
  july: 'jul',
  august: 'aug',
  september: 'sep',
  october: 'oct',
  november: 'nov',
  december: 'dec'
};

const imagePool = [
  'gallery-worship.svg',
  'gallery-community.svg',
  'gallery-prayer.svg',
  'gallery-outreach.svg',
  'hero-background.svg'
];

const sundayLabels = [
  'First Sunday',
  'Second Sunday',
  'Third Sunday',
  'Fourth Sunday'
];

const sundayAnchors = [
  'first-sunday',
  'second-sunday',
  'third-sunday',
  'fourth-sunday'
];

function getWeekCounts(year, month) {
  return [10, 10, 10, 10];
}

function getMonthlySummary(year, month) {
  const counts = getWeekCounts(year, month);
  const total = counts.reduce((sum, count) => sum + count, 0);
  const topCount = Math.max(...counts);
  const topWeek = counts.indexOf(topCount) + 1;
  const equalDistribution = counts.every((count) => count === counts[0]);
  return { counts, total, topCount, topWeek, equalDistribution };
}

function createCard(year, month, weekNumber, imageIndex) {
  const shortMonth = monthShort[month];
  const title = `${shortMonth}${year}-week${weekNumber}-img${String(imageIndex + 1).padStart(2, '0')}`;
  const image = imagePool[(weekNumber + imageIndex) % imagePool.length];
  const description = `${monthLabels[month]} ${year}, week ${weekNumber}: image ${imageIndex + 1} from a church moment of worship, prayer, community, and service.`;
  return { title, image, description };
}

function renderMonthlyPage(root) {
  const year = root.dataset.year;
  const month = root.dataset.month;
  const previewTarget = document.querySelector('[data-month-preview]');
  const totalNode = document.querySelector('[data-total-uploads]');
  const topWeekNode = document.querySelector('[data-top-week]');
  const topCountNode = document.querySelector('[data-top-count]');
  const summaryTextNode = document.querySelector('[data-summary-text]');
  const { counts, total, topCount, topWeek, equalDistribution } = getMonthlySummary(year, month);

  if (totalNode) totalNode.textContent = total;
  if (topWeekNode) topWeekNode.textContent = equalDistribution ? 'All Sundays' : `Week ${topWeek}`;
  if (topCountNode) topCountNode.textContent = topCount;
  if (summaryTextNode) {
    summaryTextNode.textContent = equalDistribution
      ? `${monthLabels[month]} ${year} recorded ${total} image uploads across four Sundays, with each Sunday carrying ${topCount} uploads.`
      : `${monthLabels[month]} ${year} recorded ${total} image uploads, with Week ${topWeek} carrying the highest activity at ${topCount} uploads.`;
  }

  if (previewTarget) {
    const cards = [];
    counts.forEach((count, index) => {
      const previewCount = Math.min(2, count);
      for (let i = 0; i < previewCount; i += 1) {
        const card = createCard(year, month, index + 1, i);
        cards.push(`
          <article class="image-hover-card preview-card-tile">
            <img src="${card.image}" alt="${card.title}" loading="lazy">
            <div class="image-hover-overlay">
              <h3>${card.title}</h3>
              <p>${card.description}</p>
            </div>
          </article>
        `);
      }
    });
    previewTarget.innerHTML = cards.join('');
  }
}

function renderWeeklyPage(root) {
  const year = root.dataset.year;
  const month = root.dataset.month;
  const weeklyTarget = document.querySelector('[data-weekly-sections]');
  const summaryTextNode = document.querySelector('[data-weekly-summary]');
  const { counts, total, topCount } = getMonthlySummary(year, month);

  if (summaryTextNode) {
    summaryTextNode.textContent = `${monthLabels[month]} ${year} contains ${total} images arranged into First Sunday, Second Sunday, Third Sunday, and Fourth Sunday sections with ${topCount} images each.`;
  }

  if (!weeklyTarget) {
    return;
  }

  const sections = counts.map((count, index) => {
    const cards = Array.from({ length: count }, (_, imageIndex) => createCard(year, month, index + 1, imageIndex));
    return `
      <section class="weekly-section" id="${sundayAnchors[index]}">
        <div class="month-heading">
          <div class="weekly-heading-copy">
            <span class="tag">Sunday Service</span>
            <h2>${sundayLabels[index]}</h2>
          </div>
          <p>${count} images</p>
        </div>
        <div class="weekly-image-grid">
          ${cards.map((card) => `
            <article class="image-hover-card">
              <img src="${card.image}" alt="${card.title}" loading="lazy">
              <div class="image-hover-overlay">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  });

  weeklyTarget.innerHTML = sections.join('');
}

const root = document.querySelector('[data-gallery-mode]');
if (root) {
  if (root.dataset.galleryMode === 'monthly') {
    renderMonthlyPage(root);
  }
  if (root.dataset.galleryMode === 'weekly') {
    renderWeeklyPage(root);
  }
}
