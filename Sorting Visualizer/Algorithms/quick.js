async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    renderBars(arr, [high], { pivot: high });
    await sleep(delay);

    for (let j = low; j < high; j++) {
        renderBars(arr, [j, high], { pivot: high });
        await sleep(delay);

        if (arr[j] < pivot) {
            i++;
            
            if (i !== j) {
                renderBars(arr, [i, j], { swapping: [i, j], pivot: high });
                await sleep(delay);
                
                [arr[i], arr[j]] = [arr[j], arr[i]];
                
                renderBars(arr, [i, j], { pivot: high });
                await sleep(delay);
            }
        }
    }

    renderBars(arr, [i + 1, high], { swapping: [i + 1, high] });
    await sleep(delay);
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    renderBars(arr, [i + 1], { pivot: i + 1 });
    await sleep(delay);
    
    return i + 1;
}

async function quickSort(arr, low, high) {
    if (low < high) {
        let pi = await partition(arr, low, high);
        
        // Mark pivot position as sorted
        renderBars(arr, [], { sorted: [pi] });
        await sleep(delay);

        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
        
        // Mark sorted portion
        const sortedIndices = Array.from({ length: high - low + 1 }, (_, idx) => low + idx);
        renderBars(arr, [], { sorted: sortedIndices });
        await sleep(delay);
    } else if (low === high) {
        // Single element is sorted
        renderBars(arr, [], { sorted: [low] });
        await sleep(delay);
    }
}
