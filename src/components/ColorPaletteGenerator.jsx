import React, { useState } from "react";
import "../styles/ColorPaletteGenerator.css";

const colorNameToHex = {
    red: "#FF0000",
    blue: "#0000FF",
    green: "#008000",
    yellow: "#FFFF00",
    black: "#000000",
    white: "#FFFFFF",
    cyan: "#00FFFF",
    magenta: "#FF00FF",
    gray: "#808080",
    silver: "#C0C0C0",
    maroon: "#800000",
    olive: "#808000",
    lime: "#00FF00",
    navy: "#000080",
    teal: "#008080",
    aqua: "#00FFFF",
    fuchsia: "#FF00FF",
    purple: "#800080",
    orange: "#FFA500",
    pink: "#FFC0CB",
    brown: "#A52A2A",
    beige: "#F5F5DC",
    coral: "#FF7F50",
    gold: "#FFD700",
    khaki: "#F0E68C",
    lavender: "#E6E6FA",
    lightblue: "#ADD8E6",
    lightgreen: "#90EE90",
    lightgray: "#D3D3D3",
    lightpink: "#FFB6C1",
    lightyellow: "#FFFFE0",
    salmon: "#FA8072",
    sandybrown: "#F4A460",
    seashell: "#FFF5EE",
    skyblue: "#87CEEB",
    tan: "#D2B48C",
    tomato: "#FF6347",
    wheat: "#F5DEB3",
    indigo: "#4B0082",
    violet: "#8A2BE2",
    plum: "#DDA0DD",
    orchid: "#DA70D6",
    chocolate: "#D2691E",
    peru: "#CD853F",
    mediumslateblue: "#7B68EE",
    mediumvioletred: "#C71585",
    mediumseagreen: "#3CB371",
    midnightblue: "#191970",
    steelblue: "#4682B4",
    slategray: "#708090",
    darkolivegreen: "#556B2F",
    darkorange: "#FF8C00",
    darkviolet: "#9400D3",
    darkred: "#8B0000",
    darkturquoise: "#00CED1",
    darkslateblue: "#483D8B",
    lightcoral: "#F08080",
    lightseagreen: "#20B2AA",
    lightsteelblue: "#B0C4DE",
    lightsalmon: "#FFA07A",
    lightgoldenrodyellow: "#FAFAD2",
    lightcyan: "#E0FFFF",
    lightgray: "#D3D3D3",
    lightgreen: "#90EE90",
    lightpink: "#FFB6C1",
    lightyellow: "#FFFFE0",
    linen: "#FAF0E6",
    magenta: "#FF00FF",
    mediumaquamarine: "#66CDAA",
    mediumblue: "#0000CD",
    mediumorchid: "#BA55D3",
    mediumturquoise: "#48D1CC",
    mediumvioletred: "#C71585",
    midnightblue: "#191970",
    mintcream: "#F5FFFA",
    mistyrose: "#FFE4E1",
    moccasin: "#FFE4B5",
    navajowhite: "#FFDEAD",
    oldlace: "#FDF5E6",
    olive: "#808000",
    olivedrab: "#6B8E23",
    papayawhip: "#FFEFD5",
    peachpuff: "#FFDAB9",
    peru: "#CD853F",
    pink: "#FFC0CB",
    plum: "#DDA0DD",
    powderblue: "#B0E0E6",
    rosybrown: "#BC8F8F",
    royalblue: "#4169E1",
    saddlebrown: "#8B4513",
    salmon: "#FA8072",
    sandybrown: "#F4A460",
    seagreen: "#2E8B57",
    seashell: "#FFF5EE",
    sienna: "#A0522D",
    skyblue: "#87CEEB",
    slateblue: "#6A5ACD",
    slategray: "#708090",
    snow: "#FFFAFA",
    springgreen: "#00FF7F",
    steelblue: "#4682B4",
    tan: "#D2B48C",
    thistle: "#D8BFD8",
    tomato: "#FF6347",
    turquoise: "#40E0D0",
    violet: "#EE82EE",
    wheat: "#F5DEB3",
    white: "#FFFFFF",
    yellow: "#FFFF00",
    yellowgreen: "#9ACD32"
  };
  

function ColorPaletteGenerator() {
  const [generationType, setGenerationType] = useState("random");
  const [colorType, setColorType] = useState("hex");
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState([]);

  const handleGenerationTypeChange = (e) => {
    setGenerationType(e.target.value);
  };

  const handleColorTypeChange = (e) => {
    setColorType(e.target.value);
  };

  const handleColorInputChange = (e) => {
    setColorInput(e.target.value);
  };

  const generatePalette = () => {
    let generatedColors = [];

    if (generationType === "custom") {
      if (colorType === "hex" && isValidHex(colorInput)) {
        generatedColors = generateColors(colorInput, 10, 30);
      } else if (colorType === "name") {
        const hexColor = colorNameToHex[colorInput.toLowerCase()];
        if (hexColor) {
          generatedColors = generateColors(hexColor, 10, 30);
        } else {
          alert(
            `Invalid color name: ${colorInput}. Please provide a valid color name.`
          );
          return;
        }
      } else {
        alert(
          "Invalid color input. Please provide a valid HEX code or Color Name."
        );
        return;
      }
    } else if (generationType === "random") {
      generatedColors = generateRandomPalette(10);
    }

    setColors(generatedColors);
  };

  const isValidHex = (hex) => /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex);

  const generateColors = (baseColor, count, variation) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      let color = lightenDarkenColor(baseColor, i * variation);
      colors.push(color);
    }
    return colors;
  };

  const generateRandomPalette = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const randomColor = getRandomColor();
      colors.push(randomColor);
    }
    return colors;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const lightenDarkenColor = (col, amt) => {
    let usePound = false;

    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }

    let num = parseInt(col, 16);

    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let g = ((num >> 8) & 0x00ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    let b = (num & 0x0000ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return (
      (usePound ? "#" : "") +
      ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
    );
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color).then(() => {
      alert(`${color} copied to clipboard`);
    });
  };

  return (
    <div className="container">
      <h1>Color Palette Generator</h1>
      <div className="input-group">
        <label htmlFor="generationType">Select Generation Type:</label>
        <select
          id="generationType"
          value={generationType}
          onChange={handleGenerationTypeChange}
        >
          <option value="random">Random</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      {generationType === "custom" && (
        <div className="input-group" id="customColorInput">
          <label htmlFor="colorType">Color Type:</label>
          <select
            id="colorType"
            value={colorType}
            onChange={handleColorTypeChange}
          >
            <option value="hex">Hex Code</option>
            <option value="name">Color Name</option>
          </select>
          <input
            type="text"
            id="colorInput"
            value={colorInput}
            onChange={handleColorInputChange}
            placeholder="Enter color value..."
          />
        </div>
      )}
      <button onClick={generatePalette}>Generate Palette</button>
      <div id="paletteContainer">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={() => copyToClipboard(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPaletteGenerator;
