class CanvasActions {
  //initilaization
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.data = {};
    this.imageCache = {};
    this.render = this.render.bind(this);
  }
  //setData(data): Updates the data for rendering and calls the render method to update the canvas.
  setData(data) {
    this.data = data;
    this.render();
  }
  // clrears the entire canvas
  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height): Fills the entire canvas with the background color
  drawBackground() {
    const { backgroundColor } = this.data;
    this.context.fillStyle = backgroundColor || "#0365A5";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  // if (design_pattern): Checks if a design_pattern URL is provided.
  // const img = this.imageCache[design_pattern] || new Image(): Retrieves the cached image or creates a new Image object.
  // if (!this.imageCache[design_pattern]): Checks if the image is not cached.
  // img.onload = () => { ... }: Sets an onload handler to cache the image and re-render the canvas once the image is loaded.
  // img.src = design_pattern: Sets the image source to the design_pattern URL.
  // if (this.imageCache[design_pattern]): Checks if the image is cached.
  // this.context.drawImage(img, 0, 0): Draws the image on the canvas at the top-left corner.
  drawPattern() {
    const { design_pattern } = this.data.urls;
    if (design_pattern) {
      const img = this.imageCache[design_pattern] || new Image();
      if (!this.imageCache[design_pattern]) {
        img.onload = () => {
          this.imageCache[design_pattern] = img;
          this.render();
        };
        img.src = design_pattern;
      }
      if (this.imageCache[design_pattern]) {
        this.context.drawImage(img, 0, 0);
      }
    }
  }

  drawMask() {
    const { mask } = this.data.urls;
    if (mask) {
      const img = this.imageCache[mask] || new Image();
      if (!this.imageCache[mask]) {
        img.onload = () => {
          this.imageCache[mask] = img;
          this.render();
        };
        img.src = mask;
      }
      if (this.imageCache[mask]) {
        this.context.drawImage(img, 0, 0);
      }
    }
  }
  //if (userImage): Checks if a userImage URL is provided.
  //const img = this.imageCache[userImage] || new Image(): Retrieves the cached image or creates a new Image object.
  // if (!this.imageCache[userImage]): Checks if the image is not cached.
  // img.onload = () => { ... }: Sets an onload handler to cache the image and re-render the canvas once the image is loaded.
  // // img.src = userImage: Sets the image source to the userImage URL.
  // if (this.imageCache[userImage]): Checks if the image is cached.
  // this.context.save(): Saves the current state of the canvas.
  // this.context.beginPath(): Begins a new path.
  // this.context.rect(x, y, width, height): Defines a rectangular clipping region.
  // this.context.clip(): Clips the drawing area to the defined rectangular region.
  // this.context.drawImage(this.imageCache[userImage], x, y, width, height): Draws the image within the clipped area.
  // this.context.restore(): Restores the canvas state to undo the clipping.

  addImage() {
    const { userImage } = this.data.urls;
    const { x, y, width, height } = this.data.image_mask;
    if (userImage) {
      const img = this.imageCache[userImage] || new Image();
      if (!this.imageCache[userImage]) {
        img.onload = () => {
          this.imageCache[userImage] = img;
          this.render();
        };
        img.src = userImage;
      }

      if (this.imageCache[userImage]) {
        this.context.save();
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.clip();
        this.context.drawImage(this.imageCache[userImage], x, y, width, height);

        this.context.restore();
      }
    }
  }

  drawMaskStroke() {
    const { stroke } = this.data.urls;
    if (stroke) {
      const img = this.imageCache[stroke] || new Image();
      if (!this.imageCache[stroke]) {
        img.onload = () => {
          this.imageCache[stroke] = img;
          this.render();
        };
        img.src = stroke;
      }
      if (this.imageCache[stroke]) {
        this.context.drawImage(img, 0, 0);
      }
    }
  }

  drawText() {
    const { caption, cta } = this.data;
    if (caption) {
      this.drawTextElement(caption);
    }
    if (cta) {
      this.drawCta(cta);
    }
  }

  fragmentText(text, maxWidth) {
    var words = text.split(" "),
      lines = [],
      line = "";

    while (words.length > 0) {
      if (line.length + words[0].length <= maxWidth) {
        line += words.shift() + " ";
      } else {
        lines.push(line);
        line = "";
      }
      if (words.length === 0) {
        lines.push(line);
      }
    }
    return lines;
  }

  drawTextElement(element) {
    const {
      text,
      position,
      font_size,
      text_color,
      alignment = "left",
      max_characters_per_line,
    } = element;
    const { x, y } = position;
    const lineHeight = (font_size / 100) * 25;
    var lines = this.fragmentText(text, max_characters_per_line);
    lines.forEach((line, i) => {
      this.context.fillStyle = text_color;
      this.context.font = `bold ${font_size}px Arial`;

      this.context.textAlign = alignment;
      this.context.fillText(line, x, y + (i + 1) * (lineHeight + font_size));
    });
  }

  drawCta(element) {
    const {
      text,
      position,
      font_size = 30,
      background_color,
      wrap_length = 20,
    } = element;
    const { x, y } = position;
    const padding = 27;
    this.context.font = `${font_size}px Arial`;
    const textWidth = this.context.measureText(text).width;
    const maxWidth = wrap_length * font_size;
    const adjustedFontSize = Math.min(
      font_size,
      (maxWidth / textWidth) * font_size
    );
    this.context.font = `bold ${adjustedFontSize}px Arial`;
    const rectWidth = textWidth + 2 * padding;
    const rectHeight = adjustedFontSize + 2 * padding;
    const textX = x + rectWidth / 2;
    const textY = y + rectHeight / 2;
    this.context.fillStyle = background_color;
    this.roundRect(this.context, x, y, rectWidth, rectHeight, 10, true, false);
    const { backgroundColor } = this.data;
    this.context.fillStyle = backgroundColor;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(text, textX, textY, maxWidth);
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.lineTo(x + width - radius, y);
    this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.context.lineTo(x + width, y + height - radius);
    this.context.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    this.context.lineTo(x + radius, y + height);
    this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.context.lineTo(x, y + radius);
    this.context.quadraticCurveTo(x, y, x + radius, y);
    this.context.closePath();
    if (fill) {
      this.context.fill();
    }
    if (stroke) {
      this.context.stroke();
    }
  }

  render() {
    this.clearCanvas();
    this.drawBackground();
    this.drawPattern();
    this.drawMask();
    this.drawMaskStroke();
    this.addImage();
    this.drawText();
  }
}

export default CanvasActions;
