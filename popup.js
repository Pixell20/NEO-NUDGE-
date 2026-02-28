// --- 1. GLOBAL LISTENER (TOP OF FILE) ---
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // Check if the message is a 'TICK' and has a valid number
    if (msg.type === "TICK" && typeof msg.time === 'number') {
        const clockDisplay = document.getElementById('clock');
        if (clockDisplay) {
            const m = Math.floor(msg.time / 60);
            const s = String(msg.time % 60).padStart(2, '0');
            clockDisplay.innerText = `${m}:${s}`;
        }
    }
});

// --- 2. CORE INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('timer-toggle');
const resetBtn = document.getElementById('timer-reset');
const chatInput = document.getElementById('chat-input');
const chatBox = document.getElementById('chat-box');
   

    // --- TAB SYSTEM INITIALIZATION ---
const tabs = ['hints', 'timer', 'notes', 'chat'];

tabs.forEach(tab => {
    const btn = document.getElementById('btn-' + tab);
    if (btn) {
        btn.addEventListener('click', () => {
            switchTab(tab);
        });
    }
});

// --- SECURE TAB SWITCHER ---
function switchTab(tabName) {
    // 1. Hide all views
    document.querySelectorAll('.view').forEach(v => {
        v.style.display = 'none';
        v.style.pointerEvents = 'none';
    });

    // 2. Show the target view
    const targetView = document.getElementById('view-' + tabName);
    if (targetView) {
        // Use flex for timer/chat to keep centering; block for others
        targetView.style.display = (tabName === 'timer' || tabName === 'chat') ? 'flex' : 'block';
        targetView.style.pointerEvents = 'auto';
    }

    // 3. Update active tab button styling
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active-tab'));
    const activeBtn = document.getElementById('btn-' + tabName);
    if (activeBtn) {
        activeBtn.classList.add('active-tab');
    }
}


    

    // --- 3. NEO_CHAT ENGINE (50+ C-Programming Database) ---
