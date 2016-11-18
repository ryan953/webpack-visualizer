export function getChunkNames(stats) {
    const chunkNames = new Set();
    stats.chunks.forEach((chunk) => {
        chunk.names.forEach((name) => chunkNames.add(name));
    });
    return [...chunkNames];
}
