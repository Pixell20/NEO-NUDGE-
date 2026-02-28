// --- NEO_NUDGE.OS BACKGROUND ENGINE ---

let timeLeft = 1200; // 20 Minutes in seconds
let timerInterval = null;
let isRunning = false;

// Unified Listener for all Popup commands
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.type === "START_TIMER") {
        if (!isRunning) {
            isRunning = true;
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    // BROADCAST TICK: Catch prevents errors when popup is closed
                    chrome.runtime.sendMessage({ type: "TICK", time: timeLeft }).catch(() => {});
                } else {
                    clearInterval(timerInterval);
                    isRunning = false;
                }
            }, 1000);
        }
        sendResponse({ time: timeLeft, running: isRunning });
    }

    else if (request.type === "STOP_TIMER") {
        clearInterval(timerInterval);
        isRunning = false;
        sendResponse({ time: timeLeft, running: isRunning });
    }

    else if (request.type === "GET_TIME") {
        // Immediate response to fix the 'frozen' popup issue
        sendResponse({ 
            time: timeLeft, 
            running: isRunning 
        });
    }

    else if (request.type === "RESET_TIMER") {
        clearInterval(timerInterval);
        timeLeft = 1200;
        isRunning = false;
        sendResponse({ time: 1200, running: false });
    }


    // Keep the message channel open for async responses
    return true; 
});