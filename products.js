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
  { name: 'חליפה שחורה עם צעיף משי', category: 'sets', colors: ['שחור'], image: 'images/catalog/01.jpg' },
  { name: 'חליפה כפולת רכיסה בשמנת', category: 'sets', colors: ['שמנת'], image: 'images/catalog/04.jpg' },
  { name: 'סט קפוצ׳ון ומכנס שחור', category: 'sets', colors: ['שחור'], image: 'images/catalog/05.jpg' },
  { name: 'סט קפוצ׳ון ומכנס גרפיט', category: 'sets', colors: ['גרפיט'], image: 'images/catalog/06.jpg' },
  { name: 'לוק שחור – סריג V ומכנס רחב', category: 'sets', colors: ['שחור'], image: 'images/catalog/17.jpg' },

  // חולצות
  { name: 'חולצת פשתן שמנת ומכנס תואם', category: 'shirts', colors: ['שמנת'], image: 'images/catalog/49.jpg' },
  { name: 'חולצה שחורה מכופתרת', category: 'shirts', colors: ['שחור'], image: 'images/catalog/50.jpg' },
  { name: 'חולצה לבנה ומכנס זית', category: 'shirts', colors: ['לבן'], image: 'images/catalog/18.jpg' },
  { name: 'חולצת פשתן לבנה וברמודה ג׳ינס', category: 'shirts', colors: ['לבן'], image: 'images/catalog/39.jpg' },
  { name: 'חולצת פולו לבנה ומכנס חום', category: 'shirts', colors: ['לבן'], image: 'images/catalog/38.jpg' },
  { name: 'חולצה לבנה בצווארון V', category: 'shirts', colors: ['לבן'], image: 'images/catalog/42.jpg' },
  { name: 'סריג לבן ומכנס בז׳', category: 'shirts', colors: ['לבן'], image: 'images/catalog/24.jpg' },

  // טישרטים
  { name: 'טישרטים MBAR STUDIO – חום, שחור, לבן', category: 'tees', colors: ['חום', 'שחור', 'לבן'], image: 'images/catalog/22.jpg' },
  { name: 'טישרט PARIS שחור', category: 'tees', colors: ['שחור'], image: 'images/catalog/40.jpg' },
  { name: 'טישרט PARIS לבן', category: 'tees', colors: ['לבן'], image: 'images/catalog/44.jpg' },
  { name: 'טישרט PARIS ורוד', category: 'tees', colors: ['ורוד'], image: 'images/catalog/46.jpg' },
  { name: 'טישרט MALIBU לבן', category: 'tees', colors: ['לבן'], image: 'images/catalog/41.jpg' },
  { name: 'טישרט RICHES שחור', category: 'tees', colors: ['שחור'], image: 'images/catalog/45.jpg' },
  { name: 'טישרט לבן אוברסייז', category: 'tees', colors: ['לבן'], image: 'images/catalog/37.jpg' },
  { name: 'טישרט זית אוברסייז', category: 'tees', colors: ['זית'], image: 'images/catalog/43.jpg' },
  { name: 'טישרט לבן וברמודה ג׳ינס בהירה', category: 'tees', colors: ['לבן'], image: 'images/catalog/47.jpg' },
  { name: 'טישרט לבן עם הדפס', category: 'tees', colors: ['לבן'], image: 'images/catalog/48.jpg' },

  // מכנסיים וג׳ינסים
  { name: 'ג׳ינסים – לבן, קרעים, שחור', category: 'pants', colors: ['לבן', 'שחור', 'ג׳ינס'], image: 'images/catalog/21.jpg' },
  { name: 'מכנסי פשתן – חום ושחור', category: 'pants', colors: ['חום', 'שחור'], image: 'images/catalog/23.jpg' },

  // נעליים
  { name: 'סניקרס לבן-טאופ', category: 'shoes', colors: ['לבן-טאופ'], image: 'images/catalog/07.jpg' },
  { name: 'סניקרס שחור עם ברק', category: 'shoes', colors: ['שחור'], image: 'images/catalog/08.jpg' },
  { name: 'סניקרס לבן וזמש חום', category: 'shoes', colors: ['לבן'], image: 'images/catalog/09.jpg' },
  { name: 'סניקרס שחור-לבן', category: 'shoes', colors: ['שחור-לבן'], image: 'images/catalog/10.jpg' },
  { name: 'סניקרס קנבס שחור', category: 'shoes', colors: ['שחור'], image: 'images/catalog/11.jpg' },
  { name: 'סניקרס קנבס לבן', category: 'shoes', colors: ['לבן'], image: 'images/catalog/12.jpg' },
  { name: 'סניקרס לבן בשכבות', category: 'shoes', colors: ['לבן'], image: 'images/catalog/13.jpg' },
  { name: 'סניקרס זברה שחור-לבן', category: 'shoes', colors: ['שחור-לבן'], image: 'images/catalog/14.jpg' },
  { name: 'סניקרס שחור-אפור', category: 'shoes', colors: ['שחור-אפור'], image: 'images/catalog/15.jpg' },
  { name: 'סניקרס קנבס חום כהה', category: 'shoes', colors: ['חום כהה'], image: 'images/catalog/16.jpg' },
  { name: 'סניקרס קנבס שחור', category: 'shoes', colors: ['שחור'], image: 'images/catalog/20.jpg' },
  { name: 'סניקרס שחור על סוליה שחורה', category: 'shoes', colors: ['שחור'], image: 'images/catalog/19.jpg' },
  { name: 'סניקרס זמש שחור', category: 'shoes', colors: ['שחור'], image: 'images/catalog/25.jpg' },
  { name: 'סניקרס זמש שחור חלק', category: 'shoes', colors: ['שחור'], image: 'images/catalog/30.jpg' },
  { name: 'סניקרס זמש חום', category: 'shoes', colors: ['חום'], image: 'images/catalog/27.jpg' },
  { name: 'סניקרס עור לבן', category: 'shoes', colors: ['לבן'], image: 'images/catalog/26.jpg' },
  { name: 'סניקרס ג׳ינס', category: 'shoes', colors: ['ג׳ינס'], image: 'images/catalog/28.jpg' },
  { name: 'סניקרס אפור מעוטר', category: 'shoes', colors: ['אפור'], image: 'images/catalog/29.jpg' },
  { name: 'סניקרס עור שמנת', category: 'shoes', colors: ['שמנת'], image: 'images/catalog/31.jpg' },
  { name: 'סניקרס מחורר בז׳', category: 'shoes', colors: ['בז׳'], image: 'images/catalog/32.jpg' },
  { name: 'סניקרס זמש טאופ', category: 'shoes', colors: ['טאופ'], image: 'images/catalog/33.jpg' }
];

