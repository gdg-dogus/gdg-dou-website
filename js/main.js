import { applyTranslations, getCurrentLanguage, normalizeLanguage, t } from "./translations.js";

const footerHTML = `
<footer class="footer">
    <div class="footer-container">
        <div class="footer-section footer-brand">
            <div class="footer-logos">
                <img src="assets/logo.png" alt="GDG on Campus DOU Logo" class="footer-logo">
            </div>
            <h3>GDG on Campus DOU</h3>
            <p data-i18n="common.footer.description">Google teknolojilerine, yazılım geliştirmeye ve birlikte üretmeye ilgi duyan Doğuş Üniversitesi öğrencilerinin teknoloji topluluğu.</p>
        </div>
        <div class="footer-section">
            <h3 data-i18n="common.footer.quickLinks">Hızlı Bağlantılar</h3>
            <ul>
                <li><a href="index.html" data-i18n="common.footer.home">Ana Sayfa</a></li>
                <li><a href="about.html" data-i18n="common.footer.about">Hakkımızda</a></li>
                <li><a href="events.html" data-i18n="common.nav.events">Etkinlikler</a></li>
                <li><a href="teams.html" data-i18n="common.nav.teams">Takımlar</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="offers.html" data-i18n="common.nav.offers">Öğrenci Teklifleri</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3 data-i18n="common.footer.contact">Bize Ulaşın</h3>
            <p data-i18n="common.footer.socialPrompt">Sosyal Medya Hesaplarımızı Takip edin</p>
            <div class="social-links">
                <a href="https://www.instagram.com/gdgoncampusdou" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-network="instagram">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.6" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" /></svg>
                </a>
                <a href="https://x.com/gdgoncampusdou" target="_blank" rel="noopener noreferrer" aria-label="X" data-network="x">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" /></svg>
                </a>
                <a href="https://medium.com/@gdscdogus" target="_blank" rel="noopener noreferrer" aria-label="Medium" data-network="medium">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M13.54 12a6.77 6.77 0 1 1-13.54 0 6.77 6.77 0 0 1 13.54 0zm7.43 0c0 3.52-1.51 6.37-3.38 6.37S14.21 15.52 14.21 12s1.51-6.37 3.38-6.37 3.38 2.85 3.38 6.37zm3.03 0c0 3.15-.53 5.7-1.18 5.7s-1.18-2.55-1.18-5.7.53-5.7 1.18-5.7S24 8.85 24 12z" fill="currentColor" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/gdg-on-campus-dogus/?originalSubdomain=tr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-network="linkedin">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /><rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
                </a>
                <a href="https://chat.whatsapp.com/JL2FcOdXFxgGb72P6BxvP9?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" data-network="whatsapp">
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.95 11.95 0 0 0 5.86 1.49h.01c6.6 0 11.97-5.37 11.97-11.97a11.9 11.9 0 0 0-3.52-8.41zM12.07 21.84h-.01a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3.68.97.98-3.59-.23-.37a9.9 9.9 0 0 1-1.52-5.28c0-5.49 4.47-9.95 9.97-9.95a9.9 9.9 0 0 1 7.04 2.92 9.88 9.88 0 0 1 2.91 7.04c0 5.49-4.47 9.96-9.96 9.96zm5.46-7.45c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" fill="currentColor" /></svg>
                </a>
            </div>
            <div class="footer-location">
                <h3 class="footer-location-title" data-i18n="common.footer.location">Konum</h3>
                <div class="footer-map-widget">
                    <iframe
                        class="footer-map"
                        title="Doğuş Üniversitesi Dudullu Kampüsü haritası"
                        data-i18n-title="common.footer.mapTitle"
                        src="https://www.google.com/maps?q=Do%C4%9Fu%C5%9F%20%C3%9Cniversitesi%20Dudullu%20Kamp%C3%BCs%C3%BC&output=embed"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <p class="footer-address" data-i18n="common.footer.address">Dudullu Osb Mah. Nato Yolu Cad. 265/1, 34775 Ümraniye / İstanbul</p>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>
            <button class="footer-builders-trigger" id="buildersModalTrigger" type="button" data-i18n="common.footer.brandCopyright">&copy; 2025 GDG on Campus DOU</button><span data-i18n="common.footer.programSuffix">. Google Developer Groups programının bir parçasıdır.</span>
        </p>
    </div>
</footer>
<div class="builders-modal-overlay" id="buildersModalOverlay" aria-hidden="true">
    <div class="builders-modal-container" role="dialog" aria-modal="true" aria-labelledby="buildersModalTitle">
        <button class="builders-modal-close" id="buildersModalClose" type="button" aria-label="Close modal" data-i18n-aria-label="common.actions.closeModal">
            <span class="material-symbols-outlined">close</span>
        </button>
        <div class="builders-modal-content">
            <div class="builders-modal-header">
                <span class="builders-modal-badge" data-i18n="buildersModal.badge">Orijinal Geliştiriciler</span>
                <h2 class="builders-modal-title" id="buildersModalTitle" data-i18n="buildersModal.title">2025-2026 GDG DOU Web Ekibi tarafından sevgiyle geliştirildi</h2>
                <p class="builders-modal-subtitle" data-i18n="buildersModal.subtitle">Bu GDG on Campus DOU web sitesinin arkasındaki ilk web ekibi.</p>
            </div>
            <div class="builders-modal-members" aria-label="Original website builders">
                <article class="builders-modal-member">
                    <img src="assets/logo.png" alt="" class="builders-modal-logo" loading="lazy" decoding="async">
                    <div class="builders-modal-member-content">
                        <h3 class="builders-modal-member-name">Dora Dikmen</h3>
                        <p class="builders-modal-member-role" data-i18n="buildersModal.roles.lead">Web Development Team Lead</p>
                        <div class="builders-socials">
                            <a class="builders-social-link" data-network="linkedin" data-builder-name="Dora Dikmen" data-builder-social="LinkedIn" href="https://www.linkedin.com/in/dora-dikmen-2944a72ba/" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /><rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg>
                            </a>
                            <a class="builders-social-link" data-network="github" data-builder-name="Dora Dikmen" data-builder-social="GitHub" href="https://github.com/doradikmen" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.59V22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                            </a>
                            <a class="builders-social-link" data-network="gmail" data-builder-name="Dora Dikmen" data-builder-social="Gmail" href="mailto:doradikmen@gmail.com">
                                <svg viewBox="52 42 88 66" aria-hidden="true" focusable="false"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg>
                            </a>
                        </div>
                    </div>
                </article>
                <article class="builders-modal-member">
                    <img src="assets/logo.png" alt="" class="builders-modal-logo" loading="lazy" decoding="async">
                    <div class="builders-modal-member-content">
                        <h3 class="builders-modal-member-name">Berat Aydın</h3>
                        <p class="builders-modal-member-role" data-i18n="buildersModal.roles.coCaptain">Web Development Co-Team Captain</p>
                        <div class="builders-socials">
                            <a class="builders-social-link" data-network="linkedin" data-builder-name="Berat Aydın" data-builder-social="LinkedIn" href="https://www.linkedin.com/in/tisbect/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /><rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg></a>
                            <a class="builders-social-link" data-network="github" data-builder-name="Berat Aydın" data-builder-social="GitHub" href="https://github.com/Tisbect" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.59V22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
                            <a class="builders-social-link" data-network="gmail" data-builder-name="Berat Aydın" data-builder-social="Gmail" href="mailto:tisbect@gmail.com"><svg viewBox="52 42 88 66" aria-hidden="true" focusable="false"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg></a>
                        </div>
                    </div>
                </article>
                <article class="builders-modal-member">
                    <img src="assets/logo.png" alt="" class="builders-modal-logo" loading="lazy" decoding="async">
                    <div class="builders-modal-member-content">
                        <h3 class="builders-modal-member-name">Fatiha Sarmusakcı</h3>
                        <p class="builders-modal-member-role" data-i18n="buildersModal.roles.member">Web Development Team Member</p>
                        <div class="builders-socials">
                            <a class="builders-social-link" data-network="linkedin" data-builder-name="Fatiha Sarmusakcı" data-builder-social="LinkedIn" href="https://tr.linkedin.com/in/fatihasarmusakci" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /><rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg></a>
                            <a class="builders-social-link" data-network="github" data-builder-name="Fatiha Sarmusakcı" data-builder-social="GitHub" href="https://github.com/fatihasarmusakci" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.59V22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
                            <a class="builders-social-link" data-network="gmail" data-builder-name="Fatiha Sarmusakcı" data-builder-social="Gmail" href="mailto:fsarmusakci@gmail.com"><svg viewBox="52 42 88 66" aria-hidden="true" focusable="false"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg></a>
                        </div>
                    </div>
                </article>
                <article class="builders-modal-member">
                    <img src="assets/logo.png" alt="" class="builders-modal-logo" loading="lazy" decoding="async">
                    <div class="builders-modal-member-content">
                        <h3 class="builders-modal-member-name">Ömer Can Ünlü</h3>
                        <p class="builders-modal-member-role" data-i18n="buildersModal.roles.member">Web Development Team Member</p>
                        <div class="builders-socials">
                            <a class="builders-social-link" data-network="linkedin" data-builder-name="Ömer Can Ünlü" data-builder-social="LinkedIn" href="https://www.linkedin.com/in/omercanunlu" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /><rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg></a>
                            <a class="builders-social-link" data-network="github" data-builder-name="Ömer Can Ünlü" data-builder-social="GitHub" href="https://github.com/OmerCN1" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.59V22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
                            <a class="builders-social-link" data-network="gmail" data-builder-name="Ömer Can Ünlü" data-builder-social="Gmail" href="mailto:omercnunlu@gmail.com"><svg viewBox="52 42 88 66" aria-hidden="true" focusable="false"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg></a>
                        </div>
                    </div>
                </article>
                <article class="builders-modal-member">
                    <img src="assets/logo.png" alt="" class="builders-modal-logo" loading="lazy" decoding="async">
                    <div class="builders-modal-member-content">
                        <h3 class="builders-modal-member-name">Dilan Özmen</h3>
                        <p class="builders-modal-member-role" data-i18n="buildersModal.roles.member">Web Development Team Member</p>
                        <div class="builders-socials">
                            <a class="builders-social-link" data-network="linkedin" data-builder-name="Dilan Özmen" data-builder-social="LinkedIn" href="https://www.linkedin.com/in/dilan-%C3%B6zmen-296027326" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /><rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg></a>
                            <a class="builders-social-link" data-network="github" data-builder-name="Dilan Özmen" data-builder-social="GitHub" href="https://github.com/DilanOzmen" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.59V22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
                            <a class="builders-social-link" data-network="gmail" data-builder-name="Dilan Özmen" data-builder-social="Gmail" href="mailto:dilanozmen90@gmail.com"><svg viewBox="52 42 88 66" aria-hidden="true" focusable="false"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg></a>
                        </div>
                    </div>
                </article>
                <article class="builders-modal-member">
                    <img src="assets/logo.png" alt="" class="builders-modal-logo" loading="lazy" decoding="async">
                    <div class="builders-modal-member-content">
                        <h3 class="builders-modal-member-name">Murat Ateş</h3>
                        <p class="builders-modal-member-role" data-i18n="buildersModal.roles.member">Web Development Team Member</p>
                        <div class="builders-socials">
                            <a class="builders-social-link" data-network="linkedin" data-builder-name="Murat Ateş" data-builder-social="LinkedIn" href="https://www.linkedin.com/in/muratcanates/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /><rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" /><circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" /></svg></a>
                            <a class="builders-social-link" data-network="github" data-builder-name="Murat Ateş" data-builder-social="GitHub" href="https://github.com/muratcan-ates" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.59V22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
                            <a class="builders-social-link" data-network="gmail" data-builder-name="Murat Ateş" data-builder-social="Gmail" href="https://gmail.com" target="_blank" rel="noopener"><svg viewBox="52 42 88 66" aria-hidden="true" focusable="false"><path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6"/><path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15"/><path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2"/><path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92"/><path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2"/></svg></a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</div>
`;

