# daily-glry

Daily comic strip gallery with mobile/touch support.

Intended for daily comic strips and based on the current date. Specify a start date for the earliest comic, and easily browse through all strips up to current day. Also supports jumping to a random comic.

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

Initialize the gallery with a minimal set of options like this:

```js
var dailyGlry = new DailyGlry({
        load: function (direction) {
            if (direction === 'left')
                return 'prev-image.jpg';
            else
                return 'next-image.jpg';
        }
    });
```

The only required option is `load` which should be a function that returns the URL of the next/prev image. The function is passed a `direction` string parameter indicating whether the navigation direction is "left" or "right".

### Options

The available options and their defaults are as follows:

```js
{
    target: '#figure',
    animationSpeed: 250,
    enableKeyboard: true,
    onLoadStart: false,
    onLoadEnd: false
}
```

If you want to do some work before or after an image has loaded, you can pass a function to `onLoadStart`/`onLoadEnd`.

Keyboard navigation is enabled per default, and maps to the right/left arrow keys to go to next/prev image.

## Shake support (optional)

If you include the great plugin [shake.js](https://github.com/alexgibson/shake.js), shaking your device will go to a random comic same as pressing <kbd>R</kbd>.

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
