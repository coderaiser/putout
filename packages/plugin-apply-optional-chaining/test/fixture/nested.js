const hasWatermark = (watermark) => (path) => path.node && path.node[name] && path.node[name].has(watermark);