const replaceWithHTML = (selector, html) => {
    const placeholder = document.querySelector(selector);
    if (!placeholder) return;

    const template = document.createElement("template");
    template.innerHTML = html.trim();
    placeholder.replaceWith(template.content.cloneNode(true));
};

const loadComponent = async (selector, path) => {
    const placeholder = document.querySelector(selector);
    if (!placeholder) return null;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const fragment = document.createDocumentFragment();
        
        while (doc.body.firstChild) {
            fragment.appendChild(doc.body.firstChild);
        }
        
        placeholder.replaceWith(fragment);
    } catch (error) {
        console.error(error);
    }
};

const initializeThemeToggle = () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeToggleIcon = document.getElementById("themeToggleIcon");

    const setTheme = (theme) => {
        html.setAttribute("data-color-scheme", theme);
        localStorage.setItem("theme", theme);

        if (themeToggleIcon) {
            themeToggleIcon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
        }

        document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
    };

    const savedTheme = localStorage.getItem("theme") || html.getAttribute("data-color-scheme") || "light";
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-color-scheme");
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            setTheme(nextTheme);
        });
    }
};

const initializeTranslationToggle = () => {
    const html = document.documentElement;
    const translateToggle = document.getElementById("translateToggle");

    const updateToggleLabel = (lang) => {
        if (!translateToggle) return;
        const labelKey = lang === "tr" ? "common.actions.switchToEnglish" : "common.actions.switchToTurkish";
        translateToggle.setAttribute("aria-label", t(labelKey, {}, lang));
        translateToggle.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    };

    const setLanguage = (lang, { notify = true } = {}) => {
        const normalized = normalizeLanguage(lang);

        localStorage.setItem("lang", normalized);
        html.setAttribute("lang", normalized);
        html.setAttribute("data-lang", normalized);

        applyTranslations(document, normalized);
        updateToggleLabel(normalized);

        if (notify) {
            document.dispatchEvent(new CustomEvent("languagechange", { detail: { language: normalized } }));
        }
    };

    setLanguage(getCurrentLanguage(), { notify: false });

    if (translateToggle) {
        translateToggle.addEventListener("click", () => {
            const current = html.getAttribute("data-lang") || "tr";
            const next = current === "tr" ? "en" : "tr";
            setLanguage(next);
        });
    }
};

