// קטלוג הבגדים – כדי להוסיף פריט, מוסיפים שורה לרשימה.
// category: אחד מהמפתחות ב-CATEGORIES. price: אופציונלי (למשל "₪199"). isNew: true מציג תגית NEW.
// התמונות ב-images/catalog/ חתוכות מהסנטר ולמטה; המקוריות נמצאות ב-photos/.
const CATEGORIES = {
  sets: 'חליפות וסטים',
  shirts: 'חולצות',
  tees: 'טישרטים',
  pants: 'מכנסיים וג׳ינסים',
  shoes: 'נעליים'
};

const PRODUCTS = [
  // חליפות וסטים
  { name: 'חליפה שחורה עם צעיף משי', category: 'sets', image: 'images/catalog/01.jpg' },
  { name: 'חליפה כפולת רכיסה בשמנת', category: 'sets', image: 'images/catalog/04.jpg' },
  { name: 'סט קפוצ׳ון ומכנס שחור', category: 'sets', image: 'images/catalog/05.jpg' },
  { name: 'סט קפוצ׳ון ומכנס גרפיט', category: 'sets', image: 'images/catalog/06.jpg' },
  { name: 'לוק שחור – סריג V ומכנס רחב', category: 'sets', image: 'images/catalog/17.jpg' },

  // חולצות
  { name: 'חולצת פשתן שמנת ומכנס תואם', category: 'shirts', image: 'images/catalog/49.jpg' },
  { name: 'חולצה שחורה מכופתרת', category: 'shirts', image: 'images/catalog/50.jpg' },
  { name: 'חולצה לבנה ומכנס זית', category: 'shirts', image: 'images/catalog/18.jpg' },
  { name: 'חולצת פשתן לבנה וברמודה ג׳ינס', category: 'shirts', image: 'images/catalog/39.jpg' },
  { name: 'חולצת פולו לבנה ומכנס חום', category: 'shirts', image: 'images/catalog/38.jpg' },
  { name: 'חולצה לבנה בצווארון V', category: 'shirts', image: 'images/catalog/42.jpg' },
  { name: 'סריג לבן ומכנס בז׳', category: 'shirts', image: 'images/catalog/24.jpg' },

  // טישרטים
  { name: 'טישרטים MBAR STUDIO – חום, שחור, לבן', category: 'tees', image: 'images/catalog/22.jpg' },
  { name: 'טישרט PARIS שחור', category: 'tees', image: 'images/catalog/40.jpg' },
  { name: 'טישרט PARIS לבן', category: 'tees', image: 'images/catalog/44.jpg' },
  { name: 'טישרט PARIS ורוד', category: 'tees', image: 'images/catalog/46.jpg' },
  { name: 'טישרט MALIBU לבן', category: 'tees', image: 'images/catalog/41.jpg' },
  { name: 'טישרט RICHES שחור', category: 'tees', image: 'images/catalog/45.jpg' },
  { name: 'טישרט לבן אוברסייז', category: 'tees', image: 'images/catalog/37.jpg' },
  { name: 'טישרט זית אוברסייז', category: 'tees', image: 'images/catalog/43.jpg' },
  { name: 'טישרט לבן וברמודה ג׳ינס בהירה', category: 'tees', image: 'images/catalog/47.jpg' },
  { name: 'טישרט לבן עם הדפס', category: 'tees', image: 'images/catalog/48.jpg' },

  // מכנסיים וג׳ינסים
  { name: 'ג׳ינסים – לבן, קרעים, שחור', category: 'pants', image: 'images/catalog/21.jpg' },
  { name: 'מכנסי פשתן – חום ושחור', category: 'pants', image: 'images/catalog/23.jpg' },

  // נעליים
  { name: 'סניקרס לבן-טאופ', category: 'shoes', image: 'images/catalog/07.jpg' },
  { name: 'סניקרס שחור עם ברק', category: 'shoes', image: 'images/catalog/08.jpg' },
  { name: 'סניקרס לבן וזמש חום', category: 'shoes', image: 'images/catalog/09.jpg' },
  { name: 'סניקרס שחור-לבן', category: 'shoes', image: 'images/catalog/10.jpg' },
  { name: 'סניקרס קנבס שחור', category: 'shoes', image: 'images/catalog/11.jpg' },
  { name: 'סניקרס קנבס לבן', category: 'shoes', image: 'images/catalog/12.jpg' },
  { name: 'סניקרס לבן בשכבות', category: 'shoes', image: 'images/catalog/13.jpg' },
  { name: 'סניקרס זברה שחור-לבן', category: 'shoes', image: 'images/catalog/14.jpg' },
  { name: 'סניקרס שחור-אפור', category: 'shoes', image: 'images/catalog/15.jpg' },
  { name: 'סניקרס קנבס חום כהה', category: 'shoes', image: 'images/catalog/16.jpg' },
  { name: 'סניקרס קנבס שחור', category: 'shoes', image: 'images/catalog/20.jpg' },
  { name: 'סניקרס שחור על סוליה שחורה', category: 'shoes', image: 'images/catalog/19.jpg' },
  { name: 'סניקרס זמש שחור', category: 'shoes', image: 'images/catalog/25.jpg' },
  { name: 'סניקרס זמש שחור חלק', category: 'shoes', image: 'images/catalog/30.jpg' },
  { name: 'סניקרס זמש חום', category: 'shoes', image: 'images/catalog/27.jpg' },
  { name: 'סניקרס עור לבן', category: 'shoes', image: 'images/catalog/26.jpg' },
  { name: 'סניקרס ג׳ינס', category: 'shoes', image: 'images/catalog/28.jpg' },
  { name: 'סניקרס אפור מעוטר', category: 'shoes', image: 'images/catalog/29.jpg' },
  { name: 'סניקרס עור שמנת', category: 'shoes', image: 'images/catalog/31.jpg' },
  { name: 'סניקרס מחורר בז׳', category: 'shoes', image: 'images/catalog/32.jpg' },
  { name: 'סניקרס זמש טאופ', category: 'shoes', image: 'images/catalog/33.jpg' }
];
