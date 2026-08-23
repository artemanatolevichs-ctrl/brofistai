/* Навигация главного меню Brofist.io
   В исходном index.html все ссылки заглушены (href="#"), поэтому назначаем их здесь. */
(function () {
  'use strict';

  var ROUTES = {
    'two player adventure': 'two-player.html',
    'hide and seek':        'hide-and-seek.html',
    'sandbox':              'sandbox.html',
    'race':                 { play: 'race' },
    'map editor':           'editor.html',
    'editor':               'editor.html',
    'maps browser':         'mapsBrowser.html',
    'browser':              'mapsBrowser.html',
    'skins browser':        'mapsBrowser.html',
    'logs':                 'logs.html',
    'новости':              'logs.html',
    'leaderboards':         'leaderboards.html',
    'leaderboard':          'leaderboards.html'
  };

  function go(target) {
    if (typeof target === 'string') { location.href = target; return; }
    if (target && target.play) location.href = 'game.html?mode=' + target.play;
  }

  // короткое всплывающее сообщение вместо перехода в никуда
  function toast(text) {
    var t = document.createElement('div');
    t.textContent = text;
    t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:9999;' +
      'background:rgba(0,0,0,.82);color:#fff;padding:11px 20px;border-radius:20px;font-size:14px;' +
      'font-family:sans-serif;pointer-events:none';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 1800);
  }

  function label(el) {
    return (el.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function wireNav() {
    // карточки режимов
    document.querySelectorAll('.card').forEach(function (card) {
      var title = card.querySelector('div');
      var dest = ROUTES[label(title || card)];
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        e.preventDefault();
        if (dest) go(dest); else toast('Этот режим ещё не готов');
      });
    });

    // кнопки и ссылки в шапке
    document.querySelectorAll('.header-link-item-button, .header-link-a, .header-link-item-sub-menu a')
      .forEach(function (el) {
        var dest = ROUTES[label(el)];
        el.style.cursor = 'pointer';
        el.addEventListener('click', function (e) {
          e.preventDefault();
          if (dest) go(dest); else toast('Этот раздел ещё не готов');
        });
      });
  }

  // в исходном макете нет кнопки Sign in — создаём её рядом с иконкой профиля
  function ensureSignIn() {
    if (document.querySelector('.auth-buttons')) return;
    var box = document.querySelector('.profile-container');
    if (!box) return;
    var b = document.createElement('div');
    b.className = 'auth-buttons';
    b.textContent = 'Sign in';
    b.style.cssText = 'float:right;padding:14px 16px;text-align:center;color:#000;cursor:pointer;display:inherit';
    box.appendChild(b);
  }

  // в подменю Menu добавляем разделы, которых нет в исходной вёрстке
  function addMenuItems() {
    var subs = document.querySelectorAll('.header-link-item-sub-menu');
    if (!subs.length) return;
    var menu = subs[subs.length - 1];
    ['Leaderboards', 'Logs'].forEach(function (name) {
      var exists = Array.prototype.some.call(menu.querySelectorAll('a'), function (a) {
        return label(a) === name.toLowerCase();
      });
      if (exists) return;
      var a = document.createElement('a');
      a.href = '#';
      a.textContent = name;
      menu.appendChild(a);
    });
  }

  function boot() { ensureSignIn(); addMenuItems(); wireNav(); }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
