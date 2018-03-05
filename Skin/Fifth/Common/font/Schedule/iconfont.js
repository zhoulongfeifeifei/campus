;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-yule" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M446.16192 803.304448c-29.57824 28.073984-65.79712 52.293632-100.538368 60.368896-27.249664 6.358016-53.5552 2.74432-75.073536-16.6656-38.018048-34.361344-15.215616-71.207936-0.089088-95.60576 10.765312-17.426432 20.939776-33.88928 17.982464-50.199552-5.901312-32.392192-37.931008-34.978816-47.589376-34.996224-31.034368-0.121856-66.092032 19.412992-73.02656 56.73984-1.830912 9.901056-11.380736 16.44544-21.28896 14.610432-9.906176-1.85344-16.421888-11.384832-14.585856-21.287936 10.625024-56.90368 62.824448-86.663168 108.964864-86.53312 43.49952 0.08192 76.218368 25.560064 83.408896 64.903168 5.494784 30.152704-10.232832 55.545856-22.856704 75.95008-17.755136 28.663808-20.49024 36.675584-6.46656 49.347584 40.155136 36.28032 117.387264-34.870272 126.083072-43.109376 7.273472-6.902784 18.819072-6.614016 25.761792 0.697344C453.79072 784.832512 453.491712 796.363776 446.16192 803.304448L446.16192 803.304448zM537.41568 748.036096c-17.212416 27.636736-54.218752 35.70688-82.688 18.00192-28.424192-17.716224-37.577728-54.518784-20.36224-82.126848l140.087296-284.916736c21.241856 60.716032 78.53056 100.9664 141.524992 101.916672L537.41568 748.036096 537.41568 748.036096zM748.60032 479.193088c-6.48704 1.50016-12.952576 2.49344-19.410944 3.040256-64.384 5.336064-124.863488-36.728832-141.018112-100.944896-0.185344-0.790528-0.4096-1.544192-0.590848-2.313216-16.777216-72.066048 28.186624-144.29696 100.209664-161.058816 72.047616-16.750592 144.278528 28.209152 161.030144 100.262912C865.583104 390.20032 820.626432 462.44864 748.60032 479.193088L748.60032 479.193088zM748.60032 479.193088" fill="#3a862c" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-geren01" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512.055259 198.868303c-81.940221 0-148.468426 67.122747-148.468426 150.096507 0 82.977853 66.529229 150.1006 148.468426 150.1006s148.468426-67.122747 148.468426-150.1006C660.523685 265.99105 593.994456 198.868303 512.055259 198.868303z" fill="#3a862c" ></path>'+
      ''+
      '<path d="M757.86671 825.131697l-491.299539 0c-37.290301 0-66.266239-34.613332-57.360406-70.824045 32.252565-131.135666 155.666362-198.938911 303.072597-198.938911 146.013515 0 268.485871 66.529229 302.134225 195.240683C824.236304 788.182156 796.703227 825.131697 757.86671 825.131697z" fill="#3a862c" ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-shumiao" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M998.4 221.184c-7.68-20.992-19.456-39.936-36.352-55.808-16.896-15.872-37.376-28.672-62.464-37.376s-54.272-11.776-87.552-8.192c-22.528 2.048-45.568 7.68-69.12 16.896s-46.08 20.48-67.584 34.304c-21.504 13.824-40.96 29.184-58.88 46.592-17.92 17.408-32.256 35.84-43.008 54.784-10.24-20.48-23.04-40.96-38.4-61.44s-32.256-39.936-50.176-57.856c-17.92-17.92-36.864-34.304-56.32-48.128S390.656 79.872 373.76 71.68c-16.896-7.68-34.816-12.8-52.736-16.384-17.92-3.584-35.84-4.608-53.248-4.096-17.408 0.512-33.792 3.584-48.64 9.216-14.848 5.632-28.16 13.312-38.912 23.552-12.288 12.288-23.04 26.112-32.256 40.96-9.216 14.848-15.36 31.232-18.432 48.128-3.072 16.896-2.048 34.304 2.56 52.224 4.608 17.92 44.544 162.816 280.576 223.232 29.696 7.68 58.368 7.168 84.992 1.024-8.704 38.912-16.896 82.432-23.552 131.072s-10.24 99.328-10.24 152.576c0 41.472-0.512 76.8-1.024 105.472-0.512 28.672-1.536 51.712-2.048 69.632-1.536 20.992-2.56 38.4-3.072 51.2h119.808c-2.048-20.992-3.584-43.008-5.12-65.536-1.536-19.968-2.56-41.472-3.584-65.536-1.024-24.064-1.536-47.616-1.536-71.68 0-51.2 3.072-101.376 9.216-150.016s13.824-93.696 22.528-134.656c291.84 33.28 373.76-109.568 385.536-128.512 11.776-18.944 18.944-38.4 21.504-59.392s0-41.984-7.68-62.976z m-406.016 205.824c-25.088 22.016-39.936 54.272-59.904 182.784-20.48 132.608-30.72 228.864-30.72 228.864s7.68-126.464 20.48-240.64c8.192-72.192 27.136-136.192 18.944-170.496-8.192-32.768-41.984-62.976-64-79.872-12.288-8.192-19.968-13.824-19.968-13.824s8.192 5.12 19.968 13.824c20.992 13.824 55.808 34.816 90.112 45.568 36.864 11.776 99.328 1.536 134.656-5.632 15.872-4.096 26.624-6.144 26.624-6.144s-10.752 3.072-26.624 6.144c-34.816 8.192-92.672 24.576-109.568 39.424z" fill="#3a862c" ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
