/*!
 * daily-glry v0.3.0 (https://github.com/omichelsen/daily-glry)
 * Copyright 2014 Ole Michelsen <ole@michelsen.dk>
 * Licensed under MIT
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['Glry', 'moment'], factory);
    } else {
        root.DailyGlry = factory(root.Glry, root.moment);
    }
}(this, function (Glry, moment) {
    'use strict';

    function extend(target, source) {
        if (typeof source !== 'object') return target;
        for (var prop in source) {
            target[prop] = source[prop];
        }
        return target;
    }

    function DailyGlry(options) {
        var options = extend({
            target: '#figure',
            host: null,
            enableHash: true,
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

        window.addEventListener('keyup', function (e) {
            e.preventDefault();
            if (e.keyCode === 82) {
                glry.loadImage('random');
            } else if (e.keyCode === 84) {
                glry.loadImage('today');
            }
        });

        document.querySelector('.prev').addEventListener('click', glry.loadImage.bind(this, 'left'));
        document.querySelector('.next').addEventListener('click', glry.loadImage.bind(this, 'right'));
        document.querySelector('.rand').addEventListener('click', glry.loadImage.bind(this, 'random'));
        document.querySelector('.today').addEventListener('click', glry.loadImage.bind(this, 'today'));

        document.querySelector('.share').addEventListener('click', function () {
            var date = getStripDate().format(options.hashFormat);
            var title = encodeURIComponent(document.title);
            window.location.href = 'mailto:?subject=Shared ' + title + ' Strip: ' + date + '&body=See this funny strip: ' + window.location.href;
        });

        function load(direction) {
            var date;

            switch (direction) {
            case 'left':
                date = getStripDate().add(-1, 'days');
                break;
            case 'right':
                date = getStripDate().add(1, 'days');
                break;
            case 'random':
                date = getRandomDate();
                break;
            case 'today':
                date = options.dateMax;
                break;
            default:
                date = getStripDate();
                break;
            }

            if (date < options.dateMin || date > options.dateMax) {
                if (options.onOutOfRange !== false) options.onOutOfRange();
                return false;
            }

            if (options.enableHash)
                window.location.hash = date.format(options.hashFormat);

            return getImageUrl(date);
        }

        function getStripDate() {
            return options.enableHash && getDateFromString(window.location.hash) || options.dateMax;
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
