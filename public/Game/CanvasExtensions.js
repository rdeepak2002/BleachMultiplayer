CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
} 

CanvasRenderingContext2D.prototype.sharpRectUp = function (x, y, w, h, edge) {
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(x+w+edge, y);
    this.lineTo(x+w, y+h);
    this.lineTo(x, y+h);
    this.closePath();
    return this;
} 

CanvasRenderingContext2D.prototype.sharpRectDown = function (x, y, w, h, edge) {
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(x+w, y);
    this.lineTo(x+w+edge, y+h);
    this.lineTo(x, y+h);
    this.closePath();
    return this;
} 