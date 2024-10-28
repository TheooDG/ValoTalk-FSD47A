// Vérification immédiate des cookies avant le chargement du DOM
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// Vérification immédiate avant le chargement de la page
const cookieConsent = getCookie('cookiesAccepted');
if (cookieConsent === 'true' || cookieConsent === 'false') {
    document.documentElement.style.setProperty('--cookie-banner-display', 'none');
} else {
    document.documentElement.style.setProperty('--cookie-banner-display', 'block');
}

document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const declineButton = document.getElementById('decline-cookies');

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
        console.log(`Cookie défini : ${name}=${value}; ${expires}`);
    }

    function checkCookieConsent() {
        const cookieValue = getCookie('cookiesAccepted');
        console.log("État actuel du consentement:", cookieValue);

        if (cookieValue === 'true' || cookieValue === 'false') {
            cookieBanner.style.display = 'none';
            document.documentElement.style.setProperty('--cookie-banner-display', 'none');
        } else {
            cookieBanner.style.display = 'block';
            document.documentElement.style.setProperty('--cookie-banner-display', 'block');
        }
    }

    acceptButton.addEventListener('click', function() {
        setCookie('cookiesAccepted', 'true', 365);
        cookieBanner.style.display = 'none';
        document.documentElement.style.setProperty('--cookie-banner-display', 'none');
        console.log("Cookies acceptés");
    });

    declineButton.addEventListener('click', function() {
        setCookie('cookiesAccepted', 'false', 365);
        cookieBanner.style.display = 'none';
        document.documentElement.style.setProperty('--cookie-banner-display', 'none');
        console.log("Cookies refusés");
    });

    // Vérification initiale des cookies au chargement
    checkCookieConsent();
});