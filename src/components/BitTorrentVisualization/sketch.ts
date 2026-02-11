import type p5 from 'p5';

export const sketch = (p5: p5) => {
  const SIMULATED_PIECE_SIZE_BYTES = 262144;
  const BYTES_PER_TRANSFER = SIMULATED_PIECE_SIZE_BYTES / 125;
  const HUE_SLOTS = 20;
  const INITIAL_PEERS = 8;
  const INITIAL_SEEDS = 2;
  const PEER_CIRCLE_RADIUS = 25;
  const RECENT_TIMES_MAX_AGE_MS = 12000;
  const SPEED_WINDOW_MS = 4000;
  const TOOLTIP_LINE_HEIGHT = 16;
  const TOOLTIP_PADDING = 8;

  class Piece {
    id: number;
    pieceHue: number;

    constructor(id: number, pieceHue: number) {
      this.id = id;
      this.pieceHue = pieceHue;
    }
  }

  class PieceTransfer {
    big: number;
    endTime: number;
    startTime: number;

    constructor() {
      this.big = p5.random(0, 4);
      this.startTime = p5.millis();
      this.endTime = this.startTime + 5000;
    }
  }

  class Torrent {
    pieces: Piece[] = [];

    constructor(pieceCount: number) {
      for (let i = 0; i < pieceCount; i++) {
        this.pieces.push(new Piece(i, (255 / pieceCount) * i));
      }
    }
  }

  class Connection {
    completedTransfers = 0;
    from: Peer;
    lastDraw: number;
    piece: Piece;
    pieceTransfers: PieceTransfer[] = [];
    speed: number;
    stream = true;
    to: Peer;

    constructor(from: Peer, to: Peer, piece: Piece) {
      this.from = from;
      this.lastDraw = p5.millis();
      this.piece = piece;
      this.speed = p5.floor(p5.random(30, 500));
      this.to = to;
    }

    createPieceTransfer() {
      this.pieceTransfers.push(new PieceTransfer());

      this.lastDraw = p5.millis();
    }

    drawPieceTransfers() {
      const now = p5.millis();

      this.pieceTransfers.forEach((transfer, index) => {
        if (now > transfer.endTime) {
          this.pieceTransfers.splice(index, 1);

          this.completedTransfers++;

          this.to.recentDownloadTimes.push(now);
          this.from.recentUploadTimes.push(now);
        } else {
          const diff = (p5.millis() - transfer.startTime) / (transfer.endTime - transfer.startTime);
          const xpos = p5.lerp(this.from.cxpos, this.to.cxpos, diff);
          const ypos = p5.lerp(this.from.cypos, this.to.cypos, diff);

          p5.colorMode(p5.HSB);
          p5.fill(this.piece.pieceHue, 255, 255);
          p5.stroke(this.piece.pieceHue, 255, 255);
          p5.strokeWeight(transfer.big);
          p5.circle(xpos, ypos, transfer.big);
        }
      });
    }

    updateTransfers() {
      if (this.from.removing >= 1 || this.to.removing >= 1 || this.completedTransfers > 125) {
        this.stream = false;
      } else if (this.lastDraw < p5.millis() - this.speed) {
        this.createPieceTransfer();
      }
    }
  }

  class Peer {
    barBuffer: null | p5.Graphics = null;
    ccolor: p5.Color;
    chue = 5;
    connectedPeers: (Peer | Piece)[] = [];
    cxpos = 0;
    cypos = 0;
    ehue = 0;
    emovetime: number;
    expos: number;
    eypos: number;
    havePieces: Piece[] = [];
    hueSlot = 0;
    index = 0;
    lastcheck = p5.millis();
    missingPieces: Piece[] = [];
    pendingRequests: Piece[] = [];
    percent = p5.random(0, 1);
    pwait = p5.random(1, 9) * 1000;
    recentDownloadTimes: number[] = [];
    recentUploadTimes: number[] = [];
    removing = 0;
    shue = 0;
    smovetime = p5.millis();
    sxpos = 0;
    sypos = 0;
    totalDownloadedPieces = 0;
    totalUploadedPieces = 0;

    constructor() {
      const cx = p5.width / 2;
      const cy = p5.height / 2;

      this.sxpos = cx;
      this.sypos = cy;

      p5.push();
      p5.translate(cx, cy);
      p5.ellipseMode(p5.CENTER);

      const angle = 3;

      p5.rotate(p5.radians(angle));

      [this.expos, this.eypos] = modelToScreen(cx, cy, angle, 230);
      this.emovetime = this.smovetime + 1250;
      this.hueSlot = nextHueSlot++ % HUE_SLOTS;

      p5.colorMode(p5.HSB);

      this.ccolor = p5.color(this.chue, 255, 255, 133);

      p5.pop();
      this.initMissingPieces();
    }

    drawSelf() {
      if (!Number.isFinite(this.cxpos) || !Number.isFinite(this.cypos)) {
        return;
      }

      const pieceCount = torrent.pieces.length;
      const w = pieceCount - 1;
      const r = PEER_CIRCLE_RADIUS;
      const barH = 10;
      const cxR = p5.round(this.cxpos);
      const cyR = p5.round(this.cypos);
      const left = cxR - p5.floor(w / 2);
      const top = cyR - 5;

      if (!this.barBuffer || this.barBuffer.width !== w) {
        this.barBuffer = p5.createGraphics(w, barH);
        this.barBuffer.pixelDensity(1);
      }

      const buf = this.barBuffer;

      buf.clear();
      buf.colorMode(p5.HSB);

      this.havePieces.forEach((piece) => {
        buf.stroke(piece.pieceHue, 255, 255);
        buf.line(piece.id, 0, piece.id, barH);
      });

      buf.noStroke();
      p5.colorMode(p5.HSB);
      p5.fill(this.ccolor);
      p5.noStroke();
      p5.ellipseMode(p5.CENTER);
      p5.circle(cxR, cyR, 50);

      const ctx = p5.drawingContext as CanvasRenderingContext2D;

      ctx.save();

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(255,255,255,1)';

      ctx.fillRect(left, top, w, barH);
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      ctx.arc(cxR, cyR, r, 0, p5.TWO_PI);
      ctx.clip();
      p5.image(buf, left, top);
      ctx.restore();
    }

    findPeer() {
      const shuffled = p5.shuffle([...this.missingPieces]);

      shuffled.forEach((missingPiece) => {
        peers.forEach((peer) => {
          if (
            peer.havePieces.includes(missingPiece) &&
            !(peer.removing > 0) &&
            !(this.removing > 0) &&
            !peer.connectedPeers.includes(this) &&
            peer.index !== this.index &&
            !this.pendingRequests.includes(missingPiece)
          ) {
            this.requestPiece(peer, missingPiece);
          }
        });
      });
    }

    initMissingPieces() {
      torrent.pieces.forEach((piece) => {
        if (!this.havePieces.includes(piece)) {
          this.missingPieces.push(piece);
        }
      });
    }

    moveSelf() {
      if (p5.millis() > this.emovetime) {
        this.chue = this.ehue;
        this.cxpos = this.expos;
        this.cypos = this.eypos;
      } else {
        const diff = (p5.millis() - this.smovetime) / (this.emovetime - this.smovetime);

        this.cxpos = p5.lerp(this.sxpos, this.expos, diff);
        this.cypos = p5.lerp(this.sypos, this.eypos, diff);
        this.chue = p5.lerp(this.shue, this.ehue, diff);
      }
    }

    reConfigure(i: number) {
      p5.push();
      p5.translate(p5.width / 2, p5.height / 2);
      p5.ellipseMode(p5.CENTER);

      const k = peers.length === 0 ? 1 : peers.length;

      this.index = i;

      const angle = (360 / k) * i + isRotatePeers;

      p5.rotate(p5.radians(angle));

      const cx = p5.width / 2;
      const cy = p5.height / 2;

      this.sxpos = this.cxpos;
      this.sypos = this.cypos;
      [this.expos, this.eypos] = modelToScreen(cx, cy, angle, 180);
      this.smovetime = p5.millis();
      this.emovetime = this.smovetime + 3000;

      p5.pop();

      this.shue = this.chue;
      this.ehue = (255 * this.hueSlot) / HUE_SLOTS;
      this.ccolor = p5.color(this.chue, 255, 255, 133);
    }

    requestPiece(peer: Peer, missingPiece: Piece) {
      if (peer.connectedPeers.length < 4) {
        const conn = new Connection(peer, this, missingPiece);

        peer.connectedPeers.push(this);
        this.pendingRequests.push(missingPiece);
        connections.push(conn);
      }
    }
  }

  const connections: Connection[] = [];
  const peers: Peer[] = [];
  const torrent = new Torrent(30);

  let isRotatePeers = -1;
  let nextHueSlot = 0;

  function modelToScreen(cx: number, cy: number, angleDeg: number, radius: number): [number, number] {
    const r = p5.radians(angleDeg);

    return [cx + radius * p5.cos(r), cy + radius * p5.sin(r)];
  }

  function isPointInPeer(peer: Peer, x: number, y: number): boolean {
    return p5.dist(x, y, peer.cxpos, peer.cypos) <= PEER_CIRCLE_RADIUS;
  }

  function formatBytes(bytes: number): string {
    if (bytes >= 1e9) {
      return `${(bytes / 1e9).toFixed(2)} GB`;
    }

    if (bytes >= 1e6) {
      return `${(bytes / 1e6).toFixed(2)} MB`;
    }

    if (bytes >= 1e3) {
      return `${(bytes / 1e3).toFixed(2)} KB`;
    }

    return `${String(bytes)} B`;
  }

  function getCurrentSpeedBytesPerSec(timestamps: number[], pieceSizeBytes: number): number {
    const now = p5.millis();
    const cutoff = now - SPEED_WINDOW_MS;
    const count = timestamps.filter((t) => t >= cutoff).length;

    return (count * pieceSizeBytes) / (SPEED_WINDOW_MS / 1000);
  }

  function trimRecentTimes(timestamps: number[]): void {
    const cutoff = p5.millis() - RECENT_TIMES_MAX_AGE_MS;

    while (timestamps.length > 0 && (timestamps[0] ?? 0) < cutoff) {
      timestamps.shift();
    }
  }

  function getPeerUnderMouse(): null | Peer {
    const mx = p5.mouseX;
    const my = p5.mouseY;

    for (const peer of peers) {
      if (isPointInPeer(peer, mx, my)) {
        return peer;
      }
    }

    return null;
  }

  function drawTooltip(peer: Peer) {
    trimRecentTimes(peer.recentDownloadTimes);
    trimRecentTimes(peer.recentUploadTimes);

    const downloadedBytes = peer.totalDownloadedPieces * SIMULATED_PIECE_SIZE_BYTES;
    const downSpeed = getCurrentSpeedBytesPerSec(peer.recentDownloadTimes, BYTES_PER_TRANSFER);
    const have = peer.havePieces.length;
    const isSeed = peer.missingPieces.length === 0;
    const total = torrent.pieces.length;
    const pct = total > 0 ? p5.round((100 * have) / total) : 0;
    const uploadedBytes = peer.totalUploadedPieces * SIMULATED_PIECE_SIZE_BYTES;
    const upSpeed = getCurrentSpeedBytesPerSec(peer.recentUploadTimes, BYTES_PER_TRANSFER);

    const lines: string[] = [
      '— Transfer —',
      `Down: ${formatBytes(downSpeed)}/s`,
      `Downloaded: ${formatBytes(downloadedBytes)}`,
      `Up: ${formatBytes(upSpeed)}/s`,
      `Uploaded: ${formatBytes(uploadedBytes)}`,
      '— Information —',
      `Pieces: ${String(have)}/${String(total)}`,
      `Progress: ${String(pct)}%`,
      isSeed ? 'Type: Seed' : 'Type: Peer',
    ];

    p5.textSize(12);
    p5.textAlign(p5.LEFT, p5.TOP);

    let maxW = 0;

    for (const line of lines) {
      const w = p5.textWidth(line);

      if (w > maxW) {
        maxW = w;
      }
    }

    const boxH = lines.length * TOOLTIP_LINE_HEIGHT + TOOLTIP_PADDING * 2;
    const boxW = maxW + TOOLTIP_PADDING * 2;

    let tx = peer.cxpos + PEER_CIRCLE_RADIUS + 10;
    let ty = peer.cypos - boxH / 2;

    if (tx + boxW > p5.width) {
      tx = peer.cxpos - boxW - PEER_CIRCLE_RADIUS - 10;
    }

    if (ty < 0) {
      ty = 10;
    }

    if (ty + boxH > p5.height) {
      ty = p5.height - boxH - 10;
    }

    p5.noStroke();
    p5.fill(0, 0, 0, 0.85);
    p5.rect(tx, ty, boxW, boxH, 4);
    p5.fill(255);

    lines.forEach((line, i) => {
      p5.text(line, tx + TOOLTIP_PADDING, ty + TOOLTIP_PADDING + i * TOOLTIP_LINE_HEIGHT);
    });
  }

  function addPeer() {
    peers.push(new Peer());
  }

  function addSeed() {
    const peer = new Peer();

    peers.push(peer);

    torrent.pieces.forEach((piece) => {
      peer.havePieces.push(piece);
    });

    peer.missingPieces = [];
  }

  function disconnectPeer() {
    p5.random(peers).removing = 1;
  }

  p5.mousePressed = () => {
    const mx = p5.mouseX;
    const my = p5.mouseY;

    let clickedPeer: null | Peer = null;

    for (const peer of peers) {
      if (isPointInPeer(peer, mx, my)) {
        clickedPeer = peer;

        break;
      }
    }

    if (clickedPeer) {
      clickedPeer.removing = 1;
    } else if (p5.mouseButton.right) {
      addSeed();
    } else {
      addPeer();
    }
  };

  p5.keyPressed = () => {
    if (p5.key === '+' || p5.key === '=') {
      addPeer();
    }

    if (p5.key === 's') {
      addSeed();
    }

    if (p5.key === '-') {
      disconnectPeer();
    }
  };

  p5.setup = () => {
    const size = p5.min(p5.windowWidth, p5.windowHeight);

    p5.createCanvas(size, size);
    p5.textAlign(p5.CENTER);

    for (let i = 0; i < INITIAL_SEEDS; i++) {
      addSeed();
    }

    for (let i = 0; i < INITIAL_PEERS; i++) {
      addPeer();
    }
  };

  p5.draw = () => {
    p5.clear();

    if (isRotatePeers >= 0) {
      if (isRotatePeers < 360) {
        isRotatePeers += 0.2;
      } else {
        isRotatePeers = isRotatePeers - 360;
      }
    }

    for (let i = connections.length - 1; i >= 0; i--) {
      const connection = connections[i];

      if (!connection) {
        continue;
      }

      connection.updateTransfers();
      connection.drawPieceTransfers();

      if (!connection.pieceTransfers.length && !connection.stream) {
        if (connection.to.removing >= 1) {
          connection.to.removing++;
        }

        if (connection.from.removing >= 1) {
          connection.from.removing++;
        }

        connection.to.totalDownloadedPieces += 1;
        connection.from.totalUploadedPieces += 1;

        connection.from.connectedPeers.splice(connection.from.connectedPeers.indexOf(connection.to), 1);
        connection.to.havePieces.push(connection.piece);

        if (connection.to.missingPieces.includes(connection.piece)) {
          connection.to.missingPieces.splice(connection.to.missingPieces.indexOf(connection.piece), 1);
        }

        if (connection.to.connectedPeers.includes(connection.piece)) {
          connection.to.connectedPeers.splice(connection.to.connectedPeers.indexOf(connection.piece), 1);
        }

        connections.splice(i, 1);
      }
    }

    for (let i = peers.length - 1; i >= 0; i--) {
      const peer = peers[i];

      if (!peer) {
        continue;
      }

      peer.moveSelf();
      peer.drawSelf();
      peer.reConfigure(i);

      if (peer.removing > 1) {
        peers.splice(i, 1);
      }
    }

    p5.shuffle(peers).forEach((peer: Peer) => {
      if (peer.lastcheck < p5.millis() - peer.pwait) {
        peer.findPeer();
        peer.lastcheck = p5.millis();
      }
    });

    const hoveredPeer = getPeerUnderMouse();

    if (hoveredPeer) {
      drawTooltip(hoveredPeer);
    }
  };
};
