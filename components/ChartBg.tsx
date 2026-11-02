// Decorative chart: a seeded random walk, not real market data.
function drawChart() {
  let seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  const n = 120, W = 1200, H = 240, pts: [number, number][] = [];
  let y = 150, vols = "";
  for (let i = 0; i < n; i++) {
    y += (rnd() - 0.47) * 14; y = Math.max(40, Math.min(170, y));
    const x = i * W / (n - 1); pts.push([x, y]);
    const vh = 8 + rnd() * 28; vols += '<rect class="vol" x="' + (x - 3).toFixed(1) + '" y="' + (H - vh).toFixed(1) + '" width="5" height="' + vh.toFixed(1) + '"/>';
  }
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
  return '<path class="ar" d="' + d + 'L' + W + ' ' + H + 'L0 ' + H + 'Z"/>' + vols + '<path class="ln" d="' + d + '" vector-effect="non-scaling-stroke"/>';
}

export default function ChartBg() {
  return (
    <svg className="chart-bg" id="chartBg" viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: drawChart() }} />
  );
}
