/* ===========================================================
   FunctionMandi - js/app.js
   Shared logic for all pages: language toggle, quote calculator,
   near-me area filter, review+photo, verified badge, calendar,
   auspicious dates, escrow payment (mock).
   =========================================================== */

/* -----------------------------------------------------------
   1. LANGUAGE TOGGLE (Tamil / English / Telugu / Hindi)
   Add data-i18n="key" attribute to any element's text you want
   translated, and call applyLanguage() on page load.
------------------------------------------------------------ */
const translations = {
  en: {
    home: "Home", vendors: "Vendors", about: "About", contact: "Contact",
    login: "Login", bookNow: "Book Now", myBookings: "My Bookings",
    logout: "Logout", nearMe: "Near My Area", getQuote: "Get Instant Quote"
  },
  ta: {
    home: "முகப்பு", vendors: "வெண்டர்கள்", about: "எங்களை பற்றி", contact: "தொடர்பு",
    login: "உள்நுழைய", bookNow: "இப்போது புக் செய்யுங்கள்", myBookings: "என் புக்கிங்குகள்",
    logout: "வெளியேறு", nearMe: "என் பகுதிக்கு அருகில்", getQuote: "உடனடி மதிப்பீடு பெறுங்கள்"
  },
  te: {
    home: "హోమ్", vendors: "వెండర్లు", about: "మా గురించి", contact: "సంప్రదించండి",
    login: "లాగిన్", bookNow: "ఇప్పుడు బుక్ చేయండి", myBookings: "నా బుకింగ్‌లు",
    logout: "లాగ్అవుట్", nearMe: "నా ప్రాంతంలో", getQuote: "తక్షణ కోట్ పొందండి"
  },
  hi: {
    home: "होम", vendors: "वेंडर", about: "हमारे बारे में", contact: "संपर्क करें",
    login: "लॉगिन", bookNow: "अभी बुक करें", myBookings: "मेरी बुकिंग",
    logout: "लॉगआउट", nearMe: "मेरे क्षेत्र के पास", getQuote: "तुरंत कोटेशन पाएं"
  }
};

