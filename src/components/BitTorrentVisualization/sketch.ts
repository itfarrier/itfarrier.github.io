import type p5 from 'p5';

export const sketch = (p5: p5) => {
  const BAR_HEIGHT = 10;
  const FULL_CIRCLE_DEG = 360;
  const HUE_MAX = 255;
  const HUE_SLOTS = 20;
  const INITIAL_PEERS = 8;
  const INITIAL_SEEDS = 2;
  const MAX_CONNECTIONS_PER_PEER = 4;
  const MOVE_DURATION_INITIAL_MS = 1250;
  const MOVE_DURATION_RECONFIG_MS = 3000;
  const PEER_CIRCLE_RADIUS = 25;
  const PEER_DIAMETER = 50;
  const PEER_HUE_ALPHA = 133;
  const PIECE_TRANSFER_MAX_BEFORE_STOP = 125;
  const RADIUS_INITIAL = 230;
  const RADIUS_RECONFIG = 180;
  const TRANSFER_DURATION_MS = 5000;

  function modelToScreen(cx: number, cy: number, angleDeg: number, radius: number): p5.Vector {
    const v = p5.createVector(radius, 0);
    v.rotate(angleDeg);
    return p5.createVector(cx, cy).add(v);
  }

  class Piece {
    id: number;
    pieceHue: number;

    constructor(id: number, pieceHue: number) {
      this.id = id;
      this.pieceHue = pieceHue;
    }
  }

  class PieceTransfer {
    big = p5.random(0, 4);
    endTime: number;
    startTime: number;

    constructor() {
      const startTime = p5.millis();

      this.startTime = startTime;
      this.endTime = startTime + TRANSFER_DURATION_MS;
    }
  }

  class Torrent {
    pieces: Piece[];

    constructor(pieceCount: number) {
      this.pieces = Array.from({ length: pieceCount }, (_, i) => new Piece(i, p5.map(i, 0, pieceCount, 0, HUE_MAX)));
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

    constructor(from: Connection['from'], to: Connection['to'], piece: Connection['piece']) {
      this.from = from;
      this.to = to;
      this.piece = piece;
      this.lastDraw = p5.millis();
      this.speed = p5.int(p5.random(30, 500));
    }

    createPieceTransfer() {
      this.pieceTransfers.push(new PieceTransfer());
      this.lastDraw = p5.millis();
    }

    drawPieceTransfers() {
      const now = p5.millis();
      const completed = this.pieceTransfers.filter((t) => now > t.endTime);

      this.completedTransfers += completed.length;
      this.pieceTransfers = this.pieceTransfers.filter((t) => now <= t.endTime);

      p5.fill(this.piece.pieceHue, HUE_MAX, HUE_MAX);
      p5.stroke(this.piece.pieceHue, HUE_MAX, HUE_MAX);

      const fromPos = this.from.pos;
      const toPos = this.to.pos;
      const pos = lerpPos;

      this.pieceTransfers.forEach((transfer) => {
        const t = p5.constrain(p5.norm(now, transfer.startTime, transfer.endTime), 0, 1);

        pos.set(fromPos).lerp(toPos, t);
        p5.strokeWeight(transfer.big);
        p5.circle(pos.x, pos.y, transfer.big);
      });
    }

    updateTransfers() {
      if (
        this.from.removing >= 1 ||
        this.to.removing >= 1 ||
        this.completedTransfers > PIECE_TRANSFER_MAX_BEFORE_STOP
      ) {
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
    ehue = 0;
    emovetime: number;
    endPos: p5.Vector;
    havePieces: Piece[] = [];
    hueSlot = 0;
    index = 0;
    lastcheck = p5.millis();
    missingPieces: Piece[] = [];
    pendingRequests: Piece[] = [];
    percent = p5.random(0, 1);
    pos: p5.Vector;
    pwait = p5.random(1, 9) * 1000;
    removing = 0;
    shue = 0;
    smovetime = p5.millis();
    startPos: p5.Vector;

    constructor() {
      const cx = p5.width / 2;
      const cy = p5.height / 2;

      this.startPos = p5.createVector(cx, cy);
      this.pos = p5.createVector(cx, cy);

      const angleDeg = 3;

      this.endPos = modelToScreen(cx, cy, angleDeg, RADIUS_INITIAL);
      this.emovetime = this.smovetime + MOVE_DURATION_INITIAL_MS;
      this.hueSlot = nextHueSlot++ % HUE_SLOTS;
      this.ccolor = p5.color(this.chue, HUE_MAX, HUE_MAX, PEER_HUE_ALPHA);

      this.initMissingPieces();
    }

    drawSelf() {
      if (!Number.isFinite(this.pos.x) || !Number.isFinite(this.pos.y)) {
        return;
      }

      const pieceCount = torrent.pieces.length;
      const w = pieceCount - 1;
      const cxR = p5.round(this.pos.x);
      const cyR = p5.round(this.pos.y);
      const left = cxR - p5.int(w / 2);
      const top = cyR - p5.int(BAR_HEIGHT / 2);

      if (!this.barBuffer || this.barBuffer.width !== w) {
        this.barBuffer = p5.createGraphics(w, BAR_HEIGHT);

        this.barBuffer.pixelDensity(1);
        this.barBuffer.rectMode(p5.CORNER);
      }

      const buf = this.barBuffer;

      buf.clear();
      buf.colorMode(p5.HSB, HUE_MAX, HUE_MAX, HUE_MAX, HUE_MAX);

      this.havePieces.forEach((piece) => {
        buf.stroke(piece.pieceHue, HUE_MAX, HUE_MAX);
        buf.line(piece.id, 0, piece.id, BAR_HEIGHT);
      });

      buf.noStroke();
      p5.fill(this.ccolor);
      p5.noStroke();
      p5.circle(cxR, cyR, PEER_DIAMETER);
      p5.push();
      p5.erase(1, 1);
      p5.rect(left, top, w, BAR_HEIGHT);
      p5.noErase();
      p5.pop();

      const ctx = p5.drawingContext as CanvasRenderingContext2D;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cxR, cyR, PEER_CIRCLE_RADIUS, 0, p5.TWO_PI);
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
      const now = p5.millis();
      if (now > this.emovetime) {
        this.chue = this.ehue;
        this.ccolor = p5.color(this.ehue, HUE_MAX, HUE_MAX, PEER_HUE_ALPHA);

        this.pos.set(this.endPos);
      } else {
        const diff = p5.constrain(p5.norm(now, this.smovetime, this.emovetime), 0, 1);

        this.pos.set(this.startPos).lerp(this.endPos, diff);

        this.ccolor = p5.lerpColor(
          p5.color(this.shue, HUE_MAX, HUE_MAX, PEER_HUE_ALPHA),
          p5.color(this.ehue, HUE_MAX, HUE_MAX, PEER_HUE_ALPHA),
          diff,
        );
        this.chue = p5.hue(this.ccolor);
      }
    }

    reConfigure(i: number) {
      const k = p5.max(peers.length, 1);

      this.index = i;

      const cx = p5.width / 2;
      const cy = p5.height / 2;
      const angleDeg = (FULL_CIRCLE_DEG / k) * i + isRotatePeers;

      this.startPos.set(this.pos);

      this.endPos = modelToScreen(cx, cy, angleDeg, RADIUS_RECONFIG);
      this.smovetime = p5.millis();
      this.emovetime = this.smovetime + MOVE_DURATION_RECONFIG_MS;
      this.shue = this.chue;
      this.ehue = p5.map(this.hueSlot, 0, HUE_SLOTS, 0, HUE_MAX);
      this.ccolor = p5.color(this.chue, HUE_MAX, HUE_MAX, PEER_HUE_ALPHA);
    }

    requestPiece(peer: Peer, missingPiece: Piece) {
      if (peer.connectedPeers.length < MAX_CONNECTIONS_PER_PEER) {
        const conn = new Connection(peer, this, missingPiece);

        peer.connectedPeers.push(this);
        this.pendingRequests.push(missingPiece);
        connections.push(conn);
      }
    }
  }

  const lerpPos = p5.createVector(0, 0);
  const connections: Connection[] = [];
  const peers: Peer[] = [];
  const torrent = new Torrent(30);

  let isRotatePeers = -1;
  let nextHueSlot = 0;

  function addPeer() {
    peers.push(new Peer());
  }

  function addSeed() {
    const peer = new Peer();

    peers.push(peer);

    peer.havePieces = torrent.pieces.slice();
    peer.missingPieces = [];
  }

  function disconnectPeer() {
    if (peers.length > 0) {
      p5.random(peers).removing = 1;
    }
  }

  function isPointInPeer(peer: Peer, x: number, y: number): boolean {
    return peer.pos.dist(p5.createVector(x, y)) <= PEER_CIRCLE_RADIUS;
  }

  p5.setup = () => {
    const size = p5.min(p5.windowWidth, p5.windowHeight);

    p5.createCanvas(size, size);
    p5.frameRate(120);
    p5.angleMode(p5.DEGREES);
    p5.colorMode(p5.HSB, HUE_MAX, HUE_MAX, HUE_MAX, HUE_MAX);
    p5.textAlign(p5.CENTER);
    p5.ellipseMode(p5.CENTER);
    p5.rectMode(p5.CORNER);

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
      isRotatePeers = ((p5.millis() / 1000) * 12) % FULL_CIRCLE_DEG;
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
  };

  p5.mousePressed = () => {
    const clickedPeer = peers.find((peer) => isPointInPeer(peer, p5.mouseX, p5.mouseY));

    if (clickedPeer) {
      clickedPeer.removing = 1;
    } else if ((p5.mouseButton as unknown) === p5.RIGHT || (p5.mouseButton as { right?: boolean }).right) {
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
};