const neoDB = [
    {q: "pointer", a: "A variable that stores the memory address of another variable."},
    {q: "malloc", a: "Stands for memory allocation; used to allocate a block of memory dynamically on the heap."},
    {q: "free", a: "Releases dynamically allocated memory back to the system to prevent memory leaks."},
    {q: "calloc", a: "Allocates multiple blocks of memory and initializes them to zero."},
    {q: "realloc", a: "Resizes previously allocated memory without losing existing data."},
    {q: "structure", a: "A user-defined data type that groups different types of variables under one name."},
    {q: "union", a: "Similar to struct, but all members share the same memory location."},
    {q: "typedef", a: "Creates an alias or new name for an existing data type (e.g., typedef int counter;)."},
    {q: "recursion", a: "When a function calls itself. Requires a base case to prevent infinite loops."},
    {q: "array", a: "A collection of elements of the same type stored in contiguous memory."},
    {q: "stack", a: "Memory for local variables and function calls (LIFO logic)."},
    {q: "heap", a: "Memory used for dynamic allocation during runtime."},
    {q: "static", a: "Preserves a variable's value even after it goes out of scope."},
    {q: "volatile", a: "Tells the compiler the variable's value may change unexpectedly (e.g., hardware)."},
    {q: "const", a: "Defines a variable whose value cannot be changed after initialization."},
    {q: "macro", a: "A code fragment defined by #define that is replaced before compilation."},
    {q: "file pointer", a: "A pointer of type FILE used to track the current position in a file."},
    {q: "dangling pointer", a: "A pointer that still points to memory that has been freed."},
    {q: "null pointer", a: "A pointer pointing to address 0, indicating it doesn't point to a valid object."},
    {q: "wild pointer", a: "An uninitialized pointer that points to an arbitrary memory location."},
    {q: "segmentation fault", a: "Error caused by accessing memory your program doesn't own."},
    {q: "header file", a: "Files (like .h) containing function declarations and macros to be shared."},
    {q: "main", a: "The entry point of every C program where execution begins."},
    {q: "printf", a: "Function in stdio.h used to print formatted output to the console."},
    {q: "scanf", a: "Function used to read formatted input from the standard input (keyboard)."},
    {q: "sizeof", a: "A unary operator that returns the size (in bytes) of a data type or variable."},
    {q: "preprocessor", a: "The first stage of compilation that handles directives like #include and #define."},
    {q: "bit field", a: "Allows the definition of structure members with a specific number of bits."},
    {q: "enum", a: "A user-defined type consisting of a set of named integer constants."},
    {q: "binary tree", a: "A hierarchical data structure where each node has at most two children."},
    {q: "linked list", a: "A linear data structure where elements (nodes) are linked using pointers."},
    {q: "queue", a: "A FIFO (First-In-First-Out) data structure."},
    {q: "sorting", a: "The process of arranging data in a specific order (e.g., Bubble, Quick, Merge)."},
    {q: "searching", a: "Finding an element in a collection (e.g., Linear search, Binary search)."},
    {q: "call by value", a: "Passing a copy of the variable to a function."},
    {q: "call by reference", a: "Passing the address of a variable to a function using pointers."},
    {q: "goto", a: "A jump statement used to transfer control to a labeled part of the program."},
    {q: "break", a: "Used to exit a loop or switch statement immediately."},
    {q: "continue", a: "Skips the current iteration of a loop and moves to the next one."},
    {q: "global variable", a: "A variable declared outside any function, accessible throughout the file."},
    {q: "local variable", a: "A variable declared inside a function, accessible only within that function."},
    {q: "extern", a: "Declares a variable or function that is defined in another file."},
    {q: "register", a: "Suggests the compiler store a variable in a CPU register for faster access."},
    {q: "auto", a: "The default storage class for local variables."},
    {q: "string", a: "A null-terminated (\0) array of characters."},
    {q: "strcpy", a: "Standard library function used to copy one string to another."},
    {q: "strlen", a: "Returns the length of a string (excluding the null terminator)."},
    {q: "strcmp", a: "Compares two strings and returns 0 if they are identical."},
    {q: "strcat", a: "Appends (concatenates) one string to the end of another."},
    {q: "nested loop", a: "A loop inside another loop (e.g., for patterns or 2D arrays)."},

    {q: "pointer arithmetic", a: "Operations like ptr++ or ptr+1 that move the pointer by the size of the data type it points to."},
    {q: "double pointer", a: "A pointer that stores the address of another pointer (int **ptr)."},
    {q: "memory leak", a: "Occurs when heap memory is allocated but never released using free()."},
    {q: "buffer overflow", a: "Writing data past the end of an array, leading to memory corruption."},
    {q: "void pointer", a: "A generic pointer (void *) that can point to any data type but must be cast before dereferencing."},
    
    // --- Operators & Logic ---
    {q: "ternary", a: "The conditional operator (condition ? expr1 : expr2) used as a shorthand for if-else."},
    {q: "bitwise", a: "Operators that work on individual bits: & (AND), | (OR), ^ (XOR), ~ (NOT), << (Left Shift), >> (Right Shift)."},
    {q: "modulo", a: "The % operator that returns the remainder of an integer division."},
    {q: "logical operator", a: "Used to combine conditions: && (AND), || (OR), ! (NOT)."},
    
    // --- Preprocessor & Compilation ---
    {q: "compilation steps", a: "1. Preprocessing, 2. Compilation, 3. Assembly, 4. Linking."},
    {q: "ifdef", a: "A preprocessor directive that checks if a macro is defined before including code."},
    {q: "pragma", a: "Provides machine-specific instructions to the compiler (e.g., #pragma pack)."},
    {q: "inline", a: "A keyword suggesting the compiler replace a function call with the actual function code to save time."},
    
    // --- Data Structures & Files ---
    {q: "fseek", a: "Used to move the file pointer to a specific location in a file."},
    {q: "rewind", a: "Moves the file pointer back to the beginning of the file."},
    {q: "fprintf", a: "Writes formatted data to a specific file stream instead of the console."},
    {q: "fscanf", a: "Reads formatted data from a specific file stream."},
    
    // --- Storage Classes ---
    {q: "register storage", a: "Requests the compiler to store a variable in a CPU register for high-speed access."},
    {q: "extern storage", a: "Used to declare a global variable that is defined in another source file."},
{q: "inheritance", a: "A core OOP concept where a child class acquires properties and behaviors from a parent class."},
    {q: "polymorphism", a: "The ability of an object to take on many forms; typically achieved through overriding or overloading."},
    {q: "encapsulation", a: "Wrapping data (variables) and code (methods) together as a single unit to protect data."},
    {q: "abstraction", a: "Hiding complex implementation details and showing only the necessary features of an object."},
    {q: "garbage collection", a: "An automatic memory management process that removes objects no longer in use to free up space."},
    {q: "exception handling", a: "Using try-except (Python) or try-catch (Java) blocks to manage runtime errors without crashing."},
    {q: "interpreted", a: "Both languages can run on virtual machines (JVM for Java, PVM for Python) that translate code at runtime."},
    {q: "list", a: "A dynamic data structure; called 'ArrayList' in Java and simply 'list' in Python."},
    {q: "dictionary", a: "A collection of key-value pairs; called 'HashMap' in Java and 'dict' in Python."},
    {q: "constructor", a: "A special method used to initialize objects (__init__ in Python, ClassName in Java)."},
    {q: "class", a: "A blueprint or template for creating objects; used extensively in both languages."},
    {q: "immutable", a: "Data that cannot be changed after creation, such as Strings in Java and Tuples or Strings in Python."},

    {q: "function pointer", a: "A variable that stores the address of a function, allowing functions to be passed as arguments or stored in arrays."},
    {q: "memory alignment", a: "The way data is arranged in memory to align with the CPU's word size, often leading to 'padding' in structures."},
    {q: "structure padding", a: "Extra bytes added by the compiler between structure members to ensure proper memory alignment for faster CPU access."},
    {q: "self-referential structure", a: "A structure that contains a pointer to an instance of itself, used to create linked lists and trees."},
    {q: "stack overflow", a: "A crash caused when the call stack pointer exceeds the stack bound, usually due to infinite recursion."},
    {q: "heap fragmentation", a: "Occurs when free memory is broken into small, non-contiguous blocks, making it hard to allocate large chunks."},
    {q: "bit masking", a: "Using bitwise operators (&, |, ^) to isolate, set, or clear specific bits within a variable."},
    {q: "endianness", a: "The order in which bytes are stored in memory (Big-Endian vs. Little-Endian)."},
    {q: "dma", a: "Direct Memory Access; allows hardware subsystems to access main system memory independently of the CPU."},
    {q: "lookup table", a: "An array used to replace expensive runtime computations with a simpler array indexing operation."},
    {q: "opaque pointer", a: "A pointer to a structure whose definition is hidden in the header file, used for data encapsulation in C."},
    {q: "lvalue", a: "An expression that refers to a memory location (e.g., a variable name) and can appear on the left side of an assignment."},
    {q: "rvalue", a: "A temporary value that does not have a persistent memory address (e.g., a literal constant or the result of an expression)."},

    // --- Basic C++ Concepts ---
    {q: "namespace", a: "Used to organize code into logical groups and prevent name collisions (e.g., std::)."},
    {q: "cin", a: "Standard input stream in C++ used with the extraction operator (>>) to read data."},
    {q: "cout", a: "Standard output stream in C++ used with the insertion operator (<<) to print data."},
    {q: "reference", a: "An alias for an existing variable (int &ref = x;); unlike pointers, they cannot be null or reseated."},
    {q: "function overloading", a: "Having multiple functions with the same name but different parameters."},
    {q: "inline function", a: "A function where the compiler replaces the call with the function code to reduce overhead."},

    // --- Object-Oriented Programming (OOP) ---
    {q: "class", a: "A user-defined blueprint containing data members and member functions."},
    {q: "object", a: "An instance of a class that occupies memory and can perform actions."},
    {q: "constructor", a: "A special member function called automatically when an object is created."},
    {q: "destructor", a: "Called when an object goes out of scope to release resources (prefixed with ~)."},
    {q: "virtual function", a: "A member function in a base class that you expect to redefine in derived classes for polymorphism."},
    {q: "pure virtual function", a: "A function with no implementation (= 0), making the class 'Abstract'."},
    {q: "friend function", a: "A function that is not a member of a class but has access to its private and protected members."},
    {q: "this pointer", a: "A constant pointer that holds the memory address of the current object."},

    // --- Advanced C++ & Memory ---
    {q: "stl", a: "Standard Template Library; a collection of template classes like vectors, lists, and maps."},
    {q: "vector", a: "A dynamic array that can grow or shrink in size automatically."},
    {q: "template", a: "Allows writing generic code that works with any data type (Generic Programming)."},
    {q: "smart pointer", a: "Objects like unique_ptr and shared_ptr that manage memory automatically to prevent leaks."},
    {q: "lambda", a: "An anonymous function that can be defined inline within your code."},
    {q: "exception handling", a: "Using try, catch, and throw blocks to manage errors gracefully."},
    {q: "multiple inheritance", a: "When a class inherits from more than one base class (leads to the 'Diamond Problem')."},
    {q: "diamond problem", a: "An ambiguity where a class inherits from two classes that both inherit from a single base class; fixed with 'virtual inheritance'."},
    {q: "raii", a: "Resource Acquisition Is Initialization; a programming technique where resource management is tied to object lifetime."},
    {q: "move semantics", a: "Allows resources to be moved from one object to another instead of copied, using rvalue references (&&)."},
    {q: "restrict keyword", a: "A pointer qualifier (C99) telling the compiler that for the lifetime of the pointer, only it will access the object it points to, allowing better optimization."},
    {q: "flexible array member", a: "A struct feature where the last member is an unsized array (e.g., int arr[];), used for dynamic sizing within a single memory allocation."},
    {q: "alignment_of", a: "An operator or macro used to find the alignment requirement of a specific type in bytes."},
    {q: "setjmp", a: "A function used for non-local jumps; it saves the current environment (stack state) to be restored later by longjmp."},
    {q: "integer promotion", a: "The automatic conversion of small integer types (like char or short) to int or unsigned int during arithmetic operations."},
    {q: "sequence point", a: "A point in code execution where all previous side effects are guaranteed to be complete (e.g., at a semicolon or after &&)."},
    {q: "type punning", a: "Accessing an object of one type as if it were a different type, often done via unions or pointer casting (can lead to undefined behavior)."},
    {q: "sfinae", a: "Substitution Failure Is Not An Error; a template principle where the compiler discards invalid template overloads instead of throwing an error."},
    {q: "concurrency", a: "The ability to run multiple threads using <thread>, <mutex>, and <future> libraries for parallel execution."},
    {q: "unique_ptr", a: "A smart pointer that owns and manages another object through a pointer and disposes of that object when the unique_ptr goes out of scope."},
    {q: "shared_ptr", a: "A smart pointer that retains shared ownership of an object through a pointer using reference counting."},
    {q: "type traits", a: "A template-based C++ library used to inspect and transform the properties of types at compile time."},
    {q: "constexpr", a: "A keyword that specifies that the value of a variable or function can be evaluated at compile time rather than runtime."},
    {q: "vtable", a: "A lookup table used by the compiler to support dynamic dispatch (finding the right virtual function to call at runtime)."},
    {q: "rvalue reference", a: "Represented by &&, it allows developers to distinguish between a temporary object and a permanent one to implement move semantics."},

    // --- Python: Advanced Logic ---
    {q: "python decorator", a: "A function that takes another function and extends its behavior without explicitly modifying it (@decorator)."},
    {q: "list comprehension", a: "A concise way to create lists in Python: [expression for item in iterable if condition]."},
    {q: "gil", a: "Global Interpreter Lock; a mutex that allows only one thread to execute Python bytecodes at a time."},
    {q: "python generator", a: "A function that returns an iterator using the 'yield' keyword, allowing for lazy evaluation of data."},
    {q: "pep 8", a: "The style guide for Python code, ensuring readability and consistency across projects."},

    // --- Java: Professional & Systems ---
    {q: "jvm", a: "Java Virtual Machine; the engine that provides a runtime environment to drive the Java Code (Bytecode)."},
    {q: "jdk vs jre", a: "JDK is for development (compiler + tools); JRE is for running applications (JVM + libraries)."},
    {q: "java interface", a: "A completely abstract class used to group related methods with empty bodies; used for multiple inheritance."},
    {q: "synchronized", a: "A keyword in Java that ensures a method or block is accessible by only one thread at a time."},
    {q: "stream api", a: "Introduced in Java 8, it allows functional-style operations on streams of elements (map, filter, reduce)."},

    // --- JavaScript: Web & Async ---
    {q: "closure", a: "A feature where an inner function has access to the outer function's variables even after the outer function has returned."},
    {q: "hoisting", a: "JavaScript's behavior of moving declarations to the top of the current scope before code execution."},
    {q: "event loop", a: "The mechanism that handles asynchronous callbacks in JavaScript (Promises, setTimeout) using a task queue."},
    {q: "promises", a: "An object representing the eventual completion or failure of an asynchronous operation."},
    {q: "async await", a: "Syntactic sugar built on top of Promises to write asynchronous code that looks synchronous."},
    {q: "prototype", a: "The mechanism by which JavaScript objects inherit features from one another."},
    {q: "virtual dom", a: "A lightweight copy of the real DOM used in frameworks like React to improve performance via reconciliation."},
    
   
   
   
   
   
   
    {
        title: "Conditional Statements in C",
        h1: "Level 1: Use if-else if-else blocks to check ranges (1-9) for number words.",
        h2: "Level 2: For numbers > 9, use a single else condition to print 'Greater than 9'.",
        h3: "Level 3: Logic: if(n==1) printf('one'); ... else if(n>9) printf('Greater than 9');"
    },
    {
        title: "For Loop in C",
        h1: "Level 1: The loop should run from 'a' to 'b' inclusive: for(int i=a; i<=b; i++).",
        h2: "Level 2: Inside the loop, combine the logic for number words and odd/even checks.",
        h3: "Level 3: Logic: if(i<=9) { /*word logic*/ } else { printf(i%2==0 ? 'even' : 'odd'); }"
    },
    {
        title: "Sum of Digits of a Five Digit Number",
        h1: "Level 1: Use a loop or five separate steps to extract digits using modulo (%).",
        h2: "Level 2: Get the last digit with 'n % 10', then remove it with 'n = n / 10'.",
        h3: "Level 3: Sum each extracted digit in a total variable until the number becomes 0."
    },
    {
        title: "Bitwise Operators",
        h1: "Level 1: You need to find the maximum value of (a & b), (a | b), and (a ^ b).",
        h2: "Level 2: The result must be strictly less than 'k'. Use an if-check for each result.",
        h3: "Level 3: Use nested loops: for(i=1; i<n; i++) for(j=i+1; j<=n; j++) to test all pairs."
    },
    {
        title: "Printing Pattern Using Loops",
        h1: "Level 1: This is a square pattern of size (2*n - 1).",
        h2: "Level 2: At any point (i, j), the value is n - min(dist to edges).",
        h3: "Level 3: min_dist = min(min(i, j), min(size-1-i, size-1-j)). Print n - min_dist."
    },
    {
        title: "1D Arrays in C",
        h1: "Level 1: Dynamically allocate the array: int *arr = malloc(n * sizeof(int)).",
        h2: "Level 2: Use a loop to read 'n' integers into your allocated memory.",
        h3: "Level 3: Loop through again to sum them up, then free(arr) at the end."
    },
    {
        title: "Array Reversal",
        h1: "Level 1: Use two pointers: one at index 0 and one at index (n-1).",
        h2: "Level 2: Swap the elements at these pointers and move them toward the center.",
        h3: "Level 3: Logic: while(start < end) { temp = arr[start]; arr[start] = arr[end]; ... }"
    },
    {
        title: "Printing Tokens",
        h1: "Level 1: Read the entire line using 'gets' or 'scanf' with a negated set: %[^\n].",
        h2: "Level 2: Loop through the string; whenever you hit a space ' ', print a newline.",
        h3: "Level 3: Alternatively, use 'strtok(s, \" \")' in a loop to extract and print each word."
    },
    {
        title: "Digit Frequency",
        h1: "Level 1: Create an integer array 'freq[10]' initialized to all zeros.",
        h2: "Level 2: Traverse the input string. If 's[i]' is between '0' and '9', increment freq[s[i]-'0'].",
        h3: "Level 3: Finally, use a loop from 0-9 to print the counts separated by spaces."
    },
    {
        title: "Dynamic Array in C",
        h1: "Level 1: You need a pointer to pointers: int **shelves = malloc(total_books * sizeof(int*)).",
        h2: "Level 2: Each shelf's size changes. Use realloc when a book is added to a shelf.",
        h3: "Level 3: Keep a separate array 'total_pages' to track page counts for each book."
    }

];



