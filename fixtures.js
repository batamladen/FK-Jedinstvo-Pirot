/* FK Jedinstvo Pirot — fixtures.js */

function set(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val || '–';
}

function updateDOM({ lastResult, nextMatch }) {
  if (lastResult) {
    set('lr-home', lastResult.home);
    set('lr-score', `${lastResult.homeGoals} – ${lastResult.awayGoals}`);
    set('lr-away', lastResult.away);
    const dt = [lastResult.date, lastResult.time].filter(Boolean).join(' ');
    set('lr-date', dt ? `${dt} · Pirotska okružna liga` : 'Pirotska okružna liga');
  }

  if (nextMatch) {
    set('nm-home', nextMatch.home);
    set('nm-away', nextMatch.away);
    const dt = [nextMatch.date, nextMatch.time].filter(Boolean).join(' ');
    set('nm-date', dt ? `${dt} · Pirotska okružna liga` : 'Pirotska okružna liga');

    // Update ticker bar
    const ticker = document.querySelector('.ticker-content');
    if (ticker) {
      const matchStr = `FK Jedinstvo Pirot <strong>vs</strong> ${nextMatch.away}`;
      const extra = [nextMatch.date, nextMatch.time].filter(Boolean).join(' · ');
      const full = extra ? `${matchStr} &nbsp;·&nbsp; ${extra} &nbsp;·&nbsp; Pirotska okružna liga` : matchStr;
      ticker.innerHTML = `${full} &nbsp;&nbsp;&nbsp; ★ &nbsp;&nbsp;&nbsp; ${full} &nbsp;&nbsp;&nbsp; ★ &nbsp;&nbsp;&nbsp; ${full}`;
    }
  }
}

async function loadFixtures() {
  try {
    const res = await fetch('fixtures.json');
    if (!res.ok) throw new Error('fixtures.json not found');
    const data = await res.json();
    updateDOM(data);
  } catch (err) {
    console.error('Could not load fixtures.json:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadFixtures);