let delay = 200;
let isSorting = false;
let originalArray = [];

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function updateSpeed(value) {
    delay = parseInt(value);
    document.getElementById("speedValue").textContent = value + "ms";
}

function parseArray() {
    const input = document.getElementById("arrayInput").value;
    if (!input.trim()) return [];
    
    return input.split(",")
        .map(x => parseInt(x.trim()))
        .filter(x => !isNaN(x) && x > 0);
}

function generateRandomArray() {
    if (isSorting) return;
    
    const size = parseInt(document.getElementById("arraySize").value) || 20;
    const maxValue = 100;
    const arr = [];
    
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * maxValue) + 10);
    }
    
    document.getElementById("arrayInput").value = arr.join(", ");
    originalArray = [...arr];
    renderBars(arr);
    updateStatus("Random array generated");
}

function renderBars(arr, highlight = [], state = {}) {
    const bars = document.getElementById("bars");
    bars.innerHTML = "";
    bars.style.setProperty('--bar-count', arr.length);
    
    arr.forEach((val, i) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = (val * 4) + "px";
        bar.setAttribute("data-value", val);
        
        // Remove all state classes first
        bar.classList.remove("comparing", "swapping", "sorted", "pivot");
        
        // Apply state classes based on highlight array and state object
        if (state.pivot === i) {
            bar.classList.add("pivot");
        } else if (state.swapping && state.swapping.includes(i)) {
            bar.classList.add("swapping");
        } else if (highlight.includes(i)) {
            bar.classList.add("comparing");
        } else if (state.sorted && state.sorted.includes(i)) {
            bar.classList.add("sorted");
        }
        
        bars.appendChild(bar);
    });
}

function showComplexity(algo) {
    const map = {
        bubble: "⏱️ Time Complexity: Best O(n), Average O(n²), Worst O(n²) | Space: O(1)",
        selection: "⏱️ Time Complexity: Best O(n²), Average O(n²), Worst O(n²) | Space: O(1)",
        insertion: "⏱️ Time Complexity: Best O(n), Average O(n²), Worst O(n²) | Space: O(1)",
        merge: "⏱️ Time Complexity: Best O(n log n), Average O(n log n), Worst O(n log n) | Space: O(n)",
        quick: "⏱️ Time Complexity: Best O(n log n), Average O(n log n), Worst O(n²) | Space: O(log n)"
    };
    
    document.getElementById("complexity").innerText = map[algo] || "";
}

function updateStatus(message) {
    document.getElementById("status").textContent = message;
}

function resetVisualization() {
    if (isSorting) return;
    
    if (originalArray.length > 0) {
        const arr = [...originalArray];
        document.getElementById("arrayInput").value = arr.join(", ");
        renderBars(arr);
        updateStatus("Reset to original array");
    } else {
        const arr = parseArray();
        if (arr.length > 0) {
            originalArray = [...arr];
            renderBars(arr);
            updateStatus("Visualization reset");
        }
    }
    document.getElementById("complexity").innerText = "";
}

async function startSort() {
    if (isSorting) {
        updateStatus("Sorting already in progress...");
        return;
    }
    
    const arr = parseArray();
    if (arr.length === 0) {
        alert("Please enter a valid array or generate a random array!");
        return;
    }
    
    if (arr.length > 50) {
        alert("Array size too large! Maximum 50 elements for better visualization.");
        return;
    }
    
    // Save original array
    originalArray = [...arr];
    
    const algo = document.getElementById("algorithm").value;
    
    // Disable controls
    isSorting = true;
    document.getElementById("sortBtn").disabled = true;
    document.getElementById("sortBtn").textContent = "Sorting...";
    
    showComplexity(algo);
    updateStatus(`Running ${document.getElementById("algorithm").selectedOptions[0].text}...`);
    renderBars(arr);
    
    try {
        // Create a copy to avoid modifying the original during visualization
        const arrCopy = [...arr];
        
        if (algo === "bubble") {
            await bubbleSort(arrCopy);
        } else if (algo === "selection") {
            await selectionSort(arrCopy);
        } else if (algo === "insertion") {
            await insertionSort(arrCopy);
        } else if (algo === "merge") {
            await mergeSort(arrCopy, 0, arrCopy.length - 1);
        } else if (algo === "quick") {
            await quickSort(arrCopy, 0, arrCopy.length - 1);
        }
        
        // Show final sorted state
        const sortedIndices = Array.from({ length: arrCopy.length }, (_, i) => i);
        renderBars(arrCopy, [], { sorted: sortedIndices });
        updateStatus("✓ Sorting completed!");
        
    } catch (error) {
        console.error("Sorting error:", error);
        updateStatus("Error during sorting");
    } finally {
        // Re-enable controls
        isSorting = false;
        document.getElementById("sortBtn").disabled = false;
        document.getElementById("sortBtn").textContent = "Start Sorting";
    }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
    // Only render default bars on pages that include the bars container
    const barsEl = document.getElementById("bars");
    if (barsEl) {
        const defaultArray = [64, 34, 25, 12, 22, 11, 90];
        originalArray = [...defaultArray];
        renderBars(defaultArray);
    }

    // Ensure speed display is initialized
    updateSpeed(200);

    // Auto-update array size when user types an array
    const arrInput = document.getElementById("arrayInput");
    const sizeInput = document.getElementById("arraySize");
    if (arrInput && sizeInput) {
        arrInput.addEventListener("input", () => {
            const parsed = parseArray();
            sizeInput.value = parsed.length > 0 ? parsed.length : "";
        });
    }
});
