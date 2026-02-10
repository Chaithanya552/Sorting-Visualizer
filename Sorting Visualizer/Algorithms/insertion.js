async function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        renderBars(arr, [i, j], {});
        await sleep(delay);

        while (j >= 0 && arr[j] > key) {
            renderBars(arr, [j, j + 1], { swapping: [j, j + 1] });
            await sleep(delay);
            
            arr[j + 1] = arr[j];
            j--;

            renderBars(arr, [j + 1, j + 2], {});
            await sleep(delay);
        }

        arr[j + 1] = key;
        
        // Show sorted portion
        const sortedIndices = Array.from({ length: i + 1 }, (_, idx) => idx);
        renderBars(arr, [], { sorted: sortedIndices });
        await sleep(delay);
    }
    
    // Mark all as sorted
    const allSorted = Array.from({ length: arr.length }, (_, i) => i);
    renderBars(arr, [], { sorted: allSorted });
}
