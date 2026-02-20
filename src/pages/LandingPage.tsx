import { Phone, DollarSign, Clock, MessageSquare, Users, Zap, BarChart3, Shield, ChevronLeft, Star, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans" dir="rtl">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Phone className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">מערכת ניהול לידים</span>
          </div>
          <div className="hidden items-center gap-6 text-sm md:flex">
            <a href="#how" className="text-muted-foreground hover:text-foreground transition-colors">איך זה עובד</a>
            <a href="#results" className="text-muted-foreground hover:text-foreground transition-colors">תוצאות</a>
            <a href="#why" className="text-muted-foreground hover:text-foreground transition-colors">למה אנחנו</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block">
              כניסה למערכת
            </a>
            <a
              href="#cta"
              className="rounded-full gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              התחל עכשיו
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-medium text-primary">
            <Star className="h-3 w-3" />
            מערכת אוטומטית להחזרת לקוחות
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
            כמה טיפולים איבדת החודש?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            המערכת שמחזירה לקוחות אבודים אוטומטית
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#cta"
              className="rounded-full gradient-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-lg transition-all hover:opacity-90"
            >
              לתיאום הדגמה →
            </a>
            <a
              href="#how"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3 text-base font-semibold text-foreground shadow-sm transition-all hover:bg-muted"
            >
              <Zap className="h-4 w-4 text-warning" />
              כל לקוח שחוזר = הכנסה נוספת
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points - כמה כסף אתם מאבדים */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="mb-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
            ⚠️ הבעיה שלך
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          כמה כסף אתם מאבדים?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
          רובם של הלקוחות האבודים אפשר להחזיר — אוטומטית
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: DollarSign,
              title: "הכנסות אבודות",
              desc: "לקוחות שלא חוזרים = אלפי שקלים שנעלמים כל חודש",
              color: "text-warning",
              bg: "bg-warning/10",
            },
            {
              icon: Clock,
              title: "חריגים שהתבטלו",
              desc: "לקוחות שביטלו או לא הגיעו — בלי מעקב אוטומטי",
              color: "text-destructive",
              bg: "bg-destructive/10",
            },
            {
              icon: MessageSquare,
              title: '"אני אחשוב על זה"',
              desc: 'הלקוחות שאמרו "אני אחזור" — ונעלמו. עם מעקב אוטומטי הם חוזרים',
              color: "text-info",
              bg: "bg-info/10",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all hover:shadow-card-hover"
            >
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works - איך המערכת עובדת */}
      <section id="how" className="bg-muted/50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              🔧 תהליך פשוט
            </span>
          </div>
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            איך המערכת עובדת?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
            4 שלבים פשוטים להחזרת לקוחות אבודים
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: 1, title: "חיבור ראשוני", desc: "מקבל את הלידים ומתחיל לעקוב", icon: Phone },
              { num: 2, title: "סינון AI אוטומטי", desc: "המערכת מפלטרת ומקטלגת אוטומטית", icon: Zap },
              { num: 3, title: "לקוח שנמה", desc: "זיהוי אוטומטי של לקוחות שלא חוזרים", icon: Users },
              { num: 4, title: "Dashboard מתקדם", desc: "צפייה בכל הנתונים ו-KPI בזמן אמת", icon: BarChart3 },
            ].map((step) => (
              <div
                key={step.num}
                className="relative rounded-2xl border border-border bg-card p-6 text-center shadow-card"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System in Action - WhatsApp Mockups */}
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <h2 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
          ראו את המערכת בפעולה!
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Old Client */}
          <div className="text-center">
            <h3 className="mb-4 text-lg font-bold text-foreground">לקוח ישן</h3>
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-3xl border-4 border-foreground/10 bg-card shadow-lg">
              <div className="bg-whatsapp px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-whatsapp-foreground/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-whatsapp-foreground" />
                </div>
                <span className="text-sm font-bold text-whatsapp-foreground">מרפאת שיניים</span>
              </div>
              <div className="space-y-2 bg-muted/30 p-4 min-h-[260px]">
                <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-card border border-border p-3 text-right text-xs text-foreground">
                  היי! עברו 3 חודשים מהביקור האחרון שלך 😊
                </div>
                <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-card border border-border p-3 text-right text-xs text-foreground">
                  רצינו לזכור לך שהגיע הזמן לבדיקה תקופתית. יש לנו מבצע מיוחד החודש! 🦷
                </div>
                <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-whatsapp p-3 text-right text-xs text-whatsapp-foreground">
                  אה כן! שכחתי לגמרי. מתי אפשר לקבוע?
                </div>
                <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-card border border-border p-3 text-right text-xs text-foreground">
                  מעולה! אפשר ביום שלישי בשעה 10:00 בוקר. מתאים? ✨
                </div>
                <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-whatsapp p-3 text-right text-xs text-whatsapp-foreground">
                  מושלם! רשמו אותי 👍
                </div>
              </div>
            </div>
          </div>
          {/* New Client */}
          <div className="text-center">
            <h3 className="mb-4 text-lg font-bold text-foreground">לקוח חדש</h3>
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-3xl border-4 border-foreground/10 bg-card shadow-lg">
              <div className="bg-whatsapp px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-whatsapp-foreground/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-whatsapp-foreground" />
                </div>
                <span className="text-sm font-bold text-whatsapp-foreground">מרפאת שיניים</span>
              </div>
              <div className="space-y-2 bg-muted/30 p-4 min-h-[260px]">
                <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-whatsapp p-3 text-right text-xs text-whatsapp-foreground">
                  שלום, אשמח לשמוע על הטיפולים שלכם
                </div>
                <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-card border border-border p-3 text-right text-xs text-foreground">
                  היי! שמחים שפנית אלינו 😊 איזה טיפול מעניין אותך?
                </div>
                <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-whatsapp p-3 text-right text-xs text-whatsapp-foreground">
                  הלבנת שיניים, כמה זה עולה?
                </div>
                <div className="mr-auto max-w-[85%] rounded-xl rounded-bl-sm bg-card border border-border p-3 text-right text-xs text-foreground">
                  חבילת הלבנה פרימיום ₪1,200 כולל 3 טיפולים. רוצה לקבוע ייעוץ חינם? 🌟
                </div>
                <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-whatsapp p-3 text-right text-xs text-whatsapp-foreground">
                  כן! מתי אפשר?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results - תוצאות */}
      <section id="results" className="bg-muted/50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-3 text-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              📊 נתונים אמיתיים
            </span>
          </div>
          <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
            התוצאות מדברות בעד עצמן
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
            מבוסס על נתוני מרפאות אמיתיים בישראל
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                value: "3X",
                label: "מהלכים בהכנסות",
                desc: "לקוחות שחוזרים — מכפילים את ההכנסה השנתית פי 3",
                gradient: "from-pink-400 to-purple-400",
              },
              {
                value: "70%",
                label: "מהלידים החמים נסגרו",
                desc: "המערכת שלנו מזהה לידים חמים ומטפלת בהם בזמן",
                gradient: "from-purple-400 to-blue-400",
              },
              {
                value: "85%",
                label: "מלקוחות הישנים חזרו",
                desc: "עם מעקב אוטומטי, רוב הלקוחות חוזרים לטיפולים",
                gradient: "from-blue-400 to-cyan-400",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-card"
              >
                <div className="gradient-hero rounded-xl p-6 mb-4">
                  <p className="text-4xl font-extrabold text-foreground md:text-5xl">{stat.value}</p>
                </div>
                <h3 className="text-base font-bold text-foreground">{stat.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us - למה לבחור בנו */}
      <section id="why" className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="mb-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-accent-foreground">
            ✨ יתרונות
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold text-foreground md:text-4xl">
          למה לבחור בנו?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-muted-foreground">
          המערכת שלנו נבנתה במיוחד למרפאות בישראל
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            {
              icon: Clock,
              title: "מילוי אוטומטי 24/7",
              desc: "המערכת עובדת מסביב לשעון — שולחת הודעות ומעקבים אוטומטית",
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              icon: Zap,
              title: "הגדלת הכנסות",
              desc: "החזרת לקוחות אבודים מייצרת הכנסות חדשות ללא עלות שיווק נוספת",
              color: "text-accent",
              bg: "bg-accent/10",
            },
            {
              icon: DollarSign,
              title: "חיסכון בזמן וכסף",
              desc: "אין צורך בעובד נוסף — המערכת עושה את העבודה עבורך אוטומטית",
              color: "text-warning",
              bg: "bg-warning/10",
            },
            {
              icon: Shield,
              title: "שירות מקצועי ואישי",
              desc: "ליווי אישי, הדרכה מלאה והתאמה מושלמת למרפאה שלך",
              color: "text-success",
              bg: "bg-success/10",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl gradient-primary px-8 py-14 text-center shadow-lg md:px-16">
          <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-medium text-primary-foreground">
            <CheckCircle className="h-3 w-3" />
            מוכנים להתחיל?
          </div>
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            רוצה לראות כמה טיפולים חזרו אליך?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
            קבע הדגמה וחגלה כמה כסף אתם מאבדים כל חודש
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-10 py-4 text-base font-bold text-foreground shadow-lg transition-all hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
            לתיאום הדגמה
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-8 text-center">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 text-sm text-muted-foreground">
            <span>📧 צור קשר</span>
            <span>📋 תנאי שימוש</span>
            <span>🔒 מדיניות פרטיות</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            © 2025 מערכת ניהול לידים | כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </div>
  );
}