// --- NEO.NUDGE PERSISTENT HINT ENGINE ---
const hintSelect = document.getElementById('hint-selector');
const hintBox = document.getElementById('hint-display');
const hintClearBtn = document.getElementById('btn-clear-hints');

if (hintClearBtn) {
    hintClearBtn.addEventListener('click', () => {
        chrome.storage.local.remove('hintState', () => {
            console.log("NEO_SYSTEM: Hint Buffer Flushed.");
            location.reload();
        });
    });
}
if (hintSelect) {
    hintSelect.innerHTML = '<option value="">-- SELECT CHALLENGE --</option>';
    
    neoDB.forEach((item, index) => {
        if (item.title) {
            const opt = document.createElement('option');
            opt.value = index;
            opt.innerText = item.title; 
            hintSelect.appendChild(opt);
        }
    });

    hintSelect.addEventListener('change', () => {
        const selectedIndex = hintSelect.value;
        if (!selectedIndex) {
            hintBox.innerHTML = `<p style="color: #555;">Select a challenge to see hints...</p>`;
            return;
        }

        // LOAD SAVED STATE: Check if this problem has unlocked hints
        chrome.storage.local.get(['hintState'], (data) => {
            const state = data.hintState || {};
            const unlockedLevel = state[selectedIndex] || 1; // Default to Level 1
            renderHints(selectedIndex, unlockedLevel);
        });
    });
}

