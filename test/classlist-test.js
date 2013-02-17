var classlist, expect, element;

// Make it work in node..
try {
  classlist = require('../index.js');
  expect = require('expect.js');
// .. or browser
} catch (err) {
  classlist = require('./dom.classlist');
  expect = window.expect;
}

describe('dom.classlist', function() {
  before(function() {
    element = document.createElement('div');
    element.className = 'test-class';
  });
  describe('hasClass()', function() {
    it('should return true if the element has the class', function() {
      expect(classlist.hasClass(element, 'test-class')).to.be(true);
    });
    it('should return false if the element does not have the class', function() {
      expect(classlist.hasClass(element, 'no-class')).to.be(false);
    });
  });
  describe('matchClass()', function() {
    it('should return the class if the element has a class matching the pattern', function() {
      expect(classlist.matchClass(element, 'test-')).to.equal('test-class');
    });
    it('should return an empty string if the element does not have a class matching the pattern', function() {
      expect(classlist.matchClass(element, 'no-')).to.equal('');
    });
  });
  describe('addClass()', function() {
    it('should add the class to the element', function() {
      classlist.addClass(element, 'add-class');
      expect(element.className).to.equal('test-class add-class');
    });
  });
  describe('removeClass()', function() {
    it('should remove the class from the element', function() {
      classlist.removeClass(element, 'add-class');
      expect(element.className).to.equal('test-class');
    });
  });
  describe('toggleClass()', function() {
    it('should add the class to the element', function() {
      classlist.toggleClass(element, 'toggle-class');
      expect(element.className).to.equal('test-class toggle-class');
    });
    it('should remove the class from the element', function() {
      classlist.toggleClass(element, 'toggle-class');
      expect(element.className).to.equal('test-class');
    });
  });
  describe('replaceClass()', function() {
    it('should replace the class with another', function() {
      classlist.replaceClass(element, 'test-class', 'replace-class');
      expect(element.className).to.equal('replace-class');
    });
  });
  describe('addTemporaryClass()', function() {
    it('should add the class to the element and remove it after a specified duration', function(done) {
      classlist.addTemporaryClass(element, 'timed-class', 500);
      setTimeout(function() {
        expect(element.className).to.equal('replace-class');
        done();
      }, 600);
    });
  });
});
