# daily-glry

Daily comic strip gallery with mobile/touch support.

Intended for daily comic strips and based on the current date. Specify a start date for the earliest comic, and browse through all strips up to current day.

Supports touch gestures (swipe & shake) and the following keyboard shortcuts:

<kbd>◀</kbd> previous date
<kbd>▶</kbd> next date
<kbd>R</kbd> random comic
<kbd>T</kbd> today's comic

daily-glry is based on [glry](https://github.com/omichelsen/glry.git), and requires [Moment.js](http://momentjs.com/).

## Install

```bash
$ bower install glry daily-glry moment --save
```

Include the libraries in your web page:

```html
<script src="bower_components/moment/moment.js"></script>
<script src="bower_components/glry/glry.js"></script>
<script src="bower_components/glry/daily-glry.js"></script>
```

## Usage

Place some basic HTML on your page:

```html
<figure id="figure">
	<div class="loading">LOADING</div>
	<div class="error">STRIP MISSING</div>

	<nav class="navigation">
		<button class="prev">◀</button>
		<button class="rand">Random</button>
		<button class="next">▶</button>
		<button class="today">Today</button>
		<button class="share">Share</button>
	</nav>
</figure>
```

Initialize the gallery with a minimal set of options like this:

```js
var dailyGlry = new DailyGlry({
        dateMin: [2014, 1, 22],
        host: 'http://mycomic.com/archive/',
        extension: '.png',
        onOutOfRange: function () {
            alert('No more comics until tomorrow.');
        }
    });
```

The only required option is `host` which should be the base domain and folder of your comics. This will be used to load the daily comic file. The current year and date will be appended to `host` like this:

    http://mycomic.com/archive/2014/20140204.png

### Options

The available options and their defaults are as follows:

```js
{
    target: '#figure',
    host: null,
    enableHash: true,
    hashFormat: 'YYYY-MM-DD',
    nameFormat: 'YYYY/YYYYMMDD',
    extension: '.png',
    onOutOfRange: false
}
```

You can change the filename and hash format with `nameFormat`/`hashFormat` using the [moment format syntax](http://momentjs.com/docs/#/displaying/format/).

If a date outside the specified range is called, you can call custom logic by passing a function to `onOutOfRange`.

All the options available in [glry](https://github.com/omichelsen/glry) can also be used.

## Shake support (optional)

If you include the great plugin [shake.js](https://github.com/alexgibson/shake.js), shaking your device will load a random comic same as pressing <kbd>R</kbd>.

Just install the plugin and include it on the page:

```bash
$ bower install shake.js --save
```

```html
<script src="bower_components/shake.js/shake.js"></script>
```


## Licence
The MIT License (MIT)

Copyright (c) 2014 Ole Michelsen http://ole.michelsen.dk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
