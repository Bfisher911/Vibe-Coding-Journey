
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const vibeButton = document.getElementById('vibe-generator-button') as HTMLButtonElement | null;
const vibeOutput = document.getElementById('vibe-output') as HTMLParagraphElement | null;

const codingVibes: string[] = [
    "Your code is currently channeling the spirit of a well-organized library, where every book (variable) is in its perfect alphabetical place.",
    "Today's vibe: 'Abstract Syntax Tree Hugger.' You're deeply connected to the structure of your code.",
    "You're coding with the chaotic energy of a squirrel who's had too much espresso. It's wild, but somehow it works!",
    "The vibe is 'Digital Bonsai Gardener.' You're meticulously pruning and shaping your functions into works of art.",
    "Your code flows like a serene river, gently carrying data to its destination. Watch out for waterfalls (bugs)!",
    "Vibe check: 'Cosmic Query.' You're asking the big questions, like 'Why is this API rate-limiting me?'",
    "You're in 'Algorithmic Alchemist' mode, turning mundane data structures into golden insights.",
    "Today's forecast: 100% chance of 'Refactor Rhapsody.' You're making beautiful music out of old code.",
    "Your coding style is 'Minimalist Maverick' – saying the most with the least amount of syntax.",
    "The vibe is 'Quantum Debugging.' Your bugs both exist and don't exist until you observe them with a console.log().",
    "Channeling 'Ctrl+S Sensei' today. Saving frequently, achieving inner peace.",
    "Vibe: 'Rubber Duck Oracle.' You're having profound conversations with inanimate objects about your code.",
    "You're on a 'Syntax Safari,' hunting for rare and exotic bugs in their natural habitat.",
    "Current mood: 'CSS Sorcerer.' You bend layouts to your will with ancient and powerful incantations (flexbox and grid).",
    "The code is vibing with 'The Spirit of the Spaghetti Monster.' It's a glorious, tangled mess, but it's YOUR glorious, tangled mess."
];

function getRandomVibe(): string {
    const randomIndex = Math.floor(Math.random() * codingVibes.length);
    return codingVibes[randomIndex];
}

function displayVibe() {
    if (vibeOutput) {
        const newVibe = getRandomVibe();
        // Clear previous vibe and animate new one
        vibeOutput.textContent = ''; // Clear for screen readers to announce change
        
        // Simple fade-in effect
        vibeOutput.style.opacity = '0';
        setTimeout(() => {
            vibeOutput.textContent = newVibe;
            vibeOutput.style.opacity = '1';
            vibeOutput.setAttribute('aria-live', 'assertive'); // Ensure it's announced
        }, 50); // Short delay to allow clearing to register

    }
}

if (vibeButton) {
    vibeButton.addEventListener('click', displayVibe);
}

// Initial message for the vibe output if needed, or keep it empty
if (vibeOutput && !vibeOutput.textContent) {
    // vibeOutput.textContent = "Click the button to find your vibe!";
}

// Small accessibility improvement: ensure button press is discoverable
vibeButton?.addEventListener('focus', () => {
    if (vibeOutput && vibeOutput.textContent === '') {
        // vibeOutput.textContent = "Ready to discover your coding vibe?";
    }
});

// Add a little fade-in for sections on scroll for a smoother experience
// This is a simple version. More complex logic might use Intersection Observer.
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.vibe-section');
    
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: unobserve after it's visible if animation is one-time
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class if you want animation to replay on scroll away and back
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add CSS for the is-visible class if not already handled (or handle in main CSS)
const style = document.createElement('style');
style.textContent = `
    .vibe-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .vibe-section.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    /* Hero section should be visible on load, override */
    .hero-section {
        opacity: 1; /* Already handled by its own animation */
        transform: translateY(0);
    }
     #vibe-output {
        transition: opacity 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

console.log("Vibe Coding Initialized - Let the good vibes flow!");
