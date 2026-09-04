import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
const en = { translation: { app_name: "UZHAVAN AI", subtitle: "Your farming companion", ask_uzhavan: "Ask Uzhavan", my_crop: "Crop Advice", check_disease: "Disease Scanner", weather: "Weather", market_price: "Market Insights", sell_crop: "Sell Crop", my_orders: "My Orders", schemes: "Kisan Helpline", tap_and_speak: "TAP & SPEAK", ask_anything: "Ask me anything about farming", listening: "Listening...", thinking: "Uzhavan AI is thinking...", home: "Home", ask: "Ask AI", crops: "Crops", bazzar: "Market", profile: "Profile", profile_title: "MY PROFILE", logout: "LOGOUT", phone_number: "PHONE NUMBER", location: "LOCATION", land_area: "LAND AREA", crop_type: "CROP TYPE", soil_type: "SOIL TYPE", registered: "REGISTERED DATE", call_history: "Call History", view_consultations: "View past expert consultations", edit_details: "Edit Farm Details", save_changes: "Save Changes", saved_successfully: "Profile updated successfully!" } };

// Tamil
const ta = { translation: { app_name: "உழவன் AI", subtitle: "உங்கள் விவசாய நண்பன்", ask_uzhavan: "உழவனிடம் கேள்", my_crop: "பயிர் ஆலோசனை", check_disease: "நோயை சரிபார்க்க", weather: "வானிலை", market_price: "சந்தை விலை", sell_crop: "பயிர் விற்பனை", my_orders: "என் ஆர்டர்கள்", schemes: "உழவர் உதவி", tap_and_speak: "தட்டி பேசுங்கள்", ask_anything: "விவசாயம் பற்றி ஏதேனும் கேளுங்கள்", listening: "கேட்கிறது...", thinking: "உழவன் AI சிந்திக்கிறது...", home: "முகப்பு", ask: "கேள்", crops: "பயிர்கள்", bazzar: "சந்தை", profile: "சுயவிவரம்", profile_title: "என் சுயவிவரம்", logout: "வெளியேறு", phone_number: "தொலைபேசி எண்", location: "இடம்", land_area: "நிலப்பரப்பு", crop_type: "பயிர் வகை", soil_type: "மண் வகை", registered: "பதிவு செய்த தேதி", call_history: "அழைப்பு வரலாறு", view_consultations: "கடந்த நிபுணர் ஆலோசனைகளைப் பார்க்கவும்", edit_details: "பண்ணை விவரங்களை திருத்து", save_changes: "மாற்றங்களைச் சேமி", saved_successfully: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!" } };

// Hindi
const hi = { translation: { app_name: "उज़हावन AI", subtitle: "आपका कृषि साथी", ask_uzhavan: "उज़हावन से पूछें", my_crop: "फसल सलाह", check_disease: "रोग जांच", weather: "मौसम", market_price: "बाजार भाव", sell_crop: "फसल बेचें", my_orders: "मेरे आदेश", schemes: "किसान हेल्पलाइन", tap_and_speak: "टैप करें और बोलें", ask_anything: "खेती के बारे में कुछ भी पूछें", listening: "सुन रहा हूँ...", thinking: "उज़हावन AI सोच रहा है...", home: "होम", ask: "पूछें", crops: "फसलें", bazzar: "बाज़ार", profile: "प्रोफ़ाइल", profile_title: "मेरी प्रोफ़ाइल", logout: "लॉग आउट", phone_number: "फ़ोन नंबर", location: "स्थान", land_area: "भूमि क्षेत्र", crop_type: "फसल का प्रकार", soil_type: "मिट्टी का प्रकार", registered: "पंजीकृत तिथि", call_history: "कॉल इतिहास", view_consultations: "पिछले विशेषज्ञ परामर्श देखें", edit_details: "फार्म विवरण संपादित करें", save_changes: "परिवर्तन सहेजें", saved_successfully: "प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!" } };

// Telugu
const te = { translation: { app_name: "ఉజావన్ AI", subtitle: "మీ వ్యవసాయ సహచరుడు", ask_uzhavan: "ఉజావన్ అడగండి", my_crop: "పంట సలహా", check_disease: "వ్యాధి తనిఖీ", weather: "వాతావరణం", market_price: "మార్కెట్ ధరలు", sell_crop: "పంట అమ్మండి", my_orders: "నా ఆర్డర్‌లు", schemes: "కిసాన్ హెల్ప్‌లైన్", tap_and_speak: "నొక్కండి మరియు మాట్లాడండి", ask_anything: "వ్యవసాయం గురించి ఏదైనా అడగండి", listening: "వింటున్నాను...", thinking: "ఉజావన్ AI ఆలోచిస్తోంది...", home: "హోమ్", ask: "అడగండి", crops: "పంటలు", bazzar: "మార్కెట్", profile: "ప్రొఫైల్", profile_title: "నా ప్రొఫైల్", logout: "లాగ్ అవుట్", phone_number: "ఫోన్ నంబర్", location: "స్థానం", land_area: "భూభాగం", crop_type: "పంట రకం", soil_type: "నేల రకం", registered: "నమోదు తేదీ", call_history: "కాల్ చరిత్ర", view_consultations: "గత నిపుణుల సంప్రదింపులను వీక్షించండి", edit_details: "ఫార్మ్ వివరాలను సవరించండి", save_changes: "మార్పులను సేవ్ చేయండి", saved_successfully: "ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది!" } };

// Kannada
const kn = { translation: { app_name: "ಉಜಾವನ್ AI", subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಒಡನಾಡಿ", ask_uzhavan: "ಉಜಾವನ್ ಕೇಳಿ", my_crop: "ಬೆಳೆ ಸಲಹೆ", check_disease: "ರೋಗ ತಪಾಸಣೆ", weather: "ಹವಾಮಾನ", market_price: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ", sell_crop: "ಬೆಳೆ ಮಾರಿ", my_orders: "ನನ್ನ ಆದೇಶಗಳು", schemes: "ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ", tap_and_speak: "ಟ್ಯಾಪ್ ಮಾಡಿ ಮಾತನಾಡಿ", ask_anything: "ಕೃಷಿಯ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ", listening: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...", thinking: "ಉಜಾವನ್ AI ಯೋಚಿಸುತ್ತಿದೆ...", home: "ಮುಖಪುಟ", ask: "ಕೇಳಿ", crops: "ಬೆಳೆಗಳು", bazzar: "ಮಾರುಕಟ್ಟೆ", profile: "ಪ್ರೊಫೈಲ್", profile_title: "ನನ್ನ ಪ್ರೊಫೈಲ್", logout: "ಲಾಗ್ ಔಟ್", phone_number: "ಫೋನ್ ಸಂಖ್ಯೆ", location: "ಸ್ಥಳ", land_area: "ಭೂಮಿ ವಿಸ್ತೀರ್ಣ", crop_type: "ಬೆಳೆ ಪ್ರಕಾರ", soil_type: "ಮಣ್ಣಿನ ಪ್ರಕಾರ", registered: "ನೋಂದಾಯಿತ ದಿನಾಂಕ", call_history: "ಕರೆ ಇತಿಹಾಸ", view_consultations: "ಹಿಂದಿನ ತಜ್ಞರ ಸಮಾಲೋಚನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ", edit_details: "ಫಾರ್ಮ್ ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ", save_changes: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ", saved_successfully: "ಪ್ರೊಫೈಲ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!" } };

// Malayalam
const ml = { translation: { app_name: "ഉഴവൻ AI", subtitle: "നിങ്ങളുടെ കാർഷിക സഹായി", ask_uzhavan: "ഉഴവനോട് ചോദിക്കുക", my_crop: "വിള ഉപദേശം", check_disease: "രോഗം പരിശോധിക്കുക", weather: "കാലാവസ്ഥ", market_price: "വിപണി വില", sell_crop: "വിള വിൽക്കുക", my_orders: "എന്റെ ഓർഡറുകൾ", schemes: "കിസാൻ ഹെൽപ്പ് ലൈൻ", tap_and_speak: "ടാപ്പ് ചെയ്ത് സംസാരിക്കുക", ask_anything: "കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കുക", listening: "കേൾക്കുന്നു...", thinking: "ഉഴവൻ AI ചിന്തിക്കുന്നു...", home: "ഹോം", ask: "ചോദിക്കുക", crops: "വിളകൾ", bazzar: "മാർക്കറ്റ്", profile: "പ്രൊഫൈൽ", profile_title: "എന്റെ പ്രൊഫൈൽ", logout: "ലോഗ് ഔട്ട്", phone_number: "ഫോൺ നമ്പർ", location: "സ്ഥലം", land_area: "ഭൂമിയുടെ വിസ്തീർണ്ണം", crop_type: "വിളയുടെ തരം", soil_type: "മണ്ണിന്റെ തരം", registered: "രജിസ്റ്റർ ചെയ്ത തീയതി", call_history: "കോൾ ചരിത്രം", view_consultations: "കഴിഞ്ഞ വിദഗ്ദ്ധ കൂടിയാലോചനകൾ കാണുക", edit_details: "ഫാം വിശദാംശങ്ങൾ എഡിറ്റ് ചെയ്യുക", save_changes: "മാറ്റങ്ങൾ സംരക്ഷിക്കുക", saved_successfully: "പ്രൊഫൈൽ വിജയകരമായി അപ്‌ഡേറ്റ് ചെയ്‌തു!" } };

// Marathi
const mr = { translation: { app_name: "उझवण AI", subtitle: "तुमचा शेती सोबती", ask_uzhavan: "उझवणला विचारा", my_crop: "पीक सल्ला", check_disease: "रोग तपासा", weather: "हवामान", market_price: "बाजारभाव", sell_crop: "पीक विका", my_orders: "माझे आदेश", schemes: "किसान हेल्पलाइन", tap_and_speak: "टॅप करा आणि बोला", ask_anything: "शेतीबद्दल काहीही विचारा", listening: "ऐकत आहे...", thinking: "उझवण AI विचार करत आहे...", home: "होम", ask: "विचारा", crops: "पिके", bazzar: "बाजार", profile: "प्रोफाइल", profile_title: "माझे प्रोफाइल", logout: "लॉग आउट", phone_number: "फोन नंबर", location: "ठिकाण", land_area: "जमिनीचे क्षेत्रफळ", crop_type: "पिकाचा प्रकार", soil_type: "मातीचा प्रकार", registered: "नोंदणीकृत तारीख", call_history: "कॉल इतिहास", view_consultations: "मागील तज्ञ सल्लामसलत पहा", edit_details: "शेत तपशील संपादित करा", save_changes: "बदल जतन करा", saved_successfully: "प्रोफाइल यशस्वीरित्या अद्यतनित केले!" } };

// Bengali
const bn = { translation: { app_name: "উঝাভান AI", subtitle: "আপনার কৃষি সঙ্গী", ask_uzhavan: "উঝাভানকে জিজ্ঞাসা করুন", my_crop: "ফসল পরামর্শ", check_disease: "রোগ পরীক্ষা", weather: "আবহাওয়া", market_price: "বাজার দর", sell_crop: "ফসল বিক্রি করুন", my_orders: "আমার অর্ডার", schemes: "কিষাণ হেল্পলাইন", tap_and_speak: "ট্যাপ করুন এবং বলুন", ask_anything: "কৃষি সম্পর্কে যে কোনও কিছু জিজ্ঞাসা করুন", listening: "শুনছি...", thinking: "উঝাভান AI ভাবছে...", home: "হোম", ask: "জিজ্ঞাসা করুন", crops: "ফসল", bazzar: "বাজার", profile: "প্রোফাইল", profile_title: "আমার প্রোফাইল", logout: "লগ আউট", phone_number: "ফোন নম্বর", location: "অবস্থান", land_area: "জমির আয়তন", crop_type: "ফসলের ধরন", soil_type: "মাটির ধরন", registered: "নিবন্ধিত তারিখ", call_history: "কল ইতিহাস", view_consultations: "অতীত বিশেষজ্ঞ পরামর্শ দেখুন", edit_details: "খামার বিবরণ সম্পাদনা করুন", save_changes: "পরিবর্তনগুলি সংরক্ষণ করুন", saved_successfully: "প্রোফাইল সফলভাবে আপডেট করা হয়েছে!" } };

const resources = { en, ta, hi, te, kn, ml, mr, bn };

// Use localized language from localStorage or default to English
const savedLanguage = localStorage.getItem('uzhavan_lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
