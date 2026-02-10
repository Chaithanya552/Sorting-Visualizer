async function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            renderBars(arr, [j, j + 1], {});
            await sleep(delay);

            if (arr[j] > arr[j + 1]) {
                renderBars(arr, [j, j + 1], { swapping: [j, j + 1] });
                await sleep(delay);
                
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                
                renderBars(arr, [j, j + 1], {});
                await sleep(delay);
            }
        }
        // Mark the last element as sorted
        const sortedIndices = Array.from({ length: arr.length - i }, (_, idx) => arr.length - 1 - idx);
        renderBars(arr, [], { sorted: sortedIndices });
        await sleep(delay);
    }
    
    // Mark all as sorted
    const allSorted = Array.from({ length: arr.length }, (_, i) => i);
    renderBars(arr, [], { sorted: allSorted });
}
