/*
 * ベースのURLを取得する
 */
function GetBaseUrl() {
  return $.url().attr('directory');
}

/*
 * 16進数をrgba値に整形する
 */
function ConvertToRgbaColor(hex, alpha) {
  var color = {};
  if (hex.length == 3) {
    // #nnn の場合
    color['r'] = SubstringColor(hex, 0, 1, true);
    color['g'] = SubstringColor(hex, 1, 2, true);
    color['b'] = SubstringColor(hex, 2, 3, true);
  } else if (hex.length == 6) {
    // #nnnnnn の場合
    color['r'] = SubstringColor(hex, 0, 2, true);
    color['g'] = SubstringColor(hex, 2, 4, true);
    color['b'] = SubstringColor(hex, 4, 6, true);
  } else {
    return false;
  }
  color['a'] = alpha;
  return color;
}

/*
 * 16進数の各色を取り出す
 */
function SubstringColor(hex, from, to, conv) {
  if (hex == '') {
    return false;
  }
  var s = hex.substring(from, to);
  if (s.length == 1) {
    s = s + s;
  } else if (2 < s.length) {
    return false;
  }
  return conv == true ? parseInt(s, 16) : s;
}

/*
 * rgba形式に整形する
 */
function FormatToRgba(color) {
  if (color == '') {
    return false;
  } else {
    return 'rgba(' + color['r'] + ', ' + color['g'] + ', ' + color['b'] + ', ' + color['a'].toFixed(1) + ')';
  }
}

/*
 * rgba値を16進数に形式変換する
 */
function ConvertToHexColor(color) {
  var decR = ConvertToHex(color['r'], color['a']);
  var decG = ConvertToHex(color['g'], color['a']);
  var decB = ConvertToHex(color['b'], color['a']);
  return '#' + decR + decG + decB;
}

/*
 * rgba値から16進数値に変換する
 */
function ConvertToHex(dec, alpha) {
  var def = parseInt(dec);
  var i = def + (255 - def) * (1 - alpha);
  var hex = Math.round(i).toString(16);
  return ('0' + hex).slice(-2);
}

/*
 * Google Analyticsを読み込む
 */
function LoadAnalytics() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-30766436-3', 'auto');
  ga('send', 'pageview');
}