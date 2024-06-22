
export default function isElementVisible(el: any) {
  const rect = el.getBoundingClientRect();
  const isVisible = 
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)  && 
    rect.right >= 0 && 
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    window.getComputedStyle(el).display !== 'none' &&
    window.getComputedStyle(el).visibility !== 'hidden' &&
    window.getComputedStyle(el).opacity !== '0';

  return isVisible;
};