// RENDERER: Draws hints based on saved or current level
function renderHints(index, level) {
    const data = neoDB[index];
    
    hintBox.innerHTML = `
        <div class="hint-card level-1">
            <div class="level-tag">L-1 // NUDGE</div>
            <div class="hint-content">${data.h1}</div>
        </div>
        
        <div id="h2-text" class="hint-card level-2" style="display: ${level >= 2 ? 'block' : 'none'};">
            <div class="level-tag">L-2 // INSIGHT</div>
            <div class="hint-content">${data.h2}</div>
        </div>
        <button id="show-h2" class="reveal-btn" style="display: ${level < 2 ? 'block' : 'none'};">REVEAL NEXT LEVEL</button>

        <div id="h3-text" class="hint-card level-3" style="display: ${level >= 3 ? 'block' : 'none'};">
            <div class="level-tag">L-3 // CORE_LOGIC</div>
            <div class="hint-content">${data.h3}</div>
        </div>
        <button id="show-h3" class="reveal-btn" style="display: ${level === 2 ? 'block' : 'none'};">REVEAL FINAL LOGIC</button>
    `;

    // AUTOSAVE LOGIC: Save the new level to Chrome Storage
    const hintClearBtn = document.getElementById('btn-clear-hints');
    const updateStorage = (newLevel) => {
        chrome.storage.local.get(['hintState'], (res) => {
            const state = res.hintState || {};
            state[index] = newLevel;
            chrome.storage.local.set({ hintState: state });
        });
    };

    if (document.getElementById('show-h2')) {
        document.getElementById('show-h2').onclick = () => {
            updateStorage(2);
            renderHints(index, 2);
        };
    }

    if (document.getElementById('show-h3')) {
        document.getElementById('show-h3').onclick = () => {
            updateStorage(3);
            renderHints(index, 3);
        };
    }
}




