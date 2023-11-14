// Converter de RGB para HSL
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// Converter de HSL para RGB
function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  let r, g, b;

  if (s == 0) {
      r = g = b = l; // Caso acromático
  } else {
      const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;

      r = hue2rgb(p, q, h / 360 + 1/3);
      g = hue2rgb(p, q, h / 360);
      b = hue2rgb(p, q, h / 360 - 1/3);
  }

  // Convertendo de 0-1 para 0-255
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return [r, g, b];
}

// Converter de RGB para CMYK
function rgbToCmyk(r, g, b) {
  const rRatio = r / 255;
  const gRatio = g / 255;
  const bRatio = b / 255;

  const k = 1 - Math.max(rRatio, gRatio, bRatio);
  const c = (1 - rRatio - k) / (1 - k) || 0;
  const m = (1 - gRatio - k) / (1 - k) || 0;
  const y = (1 - bRatio - k) / (1 - k) || 0;

  return [c * 100, m * 100, y * 100, k * 100];
}

// Converter de CMYK para RGB
function cmykToRgb(c, m, y, k) {
  const r = 255 * (1 - c / 100) * (1 - k / 100);
  const g = 255 * (1 - m / 100) * (1 - k / 100);
  const b = 255 * (1 - y / 100) * (1 - k / 100);
  return [r, g, b];
}

// Converter de RGB para HSV
function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  let d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
      h = 0; // acromático
  } else {
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return [h * 360, s * 100, v * 100];
}

// Converter de HSV para RGB
function hsvToRgb(h, s, v) {
  console.log(h,s/100,v/100)
  s /= 100
  v /= 100
  let r, g, b;

  let c = v * s; // Cromatismo
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;

  if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
  } else if (h >= 300 && h <= 360) {
      r = c; g = 0; b = x;
  }
  // Convertendo de 0-1 para 0-255
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [ r, g, b ];
}

// Converter de RGB para HWB
function rgbToHwb(r, g, b) {
  let hwb = rgbToHsv(r, g, b);
  let h = hwb[0];
  let w = (1 / 255) * Math.min(r, Math.min(g, b));
  let b_ = 1 - (1 / 255) * Math.max(r, Math.max(g, b));

  return [h, w * 100, b_ * 100];
}

// Converter de HWB para RGB (aproximação, pois a conversão exata é complexa)
function hwbToRgb(h, w, b) {
  w /= 100
  b /= 100
  let r, g, b_;
  let rgb;

  // Primeiro, convertemos o Hue para RGB
  if (h >= 0 && h < 60) {
      rgb = { r: 1, g: h / 60, b: 0 };
  } else if (h >= 60 && h < 120) {
      rgb = { r: (120 - h) / 60, g: 1, b: 0 };
  } else if (h >= 120 && h < 180) {
      rgb = { r: 0, g: 1, b: (h - 120) / 60 };
  } else if (h >= 180 && h < 240) {
      rgb = { r: 0, g: (240 - h) / 60, b: 1 };
  } else if (h >= 240 && h < 300) {
      rgb = { r: (h - 240) / 60, g: 0, b: 1 };
  } else if (h >= 300 && h <= 360) {
      rgb = { r: 1, g: 0, b: (360 - h) / 60 };
  }

  // Agora, misturamos com o branco e o preto
  r = rgb.r * (1 - w - b) + w;
  g = rgb.g * (1 - w - b) + w;
  b_ = rgb.b * (1 - w - b) + w;

  // Convertendo de 0-1 para 0-255
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b_ = Math.round(b_ * 255);

    return [ r, g, b_ ];
}

function rgbToYiq(r, g, b) {
  console.log([r,g,b])
  r /= 255;
  g /= 255;
  b /= 255;

  const y = (0.299 * r) + (0.587 * g) + (0.114 * b);
  const i = 0.596 * r - 0.274 * g - 0.322 * b;
  const q = 0.211 * r - 0.523 * g + 0.312 * b;
  console.log([y,i,q])
  return [y, i, q];
}

