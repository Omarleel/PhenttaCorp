import React, { useState, useEffect } from 'react';

export const CustomSVG = ({ svgPath, fillColor }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(svgPath);
        if (!response.ok) {
          throw new Error('Failed to load SVG');
        }
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadSvg();
  }, [svgPath]);

  const applyFillColor = () => {
    const svgElements = document.getElementsByClassName('custom-svg');
    for (let svgElement of svgElements) {
      const svgPaths = svgElement.getElementsByTagName('path');
      for (let path of svgPaths) {
        path.style.fill = fillColor;
      }
    }
  };

  useEffect(() => {
    applyFillColor();
  }, [svgContent, fillColor]);

  return (
    <div className="inline-block">
      <div
        className="custom-svg"
        dangerouslySetInnerHTML={{ __html: svgContent }} // Insertar el contenido SVG como HTML
      />
    </div>
  );
};