// --- CHAT ENGINE ---
    if (chatInput && chatBox) {
        chatInput.onkeypress = (e) => {
            if (e.key === 'Enter' && chatInput.value.trim() !== "") {
                const input = chatInput.value.toLowerCase();
                chatBox.innerHTML += `<div>> USER: ${chatInput.value}</div>`;
                const match = neoDB.find(item => item.q && input.includes(item.q.toLowerCase()));
                chatBox.innerHTML += `<div style="color:#00f2ff">> NEO: ${match ? match.a : "Keyword not found."}</div>`;
                chatInput.value = "";
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        };
    }

    // --- NOTES SYSTEM INITIALIZATION ---
    const noteInput = document.getElementById('note-input');
    const saveBtn = document.getElementById('btn-save-notes');
    const notesClearBtn = document.getElementById('btn-clear-notes');

    // 1. LOAD SAVED DATA: Get any existing notes from local storage
    chrome.storage.local.get(['savedNote'], (res) => {
        if (res.savedNote && noteInput) {
            noteInput.value = res.savedNote;
        }
    });

    // 2. AUTOSAVE: Update storage every time the user types
    if (noteInput) {
        noteInput.addEventListener('input', () => {
            chrome.storage.local.set({ savedNote: noteInput.value });
        });
    }

    // 3. SAVE TO DISK: Create a .txt file and trigger download
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const textContent = noteInput.value;
            if (!textContent.trim()) {
                alert("SYSTEM_MSG: Cannot save an empty buffer.");
                return;
            }
            
            // Create a Blob containing the text
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            // Create a hidden link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = 'NeoNudge_Notes.txt'; 
            document.body.appendChild(link);
            link.click();
            
            // Cleanup memory
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }

    // 4. CLEAR BUFFER: Reset UI and Storage
    if (notesClearBtn) {
    notesClearBtn.addEventListener('click', () => {
        const confirmClear = confirm("NEO_WARNING: Permanent deletion of current buffer. Proceed?");
        if (confirmClear && noteInput) {
            noteInput.value = "";
            chrome.storage.local.remove('savedNote');
        }
    });
}
});


