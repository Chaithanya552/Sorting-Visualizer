async function merge(arr, l, m, r) {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
        renderBars(arr, [l + i, m + 1 + j], {});
        await sleep(delay);

        if (left[i] <= right[j]) {
            arr[k] = left[i++];
        } else {
            arr[k] = right[j++];
        }

        renderBars(arr, [k], {});
        await sleep(delay);
        k++;
    }

    while (i < left.length) {
        arr[k] = left[i++];
        renderBars(arr, [k], {});
        await sleep(delay);
        k++;
    }

    while (j < right.length) {
        arr[k] = right[j++];
        renderBars(arr, [k], {});
        await sleep(delay);
        k++;
    }
    
    // Mark merged portion as sorted
    const sortedIndices = Array.from({ length: r - l + 1 }, (_, idx) => l + idx);
    renderBars(arr, [], { sorted: sortedIndices });
    await sleep(delay);
}

async function mergeSort(arr, l, r) {
    if (l >= r) return;

    let m = Math.floor((l + r) / 2);
    
    renderBars(arr, [l, m, r], {});
    await sleep(delay);
    
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}
