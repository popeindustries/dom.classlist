var classlist = require('../dom.classlist')
  , expect = chai.expect
  , element;

describe('dom.classlist', function() {
  before(function() {
    element = document.createElement('div');
    element.className = 'test-class';
  });
  describe('hasClass()', function() {
    it('should return true if the element has the class', function() {
      expect(classlist.hasClass(element, 'test-class')).to.be.true;
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
});