async function injectFloatingTimer() {
    // A. Find the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // B. Safety Check: Only inject if we are on a valid webpage
    if (!tab || !tab.id || tab.url.startsWith("chrome://")) {
        console.error("SYSTEM_ERR: Cannot inject into protected Chrome pages.");
        return;
    }

    // C. Execute the injection
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            if (window.neoInjected) return; // Prevent double injection
            window.neoInjected = true;

            const container = document.createElement("div");
            container.id = "neo-container";
            container.style.cssText = `
                position: fixed; top: 20px; right: 20px; z-index: 2147483647;
                background: #000; border: 2px solid #00f2ff; padding: 10px 20px;
                border-radius: 50px; color: #00f2ff; font-family: monospace;
                box-shadow: 0 0 20px rgba(0,242,255,0.7); display: flex;
            `;
            container.innerHTML = `<div id="neo-float">NEO: 20:00</div>`;
            document.body.appendChild(container);
        }
    }).catch(err => console.error("INJECTION_FAIL:", err));
}

// --- 1. GLOBAL UI RENDERER ---
function updateUI(time, running) {
    const clockDisplay = document.getElementById('clock');
    const toggleBtn = document.getElementById('timer-toggle');
    if (!clockDisplay) return;

    const m = Math.floor(time / 60);
    const s = String(time % 60).padStart(2, '0');
    clockDisplay.innerText = `${m}:${s}`;
    
    if (toggleBtn) {
        toggleBtn.innerText = running ? "HALT_SYSTEM" : "START_SYSTEM";
        toggleBtn.style.borderColor = running ? "#ff4b4b" : "#00f2ff";
    }
}

// --- 2. GLOBAL LISTENER (Catches the background 'TICK') ---
// --- 3. CORE INITIALIZATION ---
    // DECLARE ALL BUTTONS AT THE VERY TOP OF THE BLOCK
    const toggleBtn = document.getElementById('timer-toggle');
    const resetBtn = document.getElementById('timer-reset');

    // SYNC ON OPEN
    chrome.runtime.sendMessage({ type: "GET_TIME" }, (res) => {
        if (res) updateUI(res.time, res.running);
    });

    // START/STOP LOGIC
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: "GET_TIME" }, (res) => {
                if (res && res.running) {
                    chrome.runtime.sendMessage({ type: "STOP_TIMER" }, (r) => updateUI(r.time, false));
                } else {
                    chrome.runtime.sendMessage({ type: "START_TIMER" }, (r) => updateUI(r.time, true));
                }
            });
        });
    }

    // RESET LOGIC (This fixes your ReferenceError)
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: "RESET_TIMER" }, (r) => updateUI(1200, false));
        });
    }