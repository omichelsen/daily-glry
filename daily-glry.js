import { Glry } from 'glry';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

function DailyGlry(params) {
  const options = {
    target: '#figure',
    host: null,
    hashFormat: 'yyyy-MM-dd',
    nameFormat: 'yyyy/yyyyMMdd',
    extension: '.png',
    onOutOfRange: false,
    load,
    canNavigate,
    ...params,
  };

  options.dateMin = options.dateMin ? new Date(options.dateMin) : new Date();
  options.dateMax = options.dateMax ? new Date(options.dateMax) : new Date();

  const glry = new Glry(options);

  window.addEventListener('hashchange', glry.loadImage.bind(this));
  window.addEventListener('shake', glry.loadImage.bind(this, 'random'));
  window.addEventListener('keydown', handleKeyboard);

  const elm = typeof options.target === 'object' ? options.target : document.querySelector(options.target);
  elm.querySelector('.rand').addEventListener('tap', handleNavigationClick.bind(this, 'random'));
  elm.querySelector('.today').addEventListener('tap', handleNavigationClick.bind(this, 'today'));
  elm.querySelector('.share').addEventListener('tap', function (e) {
    if (navigator.share) {
      return navigator.share({
        text: document.title,
        url: window.location.href,
      });
    }

    const date = format(getStripDate(), options.hashFormat);
    const title = encodeURIComponent(document.title);
    window.location.href = `mailto:?subject=Shared ${title} Strip: ${date}&body=See this funny strip: ${window.location.href}`;
  });

  function getNextDate(direction) {
    let date;

    switch (direction) {
      case 'left':    date = addDays(getStripDate(), -1); break;
      case 'right':   date = addDays(getStripDate(), 1); break;
      case 'random':  date = getRandomDate(); break;
      case 'today':   date = options.dateMax; break;
      default:        date = getStripDate(); break;
    }

    return date;
  }

  function canNavigate(direction) {
    const date = getNextDate(direction);

    if (date < options.dateMin || date > options.dateMax) {
      return false;
    }

    return true;
  }

  function load(direction) {
    const date = getNextDate(direction);

    if (date < options.dateMin || date > options.dateMax) {
      if (options.onOutOfRange !== false) options.onOutOfRange();
      return false;
    }

    if (direction) {
      setDateCookie(date);
      setDateHash(date);
    }

    return getImageUrl(date);
  }

  function handleKeyboard(e) {
    if ([82, 114].indexOf(e.keyCode) > -1) {
      glry.loadImage('random');
    } else if ([84, 116].indexOf(e.keyCode) > -1) {
      glry.loadImage('today');
    }
  }

  function handleNavigationClick(direction, e) {
    e.stopPropagation();
    glry.loadImage(direction);
  }

  function getStripDate() {
    return getDateFromHash() || getDateFromCookie() || options.dateMax;
  }

  function getDateFromString(string) {
    if (!string) return null;
    return parse(string, options.hashFormat, new Date());
  }

  function getDateFromHash() {
    return getDateFromString(window.location.hash.replace('#', ''));
  }

  function setDateHash(date) {
    window.location.hash = format(date, options.hashFormat);
  }

  function getDateFromCookie() {
    const date = /date=([^;]+)/.exec(document.cookie);
    if (date) {
      return getDateFromString(date[1]);
    }
  }

  function setDateCookie(date) {
    const expires = addDays(new Date(), 365).toUTCString();
    document.cookie = `date=${format(date, options.hashFormat)}; expires=${expires}`;
  }

  function getRandomDate() {
    const min = options.dateMin.valueOf();
    const max = options.dateMax.valueOf();
    return new Date(Math.random() * (max - min) + min);
  }

  function getImageUrl(date) {
    return options.host + format(date, options.nameFormat) + options.extension;
  }
}

export default DailyGlry;