function applyLanguage(lang) {
  localStorage.setItem("fm_lang", lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

function initLanguage() {
  const saved = localStorage.getItem("fm_lang") || "en";
  applyLanguage(saved);
  const selector = document.getElementById("langSelect");
  if (selector) selector.value = saved;
}

/* -----------------------------------------------------------
   2. VERIFIED VENDOR BADGE
   vendor object: { id, name, verified: true/false }
   Renders a badge into any element with id="verifiedBadge"
------------------------------------------------------------ */
function renderVerifiedBadge(isVerified, targetId = "verifiedBadge") {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = isVerified
    ? `<span class="badge badge-verified">✅ Verified Vendor</span>`
    : `<span class="badge badge-pending">⏳ Verification Pending</span>`;
}

/* -----------------------------------------------------------
   3. "NEAR MY AREA" SEARCH FILTER
   Simple text-based area filter for a vendor list.
   vendorList: array of { name, area, city, ... }
   Renders filtered results into container id="vendorResults"
------------------------------------------------------------ */
function filterVendorsByArea(vendorList, areaQuery) {
  const q = areaQuery.trim().toLowerCase();
  if (!q) return vendorList;
  return vendorList.filter(v =>
    (v.area && v.area.toLowerCase().includes(q)) ||
    (v.city && v.city.toLowerCase().includes(q))
  );
}

function useMyLocationText(inputId = "areaInput") {
  const input = document.getElementById(inputId);
  if (!navigator.geolocation) {
    alert("Geolocation not supported on this browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    () => {
      // Full reverse-geocoding needs a maps API key (Google/Mapbox).
      // Placeholder: prompt user to type area manually for now.
      input.placeholder = "Location detected — type your area/locality";
    },
    () => alert("Could not fetch location. Please type your area manually.")
  );
}

/* -----------------------------------------------------------
   4. INSTANT QUOTE CALCULATOR
   Rough estimate only — tune the base rates as needed.
------------------------------------------------------------ */
const QUOTE_RATES = {
  catering: 350,      // per guest
  decoration: 25000,  // flat
  photography: 20000, // flat
  venue: 40000         // flat
};

function calculateQuote() {
  const guests = parseInt(document.getElementById("qGuests").value) || 0;
  const services = Array.from(document.querySelectorAll(".qService:checked")).map(c => c.value);

  let total = 0;
  services.forEach(s => {
    if (s === "catering") total += guests * QUOTE_RATES.catering;
    else total += QUOTE_RATES[s] || 0;
  });

  const resultEl = document.getElementById("qResult");
  if (resultEl) {
    resultEl.textContent = total > 0
      ? `Estimated Budget: ₹${total.toLocaleString("en-IN")}`
      : "Select guest count and at least one service.";
  }
}

/* -----------------------------------------------------------
   5. AUSPICIOUS (MUHURTHAM) DATE SUGGESTIONS
   Static sample list — replace with a real panchangam API/data
   source for production accuracy.
------------------------------------------------------------ */
const AUSPICIOUS_DATES_2026 = [
  "2026-08-15", "2026-08-23", "2026-09-05", "2026-09-19",
  "2026-10-10", "2026-11-02", "2026-11-21", "2026-12-06"
];

function renderAuspiciousDates(targetId = "auspiciousList") {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = AUSPICIOUS_DATES_2026
    .map(d => `<span class="chip">${new Date(d).toDateString()}</span>`)
    .join(" ");
}

/* -----------------------------------------------------------
   6. VENDOR AVAILABILITY CALENDAR (simple month grid)
   bookedDates: array of "YYYY-MM-DD" strings
------------------------------------------------------------ */
function renderAvailabilityCalendar(bookedDates = [], targetId = "availabilityCalendar") {
  const el = document.getElementById(targetId);
  if (!el) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = `<div class="calendar-grid">`;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isBooked = bookedDates.includes(dateStr);
    html += `<div class="cal-day ${isBooked ? "cal-booked" : "cal-free"}" title="${dateStr}">${d}</div>`;
  }
  html += `</div>`;
  el.innerHTML = html;
}

/* -----------------------------------------------------------
   7. REVIEW WITH PHOTO PROOF
   Reads a selected image as a data URL and shows a preview.
   In production, upload the file to storage (e.g. Firebase/S3)
   and save the resulting URL with the review record.
------------------------------------------------------------ */
function handleReviewPhoto(inputEl, previewId = "reviewPhotoPreview") {
  const file = inputEl.files[0];
  const preview = document.getElementById(previewId);
  if (!file || !preview) return;

  const reader = new FileReader();
  reader.onload = e => {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function submitReview() {
  const text = document.getElementById("reviewText").value.trim();
  const hasPhoto = document.getElementById("reviewPhotoPreview").style.display === "block";
  if (!text) {
    alert("Please write a review before submitting.");
    return;
  }
  alert(hasPhoto
    ? "Review submitted with photo proof ✅ (Verified Review)"
    : "Review submitted. Add a photo next time for a Verified Review badge!");
}

/* -----------------------------------------------------------
   8. ESCROW-STYLE PAYMENT (MOCK ONLY)
   NOTE: Real escrow requires a payment gateway (Razorpay/Paytm)
   with a hold/release flow and backend integration. This is a
   UI placeholder to demonstrate the flow — do not use as-is for
   real transactions.
------------------------------------------------------------ */
function mockEscrowPayment() {
  const status = document.getElementById("escrowStatus");
  if (!status) return;
  status.textContent = "🔒 Advance amount held securely. Will be released to vendor after event completion.";
  status.className = "escrow-held";
}

/* -----------------------------------------------------------
   Existing page functions (kept from earlier version)
------------------------------------------------------------ */
function logout() {
  localStorage.removeItem("fm_user");
  window.location.href = "index.html";
}

function signup() {
  alert("Signup successful! (connect to backend/auth to make this real)");
}

function bookNow() {
  alert("Booking request sent! (connect to backend to make this real)");
}

/* Run language init on every page load */
document.addEventListener("DOMContentLoaded", initLanguage);
