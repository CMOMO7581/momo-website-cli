// Decorative chart: a seeded random walk, not real market data.
// One tile is drawn, then repeated side by side so the CSS animation can slide it left by one tile and loop.
const W = 1200, H = 240, TILES = 8;

function drawChart() {
  let seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  const n = 120, ys: number[] = [], vh: number[] = [];
  let y = 150;
  for (let i = 0; i <= n; i++) {
    y += (rnd() - 0.47) * 14; y = Math.max(40, Math.min(170, y));
    ys.push(y); vh.push(8 + rnd() * 28);
  }
  // Tilt the walk so it ends where it started; the tile edges then meet without a jump.
  const drift = ys[n] - ys[0];
  const pts = ys.map((v, i) => [i * W / n, Math.max(40, Math.min(170, v - drift * i / n))]);
  pts[n][1] = pts[0][1];

  let vols = "";
  for (let i = 0; i < n; i++) {
    const x = pts[i][0];
    vols += '<rect class="vol" x="' + (x - 3).toFixed(1) + '" y="' + (H - vh[i]).toFixed(1) + '" width="5" height="' + vh[i].toFixed(1) + '"/>';
  }
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
  // Colors come in as inherited custom properties: CSS selectors don't reach inside the <use> copies.
  const tile = '<path class="ar" style="fill:var(--chart-ar)" d="' + d + 'L' + W + ' ' + H + 'L0 ' + H + 'Z"/>'
    + '<g style="fill:var(--chart-vol)">' + vols + '</g>'
    + '<path class="ln" style="fill:none;stroke:var(--chart-ln);stroke-width:1.25" d="' + d + '" vector-effect="non-scaling-stroke"/>';
  let uses = "";
  for (let k = 0; k < TILES; k++) uses += '<use href="#chartTile" x="' + k * W + '"/>';
  return '<defs><g id="chartTile">' + tile + '</g></defs>' + uses;
}

export default function ChartBg() {
  return (
    <svg className="chart-bg" id="chartBg" viewBox={`0 0 ${W * TILES} ${H}`} preserveAspectRatio="none" aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: drawChart() }} />
  );
}
