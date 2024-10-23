(self["webpackChunk"] = self["webpackChunk"] || []).push([["menu"],{

/***/ "./assets/js/menu.js":
/*!***************************!*\
  !*** ./assets/js/menu.js ***!
  \***************************/
/***/ (() => {

console.log('Menu.js is loaded!');
var initMenu = function initMenu() {
  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (!menuToggle || !navLinks) {
    console.error('Menu elements not found!');
    return;
  }
  console.log('Menu elements found, adding click listener...');
  menuToggle.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.toggle('active');
    var icon = menuToggle.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenu);
} else {
  initMenu();
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/js/menu.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztBQUVqQyxJQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBUUEsQ0FBQSxFQUFTO0VBQ25CLElBQU1DLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0VBQ3pELElBQU1DLFFBQVEsR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsWUFBWSxDQUFDO0VBRXJELElBQUksQ0FBQ0YsVUFBVSxJQUFJLENBQUNHLFFBQVEsRUFBRTtJQUMxQk4sT0FBTyxDQUFDTyxLQUFLLENBQUMsMEJBQTBCLENBQUM7SUFDekM7RUFDSjtFQUVBUCxPQUFPLENBQUNDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQztFQUU1REUsVUFBVSxDQUFDSyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO0lBQ3hDQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCSixRQUFRLENBQUNLLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUVuQyxJQUFNQyxJQUFJLEdBQUdWLFVBQVUsQ0FBQ0UsYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUMxQyxJQUFJUSxJQUFJLEVBQUU7TUFDTixJQUFJUCxRQUFRLENBQUNLLFNBQVMsQ0FBQ0csUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3ZDRCxJQUFJLENBQUNGLFNBQVMsQ0FBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNoQ0YsSUFBSSxDQUFDRixTQUFTLENBQUNLLEdBQUcsQ0FBQyxVQUFVLENBQUM7TUFDbEMsQ0FBQyxNQUFNO1FBQ0hILElBQUksQ0FBQ0YsU0FBUyxDQUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2pDRixJQUFJLENBQUNGLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDLFNBQVMsQ0FBQztNQUNqQztJQUNKO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQzs7QUFFRDtBQUNBLElBQUlaLFFBQVEsQ0FBQ2EsVUFBVSxLQUFLLFNBQVMsRUFBRTtFQUNuQ2IsUUFBUSxDQUFDSSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRU4sUUFBUSxDQUFDO0FBQzNELENBQUMsTUFBTTtFQUNIQSxRQUFRLENBQUMsQ0FBQztBQUNkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21lbnUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJ01lbnUuanMgaXMgbG9hZGVkIScpO1xyXG5cclxuY29uc3QgaW5pdE1lbnUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBtZW51VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtdG9nZ2xlJyk7XHJcbiAgICBjb25zdCBuYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtbGlua3MnKTtcclxuXHJcbiAgICBpZiAoIW1lbnVUb2dnbGUgfHwgIW5hdkxpbmtzKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignTWVudSBlbGVtZW50cyBub3QgZm91bmQhJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdNZW51IGVsZW1lbnRzIGZvdW5kLCBhZGRpbmcgY2xpY2sgbGlzdGVuZXIuLi4nKTtcclxuXHJcbiAgICBtZW51VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgbmF2TGlua3MuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGljb24gPSBtZW51VG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcclxuICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICBpZiAobmF2TGlua3MuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYS1iYXJzJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXhtYXJrJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXhtYXJrJyk7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLWJhcnMnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gSW5pdGlhbGl6ZSB3aGVuIERPTSBpcyBsb2FkZWRcclxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluaXRNZW51KTtcclxufSBlbHNlIHtcclxuICAgIGluaXRNZW51KCk7XHJcbn0iXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImluaXRNZW51IiwibWVudVRvZ2dsZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm5hdkxpbmtzIiwiZXJyb3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiaWNvbiIsImNvbnRhaW5zIiwicmVtb3ZlIiwiYWRkIiwicmVhZHlTdGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=