function yiqToRgb(y, i, q) {
   const r = y + 0.956 * i + 0.621 * q;
  const g = y - 0.272 * i - 0.647 * q;
  const b = y - 1.108 * i + 1.705 * q;

  // Normalizar os valores de saída de 0 a 1 para 0 a 255
  const clamp = (value) => Math.min(255, Math.max(0, Math.round(value * 255)));
  
  // Retornar os valores R, G e B normalizados
  return [ clamp(r), clamp(g), clamp(b) ];
}

function rgbToXyz(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  const x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
  const y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
  const z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;

  return [ x, y, z ];
}

function xyzToRgb(x, y, z) {
  const matrix = [
    [ 3.2404542, -1.5371385, -0.4985314],
    [-0.9692660,  1.8760108,  0.0415560],
    [ 0.0556434, -0.2040259,  1.0572252]
  ];

  const linearR = x * matrix[0][0] + y * matrix[0][1] + z * matrix[0][2];
  const linearG = x * matrix[1][0] + y * matrix[1][1] + z * matrix[1][2];
  const linearB = x * matrix[2][0] + y * matrix[2][1] + z * matrix[2][2];

  const gammaCorrect = (value) => {
    if (value <= 0.0031308) {
      return 12.92 * value;
    } else {
      return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
    }
  };

  const r = Math.max(0, Math.min(1, gammaCorrect(linearR))) * 255;
  const g = Math.max(0, Math.min(1, gammaCorrect(linearG))) * 255;
  const b = Math.max(0, Math.min(1, gammaCorrect(linearB))) * 255;

  return [ r, g, b ];
}

function updateAllFromRGB(r, g, b, escolha)
{
  if(escolha != 1)
  {
    document.getElementById('rgbR').value = Math.round(r);
    document.getElementById('rgbG').value = Math.round(g);
    document.getElementById('rgbB').value = Math.round(b);
  }

  let h, s, l, v, c, m, y, k, w, b2

  if(escolha != 2)
  {
    [h, s, l] = new rgbToHsl(r, g, b);
    document.getElementById('hslH').value = Math.round(h);
    document.getElementById('hslS').value = Math.round(s);
    document.getElementById('hslL').value = Math.round(l);
  }
  if(escolha != 3)
  {
    [h, s, v] = rgbToHsv(r, g, b);
    document.getElementById('hsvH').value = Math.round(h);
    document.getElementById('hsvS').value = Math.round(s);
    document.getElementById('hsvV').value = Math.round(v);
  }
  if(escolha != 4)
  {
    [h, w, b2] = rgbToHwb(r, g, b);
    document.getElementById('hwbH').value = Math.round(h);
    document.getElementById('hwbW').value = Math.round(w);
    document.getElementById('hwbB').value = Math.round(b2);
  }

  if(escolha != 5)
  {
    [c, m, y, k] = rgbToCmyk(r, g, b);
    document.getElementById('cmykC').value = Math.round(c);
    document.getElementById('cmykM').value = Math.round(m);
    document.getElementById('cmykY').value = Math.round(y);
    document.getElementById('cmykK').value = Math.round(k);
  }

  if(escolha != 6)
  {
    [y, i, q] = rgbToYiq(r, g, b);
    document.getElementById('yiqY').value = y;
    document.getElementById('yiqI').value = i;
    document.getElementById('yiqQ').value = q;
  }

  if(escolha != 7)
  {
    [x, y, z] = rgbToXyz(r, g, b);
    document.getElementById('xyzX').value = x;
    document.getElementById('xyzY').value = y;
    document.getElementById('xyzZ').value = z;
  }

  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  
}

// Funções de atualização baseadas em entrada RGB
function updateFromRgb() {
  const r = parseInt(document.getElementById('rgbR').value || 0);
  const g = parseInt(document.getElementById('rgbG').value || 0);
  const b = parseInt(document.getElementById('rgbB').value || 0);

  updateAllFromRGB(r,g,b,1);

  // Aqui você implementaria a conversão para HSV e HWB e atualizaria os campos respectivos
}

// Funções de atualização baseadas em entrada HSL
function updateFromHsl() {
  const h = parseInt(document.getElementById('hslH').value || 0);
  const s = parseInt(document.getElementById('hslS').value || 0);
  const l = parseInt(document.getElementById('hslL').value || 0);

  const [r, g, b] = hslToRgb(h, s, l);
  updateAllFromRGB(r,g,b,2);
  // Atualizações para HSV e HWB seriam implementadas aqui
}

