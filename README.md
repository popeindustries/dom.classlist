Cross-browser implementation and extension of element.classList

## Usage
```javascript
var classList = require('dom.classlist');
var element = document.getElementById('myElement');
element.className = 'my-class some-class another-class';
classList.hasClass(element, 'my-class'); // => true
classList.addClass(element, 'yet-another-class'); // 'my-class some-class another-class yet-another-class'
classList.matchClass(element, 'yet-another'); // => 'yet-another-class'
classList.removeClass(element, 'yet-another-class'); // 'my-class some-class another-class'
classList.toggleClass(element, 'my-class'); // 'some-class another-class'
classList.replaceClass(element, 'some-class', 'some-other-class'); 'some-other-class another-class'
classlist.addTemporaryClass(element, 'anim-class', 2000);
```
