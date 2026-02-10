async function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            renderBars(arr, [min, j], {});
            await sleep(delay);

            if (arr[j] < arr[min]) {
                min = j;
                renderBars(arr, [min, j], {});
                await sleep(delay);
            }
        }

        if (min !== i) {
            renderBars(arr, [i, min], { swapping: [i, min] });
            await sleep(delay);
            
            [arr[i], arr[min]] = [arr[min], arr[i]];
            
            renderBars(arr, [i, min], {});
            await sleep(delay);
        }
        
        // Mark current position as sorted
        renderBars(arr, [], { sorted: Array.from({ length: i + 1 }, (_, idx) => idx) });
        await sleep(delay);
    }
    
    // Mark all as sorted
    const allSorted = Array.from({ length: arr.length }, (_, i) => i);
    renderBars(arr, [], { sorted: allSorted });
}