// Agora, vamos adicionar as funções de atualização para HSV e HWB:

function updateFromHsv() {
  const h = parseInt(document.getElementById('hsvH').value || 0);
  const s = parseInt(document.getElementById('hsvS').value || 0);
  const v = parseInt(document.getElementById('hsvV').value || 0);

  const [r, g, b] = hsvToRgb(h, s, v);
  console.log(r,g,b)
  updateAllFromRGB(r,g,b, 3);
}

function updateFromHwb() {
  const h = parseInt(document.getElementById('hwbH').value || 0);
  const w = parseInt(document.getElementById('hwbW').value || 0);
  const b_ = parseInt(document.getElementById('hwbB').value || 0);

  const [r, g, b] = hwbToRgb(h, w, b_);
  updateAllFromRGB(r,g,b,4);
}

function updateFromCmyk() {
  const c = parseInt(document.getElementById('cmykC').value || 0);
  const m = parseInt(document.getElementById('cmykM').value || 0);
  const y = parseInt(document.getElementById('cmykY').value || 0);
  const k = parseInt(document.getElementById('cmykK').value || 0);

  const [r, g, b] = cmykToRgb(c, m, y, k);
  updateAllFromRGB(r,g,b,5);
}

function updateFromYiq() {
  const y = parseFloat(document.getElementById('yiqY').value || 0);
  const i = parseFloat(document.getElementById('yiqI').value || 0);
  const q = parseFloat(document.getElementById('yiqQ').value || 0);

  const [r, g, b] = yiqToRgb(y, i, q);
  updateAllFromRGB(r,g,b,6);
}

function updateFromXyz() {
  const x = parseFloat(document.getElementById('xyzX').value || 0);
  const y = parseFloat(document.getElementById('xyzY').value || 0);
  const z = parseFloat(document.getElementById('xyzZ').value || 0);

  const [r, g, b] = xyzToRgb(x, y, z);
  updateAllFromRGB(r,g,b,7);
}

// Adicionar event listeners aos campos de input HSV
document.getElementById('hsvH').addEventListener('input', updateFromHsv);
document.getElementById('hsvS').addEventListener('input', updateFromHsv);
document.getElementById('hsvV').addEventListener('input', updateFromHsv);

// Adicionar event listeners aos campos de input HWB
document.getElementById('hwbH').addEventListener('input', updateFromHwb);
document.getElementById('hwbW').addEventListener('input', updateFromHwb);
document.getElementById('hwbB').addEventListener('input', updateFromHwb);  

// Adicionar event listeners aos campos de input RGB
document.getElementById('rgbR').addEventListener('input', updateFromRgb);
document.getElementById('rgbG').addEventListener('input', updateFromRgb);
document.getElementById('rgbB').addEventListener('input', updateFromRgb);

// Adicionar event listeners aos campos de input HSL
document.getElementById('hslH').addEventListener('input', updateFromHsl);
document.getElementById('hslS').addEventListener('input', updateFromHsl);
document.getElementById('hslL').addEventListener('input', updateFromHsl);

// Adicionar event listeners para CMYK e outros sistemas de cor seria feito de forma similar
document.getElementById('cmykC').addEventListener('input', updateFromCmyk);
document.getElementById('cmykM').addEventListener('input', updateFromCmyk);
document.getElementById('cmykY').addEventListener('input', updateFromCmyk);
document.getElementById('cmykK').addEventListener('input', updateFromCmyk);

// Adicionar event listeners aos campos de input YIQ
document.getElementById('yiqY').addEventListener('input', updateFromYiq);
document.getElementById('yiqI').addEventListener('input', updateFromYiq);
document.getElementById('yiqQ').addEventListener('input', updateFromYiq);

// Adicionar event listeners aos campos de input XYZ
document.getElementById('xyzX').addEventListener('input', updateFromXyz);
document.getElementById('xyzY').addEventListener('input', updateFromXyz);
document.getElementById('xyzZ').addEventListener('input', updateFromXyz);