const initializeBuildersModal = () => {
    const trigger = document.getElementById("buildersModalTrigger");
    const overlay = document.getElementById("buildersModalOverlay");
    const closeButton = document.getElementById("buildersModalClose");
    const modal = overlay?.querySelector(".builders-modal-container");
    const membersList = overlay?.querySelector(".builders-modal-members");

    if (!trigger || !overlay || !closeButton || !modal) return;

    let previousBodyOverflow = "";

    const updateSocialLabels = (lang = getCurrentLanguage()) => {
        if (membersList) {
            membersList.setAttribute("aria-label", t("buildersModal.membersLabel", {}, lang));
        }

        overlay.querySelectorAll(".builders-social-link").forEach((link) => {
            const name = link.dataset.builderName;
            const network = link.dataset.builderSocial;
            if (!name || !network) return;

            const labelKey = link.getAttribute("aria-disabled") === "true"
                ? "buildersModal.socialUnavailable"
                : "buildersModal.socialProfile";

            link.setAttribute("aria-label", t(labelKey, { name, network }, lang));
        });
    };

    const openModal = () => {
        previousBodyOverflow = document.body.style.overflow;
        overlay.classList.add("active");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeButton.focus();
    };

    const closeModal = () => {
        overlay.classList.remove("active");
        overlay.setAttribute("aria-hidden", "true");
        document.body.style.overflow = previousBodyOverflow;
        trigger.focus();
    };

    trigger.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);

    overlay.querySelectorAll(".builders-social-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            if (link.getAttribute("aria-disabled") === "true") {
                event.preventDefault();
            }
        });
    });

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && overlay.classList.contains("active")) {
            closeModal();
        }
    });

    document.addEventListener("languagechange", (event) => {
        updateSocialLabels(event.detail?.language);
    });

    updateSocialLabels();
};

document.addEventListener("DOMContentLoaded", async () => {
    replaceWithHTML("#footer-placeholder", footerHTML);
    await loadComponent("#header-placeholder", "components/header.html");

    initializeThemeToggle();
    initializeTranslationToggle();
    initializeBuildersModal();
});
