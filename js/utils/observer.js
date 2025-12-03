/*Shared IntersectionObserver utility for performance optimization*/

const visibilityCallbacks = new Map();
const counterCallbacks = new Map();

let visibilityObserver = null;

let counterObserver = null;

const getVisibilityObserver = () => {
    if (visibilityObserver) return visibilityObserver;
    
    if (!('IntersectionObserver' in window)) return null;

    visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const callback = visibilityCallbacks.get(entry.target);
                if (callback) {
                    callback(entry.target);
                    visibilityCallbacks.delete(entry.target);
                } else {
                    entry.target.classList.add('is-visible');
                }
                visibilityObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    return visibilityObserver;
};


const getCounterObserver = () => {
    if (counterObserver) return counterObserver;
    
    if (!('IntersectionObserver' in window)) return null;

    counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const callback = counterCallbacks.get(entry.target);
                if (callback) {
                    callback(entry.target);
                    counterCallbacks.delete(entry.target);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });

    return counterObserver;
};

/* Observe an element for visibility (entrance animations)*/
export const observeVisibility = (element, callback = null) => {
    const observer = getVisibilityObserver();
    if (!observer) {
        // Fallback for browsers without IntersectionObserver
        if (callback) callback(element);
        else element.classList.add('is-visible');
        return;
    }
    
    if (callback) {
        visibilityCallbacks.set(element, callback);
    }
    observer.observe(element);
};

/*Observe an element for counter animation (needs 50% visibility)*/
export const observeCounter = (element, callback) => {
    const observer = getCounterObserver();
    if (!observer) {
        // Fallback
        callback(element);
        return;
    }
    
    counterCallbacks.set(element, callback);
    observer.observe(element);
};


 

 
export const unobserve = (element) => {
    visibilityCallbacks.delete(element);
    counterCallbacks.delete(element);
    
    if (visibilityObserver) visibilityObserver.unobserve(element);
    if (counterObserver) counterObserver.unobserve(element);
};


export const cleanup = () => {
    if (visibilityObserver) {
        visibilityObserver.disconnect();
        visibilityObserver = null;
    }
    if (counterObserver) {
        counterObserver.disconnect();
        counterObserver = null;
    }
    visibilityCallbacks.clear();
    counterCallbacks.clear();
};

let orbObserver = null;

/**
 * Initialize orb animation control pauses animations when off-screen
 */
export const initOrbVisibilityControl = () => {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    if (!('IntersectionObserver' in window)) return;

    orbObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const orbs = entry.target.querySelectorAll('.hero-orb');
            orbs.forEach(orb => {
                if (entry.isIntersecting) {
                    orb.style.animationPlayState = 'running';
                } else {
                    orb.style.animationPlayState = 'paused';
                }
            });
        });
    }, {
        root: null,
        rootMargin: '100px', // Start slightly before visible
        threshold: 0
    });

    orbObserver.observe(heroBackground);
};

let pageVisibilityHandler = null;

export const initPageVisibilityControl = () => {
    if (pageVisibilityHandler) return;

    pageVisibilityHandler = () => {
        const orbs = document.querySelectorAll('.hero-orb');
        if (document.hidden) {
            orbs.forEach(orb => orb.style.animationPlayState = 'paused');
        } else {
            // Only resume if orbs are in viewport
            orbs.forEach(orb => {
                const rect = orb.getBoundingClientRect();
                const inViewport = rect.bottom > 0 && rect.top < window.innerHeight;
                orb.style.animationPlayState = inViewport ? 'running' : 'paused';
            });
        }
    };

    document.addEventListener('visibilitychange', pageVisibilityHandler);
};
