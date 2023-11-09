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
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
  
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      h /= 360;
      s /= 100;
      l /= 100;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return [r * 255, g * 255, b * 255];
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
    r /= 255, g /= 255, b /= 255;
  
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
  
    let d = max - min;
    s = max === 0 ? 0 : d / max;
  
    if (max === min) {
      h = 0; // achromatic
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
    let r, g, b;
    h = h / 360;
    s = s / 100;
    v = v / 100;
  
    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
  
    return [r * 255, g * 255, b * 255];
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
    let rgb = hsvToRgb(h, 1, 1); // Convert to RGB, then adjust for whiteness and blackness
    for (let i = 0; i < 3; i++) {
      rgb[i] *= (1 - w / 100 - b / 100);
      rgb[i] += w / 100 * 255;
    }
    return rgb;
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
      document.getElementById('hsvV').value = Math.round(l);
    }
    if(escolha != 4)
    {
      [h, w, b2] = rgbToHwb(r, g, b);
      document.getElementById('hwbH').value = Math.round(h);
      document.getElementById('hwbW').value = Math.round(s);
      document.getElementById('hwbB').value = Math.round(l);
    }

    if(escolha != 5)
    {
      [c, m, y, k] = rgbToCmyk(r, g, b);
      document.getElementById('cmykC').value = Math.round(c);
      document.getElementById('cmykM').value = Math.round(m);
      document.getElementById('cmykY').value = Math.round(y);
      document.getElementById('cmykK').value = Math.round(k);
    }

    const inputR = document.getElementById('rgbR');
    const inputG = document.getElementById('rgbG');
    const inputB = document.getElementById('rgbB');
    
    function updateBackgroundColor() {
      const r = inputR.value || 0;
      const g = inputG.value || 0;
      const b = inputB.value || 0;
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    // Adiciona event listeners para cada input
    inputR.addEventListener('input', updateBackgroundColor);
    inputG.addEventListener('input', updateBackgroundColor);
    inputB.addEventListener('input', updateBackgroundColor);
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