// מידות לפי קטגוריה. אפשר לדרוס לפריט בודד בשדה sizes.
const SIZES = {
  sets: ['S', 'M', 'L', 'XL', 'XXL'],
  shirts: ['S', 'M', 'L', 'XL', 'XXL'],
  tees: ['S', 'M', 'L', 'XL', 'XXL'],
  pants: ['30', '32', '34', '36', '38'],
  shoes: ['40', '41', '42', '43', '44', '45']
};

// טבלאות מידות כלליות – יש לאמת מול הדגמים בפועל לפני עלייה לאוויר.
const SIZE_CHARTS = {
  top: { head: ['מידה', 'היקף חזה (ס״מ)', 'אורך (ס״מ)'], rows: [['S', '96–101', '70'], ['M', '102–107', '72'], ['L', '108–113', '74'], ['XL', '114–119', '76'], ['XXL', '120–125', '78']] },
  pants: { head: ['מידה', 'היקף מותניים (ס״מ)', 'מקבילה באותיות'], rows: [['30', '76', 'S'], ['32', '81', 'M'], ['34', '86', 'L'], ['36', '91', 'XL'], ['38', '96', 'XXL']] },
  shoes: { head: ['מידה (EU)', 'אורך כף רגל (ס״מ)'], rows: [['40', '25.5'], ['41', '26.3'], ['42', '27'], ['43', '27.8'], ['44', '28.5'], ['45', '29.3']] }
};
const CHART_BY_CATEGORY = { sets: 'top', shirts: 'top', tees: 'top', pants: 'pants', shoes: 'shoes' };

// גוון להצגה לכל שם צבע
const COLOR_SWATCHES = {
  'שחור': '#111111', 'לבן': '#f5f5f4', 'שמנת': '#e8dcc4', 'גרפיט': '#44403c', 'חום': '#6b4423', 'חום כהה': '#3b2616',
  'זית': '#6b6b3a', 'ורוד': '#f4b6c2', 'טאופ': '#a89a8a', 'בז׳': '#d8c3a5', 'אפור': '#9ca3af', 'ג׳ינס': '#5b7da3',
  'לבן-טאופ': 'linear-gradient(135deg,#f5f5f4 50%,#a89a8a 50%)', 'שחור-לבן': 'linear-gradient(135deg,#111111 50%,#f5f5f4 50%)',
  'שחור-אפור': 'linear-gradient(135deg,#111111 50%,#9ca3af 50%)'
};
