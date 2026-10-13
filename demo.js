// All paths in this demonstration are fictional. No filesystem or clipboard access.
(() => {
  const samples = [
    { name: 'Website', parent: '~/Projects', type: 'folder' },
    { name: 'Website assets', parent: '~/Design', type: 'folder' },
    { name: 'Website notes.md', parent: '~/Documents', type: 'file' }
  ];
  const search = document.querySelector('#demo-search');
  const results = document.querySelector('#demo-results');
  const panel = document.querySelector('#demo-panel');
  const dismissed = document.querySelector('#demo-dismissed');
  const insertButton = document.querySelector('#demo-insert');
  const status = document.querySelector('#demo-status');
  const tryButton = document.querySelector('#try-demo');
  const composer = document.querySelector('.composer');
  let filter = 'all';
  let selected = 0;
  let matches = [...samples];

  function render() {
    const terms = search.value.trim().toLowerCase().split(/\s+/);
    matches = samples.filter(item => (filter === 'all' || item.type === filter) && terms.every(term => item.name.toLowerCase().includes(term)));
    selected = Math.max(0, Math.min(selected, matches.length - 1));
    results.replaceChildren();
    for (const [index, item] of matches.entries()) {
      const row = document.createElement('button');
      row.className = 'result' + (index === selected ? ' selected' : '');
      row.dataset.index = index;
      row.setAttribute('aria-pressed', String(index === selected));
      const icon = document.createElement('img');
      icon.src = `assets/${item.type === 'folder' ? 'folder' : 'document'}.svg`;
      icon.alt = ''; icon.width = 38; icon.height = 38;
      const copy = document.createElement('span');
      copy.className = 'result-copy';
      const name = document.createElement('strong'); name.textContent = item.name;
      const parent = document.createElement('span'); parent.textContent = item.parent;
      copy.append(name, parent);
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.setAttribute('viewBox', '0 0 20 20'); arrow.setAttribute('aria-hidden', 'true');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'm7 4 6 6-6 6'); arrow.append(path);
      row.append(icon, copy, arrow); results.append(row);
    }
    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-results'; empty.textContent = 'No sample matches. Try “website”.';
      results.append(empty);
    }
    insertButton.disabled = matches.length === 0;
    status.textContent = matches.length ? `${matches.length} sample results. ${matches[selected].name} selected.` : 'No sample results.';
  }

  function select(index) {
    selected = index;
    for (const row of results.querySelectorAll('.result')) {
      const active = Number(row.dataset.index) === selected;
      row.classList.toggle('selected', active); row.setAttribute('aria-pressed', String(active));
    }
    status.textContent = `${matches[selected].name} selected.`;
  }

  function close(message) {
    panel.hidden = true; dismissed.hidden = false;
    document.querySelector('#dismissed-message').textContent = message;
    document.querySelector('#demo-reopen').focus({ preventScroll: true });
  }

  function insert() {
    const item = matches[selected]; if (!item) return;
    const path = `${item.parent}/${item.name}`.replace(/^~/, '/Users/you');
    document.querySelector('#inserted-path').textContent = path;
    composer.classList.remove('inserted');
    close('Path inserted.');
    composer.classList.add('inserted');
    status.textContent = `Inserted ${path} into the example message. Nothing was sent.`;
    tryButton.firstChild.textContent = 'Try again ';
  }

  function open() {
    panel.hidden = false; dismissed.hidden = true;
    search.value = 'website'; filter = 'all'; selected = 0;
    document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    render(); search.focus({ preventScroll: true }); search.select();
  }

  search.addEventListener('input', () => { selected = 0; render(); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter; selected = 0;
    document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    render();
  }));
  results.addEventListener('click', event => {
    const row = event.target.closest('[data-index]');
    if (row) select(Number(row.dataset.index));
  });
  results.addEventListener('focusin', event => {
    const row = event.target.closest('[data-index]');
    if (row) select(Number(row.dataset.index));
  });
  results.addEventListener('dblclick', event => { if (event.target.closest('[data-index]')) insert(); });
  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close('Search closed.'); }
    else if (['ArrowDown', 'ArrowUp'].includes(event.key) && matches.length) {
      event.preventDefault(); select((selected + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length);
      if (event.target.closest('.result')) results.querySelector(`[data-index="${selected}"]`).focus({ preventScroll: true });
    } else if (event.key === 'Enter' && (event.target === search || event.target.closest('.result'))) {
      event.preventDefault(); insert();
    }
  });
  insertButton.addEventListener('click', insert);
  document.querySelector('#demo-close').addEventListener('click', () => close('Search closed.'));
  document.querySelector('#demo-reopen').addEventListener('click', open);
  tryButton.addEventListener('click', open);
  render();
})();
