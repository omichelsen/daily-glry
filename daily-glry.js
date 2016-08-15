(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['Glry', 'moment'], factory);
    } else {
        root.DailyGlry = factory(root.Glry, root.moment);
    }
}(this, function (Glry, moment) {
    'use strict';

    function DailyGlry(options) {
        var options = Glry.prototype.extend({
            target: '#figure',
            host: null,
            hashFormat: 'YYYY-MM-DD',
            nameFormat: 'YYYY/YYYYMMDD',
            extension: '.png',
            onOutOfRange: false,
            load: load
        }, options);

        options.dateMin = options.dateMin ? moment(options.dateMin) : moment();
        options.dateMax = options.dateMax ? moment(options.dateMax) : moment();

        var glry = new Glry(options);

        window.addEventListener('hashchange', glry.loadImage.bind(this));
        window.addEventListener('shake', glry.loadImage.bind(this, 'random'));
        window.addEventListener('keypress', handleKeyboard);

        var elm = typeof options.target === 'object' ? options.target : document.querySelector(options.target);
        elm.querySelector('.rand').addEventListener('tap', handleNavigationClick.bind(this, 'random'));
        elm.querySelector('.today').addEventListener('tap', handleNavigationClick.bind(this, 'today'));
        elm.querySelector('.share').addEventListener('tap', function (e) {
            var date = getStripDate().format(options.hashFormat);
            var title = encodeURIComponent(document.title);
            window.location.href = 'mailto:?subject=Shared ' + title + ' Strip: ' + date + '&body=See this funny strip: ' + window.location.href;
        });

        function load(direction) {
            var date;

            switch (direction) {
                case 'left':    date = getStripDate().add(-1, 'days'); break;
                case 'right':   date = getStripDate().add(1, 'days'); break;
                case 'random':  date = getRandomDate(); break;
                case 'today':   date = options.dateMax; break;
                default:        date = (window.navigator.standalone) ? options.dateMax : getStripDate(); break;
            }

            if (date < options.dateMin || date > options.dateMax) {
                if (options.onOutOfRange !== false) options.onOutOfRange();
                return false;
            }

            window.location.hash = date.format(options.hashFormat);

            return getImageUrl(date);
        }

        function handleKeyboard(e) {
            e.preventDefault();
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
            return getDateFromString(window.location.hash) || options.dateMax;
        }

        function getDateFromString(string) {
            if (!string) return null;
            return moment(string, options.hashFormat);
        }

        function getRandomDate() {
            var min = options.dateMin.valueOf(),
                max = options.dateMax.valueOf();
            return moment(new Date(Math.random() * (max - min) + min));
        }

        function getImageUrl(date) {
            return options.host + date.format(options.nameFormat) + options.extension;
        }
    }

    return DailyGlry;

}));
