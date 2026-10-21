/**
 * LEKHA 3D Store Shelf Engine
 * High-performance, zero-dependency 3D / Isometric visual representation of Kirana store shelves.
 * Displays physical stock levels, capacity indicators, and interactive shelf drilldowns.
 */

class StoreShelf3D {
  constructor(canvasId, itemsProvider, onSelectRack) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.itemsProvider = itemsProvider;
    this.onSelectRack = onSelectRack;

    this.selectedRackIndex = 0;
    this.rotationAngle = 0.25; // isometric tilt
    this.isDragging = false;
    this.lastMouseX = 0;

    this.racks = [
      { id: 'grains', name: 'रैक 1: अनाज व दालें (Grains & Pulses)', category: 'grains', color: '#f59e0b', yPos: 50 },
      { id: 'oils', name: 'रैक 2: तेल, घी व मसाले (Oils & Spices)', category: 'oils', color: '#10b981', yPos: 140 },
      { id: 'household', name: 'रैक 3: साबुन व घरेलू सामान (Household)', category: 'household', color: '#06b6d4', yPos: 230 },
      { id: 'snacks', name: 'रैक 4: बिस्कुट व स्नैक्स (Snacks & Tea)', category: 'snacks', color: '#8b5cf6', yPos: 320 }
    ];

    this.initEvents();
    this.render();
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.lastMouseX;
        this.rotationAngle += deltaX * 0.005;
        this.lastMouseX = e.clientX;
        this.render();
      }
    });

    // Touch support for mobile phones
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
      }
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) {
        const deltaX = e.touches[0].clientX - this.lastMouseX;
        this.rotationAngle += deltaX * 0.005;
        this.lastMouseX = e.touches[0].clientX;
        this.render();
      }
    });

    this.canvas.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Click to select rack
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      
      const rackIndex = Math.min(3, Math.max(0, Math.floor((clickY - 30) / 90)));
      this.selectedRackIndex = rackIndex;
      this.render();
      if (this.onSelectRack) {
        this.onSelectRack(this.racks[rackIndex]);
      }
    });
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const items = this.itemsProvider();

    // Clear background
    ctx.clearRect(0, 0, w, h);

    // Modern isometric backdrop gradient
    const bgGradient = ctx.createLinearGradient(0, 0, w, h);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);

    // Grid Floor
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Header info
    ctx.font = 'bold 12px "Poppins", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('3D दुकान शेल्फ व्यू (3D Store Rack Model)', 20, 25);
    ctx.font = '10px "Poppins", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('घुमाने के लिए ड्रैग करें | रैक चुनने के लिए क्लिक करें', w - 240, 25);

    // Draw 4 Shelves / Racks
    this.racks.forEach((rack, idx) => {
      const rackItems = items.filter(it => it.category === rack.category);
      const isSelected = this.selectedRackIndex === idx;

      this.draw3DShelf(idx, rack, rackItems, isSelected);
    });
  }

  draw3DShelf(index, rack, rackItems, isSelected) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const shelfY = 55 + index * 95;
    const shelfWidth = w - 100;
    const shelfHeight = 14;
    const depth = 45;

    const angle = this.rotationAngle;
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const startX = 50 + sinA * 20;

    // Shelf Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(w / 2, shelfY + shelfHeight + 12, shelfWidth / 2, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shelf Wooden Planks / Metal Shelf Surface
    // Top Plate
    ctx.fillStyle = isSelected ? '#3b82f6' : '#334155';
    ctx.beginPath();
    ctx.moveTo(startX, shelfY);
    ctx.lineTo(startX + shelfWidth, shelfY);
    ctx.lineTo(startX + shelfWidth - depth * cosA, shelfY - depth * 0.4);
    ctx.lineTo(startX - depth * cosA, shelfY - depth * 0.4);
    ctx.closePath();
    ctx.fill();

    // Shelf Front Edge
    ctx.fillStyle = isSelected ? '#2563eb' : '#1e293b';
    ctx.fillRect(startX, shelfY, shelfWidth, shelfHeight);

    // Shelf Label & Category Tag
    ctx.fillStyle = isSelected ? '#ffffff' : '#cbd5e1';
    ctx.font = 'bold 11px "Poppins", sans-serif';
    ctx.fillText(rack.name, startX + 10, shelfY + 11);

    // Items on this shelf (Render 3D boxes for each product)
    const boxWidth = 32;
    const gap = 14;
    const maxBoxes = Math.min(rackItems.length, 7);

    for (let i = 0; i < maxBoxes; i++) {
      const item = rackItems[i];
      const boxX = startX + 15 + i * (boxWidth + gap);
      const boxHeight = 30;
      const boxY = shelfY - boxHeight;

      // Color based on stock
      let stockColor = '#10b981'; // In stock
      let statusText = 'OK';
      if (item.stock <= 2) {
        stockColor = '#ef4444'; // Critical / Out
        statusText = 'EMPTY';
      } else if (item.stock <= 5) {
        stockColor = '#f59e0b'; // Low
        statusText = 'LOW';
      }

      // Draw Item Box 3D
      // Front face
      ctx.fillStyle = stockColor;
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

      // Top face
      ctx.fillStyle = this.adjustBrightness(stockColor, 30);
      ctx.beginPath();
      ctx.moveTo(boxX, boxY);
      ctx.lineTo(boxX + boxWidth, boxY);
      ctx.lineTo(boxX + boxWidth - 8 * cosA, boxY - 8);
      ctx.lineTo(boxX - 8 * cosA, boxY - 8);
      ctx.closePath();
      ctx.fill();

      // Side face
      ctx.fillStyle = this.adjustBrightness(stockColor, -30);
      ctx.beginPath();
      ctx.moveTo(boxX + boxWidth, boxY);
      ctx.lineTo(boxX + boxWidth - 8 * cosA, boxY - 8);
      ctx.lineTo(boxX + boxWidth - 8 * cosA, boxY - 8 + boxHeight);
      ctx.lineTo(boxX + boxWidth, boxY + boxHeight);
      ctx.closePath();
      ctx.fill();

      // Product initials/qty inside box
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "Poppins", sans-serif';
      ctx.fillText(`${item.stock}${item.unit}`, boxX + 3, boxY + 18);

      // Status indicator dot above box
      ctx.fillStyle = stockColor;
      ctx.beginPath();
      ctx.arc(boxX + boxWidth / 2, boxY - 12, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  adjustBrightness(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = (num >> 8 & 0x00FF) + amt,
      B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  }
}

window.StoreShelf3D = StoreShelf3D;
