import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "app_name": "UZHAVAN AI",
      "subtitle": "Your farming companion",
      "ask_uzhavan": "Ask Uzhavan",
      "my_crop": "My Crop",
      "check_disease": "Check Disease",
      "weather": "Weather",
      "market_price": "Market Price",
      "sell_crop": "Sell Crop",
      "my_orders": "My Orders",
      "schemes": "Government Schemes",
      "tap_and_speak": "TAP & SPEAK",
      "ask_anything": "Ask me anything about farming",
      "listening": "Listening...",
      "thinking": "Uzhavan AI is thinking...",
      "home": "Home",
      "ask": "Ask",
      "crops": "Crops",
      "bazzar": "Bazzar",
      "profile": "Profile"
    }
  },
  ta: {
    translation: {
      "app_name": "உழவன் AI",
      "subtitle": "உங்கள் விவசாய நண்பன்",
      "ask_uzhavan": "உழவனிடம் கேள்",
      "my_crop": "என் பயிர்",
      "check_disease": "நோயை சரிபார்க்க",
      "weather": "வானிலை",
      "market_price": "சந்தை விலை",
      "sell_crop": "பயிர் விற்பனை",
      "my_orders": "என் ஆர்டர்கள்",
      "schemes": "அரசு திட்டங்கள்",
      "tap_and_speak": "தட்டி பேசுங்கள்",
      "ask_anything": "விவசாயம் பற்றி ஏதேனும் கேளுங்கள்",
      "listening": "கேட்கிறது...",
      "thinking": "உழவன் AI சிந்திக்கிறது...",
      "home": "முகப்பு",
      "ask": "கேள்",
      "crops": "பயிர்கள்",
      "bazzar": "பஜார்",
      "profile": "சுயவிவரம்"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
