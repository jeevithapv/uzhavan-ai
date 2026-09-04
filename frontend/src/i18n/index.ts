import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English
const en = { translation: { app_name: "UZHAVAN AI", subtitle: "Your farming companion", ask_uzhavan: "Ask Uzhavan", my_crop: "Crop Advice", check_disease: "Disease Scanner", weather: "Weather", market_price: "Market Insights", sell_crop: "Sell Crop", my_orders: "My Orders", schemes: "Kisan Helpline", tap_and_speak: "TAP & SPEAK", ask_anything: "Ask me anything about farming", listening: "Listening...", thinking: "Uzhavan AI is thinking...", home: "Home", ask: "Ask AI", crops: "Crops", bazzar: "Market", profile: "Profile" } };

// Tamil
const ta = { translation: { app_name: "உழவன் AI", subtitle: "உங்கள் விவசாய நண்பன்", ask_uzhavan: "உழவனிடம் கேள்", my_crop: "பயிர் ஆலோசனை", check_disease: "நோயை சரிபார்க்க", weather: "வானிலை", market_price: "சந்தை விலை", sell_crop: "பயிர் விற்பனை", my_orders: "என் ஆர்டர்கள்", schemes: "உழவர் உதவி", tap_and_speak: "தட்டி பேசுங்கள்", ask_anything: "விவசாயம் பற்றி ஏதேனும் கேளுங்கள்", listening: "கேட்கிறது...", thinking: "உழவன் AI சிந்திக்கிறது...", home: "முகப்பு", ask: "கேள்", crops: "பயிர்கள்", bazzar: "சந்தை", profile: "சுயவிவரம்" } };

// Hindi
const hi = { translation: { app_name: "उज़हावन AI", subtitle: "आपका कृषि साथी", ask_uzhavan: "उज़हावन से पूछें", my_crop: "फसल सलाह", check_disease: "रोग जांच", weather: "मौसम", market_price: "बाजार भाव", sell_crop: "फसल बेचें", my_orders: "मेरे आदेश", schemes: "किसान हेल्पलाइन", tap_and_speak: "टैप करें और बोलें", ask_anything: "खेती के बारे में कुछ भी पूछें", listening: "सुन रहा हूँ...", thinking: "उज़हावन AI सोच रहा है...", home: "होम", ask: "पूछें", crops: "फसलें", bazzar: "बाज़ार", profile: "प्रोफ़ाइल" } };

// Telugu
const te = { translation: { app_name: "ఉజావన్ AI", subtitle: "మీ వ్యవసాయ సహచరుడు", ask_uzhavan: "ఉజావన్ అడగండి", my_crop: "పంట సలహా", check_disease: "వ్యాధి తనిఖీ", weather: "వాతావరణం", market_price: "మార్కెట్ ధరలు", sell_crop: "పంట అమ్మండి", my_orders: "నా ఆర్డర్‌లు", schemes: "కిసాన్ హెల్ప్‌లైన్", tap_and_speak: "నొక్కండి మరియు మాట్లాడండి", ask_anything: "వ్యవసాయం గురించి ఏదైనా అడగండి", listening: "వింటున్నాను...", thinking: "ఉజావన్ AI ఆలోచిస్తోంది...", home: "హోమ్", ask: "అడగండి", crops: "పంటలు", bazzar: "మార్కెట్", profile: "ప్రొఫైల్" } };

// Kannada
const kn = { translation: { app_name: "ಉಜಾವನ್ AI", subtitle: "ನಿಮ್ಮ ಕೃಷಿ ಒಡನಾಡಿ", ask_uzhavan: "ಉಜಾವನ್ ಕೇಳಿ", my_crop: "ಬೆಳೆ ಸಲಹೆ", check_disease: "ರೋಗ ತಪಾಸಣೆ", weather: "ಹವಾಮಾನ", market_price: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ", sell_crop: "ಬೆಳೆ ಮಾರಿ", my_orders: "ನನ್ನ ಆದೇಶಗಳು", schemes: "ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ", tap_and_speak: "ಟ್ಯಾಪ್ ಮಾಡಿ ಮಾತನಾಡಿ", ask_anything: "ಕೃಷಿಯ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ", listening: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...", thinking: "ಉಜಾವನ್ AI ಯೋಚಿಸುತ್ತಿದೆ...", home: "ಮುಖಪುಟ", ask: "ಕೇಳಿ", crops: "ಬೆಳೆಗಳು", bazzar: "ಮಾರುಕಟ್ಟೆ", profile: "ಪ್ರೊಫೈಲ್" } };

// Malayalam
const ml = { translation: { app_name: "ഉഴവൻ AI", subtitle: "നിങ്ങളുടെ കാർഷിക സഹായി", ask_uzhavan: "ഉഴവനോട് ചോദിക്കുക", my_crop: "വിള ഉപദേശം", check_disease: "രോഗം പരിശോധിക്കുക", weather: "കാലാവസ്ഥ", market_price: "വിപണി വില", sell_crop: "വിള വിൽക്കുക", my_orders: "എന്റെ ഓർഡറുകൾ", schemes: "കിസാൻ ഹെൽപ്പ് ലൈൻ", tap_and_speak: "ടാപ്പ് ചെയ്ത് സംസാരിക്കുക", ask_anything: "കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കുക", listening: "കേൾക്കുന്നു...", thinking: "ഉഴവൻ AI ചിന്തിക്കുന്നു...", home: "ഹോം", ask: "ചോദിക്കുക", crops: "വിളകൾ", bazzar: "മാർക്കറ്റ്", profile: "പ്രൊഫൈൽ" } };

// Marathi
const mr = { translation: { app_name: "उझवण AI", subtitle: "तुमचा शेती सोबती", ask_uzhavan: "उझवणला विचारा", my_crop: "पीक सल्ला", check_disease: "रोग तपासा", weather: "हवामान", market_price: "बाजारभाव", sell_crop: "पीक विका", my_orders: "माझे आदेश", schemes: "किसान हेल्पलाइन", tap_and_speak: "टॅप करा आणि बोला", ask_anything: "शेतीबद्दल काहीही विचारा", listening: "ऐकत आहे...", thinking: "उझवण AI विचार करत आहे...", home: "होम", ask: "विचारा", crops: "पिके", bazzar: "बाजार", profile: "प्रोफाइल" } };

// Bengali
const bn = { translation: { app_name: "উঝাভান AI", subtitle: "আপনার কৃষি সঙ্গী", ask_uzhavan: "উঝাভানকে জিজ্ঞাসা করুন", my_crop: "ফসল পরামর্শ", check_disease: "রোগ পরীক্ষা", weather: "আবহাওয়া", market_price: "বাজার দর", sell_crop: "ফসল বিক্রি করুন", my_orders: "আমার অর্ডার", schemes: "কিষাণ হেল্পলাইন", tap_and_speak: "ট্যাপ করুন এবং বলুন", ask_anything: "কৃষি সম্পর্কে যে কোনও কিছু জিজ্ঞাসা করুন", listening: "শুনছি...", thinking: "উঝাভান AI ভাবছে...", home: "হোম", ask: "জিজ্ঞাসা করুন", crops: "ফসল", bazzar: "বাজার", profile: "প্রোফাইল" } };

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
