/**
 * LEKHA Product Brand Artwork & Offline Vector Assets
 * Crisp, authentic Indian Kirana packaging designs rendered offline in pure SVG.
 */
(function(window) {
  const PRODUCT_SVGS = {
    // 1. Fortune Soyabean Oil 1L (फॉर्च्यून तेल)
    'fortune_oil': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="fo_bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#fef9c3"/>
            <stop offset="60%" stop-color="#fde047"/>
            <stop offset="100%" stop-color="#eab308"/>
          </linearGradient>
          <linearGradient id="fo_gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#b45309"/>
            <stop offset="100%" stop-color="#78350f"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#fo_bg)" stroke="#ca8a04" stroke-width="2.5"/>
        <path d="M 30 10 L 38 18 L 46 10" fill="none" stroke="#ca8a04" stroke-width="2"/>
        <rect x="20" y="28" width="120" height="34" fill="#dc2626"/>
        <text x="80" y="52" font-family="'Poppins', sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">Fortune</text>
        <text x="80" y="74" font-family="'Poppins', sans-serif" font-weight="800" font-size="9" fill="#78350f" text-anchor="middle">SOYA HEALTH</text>
        <text x="80" y="85" font-family="'Poppins', sans-serif" font-weight="600" font-size="7.5" fill="#854d0e" text-anchor="middle">Refined Soyabean Oil</text>
        <!-- Sunflower illustration -->
        <circle cx="80" cy="116" r="22" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
        <circle cx="80" cy="116" r="13" fill="#78350f"/>
        <path d="M 80 100 C 74 110 70 118 70 124 A 10 10 0 0 0 90 124 C 90 118 86 110 80 100 Z" fill="#eab308" opacity="0.9"/>
        <!-- Veg mark -->
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <!-- 1L Badge -->
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#0f172a"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle">1 LITRE</text>
      </svg>
    `,

    // 2. Tata Salt 1kg (टाटा नमक)
    'tata_salt': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="ts_blue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1e3a8a"/>
            <stop offset="45%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#1d4ed8"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#ts_blue)" stroke="#1e40af" stroke-width="2.5"/>
        <path d="M 20 120 Q 80 90 140 120 L 140 180 L 20 180 Z" fill="#f97316"/>
        <path d="M 20 135 Q 80 110 140 135 L 140 180 L 20 180 Z" fill="#ffffff"/>
        <text x="80" y="44" font-family="'Poppins', sans-serif" font-weight="900" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="1">TATA</text>
        <text x="80" y="66" font-family="'Poppins', sans-serif" font-weight="800" font-size="14" fill="#fef08a" text-anchor="middle" letter-spacing="2">SALT</text>
        <text x="80" y="82" font-family="'Poppins', sans-serif" font-weight="700" font-size="8.5" fill="#ffffff" text-anchor="middle">देश का नमक</text>
        <!-- Salt crystal shaker graphic -->
        <circle cx="80" cy="105" r="14" fill="#ffffff" opacity="0.3"/>
        <polygon points="80,95 83,103 91,105 84,110 86,118 80,113 74,118 76,110 69,105 77,103" fill="#ffffff"/>
        <!-- Veg mark -->
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <!-- 1kg Net -->
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#1e3a8a"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="9" fill="#ffffff" text-anchor="middle">1 kg</text>
      </svg>
    `,

    // 3. Aashirvaad Shudh Chakki Atta 5kg (आशीर्वाद आटा)
    'aashirvaad_atta': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="aa_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fffbeb"/>
            <stop offset="50%" stop-color="#fef3c7"/>
            <stop offset="100%" stop-color="#fde68a"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#aa_bg)" stroke="#d97706" stroke-width="2.5"/>
        <rect x="20" y="24" width="120" height="34" fill="#b91c1c"/>
        <text x="80" y="47" font-family="'Poppins', sans-serif" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle" letter-spacing="1">AASHIRVAAD</text>
        <text x="80" y="74" font-family="'Poppins', sans-serif" font-weight="800" font-size="9.5" fill="#92400e" text-anchor="middle">SHUDH CHAKKI ATTA</text>
        <text x="80" y="86" font-family="'Poppins', sans-serif" font-weight="600" font-size="7.5" fill="#b45309" text-anchor="middle">100% संपूर्ण गेहूं आटा</text>
        <!-- Golden Wheat ears -->
        <g stroke="#d97706" stroke-width="2" fill="#f59e0b">
          <path d="M 80 140 Q 75 115 65 98 M 65 98 Q 72 105 78 114 M 65 98 Q 60 106 64 116"/>
          <path d="M 80 140 Q 85 115 95 98 M 95 98 Q 88 105 82 114 M 95 98 Q 100 106 96 116"/>
        </g>
        <circle cx="80" cy="120" r="12" fill="#f59e0b" opacity="0.3"/>
        <!-- Veg mark -->
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <!-- 5kg -->
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#b91c1c"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="9" fill="#ffffff" text-anchor="middle">5 kg</text>
      </svg>
    `,

    // 4. Basmati Rice (बासमती चावल)
    'basmati_rice': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="br_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#312e81"/>
            <stop offset="60%" stop-color="#4338ca"/>
            <stop offset="100%" stop-color="#3730a3"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#br_bg)" stroke="#fbbf24" stroke-width="2.5"/>
        <rect x="30" y="20" width="100" height="42" rx="8" fill="#1e1b4b" stroke="#fbbf24" stroke-width="1.5"/>
        <text x="80" y="38" font-family="'Poppins', sans-serif" font-weight="900" font-size="11" fill="#fde047" text-anchor="middle">ROYAL SELECT</text>
        <text x="80" y="54" font-family="'Poppins', sans-serif" font-weight="800" font-size="13" fill="#ffffff" text-anchor="middle" letter-spacing="1">BASMATI RICE</text>
        <!-- Rice grain motif -->
        <ellipse cx="80" cy="98" rx="28" ry="14" fill="#ffffff" opacity="0.9" stroke="#fef08a" stroke-width="2"/>
        <ellipse cx="70" cy="98" rx="8" ry="3.5" fill="#e2e8f0"/>
        <ellipse cx="84" cy="96" rx="9" ry="3.5" fill="#e2e8f0"/>
        <ellipse cx="78" cy="102" rx="7" ry="3" fill="#cbd5e1"/>
        <text x="80" y="128" font-family="'Poppins', sans-serif" font-weight="700" font-size="8.5" fill="#fde047" text-anchor="middle">शाही लंबा दाना</text>
        <!-- Veg & Qty -->
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#fbbf24"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="900" font-size="9" fill="#1e1b4b" text-anchor="middle">PREMIUM</text>
      </svg>
    `,

    // 5. Toor Dal (अरहर दाल)
    'toor_dal': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="td_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#f8fafc"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#td_bg)" stroke="#16a34a" stroke-width="2.5"/>
        <rect x="20" y="20" width="120" height="30" fill="#16a34a"/>
        <text x="80" y="40" font-family="'Poppins', sans-serif" font-weight="800" font-size="12" fill="#ffffff" text-anchor="middle">देसी अरहर दाल</text>
        <text x="80" y="66" font-family="'Poppins', sans-serif" font-weight="700" font-size="9" fill="#15803d" text-anchor="middle">PURE TOOR DAL</text>
        <!-- Lentils window -->
        <rect x="36" y="78" width="88" height="58" rx="10" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <!-- Lentils dots -->
        <circle cx="48" cy="90" r="4.5" fill="#eab308"/>
        <circle cx="62" cy="88" r="4.5" fill="#ca8a04"/>
        <circle cx="76" cy="91" r="4.5" fill="#eab308"/>
        <circle cx="90" cy="89" r="4.5" fill="#f59e0b"/>
        <circle cx="104" cy="92" r="4.5" fill="#ca8a04"/>
        <circle cx="54" cy="103" r="4.5" fill="#ca8a04"/>
        <circle cx="68" cy="104" r="4.5" fill="#eab308"/>
        <circle cx="82" cy="102" r="4.5" fill="#f59e0b"/>
        <circle cx="96" cy="105" r="4.5" fill="#ca8a04"/>
        <circle cx="60" cy="118" r="4.5" fill="#eab308"/>
        <circle cx="74" cy="119" r="4.5" fill="#ca8a04"/>
        <circle cx="88" cy="117" r="4.5" fill="#f59e0b"/>
        <!-- Veg & Qty -->
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="88" y="150" width="44" height="16" rx="8" fill="#15803d"/>
        <text x="110" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle">UNPOLISHED</text>
      </svg>
    `,

    // 6. Maggi 2-Minute Noodles (मैगी नूडल्स)
    'maggi': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="mg_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fef08a"/>
            <stop offset="40%" stop-color="#facc15"/>
            <stop offset="100%" stop-color="#eab308"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#mg_bg)" stroke="#dc2626" stroke-width="3"/>
        <!-- Maggi Red Scallop Oval -->
        <ellipse cx="80" cy="46" rx="42" ry="22" fill="#dc2626" stroke="#fbbf24" stroke-width="2"/>
        <text x="80" y="52" font-family="'Poppins', sans-serif" font-weight="900" font-size="18" fill="#facc15" text-anchor="middle" font-style="italic">Maggi</text>
        <text x="80" y="80" font-family="'Poppins', sans-serif" font-weight="900" font-size="10" fill="#dc2626" text-anchor="middle">2-MINUTE NOODLES</text>
        <text x="80" y="93" font-family="'Poppins', sans-serif" font-weight="800" font-size="9" fill="#78350f" text-anchor="middle">MASALA SPICE</text>
        <!-- Noodle Bowl -->
        <path d="M 45 115 Q 80 150 115 115 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="2"/>
        <!-- Noodles spirals -->
        <path d="M 52 114 Q 65 102 78 114 Q 92 102 108 114" fill="none" stroke="#fef08a" stroke-width="3"/>
        <path d="M 58 120 Q 75 108 92 120 Q 102 110 110 120" fill="none" stroke="#fde047" stroke-width="3"/>
        <!-- Veg & Badge -->
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="88" y="150" width="44" height="16" rx="8" fill="#dc2626"/>
        <text x="110" y="162" font-family="'Poppins', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">₹14 PACK</text>
      </svg>
    `,

    // 7. Parle-G Biscuits (पार्ले-जी)
    'parle_g': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="pg_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fffbeb"/>
            <stop offset="40%" stop-color="#fef3c7"/>
            <stop offset="100%" stop-color="#fed7aa"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#pg_bg)" stroke="#ea580c" stroke-width="2.5"/>
        <rect x="20" y="24" width="120" height="34" fill="#ea580c"/>
        <text x="80" y="48" font-family="'Poppins', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle" letter-spacing="1">Parle-G</text>
        <text x="80" y="74" font-family="'Poppins', sans-serif" font-weight="800" font-size="9.5" fill="#c2410c" text-anchor="middle">GLUCOSE BISCUITS</text>
        <!-- Biscuit illustration -->
        <rect x="42" y="85" width="76" height="48" rx="6" fill="#d97706" stroke="#b45309" stroke-width="2"/>
        <rect x="48" y="90" width="64" height="38" rx="4" fill="#f59e0b"/>
        <text x="80" y="112" font-family="'Poppins', sans-serif" font-weight="900" font-size="11" fill="#78350f" text-anchor="middle">Parle-G</text>
        <circle cx="54" cy="96" r="1.5" fill="#78350f"/>
        <circle cx="106" cy="96" r="1.5" fill="#78350f"/>
        <circle cx="54" cy="122" r="1.5" fill="#78350f"/>
        <circle cx="106" cy="122" r="1.5" fill="#78350f"/>
        <!-- Veg & Qty -->
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#ea580c"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="900" font-size="9" fill="#ffffff" text-anchor="middle">₹10 MRP</text>
      </svg>
    `,

    // 8. Surf Excel 500g (सर्फ एक्सेल)
    'surf_excel': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="se_bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0284c7"/>
            <stop offset="50%" stop-color="#0369a1"/>
            <stop offset="100%" stop-color="#075985"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#se_bg)" stroke="#38bdf8" stroke-width="2.5"/>
        <!-- Dynamic Splash -->
        <path d="M 80 60 Q 95 40 105 65 Q 125 70 110 85 Q 120 105 95 95 Q 80 115 70 95 Q 45 100 60 80 Q 40 65 65 65 Z" fill="#f43f5e" opacity="0.9"/>
        <text x="80" y="78" font-family="'Poppins', sans-serif" font-weight="900" font-size="14" fill="#ffffff" text-anchor="middle" font-style="italic">Surf</text>
        <text x="80" y="94" font-family="'Poppins', sans-serif" font-weight="900" font-size="15" fill="#fef08a" text-anchor="middle" font-style="italic">excel</text>
        <text x="80" y="118" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#e0f2fe" text-anchor="middle">EASY WASH</text>
        <text x="80" y="130" font-family="'Poppins', sans-serif" font-weight="600" font-size="7.5" fill="#bae6fd" text-anchor="middle">दाग हटाए तुरंत</text>
        <!-- Sparkles -->
        <polygon points="40,30 42,36 48,38 42,40 40,46 38,40 32,38 38,36" fill="#fef08a"/>
        <polygon points="120,40 122,44 126,45 122,46 120,50 118,46 114,45 118,44" fill="#ffffff"/>
        <!-- 500g Badge -->
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#ffffff"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#0369a1" text-anchor="middle">500 g</text>
      </svg>
    `,

    // 9. Rin Detergent Bar (रिन साबुन)
    'rin_soap': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="rin_bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1d4ed8"/>
            <stop offset="100%" stop-color="#1e3a8a"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Soap 3D Bar -->
        <rect x="30" y="50" width="100" height="70" rx="12" fill="url(#rin_bg)" stroke="#3b82f6" stroke-width="2.5" filter="drop-shadow(0 8px 16px rgba(29,78,216,0.3))"/>
        <!-- Lightning sparkle -->
        <path d="M 68 62 L 60 84 L 74 84 L 66 106 L 90 80 L 76 80 Z" fill="#fde047"/>
        <text x="80" y="92" font-family="'Poppins', sans-serif" font-weight="900" font-size="24" fill="#ffffff" text-anchor="middle" font-style="italic">RIN</text>
        <text x="80" y="142" font-family="'Poppins', sans-serif" font-weight="800" font-size="10" fill="#1d4ed8" text-anchor="middle">चमकीली सफेदी</text>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#1d4ed8"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle">₹20</text>
      </svg>
    `,

    // 10. Colgate Toothpaste 100g (कोलगेट)
    'colgate': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="cg_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#dc2626"/>
            <stop offset="100%" stop-color="#991b1b"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#cg_bg)" stroke="#b91c1c" stroke-width="2.5"/>
        <path d="M 20 60 Q 80 80 140 60 L 140 100 Q 80 120 20 100 Z" fill="#ffffff"/>
        <text x="80" y="88" font-family="'Poppins', sans-serif" font-weight="900" font-size="19" fill="#dc2626" text-anchor="middle" font-style="italic">Colgate</text>
        <text x="80" y="132" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle">STRONG TEETH</text>
        <text x="80" y="144" font-family="'Poppins', sans-serif" font-weight="600" font-size="7.5" fill="#fca5a5" text-anchor="middle">मजबूत दांत, ताज़ा सांस</text>
        <!-- Tooth shine -->
        <circle cx="80" cy="38" r="10" fill="#ffffff" opacity="0.9"/>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#ffffff"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#dc2626" text-anchor="middle">100 g</text>
      </svg>
    `,

    // 11. White Sugar (सफेद चीनी)
    'sugar': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <defs>
          <linearGradient id="sg_bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f0f9ff"/>
            <stop offset="100%" stop-color="#e0f2fe"/>
          </linearGradient>
        </defs>
        <rect x="20" y="10" width="120" height="170" rx="14" fill="url(#sg_bg)" stroke="#38bdf8" stroke-width="2.5"/>
        <rect x="20" y="24" width="120" height="30" fill="#0284c7"/>
        <text x="80" y="44" font-family="'Poppins', sans-serif" font-weight="800" font-size="12" fill="#ffffff" text-anchor="middle">सफेद शुद्ध चीनी</text>
        <text x="80" y="70" font-family="'Poppins', sans-serif" font-weight="700" font-size="9" fill="#0369a1" text-anchor="middle">REFINED SUGAR</text>
        <!-- Sugar Cubes -->
        <g stroke="#0284c7" stroke-width="1.5" fill="#ffffff">
          <rect x="52" y="86" width="22" height="22" rx="3"/>
          <rect x="84" y="86" width="22" height="22" rx="3"/>
          <rect x="68" y="104" width="22" height="22" rx="3"/>
        </g>
        <text x="80" y="140" font-family="'Poppins', sans-serif" font-weight="600" font-size="8" fill="#0284c7" text-anchor="middle">मिठास भरपूर</text>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#0284c7"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle">1 kg</text>
      </svg>
    `,

    // 12. Chana Dal (चना दाल)
    'chana_dal': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#fffbeb" stroke="#f59e0b" stroke-width="2.5"/>
        <rect x="20" y="24" width="120" height="30" fill="#d97706"/>
        <text x="80" y="44" font-family="'Poppins', sans-serif" font-weight="800" font-size="12" fill="#ffffff" text-anchor="middle">देसी चना दाल</text>
        <text x="80" y="70" font-family="'Poppins', sans-serif" font-weight="700" font-size="9" fill="#92400e" text-anchor="middle">CHANA DAL</text>
        <circle cx="60" cy="94" r="9" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <circle cx="80" cy="100" r="9" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <circle cx="100" cy="94" r="9" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <circle cx="70" cy="116" r="9" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <circle cx="90" cy="116" r="9" fill="#f59e0b" stroke="#b45309" stroke-width="1.5"/>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#d97706"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle">PREMIUM</text>
      </svg>
    `,

    // 13. Mustard Oil (सरसों तेल)
    'mustard_oil': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#78350f" stroke="#f59e0b" stroke-width="2.5"/>
        <rect x="30" y="22" width="100" height="34" rx="6" fill="#fef08a"/>
        <text x="80" y="44" font-family="'Poppins', sans-serif" font-weight="900" font-size="12" fill="#78350f" text-anchor="middle">कच्ची घानी</text>
        <text x="80" y="76" font-family="'Poppins', sans-serif" font-weight="800" font-size="11" fill="#fef08a" text-anchor="middle">MUSTARD OIL</text>
        <text x="80" y="90" font-family="'Poppins', sans-serif" font-weight="600" font-size="8" fill="#fde68a" text-anchor="middle">शुद्ध तीखा सरसों तेल</text>
        <!-- Mustard Flower -->
        <circle cx="80" cy="118" r="16" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
        <circle cx="80" cy="118" r="7" fill="#78350f"/>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#f59e0b"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#78350f" text-anchor="middle">1 LITRE</text>
      </svg>
    `,

    // 14. MDH Haldi (एमडीएच हल्दी पाउडर)
    'mdh_haldi': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#ea580c" stroke="#c2410c" stroke-width="2.5"/>
        <rect x="30" y="24" width="100" height="34" rx="6" fill="#ffffff"/>
        <text x="80" y="48" font-family="'Poppins', sans-serif" font-weight="900" font-size="16" fill="#dc2626" text-anchor="middle">MDH</text>
        <text x="80" y="78" font-family="'Poppins', sans-serif" font-weight="800" font-size="12" fill="#fef08a" text-anchor="middle">हल्दी पाउडर</text>
        <text x="80" y="92" font-family="'Poppins', sans-serif" font-weight="700" font-size="8" fill="#ffffff" text-anchor="middle">TURMERIC POWDER</text>
        <circle cx="80" cy="118" r="16" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#ffffff"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#c2410c" text-anchor="middle">100 g</text>
      </svg>
    `,

    // 15. Taj Mahal Tea 250g (ताज महल चाय)
    'taj_tea': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#1e1b4b" stroke="#eab308" stroke-width="2.5"/>
        <text x="80" y="44" font-family="'Poppins', sans-serif" font-weight="900" font-size="13" fill="#fbbf24" text-anchor="middle" letter-spacing="1">BROOKE BOND</text>
        <text x="80" y="66" font-family="'Poppins', sans-serif" font-weight="900" font-size="15" fill="#ffffff" text-anchor="middle">TAJ MAHAL</text>
        <text x="80" y="82" font-family="'Poppins', sans-serif" font-weight="700" font-size="8.5" fill="#fef08a" text-anchor="middle">वाह ताज! प्रीमियम चाय</text>
        <!-- Tea cup illustration -->
        <path d="M 55 102 Q 80 135 105 102 Z" fill="#b45309" stroke="#fbbf24" stroke-width="2"/>
        <path d="M 103 105 C 114 105 114 120 102 120" fill="none" stroke="#fbbf24" stroke-width="2"/>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#fbbf24"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="900" font-size="8.5" fill="#1e1b4b" text-anchor="middle">250 g</text>
      </svg>
    `,

    // 16. Amul Butter 100g (अमूल मक्खन)
    'amul_butter': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
        <rect x="20" y="24" width="120" height="34" fill="#dc2626"/>
        <text x="80" y="48" font-family="'Poppins', sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle">Amul</text>
        <text x="80" y="76" font-family="'Poppins', sans-serif" font-weight="800" font-size="13" fill="#854d0e" text-anchor="middle" letter-spacing="1">BUTTER</text>
        <text x="80" y="90" font-family="'Poppins', sans-serif" font-weight="600" font-size="7.5" fill="#a16207" text-anchor="middle">Utterly Butterly Delicious</text>
        <!-- Butter block -->
        <rect x="44" y="100" width="72" height="36" rx="6" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#dc2626"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#ffffff" text-anchor="middle">100 g</text>
      </svg>
    `,

    // 17. Dettol Soap 125g (डेटॉल साबुन)
    'dettol_soap': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#15803d" stroke="#166534" stroke-width="2.5"/>
        <circle cx="80" cy="50" r="22" fill="#ffffff"/>
        <!-- Sword cross -->
        <rect x="78" y="34" width="4" height="32" fill="#15803d"/>
        <rect x="68" y="42" width="24" height="4" fill="#15803d"/>
        <text x="80" y="92" font-family="'Poppins', sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">Dettol</text>
        <text x="80" y="108" font-family="'Poppins', sans-serif" font-weight="700" font-size="8.5" fill="#bbf7d0" text-anchor="middle">ORIGINAL SOAP</text>
        <text x="80" y="120" font-family="'Poppins', sans-serif" font-weight="600" font-size="7.5" fill="#dcfce7" text-anchor="middle">100% कीटाणुओं से सुरक्षा</text>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#ffffff"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="800" font-size="8.5" fill="#15803d" text-anchor="middle">125 g</text>
      </svg>
    `,

    // 18. Lay's Chips 50g (लेज़ चिप्स)
    'lays_chips': `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="100%" height="100%">
        <rect x="20" y="10" width="120" height="170" rx="14" fill="#1d4ed8" stroke="#f59e0b" stroke-width="2.5"/>
        <circle cx="80" cy="54" r="24" fill="#facc15" stroke="#dc2626" stroke-width="2"/>
        <text x="80" y="60" font-family="'Poppins', sans-serif" font-weight="900" font-size="14" fill="#dc2626" text-anchor="middle" font-style="italic">Lay's</text>
        <text x="80" y="95" font-family="'Poppins', sans-serif" font-weight="800" font-size="9" fill="#fde047" text-anchor="middle">MAGIC MASALA</text>
        <text x="80" y="108" font-family="'Poppins', sans-serif" font-weight="700" font-size="8" fill="#ffffff" text-anchor="middle">चटपटा स्पाइसी टेस्ट</text>
        <!-- Potato chips -->
        <ellipse cx="68" cy="126" rx="14" ry="8" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <ellipse cx="90" cy="130" rx="14" ry="8" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
        <rect x="28" y="152" width="12" height="12" fill="#ffffff" stroke="#16a34a" stroke-width="1.5" rx="2"/>
        <circle cx="34" cy="158" r="3.5" fill="#16a34a"/>
        <rect x="94" y="150" width="38" height="16" rx="8" fill="#f59e0b"/>
        <text x="113" y="162" font-family="'Poppins', sans-serif" font-weight="900" font-size="8.5" fill="#1e1b4b" text-anchor="middle">₹20</text>
      </svg>
    `
  };

  // Map product names / IDs to SVGs
  const PRODUCT_IMAGE_MAP = {
    'item_1': 'basmati_rice',
    'item_2': 'toor_dal',
    'item_3': 'sugar',
    'item_4': 'aashirvaad_atta',
    'item_5': 'chana_dal',
    'item_6': 'fortune_oil',
    'item_7': 'mustard_oil',
    'item_8': 'mdh_haldi',
    'item_9': 'tata_salt',
    'item_10': 'rin_soap',
    'item_11': 'surf_excel',
    'item_12': 'colgate',
    'item_13': 'parle_g',
    'item_14': 'maggi',
    'item_15': 'taj_tea',
    'item_16': 'amul_butter',
    'item_17': 'dettol_soap',
    'item_18': 'lays_chips'
  };

  function getProductSvg(item) {
    if (!item) return PRODUCT_SVGS['fortune_oil'];
    let key = PRODUCT_IMAGE_MAP[item.id];
    if (!key) {
      // Lookup by keywords in name
      const n = (item.name || '').toLowerCase();
      if (n.includes('फॉर्च्यून') || n.includes('fortune') || n.includes('तेल') || n.includes('oil')) key = 'fortune_oil';
      else if (n.includes('नमक') || n.includes('salt') || n.includes('tata')) key = 'tata_salt';
      else if (n.includes('आटा') || n.includes('atta') || n.includes('aashirvaad')) key = 'aashirvaad_atta';
      else if (n.includes('चावल') || n.includes('rice') || n.includes('basmati')) key = 'basmati_rice';
      else if (n.includes('अरहर') || n.includes('toor')) key = 'toor_dal';
      else if (n.includes('मैगी') || n.includes('maggi') || n.includes('noodle')) key = 'maggi';
      else if (n.includes('पार्ले') || n.includes('parle') || n.includes('biscuit')) key = 'parle_g';
      else if (n.includes('सर्फ') || n.includes('surf')) key = 'surf_excel';
      else if (n.includes('रिन') || n.includes('rin')) key = 'rin_soap';
      else if (n.includes('कोलगेट') || n.includes('colgate') || n.includes('tooth')) key = 'colgate';
      else if (n.includes('चीनी') || n.includes('sugar')) key = 'sugar';
      else if (n.includes('चना') || n.includes('chana')) key = 'chana_dal';
      else if (n.includes('हल्दी') || n.includes('haldi') || n.includes('mdh')) key = 'mdh_haldi';
      else if (n.includes('चाय') || n.includes('tea') || n.includes('taj')) key = 'taj_tea';
      else if (n.includes('मक्खन') || n.includes('butter') || n.includes('amul')) key = 'amul_butter';
      else if (n.includes('डेटॉल') || n.includes('dettol')) key = 'dettol_soap';
      else if (n.includes('चिप्स') || n.includes('lays') || n.includes('chips')) key = 'lays_chips';
      else key = 'fortune_oil';
    }
    return PRODUCT_SVGS[key] || PRODUCT_SVGS['fortune_oil'];
  }

  window.ProductAssets = {
    SVGS: PRODUCT_SVGS,
    IMAGE_MAP: PRODUCT_IMAGE_MAP,
    getProductSvg: getProductSvg
  };
})(window);
