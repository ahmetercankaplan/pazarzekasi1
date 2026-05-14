import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import {
  IconInstagram, IconMeta, IconGoogle, IconLinkedIn,
  IconYouTube, IconTikTok, IconFacebook, IconXTwitter, IconGoogleAds,
} from "./Icons";

const FONTS_URL="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Rajdhani:wght@400;500;600;700&display=swap";
const EASE={expo:"cubic-bezier(0.16,1,0.3,1)",spring:"cubic-bezier(0.34,1.56,0.64,1)",smooth:"cubic-bezier(0.25,0.46,0.45,0.94)"};
const SCRAMBLE_CHARS="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

/* ── BILINGUAL DATA ── */
const ALL_SERVICES={
  tr:[
    {icon:"🔍",num:"01",title:"SEO & Organik Büyüme",desc:"Teknik SEO, içerik stratejisi ve link inşasıyla Google'da üst sıralara çıkıyorsunuz. Kalıcı ve sürdürülebilir organik trafik."},
    {icon:"⚡",num:"02",title:"Google & Meta Reklamları",desc:"Yatırımınızın maksimum geri dönüşünü sağlayan, veri odaklı reklam kampanyaları tasarlıyor ve yönetiyoruz."},
    {icon:"📱",num:"03",title:"Sosyal Medya Yönetimi",desc:"Marka kimliğinizle örtüşen içerikler üreterek sosyal medyada güçlü ve sadık bir topluluk oluşturuyoruz."},
    {icon:"✍️",num:"04",title:"İçerik Pazarlaması",desc:"Hedef kitlenizin sorularını yanıtlayan, dönüşüm sağlayan SEO uyumlu içerikler ve stratejiler üretiyoruz."},
    {icon:"📊",num:"05",title:"Performans Pazarlama",desc:"KPI odaklı kampanya yönetimiyle her bütçeyi en verimli şekilde kullanıyor, ölçülebilir sonuçlar sunuyoruz."},
    {icon:"🌐",num:"06",title:"Web Tasarım & Geliştirme",desc:"Hızlı, modern, SEO uyumlu ve yüksek dönüşüm oranına sahip web siteleri ve e-ticaret platformları kuruyoruz."},
  ],
  en:[
    {icon:"🔍",num:"01",title:"SEO & Organic Growth",desc:"With technical SEO, content strategy and link building, you rise to the top of Google. Permanent and sustainable organic traffic."},
    {icon:"⚡",num:"02",title:"Google & Meta Ads",desc:"We design and manage data-driven ad campaigns that maximize the return on your investment."},
    {icon:"📱",num:"03",title:"Social Media Management",desc:"We create content aligned with your brand identity and build a strong, loyal community on social media."},
    {icon:"✍️",num:"04",title:"Content Marketing",desc:"We produce SEO-friendly content and strategies that answer your audience's questions and drive conversions."},
    {icon:"📊",num:"05",title:"Performance Marketing",desc:"With KPI-focused campaign management, we use every budget most efficiently and deliver measurable results."},
    {icon:"🌐",num:"06",title:"Web Design & Development",desc:"We build fast, modern, SEO-friendly websites and e-commerce platforms with high conversion rates."},
  ],
};
const ALL_WHY={
  tr:[
    {num:"01",title:"Veri Önce Gelir",desc:"Her strateji detaylı pazar araştırması ve rekabet analizi üzerine inşa edilir. Tahmin yok, veri var."},
    {num:"02",title:"Şeffaf Raporlama",desc:"Her ay detaylı performans raporlarıyla nereye gittiğinizi net şekilde görürsünüz."},
    {num:"03",title:"Özel Strateji",desc:"Hazır kalıplar yok. Her müşteri için sektörüne ve hedefine özel strateji geliştiriyoruz."},
    {num:"04",title:"7/24 Destek",desc:"Saat farkı önemsiz. Markanız için her zaman erişilebilir bir ekibiz."},
  ],
  en:[
    {num:"01",title:"Data Comes First",desc:"Every strategy is built on detailed market research and competitive analysis. No guessing, only data."},
    {num:"02",title:"Transparent Reporting",desc:"Monthly detailed performance reports clearly show you where you are and how much you've grown."},
    {num:"03",title:"Custom Strategy",desc:"No ready-made templates. We develop a unique strategy tailored to each client's industry and goals."},
    {num:"04",title:"24/7 Support",desc:"Time zones don't matter. We are always accessible for your brand, wherever you are."},
  ],
};
const ALL_STEPS={
  tr:[
    {num:"01",title:"Analiz & Keşif",desc:"Markanızı, sektörünüzü ve rakiplerinizi derinlemesine analiz ediyoruz."},
    {num:"02",title:"Strateji Geliştirme",desc:"Veriye dayalı, size özel dijital pazarlama yol haritası oluşturuyoruz."},
    {num:"03",title:"Uygulama",desc:"Uzman ekibimizle stratejiyi hızlı ve titiz şekilde hayata geçiriyoruz."},
    {num:"04",title:"Ölçüm & Optimizasyon",desc:"Sürekli analiz ve iyileştirmelerle sonuçlarınızı yukarıya taşıyoruz."},
  ],
  en:[
    {num:"01",title:"Analysis & Discovery",desc:"We deeply analyze your brand, industry, and competitors."},
    {num:"02",title:"Strategy Development",desc:"We create a data-driven, custom digital marketing roadmap for you."},
    {num:"03",title:"Execution",desc:"We execute the strategy quickly and meticulously with our expert team."},
    {num:"04",title:"Measurement & Optimization",desc:"We elevate your results through continuous analysis and improvement."},
  ],
};
const ALL_TESTIMONIALS={
  tr:[
    {initials:"AY",name:"Ayşe Yıldız",role:"CEO · NovaTech Dijital",text:"Pazar Zekası ile çalışmaya başladığımızdan bu yana organik trafiğimiz 8 katına çıktı. Gerçek bir iş ortağı bulduk."},
    {initials:"MK",name:"Mehmet Kaya",role:"Pazarlama Müdürü · BrandPro",text:"Google Ads yönetimimizi devraldıklarında dönüşüm maliyetimiz %60 düştü. Veri odaklı yaklaşımları fark yaratıyor."},
    {initials:"ZD",name:"Zeynep Demir",role:"Kurucu · StyleBoutique",text:"Sosyal medya stratejimizi kökten değiştirdiler. 6 ayda takipçi sayımız 3 kat arttı, satışlarımız rekor kırdı."},
    {initials:"SE",name:"Selin Erdoğan",role:"Kurucu · TatlıDükkanı",text:"Reklam çekimi hizmetlerini aldığımızda içeriklerimizin kalitesi inanılmaz arttı. Müşterilerimizden çok olumlu geri dönüşler alıyoruz."},
    {initials:"BT",name:"Burak Tunç",role:"CEO · TechStart TR",text:"SEO çalışmalarıyla 3 ayda Google'ın ilk sayfasına çıktık. Bu ekibin analitik yaklaşımı gerçekten etkileyici."},
    {initials:"HC",name:"Hande Can",role:"Pazarlama Direktörü · FashionHub",text:"Meta reklam kampanyalarıyla ROAS'ımızı 4 katına çıkardılar. Her kuruşun karşılığını fazlasıyla aldık."},
  ],
  en:[
    {initials:"AY",name:"Ayşe Yıldız",role:"CEO · NovaTech Digital",text:"Since we started working with Pazar Zekası, our organic traffic has grown 8x. We found a true business partner."},
    {initials:"MK",name:"Mehmet Kaya",role:"Marketing Manager · BrandPro",text:"When they took over our Google Ads management, our conversion cost dropped 60%. Their data-driven approach truly makes a difference."},
    {initials:"ZD",name:"Zeynep Demir",role:"Founder · StyleBoutique",text:"They completely transformed our social media strategy. Our followers tripled in 6 months and our sales hit record highs."},
    {initials:"SE",name:"Selin Erdoğan",role:"Founder · TatlıDükkanı",text:"When we got their ad shooting services, the quality of our content increased incredibly. We receive very positive feedback from our customers."},
    {initials:"BT",name:"Burak Tunç",role:"CEO · TechStart TR",text:"With their SEO work, we reached Google's first page in 3 months. This team's analytical approach is truly impressive."},
    {initials:"HC",name:"Hande Can",role:"Marketing Director · FashionHub",text:"They quadrupled our ROAS with Meta ad campaigns. We got more than our money's worth."},
  ],
};
const ALL_STATS={
  tr:[
    {count:120,suffix:"+",label:"mutlu müşteri"},
    {count:6,suffix:"+",label:"yıllık deneyim"},
    {count:98,suffix:"%",label:"müşteri memnuniyeti"},
    {count:30,suffix:"+",label:"marka zirveye taşındı"},
  ],
  en:[
    {count:120,suffix:"+",label:"happy clients"},
    {count:6,suffix:"+",label:"years experience"},
    {count:98,suffix:"%",label:"client satisfaction"},
    {count:30,suffix:"+",label:"brands elevated"},
  ],
};
const ALL_PLATFORMS={
  tr:[
    {name:"Instagram",Icon:IconInstagram,desc:"Görsel pazarlama ve story reklamları"},
    {name:"Meta Ads",Icon:IconMeta,desc:"Hedefli reklam ve retargeting"},
    {name:"Google Ads",Icon:IconGoogleAds,desc:"Arama ve display kampanyaları"},
    {name:"LinkedIn",Icon:IconLinkedIn,desc:"B2B pazarlama ve kurumsal içerik"},
    {name:"YouTube",Icon:IconYouTube,desc:"Video reklam ve kanal büyütme"},
    {name:"TikTok",Icon:IconTikTok,desc:"Viral içerik ve genç kitle erişimi"},
    {name:"Facebook",Icon:IconFacebook,desc:"Topluluk yönetimi ve reklam"},
    {name:"Twitter / X",Icon:IconXTwitter,desc:"Güncel içerik ve marka sesi"},
    {name:"Google SEO",Icon:IconGoogle,desc:"Organik büyüme ve sıralama"},
  ],
  en:[
    {name:"Instagram",Icon:IconInstagram,desc:"Visual marketing and story ads"},
    {name:"Meta Ads",Icon:IconMeta,desc:"Targeted advertising and retargeting"},
    {name:"Google Ads",Icon:IconGoogleAds,desc:"Search and display campaigns"},
    {name:"LinkedIn",Icon:IconLinkedIn,desc:"B2B marketing and corporate content"},
    {name:"YouTube",Icon:IconYouTube,desc:"Video ads and channel growth"},
    {name:"TikTok",Icon:IconTikTok,desc:"Viral content and youth audience"},
    {name:"Facebook",Icon:IconFacebook,desc:"Community management and advertising"},
    {name:"Twitter / X",Icon:IconXTwitter,desc:"Current content and brand voice"},
    {name:"Google SEO",Icon:IconGoogle,desc:"Organic growth and ranking"},
  ],
};

/* ── TRANSLATIONS ── */
const T={
  tr:{
    nav:{services:"Hizmetler",why:"Neden Biz",platforms:"Platformlar",process:"Süreç",testimonials:"Referanslar",vision:"Vizyon",shooting:"Reklam Çekimleri",manifesto:"Manifesto",cta:"Teklif Al"},
    hero:{pre:"DİJİTAL PAZARLAMA AJANSI",line1:"Dijitalde",line2:"Zirveye",line3:"Taşıyoruz.",sub:"Strateji, veri ve yaratıcılığı birleştirerek markanızı doğru kitleye, doğru zamanda ulaştırıyoruz.",btn1:"Ücretsiz Analiz Al →",btn2:"Hizmetleri Keşfet",s1:"Proje",s2:"Memnuniyet",s3:"Deneyim"},
    svcTag:"Hizmetlerimiz",svcTitle:"Her Kanalda\nGüçlü Varlık.",svcSub:"360 derece dijital pazarlama hizmetleriyle markanızın tüm temas noktalarını yönetiyoruz.",
    whyTag:"Neden Biz",whyTitle:"Sıradan Bir\nAjans Değiliz.",whySub:"İçgüdüye değil, veriye güveniyoruz. Her karar, her kampanya kanıtlanmış bir stratejiye dayanıyor.",whyBtn:"Stratejinizi Konuşalım →",
    platTag:"Çalıştığımız Platformlar",platTitle:"Her Platformda\nUzman Ekip.",platSub:"Tüm dijital mecralarda etkin varlık ve kanıtlanmış performans.",
    procTag:"Çalışma Sürecimiz",procTitle:"Nasıl Çalışıyoruz?",procSub:"İlk görüşmeden sürdürülebilir büyümeye dört adımda ulaşıyoruz.",
    testiTag:"Referanslar",testiTitle:"Müşterilerimiz\nNe Diyor?",
    ctaTag:"İletişim",ctaTitle:"Dijitalde Zirveye\nHazır mısınız?",ctaSub:"Ücretsiz marka analizi için hemen iletişime geçin.\n48 saat içinde size özel strateji raporunuzu sunalım.",ctaBtn1:"[ Hemen Başlayalım ] →",ctaBtn2:"📞 Bizi Arayın",
    manifestoTag:"Manifesto",manifestoTitle:"MANİFESTO",
    manifestoText:`Biz Pazar Zekası Dijital Pazarlama Ajansı olarak inanıyoruz ki;\ndijital dünyada başarı, yalnızca görünür olmakla değil, doğru kişiye doğru mesajı ulaştırmakla başlar.\n\nMarkaların en büyük ihtiyacı daha fazla paylaşım değil, daha fazla müşteridir. Bu yüzden biz, her stratejiyi "etkileşim" için değil, "dönüşüm" için tasarlarız. Yani hedefimiz; tıklama değil satış, beğeni değil gerçek müşteri kazandırmaktır.\n\nGünümüz rekabetinde reklam vermek yeterli değildir. Önemli olan; kimin gördüğü, neden gördüğü ve gördükten sonra ne yaptığıdır. Biz bu süreci veriyle analiz eder, stratejiyle yönetir ve kreatifle güçlendiririz.\n\nHer marka bizim için bir projeden daha fazlasıdır. Bir büyüme hikayesidir. Bu yüzden hazır kalıplar yerine, markaya özel yol haritaları oluştururuz. Hedef kitlenin davranışlarını inceler, satın alma psikolojisini çözer ve reklamı buna göre şekillendiririz.\n\nAmacımız nettir: Markaların sadece dijitalde var olmasını değil, dijitalde kazanan taraf olmasını sağlamak.\n\nÇünkü bizce dijital pazarlama bir tahmin işi değil, bir zekâ işidir.`,
    faqTag:"Sıkça Sorulan Sorular",faqTitle:"Aklınızdaki\nSorular",
    faqItems:[
      {q:"Hangi hizmetleri sunuyorsunuz?",a:"Sosyal medya yönetimi, Meta reklam yönetimi, içerik üretimi, kreatif tasarım, marka danışmanlığı, performans pazarlaması ve dijital büyüme stratejileri alanlarında profesyonel hizmet sunuyoruz."},
      {q:"Reklamlar gerçekten müşteri kazandırır mı?",a:"Doğru hedefleme ve profesyonel stratejiyle hazırlanan reklam çalışmaları, markanızın doğru kişilere ulaşmasını sağlayarak müşteri dönüşümünü artırabilir. Amacımız yalnızca görüntülenme değil, gerçek sonuç elde etmektir."},
      {q:"Hangi platformlarda reklam veriyorsunuz?",a:"Instagram, Facebook, WhatsApp, Messenger ve Meta ekosistemindeki diğer platformlarda reklam yönetimi sağlıyoruz."},
      {q:"Küçük işletmeler için de uygun musunuz?",a:"Evet. Yerel işletmelerden büyük markalara kadar her ölçekte işletme için bütçeye uygun dijital pazarlama çözümleri sunuyoruz."},
      {q:"Reklam bütçesini kim belirliyor?",a:"Reklam bütçesi tamamen sizin hedeflerinize ve işletmenizin ihtiyaçlarına göre belirlenir. En verimli sonucu alabilmeniz için size profesyonel yönlendirme sağlıyoruz."},
      {q:"Çalışma süreci nasıl ilerliyor?",a:"Öncelikle markanızı, hedef kitlenizi ve sektörünüzü analiz ediyoruz. Ardından size özel strateji oluşturup reklam ve içerik çalışmalarını başlatıyoruz."},
      {q:"Sonuçlar ne kadar sürede alınır?",a:"Bu süreç sektöre, bütçeye ve hedefe göre değişebilir. Bazı reklam kampanyaları kısa sürede dönüşüm sağlarken, marka bilinirliği çalışmaları daha uzun vadeli büyüme hedefler."},
      {q:"İçerik tasarımlarını siz mi hazırlıyorsunuz?",a:"Evet. Markanıza özel modern, dikkat çekici ve satış odaklı içerik tasarımları hazırlıyoruz."},
      {q:"Sadece reklam yönetimi hizmeti alabilir miyim?",a:"Elbette. İhtiyacınıza göre yalnızca reklam yönetimi veya tam kapsamlı dijital pazarlama hizmeti sunabiliyoruz."},
      {q:"Neden Pazar Zekası Dijital Pazarlama Ajansı?",a:"Çünkü biz yalnızca reklam yayınlamıyoruz. Hedef kitlenizi analiz eden, satış odaklı stratejiler geliştiren ve markanızın büyümesine odaklanan profesyonel çözümler sunuyoruz."},
    ],
    footer:{desc:"Veriye dayalı dijital pazarlama stratejileriyle markanızı büyütüyor, rakiplerinizin önüne geçiriyoruz.",h1:"Hizmetler",h2:"Şirket",h3:"İletişim",links1:["SEO","Google Ads","Sosyal Medya","İçerik","Web Tasarım"],links2:["Hakkımızda","Ekibimiz","Blog","Kariyer"],copy:"© 2025 PAZAR ZEKASI — TÜM HAKLARI SAKLIDIR",legal:"GİZLİLİK · KOŞULLAR"},
  },
  en:{
    nav:{services:"Services",why:"Why Us",platforms:"Platforms",process:"Process",testimonials:"References",vision:"Vision",shooting:"Ad Shoots",manifesto:"Manifesto",cta:"Get Quote"},
    hero:{pre:"DIGITAL MARKETING AGENCY",line1:"Dominating",line2:"Digital",line3:"Markets.",sub:"We combine strategy, data and creativity to reach your audience at the right time with the right message.",btn1:"Get Free Analysis →",btn2:"Explore Services",s1:"Projects",s2:"Satisfaction",s3:"Experience"},
    svcTag:"Our Services",svcTitle:"Strong Presence\nOn Every Channel.",svcSub:"We manage all digital touchpoints of your brand with 360-degree digital marketing services.",
    whyTag:"Why Us",whyTitle:"We're Not\nJust an Agency.",whySub:"We trust data, not intuition. Every decision, every campaign is built on proven strategy.",whyBtn:"Let's Talk Strategy →",
    platTag:"Platforms We Work With",platTitle:"Expert Team\nOn Every Platform.",platSub:"Active presence and proven performance across all digital channels.",
    procTag:"Our Process",procTitle:"How Do We Work?",procSub:"We reach sustainable growth in four steps from the first meeting.",
    testiTag:"References",testiTitle:"What Do Our\nClients Say?",
    ctaTag:"Contact",ctaTitle:"Ready to Win\nIn Digital?",ctaSub:"Contact us for a free brand analysis.\nWe'll deliver your custom strategy report in 48 hours.",ctaBtn1:"[ Let's Get Started ] →",ctaBtn2:"📞 Call Us",
    manifestoTag:"Manifesto",manifestoTitle:"MANIFESTO",
    manifestoText:`At Pazar Zekası Digital Marketing Agency, we believe that;\nsuccess in the digital world begins not just by being visible, but by delivering the right message to the right person.\n\nBrands don't need more shares — they need more customers. That's why we design every strategy not for "engagement," but for "conversion." Our goal is not clicks, but sales. Not likes, but real customer acquisition.\n\nIn today's competitive landscape, simply running ads is not enough. What matters is who sees it, why they see it, and what they do after seeing it. We analyze this process with data, manage it with strategy, and strengthen it with creativity.\n\nEvery brand is more than a project to us. It's a growth story. That's why instead of ready-made templates, we create brand-specific roadmaps. We study your target audience's behavior, decode their buying psychology, and shape the ad accordingly.\n\nOur goal is clear: To ensure brands don't just exist in digital — but win in digital.\n\nBecause to us, digital marketing is not a guessing game — it's a game of intelligence.`,
    faqTag:"FAQ",faqTitle:"Your\nQuestions Answered",
    faqItems:[
      {q:"What services do you offer?",a:"We provide professional services in social media management, Meta ad management, content production, creative design, brand consulting, performance marketing, and digital growth strategies."},
      {q:"Do ads really bring in customers?",a:"Ad campaigns prepared with correct targeting and professional strategy can help your brand reach the right people and increase customer conversion. Our goal is not just impressions, but real results."},
      {q:"Which platforms do you advertise on?",a:"We manage advertising on Instagram, Facebook, WhatsApp, Messenger, and other platforms within the Meta ecosystem."},
      {q:"Are you suitable for small businesses?",a:"Yes. We offer budget-friendly digital marketing solutions for businesses of all sizes, from local businesses to large brands."},
      {q:"Who determines the advertising budget?",a:"The advertising budget is determined entirely based on your goals and business needs. We provide professional guidance to help you achieve the most efficient results."},
      {q:"How does the work process proceed?",a:"First, we analyze your brand, target audience, and industry. Then we create a custom strategy and launch your advertising and content campaigns."},
      {q:"How long does it take to see results?",a:"This process varies depending on the industry, budget, and goal. Some campaigns deliver conversions quickly, while brand awareness efforts target longer-term growth."},
      {q:"Do you create the content designs?",a:"Yes. We prepare modern, eye-catching, and sales-focused content designs tailored to your brand."},
      {q:"Can I get only ad management service?",a:"Of course. Depending on your needs, we can provide just ad management or full-scale digital marketing services."},
      {q:"Why Pazar Zekası Digital Marketing Agency?",a:"Because we don't just run ads. We provide professional solutions that analyze your target audience, develop sales-focused strategies, and focus on growing your brand."},
    ],
    footer:{desc:"We grow your brand with data-driven digital marketing strategies, putting you ahead of the competition.",h1:"Services",h2:"Company",h3:"Contact",links1:["SEO","Google Ads","Social Media","Content","Web Design"],links2:["About","Team","Blog","Careers"],copy:"© 2025 PAZAR ZEKASI — ALL RIGHTS RESERVED",legal:"PRIVACY · TERMS"},
  }
};

/* ── Logo Component ── */
function BrainLogo({size=36}){
  return(
    <img src="/logo.jpeg" alt="Pazar Zekası Logo" style={{width:size,height:size,objectFit:"contain",borderRadius:6}}/>
  );
}


/* ── Flag SVGs ── */
function TRFlag(){
  return(
    <svg width="26" height="18" viewBox="0 0 26 18" xmlns="http://www.w3.org/2000/svg" style={{borderRadius:3,display:"block"}}>
      <rect width="26" height="18" fill="#E30A17"/>
      <circle cx="9.5" cy="9" r="5.2" fill="white"/>
      <circle cx="11.1" cy="9" r="4" fill="#E30A17"/>
      <polygon points="17,6.5 17.59,8.19 19.38,8.23 17.95,9.31 18.47,11.02 17,10 15.53,11.02 16.05,9.31 14.62,8.23 16.41,8.19" fill="white"/>
    </svg>
  );
}
function GBFlag(){
  return(
    <svg width="26" height="18" viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" style={{borderRadius:3,display:"block"}}>
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="white" strokeWidth="8"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="4.5"/>
      <path d="M30,0 L30,40 M0,20 L60,20" stroke="white" strokeWidth="14"/>
      <path d="M30,0 L30,40 M0,20 L60,20" stroke="#C8102E" strokeWidth="8"/>
    </svg>
  );
}

/* ── Quote Modal ── */
function QuoteModal({open,onClose,lang}){
  const isTR = lang==="tr";
  const tx = isTR ? {
    title:"Ücretsiz Teklif Al",
    sub:"Size özel dijital pazarlama stratejinizi 48 saat içinde hazırlayalım.",
    fname:"Ad Soyad *", email:"E-posta *", phone:"Telefon", company:"Şirket Adı",
    services:"İlgilendiğiniz Hizmetler", msg:"Mesajınız",
    submit:"Teklif Gönder →",
    success:"Talebiniz alındı!", successSub:"En kısa sürede sizinle iletişime geçeceğiz.",
    close:"Kapat", errReq:"Ad ve e-posta zorunludur.", errEmail:"Geçerli bir e-posta girin.",
    svcList:["SEO & Organik Büyüme","Google & Meta Reklamları","Sosyal Medya Yönetimi","İçerik Pazarlaması","Performans Pazarlama","Web Tasarım & Geliştirme"],
  } : {
    title:"Get a Free Quote",
    sub:"We will prepare your custom digital marketing strategy within 48 hours.",
    fname:"Full Name *", email:"Email *", phone:"Phone", company:"Company Name",
    services:"Services You Are Interested In", msg:"Your Message",
    submit:"Send Quote Request →",
    success:"Request received!", successSub:"We will get back to you as soon as possible.",
    close:"Close", errReq:"Name and email are required.", errEmail:"Please enter a valid email.",
    svcList:["SEO & Organic Growth","Google & Meta Ads","Social Media Management","Content Marketing","Performance Marketing","Web Design & Development"],
  };
  const[form,setForm]=useState({name:"",email:"",phone:"",company:"",msg:"",svcs:[]});
  const[sent,setSent]=useState(false);
  const[err,setErr]=useState("");
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const toggleSvc=(s)=>setForm(f=>({...f,svcs:f.svcs.includes(s)?f.svcs.filter(x=>x!==s):[...f.svcs,s]}));
  const isValidEmail=(e)=>{return e.indexOf("@")>0 && e.lastIndexOf(".")>e.indexOf("@")+1;};
  const submit=(e)=>{
    e.preventDefault();
    if(!form.name.trim()||!form.email.trim()){setErr(tx.errReq);return;}
    if(!isValidEmail(form.email)){setErr(tx.errEmail);return;}
    setSent(true);setErr("");
  };
  if(!open)return null;
  return(
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        {sent?(
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h3>{tx.success}</h3>
            <p>{tx.successSub}</p>
            <button className="btn-p" onClick={onClose} style={{marginTop:24}}>{tx.close}</button>
          </div>
        ):(
          <>
            <div className="modal-head">
              <h2 className="modal-title">{tx.title}</h2>
              <p className="modal-sub">{tx.sub}</p>
            </div>
            <form className="modal-form" onSubmit={submit} noValidate>
              <div className="mf-row">
                <div className="mf-group"><label>{tx.fname}<input value={form.name} onChange={e=>set("name",e.target.value)} placeholder={isTR?"Ali Yılmaz":"John Smith"}/></label></div>
                <div className="mf-group"><label>{tx.email}<input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="email@example.com"/></label></div>
              </div>
              <div className="mf-row">
                <div className="mf-group"><label>{tx.phone}<input value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+90 5xx xxx xx xx"/></label></div>
                <div className="mf-group"><label>{tx.company}<input value={form.company} onChange={e=>set("company",e.target.value)} placeholder={isTR?"Şirket A.Ş.":"Company Inc."}/></label></div>
              </div>
              <div className="mf-group mf-full">
                <label>{tx.services}</label>
                <div className="mf-checks">
                  {tx.svcList.map(s=>(
                    <button key={s} type="button" className={"mf-chip"+(form.svcs.includes(s)?" sel":"")} onClick={()=>toggleSvc(s)}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="mf-group mf-full"><label>{tx.msg}<textarea value={form.msg} onChange={e=>set("msg",e.target.value)} rows={4} placeholder={isTR?"Projeniz hakkında kısaca bilgi verin...":"Tell us briefly about your project..."}/></label></div>
              {err&&<div className="mf-err">{err}</div>}
              <button type="submit" className="btn-p mf-submit">{tx.submit}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function useFadeIn(delay=0,threshold=0.1){
  const ref=useRef(null);
  const[visible,setVisible]=useState(false);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setTimeout(()=>setVisible(true),delay);io.disconnect();}},{threshold});
    io.observe(el);return()=>io.disconnect();
  },[delay,threshold]);
  return{ref,visible};
}

function useCounter(target,duration=2000){
  const[value,setValue]=useState(0);
  const ref=useRef(null);
  const started=useRef(false);
  const start=useCallback(()=>{
    if(started.current)return;started.current=true;
    let s=null;
    function tick(ts){if(!s)s=ts;const p=Math.min((ts-s)/duration,1);const ease=1-Math.pow(1-p,4);setValue(Math.round(ease*target));if(p<1)requestAnimationFrame(tick);else setValue(target);}
    requestAnimationFrame(tick);
  },[target,duration]);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){start();io.disconnect();}},{threshold:0.6});
    io.observe(el);return()=>io.disconnect();
  },[start]);
  return{value,ref};
}

function useScramble(finalText,delay=400){
  const[display,setDisplay]=useState("");
  const[started,setStarted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setStarted(true),delay);return()=>clearTimeout(t);},[delay]);
  useEffect(()=>{
    if(!started)return;
    let iter=0;const total=finalText.length*3;
    const id=setInterval(()=>{
      setDisplay(finalText.split("").map((ch,i)=>{if(ch===" "||ch==="—")return ch;if(i<iter/3)return ch;return SCRAMBLE_CHARS[Math.floor(Math.random()*SCRAMBLE_CHARS.length)];}).join(""));
      iter++;if(iter>total){setDisplay(finalText);clearInterval(id);}
    },32);
    return()=>clearInterval(id);
  },[started,finalText]);
  return display;
}

function useMagnetic(strength=0.3){
  const ref=useRef(null);
  const handleMove=(e)=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*strength;const y=(e.clientY-r.top-r.height/2)*strength;el.style.transform=`translate(${x}px,${y}px)`;};
  const handleLeave=()=>{if(ref.current)ref.current.style.transform="translate(0,0)";};
  return{ref,onMouseMove:handleMove,onMouseLeave:handleLeave};
}

function use3DCard(maxTilt=14){
  const ref=useRef(null);
  const lightRef=useRef(null);
  const handleMove=(e)=>{
    const card=ref.current;if(!card)return;
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;const y=(e.clientY-r.top)/r.height;
    const tiltX=(y-.5)*-maxTilt;const tiltY=(x-.5)*maxTilt;
    card.style.transform=`perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;
    card.style.boxShadow=`${tiltY*-.8}px ${tiltX*.8}px 32px rgba(0,0,0,.5),0 20px 48px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,${.04+x*.04})`;
    card.style.setProperty("--mx",(x*100).toFixed(1)+"%");card.style.setProperty("--my",(y*100).toFixed(1)+"%");
    if(lightRef.current){lightRef.current.style.opacity="1";lightRef.current.style.background=`radial-gradient(circle at ${(x*100).toFixed(1)}% ${(y*100).toFixed(1)}%,rgba(96,165,250,.1) 0%,transparent 65%)`;}
  };
  const handleLeave=()=>{
    const card=ref.current;if(!card)return;
    card.style.transform="perspective(900px) rotateX(0) rotateY(0) translateZ(0)";card.style.boxShadow="";
    if(lightRef.current)lightRef.current.style.opacity="0";
  };
  return{ref,lightRef,onMouseMove:handleMove,onMouseLeave:handleLeave};
}

function useScrollReveal(){
  const ref=useRef(null);
  const[progress,setProgress]=useState(0);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const update=()=>{const r=el.getBoundingClientRect();const vh=window.innerHeight;setProgress(Math.max(0,Math.min(1,(vh-r.top)/(vh+r.height*.3))));};
    window.addEventListener("scroll",update,{passive:true});update();
    return()=>window.removeEventListener("scroll",update);
  },[]);
  return{ref,progress};
}

/* ── Three.js sphere ── */
function ThreeBackground(){
  const mountRef=useRef(null);
  useEffect(()=>{
    const el=mountRef.current;if(!el)return;
    const W=window.innerWidth,H=window.innerHeight;
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
    renderer.setSize(W,H);renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    el.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(60,W/H,0.1,100);camera.position.z=5;
    const sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(2.8,3),new THREE.MeshBasicMaterial({color:0x1d4ed8,wireframe:true,transparent:true,opacity:0.055}));
    scene.add(sphere);
    const inner=new THREE.Mesh(new THREE.SphereGeometry(2.2,32,32),new THREE.MeshBasicMaterial({color:0x0ea5e9,wireframe:true,transparent:true,opacity:0.025}));
    scene.add(inner);
    const positions=new Float32Array(180*3);
    for(let i=0;i<180;i++){const r=3.5+Math.random()*2,theta=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1);positions[i*3]=r*Math.sin(phi)*Math.cos(theta);positions[i*3+1]=r*Math.sin(phi)*Math.sin(theta);positions[i*3+2]=r*Math.cos(phi);}
    const dotGeo=new THREE.BufferGeometry();dotGeo.setAttribute("position",new THREE.BufferAttribute(positions,3));
    const dots=new THREE.Points(dotGeo,new THREE.PointsMaterial({color:0x60a5fa,size:0.025,transparent:true,opacity:0.45}));
    scene.add(dots);
    let mx=0,my=0;
    const onMove=(e)=>{mx=(e.clientX/window.innerWidth-.5)*.4;my=(e.clientY/window.innerHeight-.5)*.4;};
    window.addEventListener("mousemove",onMove,{passive:true});
    let raf,frame=0;
    function animate(){raf=requestAnimationFrame(animate);frame+=.004;sphere.rotation.y=frame+mx;sphere.rotation.x=frame*.4+my;inner.rotation.y=-frame*.7;inner.rotation.x=frame*.3;dots.rotation.y=frame*.15;renderer.render(scene,camera);}
    animate();
    const onResize=()=>{const nW=window.innerWidth,nH=window.innerHeight;camera.aspect=nW/nH;camera.updateProjectionMatrix();renderer.setSize(nW,nH);};
    window.addEventListener("resize",onResize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("mousemove",onMove);window.removeEventListener("resize",onResize);renderer.dispose();if(el.contains(renderer.domElement))el.removeChild(renderer.domElement);};
  },[]);
  return <div ref={mountRef} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:.8}}/>;
}

/* ── Dot canvas ── */
function DotCanvas(){
  const canvasRef=useRef(null);
  const mouseRef=useRef({x:-9999,y:-9999});
  useEffect(()=>{
    const canvas=canvasRef.current,ctx=canvas.getContext("2d");
    const GAP=20;let W,H,dots=[],particles=[],raf;
    function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;dots=[];for(let y=0;y<H+GAP;y+=GAP)for(let x=0;x<W+GAP;x+=GAP)dots.push({x,y});particles=Array.from({length:60},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:.6+Math.random()*1.4,alpha:.04+Math.random()*.09,pulse:Math.random()*Math.PI*2,pulseSpeed:.005+Math.random()*.012}));}
    function draw(){ctx.clearRect(0,0,W,H);const sy=window.scrollY,GR=115;const{x:dmx,y:dmy}=mouseRef.current;for(const d of dots){const dy=d.y-sy;if(dy<-10||dy>H+10)continue;const dist=Math.hypot(d.x-dmx,dy-(dmy-sy));const ratio=Math.max(0,1-dist/GR);ctx.beginPath();ctx.arc(d.x,dy,ratio>.02?.6+1.9*ratio:.6,0,Math.PI*2);ctx.fillStyle=ratio>.02?`rgba(30,${Math.round(70+90*ratio)},${Math.round(165+80*ratio)},${.06+.45*ratio})`:"rgba(255,255,255,0.048)";ctx.fill();}
    for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.pulse+=p.pulseSpeed;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y-sy,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(96,165,250,${p.alpha*(.7+.3*Math.sin(p.pulse))})`;ctx.fill();}
    const gx=dmx,gy=dmy-sy;if(gx>0){const g=ctx.createRadialGradient(gx,gy,0,gx,gy,200);g.addColorStop(0,"rgba(37,99,235,.05)");g.addColorStop(1,"rgba(37,99,235,0)");ctx.fillStyle=g;ctx.fillRect(gx-200,gy-200,400,400);}
    raf=requestAnimationFrame(draw);}
    const onMove=(e)=>{mouseRef.current={x:e.clientX,y:e.clientY+window.scrollY};};
    resize();draw();window.addEventListener("resize",resize);window.addEventListener("mousemove",onMove,{passive:true});
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);window.removeEventListener("mousemove",onMove);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none"}}/>;
}

/* ── Custom cursor ── */
function CustomCursor(){
  const dotRef=useRef(null),ringRef=useRef(null),trailCanvas=useRef(null),trail=useRef([]);
  const pos=useRef({mx:0,my:0,rx:0,ry:0});
  useEffect(()=>{
    if(window.matchMedia("(hover:none),(pointer:coarse)").matches)return;
    const dot=dotRef.current,ring=ringRef.current,tc=trailCanvas.current;
    dot.style.display="block";ring.style.display="block";tc.style.display="block";
    const ctx=tc.getContext("2d");
    const resize=()=>{tc.width=window.innerWidth;tc.height=window.innerHeight;};resize();window.addEventListener("resize",resize);
    const onMove=(e)=>{pos.current.mx=e.clientX;pos.current.my=e.clientY;dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px";trail.current.push({x:e.clientX,y:e.clientY,age:0});if(trail.current.length>20)trail.current.shift();};
    let raf;
    function anim(){pos.current.rx+=(pos.current.mx-pos.current.rx)*.11;pos.current.ry+=(pos.current.my-pos.current.ry)*.11;ring.style.left=pos.current.rx+"px";ring.style.top=pos.current.ry+"px";ctx.clearRect(0,0,tc.width,tc.height);trail.current.forEach((p,i)=>{p.age++;const t=i/trail.current.length;ctx.beginPath();ctx.arc(p.x,p.y,1.5*t,0,Math.PI*2);ctx.fillStyle=`rgba(96,165,250,${.35*t*Math.max(0,1-p.age/28)})`;ctx.fill();});raf=requestAnimationFrame(anim);}
    anim();window.addEventListener("mousemove",onMove);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("mousemove",onMove);window.removeEventListener("resize",resize);};
  },[]);
  return(<><canvas ref={trailCanvas} style={{position:"fixed",inset:0,zIndex:9990,pointerEvents:"none",display:"none"}}/><div ref={dotRef} className="cur-dot" style={{display:"none"}}/><div ref={ringRef} className="cur-ring" style={{display:"none"}}/></>);
}

/* ── Scroll progress ── */
function ScrollProgress(){
  const[p,setP]=useState(0);
  useEffect(()=>{const fn=()=>{const h=document.documentElement;setP((window.scrollY/(h.scrollHeight-h.clientHeight))*100);};window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);
  return(<div style={{position:"fixed",top:0,left:0,right:0,height:"2px",zIndex:9999,background:"rgba(37,99,235,.1)"}}><div style={{height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#1d4ed8,#06b6d4,#1d4ed8)",backgroundSize:"200% 100%",animation:"shimmer 3s linear infinite",boxShadow:"0 0 10px rgba(37,99,235,.7)"}}/></div>);
}

/* ── Magnetic button ── */
function MagBtn({href,className,children,onClick}){
  const mag=useMagnetic(0.28);
  return(<a href={href} className={className} onClick={onClick} {...mag} style={{display:"inline-flex",alignItems:"center",gap:8,transition:`transform .35s ${EASE.expo},background .2s,box-shadow .2s`}}>{children}</a>);
}

/* ── Typewriter ── */
function TypewriterLine({text,delay=0,className}){
  const[shown,setShown]=useState(0);const[started,setStarted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setStarted(true),delay);return()=>clearTimeout(t);},[delay]);
  useEffect(()=>{if(!started||shown>=text.length)return;const t=setTimeout(()=>setShown(s=>s+1),36);return()=>clearTimeout(t);},[started,shown,text]);
  return(<span className={className}>{text.slice(0,shown)}{shown<text.length&&<span className="type-cur">|</span>}</span>);
}

/* ── Section header ── */
function CinematicHeader({tag,title,sub,center}){
  const{ref,visible}=useFadeIn(0,.12);
  return(<div ref={ref} className={`section-head${center?" center":""}${visible?" v":""}`} style={{opacity:visible?1:0,transform:visible?"none":"translateY(32px)",transition:`opacity .8s ${EASE.expo},transform .9s ${EASE.expo}`}}><div className="sec-tag">{tag}</div><h2 className="sec-title">{title}</h2>{sub&&<p className={`sec-sub${center?" center-sub":""}`}>{sub}</p>}</div>);
}

/* ── Navbar ── */
function Navbar({lang,setLang,onQuote,darkMode,toggleDark}){
  const[scrolled,setScrolled]=useState(false);const[menuOpen,setMenuOpen]=useState(false);
  const tx=T[lang];
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);
  useEffect(()=>{document.body.style.overflow=menuOpen?"hidden":"";},[menuOpen]);
  const close=()=>setMenuOpen(false);
  const NAV=[
    {id:"hizmetler",label:tx.nav.services},
    {id:"vizyon",label:tx.nav.vision},
    {id:"neden-biz",label:tx.nav.why},
    {id:"platformlar",label:tx.nav.platforms},
    {id:"surec",label:tx.nav.process},
    {id:"referanslar",label:tx.nav.testimonials},
  ];
  const NAV_MOB=[
    ...NAV,
    {id:"manifesto",label:tx.nav.manifesto},
    {id:"reklam-cekimleri",label:tx.nav.shooting},
  ];
  return(<>
    <nav className={`navbar${scrolled?" sc":""}`}>
      <a href="#" className="logo-wrap">
        <BrainLogo size={56}/>
        <div className="logo-text">
          <span className="logo-main">Pazar<em>Z</em>ekası</span>
          <span className="logo-sub">{lang==="tr"?"Dijital Pazarlama Uzmanı":"Digital Marketing Expert"}</span>
        </div>
      </a>
      <ul className="nav-ul">
        {NAV.map(({id,label})=>(<li key={id}><a href={`#${id}`}>{label}</a></li>))}
        <li>
          <div className="lang-switcher">
            <button className={`lang-btn${lang==="tr"?" active":""}`} onClick={()=>setLang("tr")} title="Türkçe"><TRFlag/></button>
            <button className={`lang-btn${lang==="en"?" active":""}`} onClick={()=>setLang("en")} title="English"><GBFlag/></button>
          </div>
        </li>
        <li><button className="theme-toggle" onClick={toggleDark} title={darkMode?"Light mode":"Dark mode"}>{darkMode?"☀️":"🌙"}</button></li>
        <li><button className="nav-btn" onClick={onQuote}>{tx.nav.cta}</button></li>
      </ul>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div className="lang-switcher lang-mob">
          <button className={`lang-btn${lang==="tr"?" active":""}`} onClick={()=>setLang("tr")}><TRFlag/></button>
          <button className={`lang-btn${lang==="en"?" active":""}`} onClick={()=>setLang("en")}><GBFlag/></button>
        </div>
        <button className="theme-toggle theme-toggle-mob" onClick={toggleDark} title={darkMode?"Light mode":"Dark mode"}>{darkMode?"☀️":"🌙"}</button>
        <button className={`ham${menuOpen?" open":""}`} onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu"><span/><span/><span/></button>
      </div>
    </nav>
    <div className={`mob-overlay${menuOpen?" open":""}`} onClick={close}/>
    <div className={`mob-menu${menuOpen?" open":""}`}>
      <a href="#" className="mob-logo" onClick={close}>
        <BrainLogo size={28}/>
        <span>Pazar<em style={{color:"#00d4ff",fontStyle:"normal"}}>Z</em>ekası</span>
      </a>
      <ul>{NAV_MOB.map(({id,label})=>(<li key={id}><a href={`#${id}`} onClick={close}>{label}</a></li>))}</ul>
      <button className="btn-p mob-cta-btn" onClick={()=>{close();onQuote();}}>{tx.nav.cta} →</button>
    </div>
  </>);
}

/* ── Digital Brain Canvas — pure SVG/CSS animation ── */
function DigitalBrainCanvas(){
  const W=700, H=525, BX=350, BY=256;

  const ICONS=[
    {Icon:IconInstagram,  cx:222, cy:135, dur:"6.1s", delay:"0s",    color:"#e1306c"},
    {Icon:IconLinkedIn,   cx:350, cy:72,  dur:"7.3s", delay:"0.8s",  color:"#0077b5"},
    {Icon:IconMeta,       cx:478, cy:135, dur:"5.7s", delay:"1.4s",  color:"#0866ff"},
    {Icon:IconTikTok,     cx:531, cy:256, dur:"6.8s", delay:"0.3s",  color:"#69c9d0"},
    {Icon:IconGoogleAds,  cx:478, cy:378, dur:"7.1s", delay:"1.9s",  color:"#4285f4"},
    {Icon:IconYouTube,    cx:350, cy:440, dur:"6.4s", delay:"2.2s",  color:"#ff0000"},
    {Icon:IconFacebook,   cx:222, cy:378, dur:"7.9s", delay:"0.6s",  color:"#1877f2"},
    {Icon:IconXTwitter,   cx:168, cy:256, dur:"6.6s", delay:"1.1s",  color:"#fff"},
  ];

  const CONNS=[
    {d:`M 281 202 Q 252 169 222 135`, i:0},
    {d:`M 348 185 Q 349 129 350 72`,  i:1},
    {d:`M 419 202 Q 449 169 478 135`, i:2},
    {d:`M 463 256 Q 497 256 531 256`, i:3},
    {d:`M 419 313 Q 449 346 478 378`, i:4},
    {d:`M 350 343 Q 350 391 350 440`, i:5},
    {d:`M 281 313 Q 252 346 222 378`, i:6},
    {d:`M 238 256 Q 203 256 168 256`, i:7},
  ];

  const SPARKS=[
    {cx:298,cy:227},{cx:320,cy:207},{cx:344,cy:245},{cx:335,cy:219},
    {cx:372,cy:225},{cx:395,cy:240},{cx:362,cy:272},{cx:310,cy:266},
    {cx:412,cy:206},{cx:385,cy:290},{cx:315,cy:294},{cx:350,cy:194},
  ];

  return(
    <div className="dbc-outer">
      <svg width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="gS" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gM" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gL" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="bgHalo"><stop offset="0%" stopColor="#6d28d9" stopOpacity="0.28"/><stop offset="55%" stopColor="#2563eb" stopOpacity="0.1"/><stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/></radialGradient>
          <linearGradient id="bL" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#818cf8"/><stop offset="100%" stopColor="#6d28d9"/></linearGradient>
          <linearGradient id="bR" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
        </defs>

        <ellipse cx={BX} cy={BY} rx="188" ry="163" fill="url(#bgHalo)">
          <animate attributeName="rx" values="175;203;175" dur="4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite"/>
        </ellipse>
        <circle cx={BX} cy={BY} r="270" fill="none" stroke="#4f46e5" strokeWidth="0.5" strokeDasharray="3 18" opacity="0.2">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${BX} ${BY}`} to={`360 ${BX} ${BY}`} dur="40s" repeatCount="indefinite"/>
        </circle>
        <circle cx={BX} cy={BY} r="232" fill="none" stroke="#06b6d4" strokeWidth="0.4" strokeDasharray="2 14" opacity="0.15">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${BX} ${BY}`} to={`-360 ${BX} ${BY}`} dur="28s" repeatCount="indefinite"/>
        </circle>

        {CONNS.map(({d,i})=>(
          <g key={i}>
            <path id={`cp${i}`} d={d} fill="none" stroke="#7c3aed" strokeWidth="1.4"
              strokeDasharray="7 5" opacity="0.45" filter="url(#gS)">
              <animate attributeName="stroke-dashoffset" values="0;-24" dur={`${2.2+i*.35}s`} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0.65;0.3" dur={`${3+i*.25}s`} repeatCount="indefinite"/>
            </path>
            <circle r="3.5" fill="#a78bfa" filter="url(#gS)" opacity="0.9">
              <animateMotion dur={`${3.2+i*.4}s`} repeatCount="indefinite"><mpath href={`#cp${i}`}/></animateMotion>
              <animate attributeName="r" values="2.5;4;2.5" dur={`${3.2+i*.4}s`} repeatCount="indefinite"/>
            </circle>
            <circle r="2.5" fill="#60a5fa" filter="url(#gS)" opacity="0.7">
              <animateMotion dur={`${4+i*.3}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href={`#cp${i}`}/></animateMotion>
            </circle>
          </g>
        ))}

        <g filter="url(#gS)">
          <path d={`M ${BX} 185 C ${BX-22} 180 ${BX-52} 182 ${BX-75} 197 C ${BX-97} 212 ${BX-112} 237 ${BX-112} 265 C ${BX-112} 293 ${BX-100} 315 ${BX-78} 327 C ${BX-55} 340 ${BX-25} 345 ${BX} 342`}
            fill="none" stroke="url(#bL)" strokeWidth="3" strokeLinecap="round"/>
          <path d={`M ${BX} 185 C ${BX+22} 180 ${BX+52} 182 ${BX+75} 197 C ${BX+97} 212 ${BX+112} 237 ${BX+112} 265 C ${BX+112} 293 ${BX+100} 315 ${BX+78} 327 C ${BX+55} 340 ${BX+25} 345 ${BX} 342`}
            fill="none" stroke="url(#bR)" strokeWidth="3" strokeLinecap="round"/>
          <line x1={BX} y1="185" x2={BX} y2="342" stroke="#a78bfa" strokeWidth="1.8" opacity="0.65"/>
          <path d={`M ${BX-19} 342 Q ${BX-21} 360 ${BX-18} 373 L ${BX+18} 373 Q ${BX+21} 360 ${BX+19} 342`}
            fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>

          {[[BX-65,204,BX-73,265],[BX-45,195,BX-52,263],[BX-25,189,BX-28,260],[BX-10,188,BX-10,260]].map(([x1,y1,x2,y2],i)=>(
            <path key={i} d={`M ${x1} ${y1} C ${x1-8} ${y1+18} ${x2-8} ${y2-22} ${x2} ${y2}`}
              fill="none" stroke="#6d28d9" strokeWidth={1.6-i*.08} opacity={0.72-i*.06} strokeLinecap="round"/>
          ))}
          {[[BX+65,204,BX+73,265],[BX+45,195,BX+52,263],[BX+25,189,BX+28,260],[BX+10,188,BX+10,260]].map(([x1,y1,x2,y2],i)=>(
            <path key={i} d={`M ${x1} ${y1} C ${x1+8} ${y1+18} ${x2+8} ${y2-22} ${x2} ${y2}`}
              fill="none" stroke="#0e7490" strokeWidth={1.6-i*.08} opacity={0.72-i*.06} strokeLinecap="round"/>
          ))}

          <polyline points={`${BX-45},190 ${BX-45},166 ${BX-68},166`} fill="none" stroke="#7c3aed" strokeWidth="1.4" opacity="0.7"/>
          <circle cx={BX-68} cy="166" r="3" fill="#7c3aed" opacity="0.85"/>
          <polyline points={`${BX+45},190 ${BX+45},166 ${BX+68},166`} fill="none" stroke="#06b6d4" strokeWidth="1.4" opacity="0.7"/>
          <circle cx={BX+68} cy="166" r="3" fill="#06b6d4" opacity="0.85"/>
          <polyline points={`${BX-112},250 ${BX-135},250 ${BX-135},235`} fill="none" stroke="#7c3aed" strokeWidth="1.4" opacity="0.7"/>
          <circle cx={BX-135} cy="235" r="3" fill="#7c3aed" opacity="0.85"/>
          <polyline points={`${BX+112},250 ${BX+135},250 ${BX+135},235`} fill="none" stroke="#06b6d4" strokeWidth="1.4" opacity="0.7"/>
          <circle cx={BX+135} cy="235" r="3" fill="#06b6d4" opacity="0.85"/>
          <polyline points={`${BX-55},330 ${BX-71},348`} fill="none" stroke="#7c3aed" strokeWidth="1.4" opacity="0.7"/>
          <circle cx={BX-71} cy="348" r="3" fill="#7c3aed" opacity="0.8"/>
          <polyline points={`${BX+55},330 ${BX+71},348`} fill="none" stroke="#06b6d4" strokeWidth="1.4" opacity="0.7"/>
          <circle cx={BX+71} cy="348" r="3" fill="#06b6d4" opacity="0.8"/>

          {[[BX-88,250],[BX+88,250],[BX-65,330],[BX+65,330],[BX,185]].map(([cx,cy],i)=>(
            <circle key={i} cx={cx} cy={cy} r="2.8" fill={i%2===0?"#818cf8":"#06b6d4"} opacity="0.7">
              <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.8+i*.5}s`} begin={`${i*.4}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </g>

        {SPARKS.map((pt,i)=>(
          <circle key={i} cx={pt.cx} cy={pt.cy} r="2" fill={i%3===0?"#e879f9":i%3===1?"#60a5fa":"#34d399"} opacity="0" filter="url(#gS)">
            <animate attributeName="opacity" values="0;1;0" dur={`${1.2+i*.35}s`} begin={`${i*.55}s`} repeatCount="indefinite"/>
            <animate attributeName="r" values="1;4;1" dur={`${1.2+i*.35}s`} begin={`${i*.55}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        <ellipse cx={BX} cy={BY+6} rx="110" ry="90" fill="#7c3aed" opacity="0" filter="url(#gL)">
          <animate attributeName="opacity" values="0.05;0.13;0.05" dur="3.2s" repeatCount="indefinite"/>
        </ellipse>
      </svg>

      {ICONS.map(({Icon,cx,cy,dur,delay,color},i)=>(
        <div key={i} className={`dbc-icon dbc-f${(i%3)+1}`}
          style={{left:cx-26,top:cy-26,animationDuration:dur,animationDelay:delay,
            boxShadow:`0 0 0 1px ${color}22, 0 4px 20px rgba(0,0,0,.5)`}}>
          <div className="dbc-icon-ring" style={{borderColor:`${color}55`}}/>
          <Icon size={36}/>
        </div>
      ))}
    </div>
  );
}

function HeroImage(){ return <DigitalBrainCanvas/>; }

/* ── Hero ── */
function Hero({lang,onQuote}){
  const tx=T[lang].hero;
  const preText=useScramble(tx.pre,300);
  const[scrollY,setScrollY]=useState(0);
  useEffect(()=>{
    const fn=()=>setScrollY(window.scrollY);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);
  const parallaxY=scrollY*0.08;
  const opacity=Math.max(0,1-scrollY/650);
  return(
    <section className="hero hero-split">
      <div className="hero-grid-bg"/><div className="hero-vignette"/>
      <div className="wrap hero-wrap" style={{opacity,willChange:"opacity"}}>
        <div className="hero-left" style={{transform:`translateY(${parallaxY}px)`,willChange:"transform"}}>
          <div className="hero-pre"><span className="blink-dot"/><span style={{fontFamily:"'Space Mono',monospace"}}>{preText}</span></div>
          <h1 className="hero-h1">
            <TypewriterLine text={tx.line1} delay={800} className="line-grad"/><br/>
            <TypewriterLine text={tx.line2} delay={1400} className="line-em"/><br/>
            <TypewriterLine text={tx.line3} delay={2000} className="line-plain"/>
          </h1>
          <p className="hero-p">{tx.sub}</p>
          <div className="hero-ctas"><button className="btn-p" onClick={onQuote}>{tx.btn1}</button><MagBtn href="#hizmetler" className="btn-o">{tx.btn2}</MagBtn></div>
          <div className="hero-mini-stats">
            <div className="hms-item"><span className="hms-num">120+</span><span className="hms-label">{tx.s1}</span></div>
            <div className="hms-div"/>
            <div className="hms-item"><span className="hms-num">%98</span><span className="hms-label">{tx.s2}</span></div>
            <div className="hms-div"/>
            <div className="hms-item"><span className="hms-num">6+ {lang==="tr"?"Yıl":"Years"}</span><span className="hms-label">{tx.s3}</span></div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-brain-wrap"><HeroImage/></div>
          <img src="/hero_foto.png" className="hero-foto-mob" alt="Pazar Zekası"/>
        </div>
      </div>
      <div className="scroll-indicator"><span className="scroll-txt">scroll</span><div className="scroll-line"/></div>
    </section>
  );
}

function FloatTag({text,cls,style}){
  const yr=useRef(Math.random()*Math.PI*2),sp=useRef(.003+Math.random()*.003),am=useRef(5+Math.random()*7),elRef=useRef(null);
  useEffect(()=>{let raf;const loop=()=>{yr.current+=sp.current;if(elRef.current)elRef.current.style.transform=`translateY(${Math.sin(yr.current)*am.current}px)`;raf=requestAnimationFrame(loop);};raf=requestAnimationFrame(loop);return()=>cancelAnimationFrame(raf);},[]);
  return <div ref={elRef} className={`float-tag ${cls}`} style={style}>{text}</div>;
}

/* ── Stat item ── */
function StatItem({count,suffix,label,delay}){
  const{value,ref:cRef}=useCounter(count);const{ref:fRef,visible}=useFadeIn(delay);
  const setRef=(el)=>{cRef.current=el;fRef.current=el;};
  const pct=count>0?value/count:0;
  return(<div ref={setRef} className={`stat-item${visible?" v":""}`}><span className="stat-num">{value}{suffix}</span><p className="stat-label">{label}</p><div className="stat-bar-bg"><div className="stat-bar-fill" style={{width:`${pct*100}%`}}/></div></div>);
}

/* ── 3D service card ── */
function ServiceCard({icon,num,title,desc,delay,lang}){
  const{ref:fRef,visible}=useFadeIn(delay);const{ref:cardRef,lightRef,onMouseMove,onMouseLeave}=use3DCard(13);
  const setRef=(el)=>{fRef.current=el;cardRef.current=el;};
  return(<div ref={setRef} className={`svc-card${visible?" v":""}`} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}><div className="svc-glow-border"/><div ref={lightRef} className="svc-light"/><div className="svc-top"><div className="svc-icon">{icon}</div><span className="svc-num">{num}</span></div><div className="svc-content"><div className="svc-title">{title}</div><p className="svc-desc">{desc}</p><a href="#iletisim" className="svc-link">{lang==="en"?"details →":"detaylar →"}</a></div></div>);
}

/* ── Why item ── */
function WhyItem({num,title,desc,delay}){
  const{ref,visible}=useFadeIn(delay);
  return(<div ref={ref} className={`why-item${visible?" v":""}`}><span className="why-num">{num}</span><div><div className="why-title">{title}</div><p className="why-desc">{desc}</p></div></div>);
}

/* ── Terminal ── */
function TypingTerminal({lines}){
  const[shown,setShown]=useState(0);const ref=useRef(null);const started=useRef(false);
  useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started.current){started.current=true;lines.forEach((_,i)=>setTimeout(()=>setShown(i+1),i*400));io.disconnect();}},{threshold:.4});io.observe(el);return()=>io.disconnect();},[lines]);
  return(<div ref={ref}>{lines.map((l,i)=>(<div key={i} className="tl" style={{opacity:i<shown?1:0,transform:i<shown?"none":"translateX(-8px)",transition:`opacity .3s ${EASE.expo},transform .4s ${EASE.expo}`,transitionDelay:`${i*.05}s`}}>{l.type==="cmd"&&<>$ <span className="cmd">run</span> {l.text}</>}{l.type==="ok"&&<><span className="ok">✓</span> {l.text}{l.val&&<span className="val">{l.val}</span>}</>}{l.type==="run"&&<>$ <span className="cmd">{l.text}</span>{i<shown&&<span className="tcur"/>}</>}</div>))}</div>);
}

/* ── Platform card ── */
function PlatformCard({name,Icon,desc,delay}){
  const{ref:fRef,visible}=useFadeIn(delay);const{ref:cardRef,lightRef,onMouseMove,onMouseLeave}=use3DCard(10);
  const setRef=(el)=>{fRef.current=el;cardRef.current=el;};
  return(<div ref={setRef} className={`plat-card${visible?" v":""}`} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}><div ref={lightRef} className="svc-light"/><div className="plat-icon"><Icon size={34}/></div><div className="plat-text"><div className="plat-name">{name}</div><p className="plat-desc">{desc}</p></div></div>);
}

/* ── Process step ── */
function ProcessStep({num,title,desc,delay}){
  const{ref,visible}=useFadeIn(delay);
  return(<div ref={ref} className={`proc-step${visible?" v":""}`}><div className="proc-circle"><svg style={{position:"absolute",inset:0,width:"100%",height:"100%",transform:"rotate(-90deg)"}}><circle cx="33" cy="33" r="27" fill="none" stroke="rgba(37,99,235,.15)" strokeWidth="1.5"/><circle cx="33" cy="33" r="27" fill="none" stroke="url(#pg)" strokeWidth="1.5" strokeDasharray={`${2*Math.PI*27}`} strokeDashoffset={visible?0:2*Math.PI*27} style={{transition:`stroke-dashoffset 1.4s ${EASE.expo}`,transitionDelay:`${delay+200}ms`}} strokeLinecap="round"/><defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#06b6d4"/></linearGradient></defs></svg>{num}</div><div className="proc-body"><div className="proc-title">{title}</div><p className="proc-desc">{desc}</p></div></div>);
}

/* ── Testi card ── */
function TestiCard({initials,name,role,text,delay}){
  const{ref:fRef,visible}=useFadeIn(delay);const{ref:cardRef,lightRef,onMouseMove,onMouseLeave}=use3DCard(8);
  const setRef=(el)=>{fRef.current=el;cardRef.current=el;};
  return(<div ref={setRef} className={`testi-card${visible?" v":""}`} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}><div ref={lightRef} className="svc-light"/><div className="testi-quote">"</div><div className="stars">★★★★★</div><p className="testi-text">"{text}"</p><div className="testi-author"><div className="testi-avatar">{initials}</div><div><div className="testi-name">{name}</div><div className="testi-role">{role}</div></div></div></div>);
}

/* ── Why section ── */
function WhySection({lang,items}){
  const tx=T[lang];
  const{ref:wlRef,visible:wlV}=useFadeIn(0);
  return(<section className="section why-section" id="neden-biz"><div className="wrap"><div className="why-inner">
    <div ref={wlRef} className={`why-left${wlV?" v":""}`}>
      <CinematicHeader tag={tx.whyTag} title={<>{tx.whyTitle.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</>} sub={tx.whySub}/>
      <div className="terminal"><div className="t-bar"><div className="td r"/><div className="td y"/><div className="td g"/></div>
        <TypingTerminal lines={[{type:"cmd",text:"analiz --marka-tam"},{type:"ok",text:lang==="en"?"Competitor analysis complete":"Rakip analizi tamamlandı"},{type:"ok",text:lang==="en"?"SEO opportunities: ":"SEO fırsatları: ",val:"127 keyword"},{type:"ok",text:lang==="en"?"Growth potential: ":"Büyüme potansiyeli: ",val:"+340% ROI"},{type:"ok",text:lang==="en"?"Target audience: ":"Hedef kitle: ",val:lang==="en"?"analyzed":"analiz edildi"},{type:"run",text:lang==="en"?"building strategy":"strateji oluşturuluyor"}]}/>
      </div><br/><MagBtn href="#iletisim" className="btn-p">{tx.whyBtn}</MagBtn>
    </div>
    <div className="why-right">{items.map((w,i)=><WhyItem key={i} {...w} delay={i*120}/>)}</div>
  </div></div></section>);
}

/* ── FAQ Section ── */
function FaqSection({lang}){
  const tx=T[lang];
  const[open,setOpen]=useState(null);
  const{ref,visible}=useFadeIn(0,.1);
  return(
    <section className="section faq-section" id="sss">
      <div className="wrap">
        <CinematicHeader tag={tx.faqTag} title={<>{tx.faqTitle.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</>} center/>
        <div ref={ref} className={`faq-list${visible?" v":""}`}>
          {tx.faqItems.map((item,i)=>(
            <div key={i} className={`faq-item${open===i?" open":""}`} onClick={()=>setOpen(open===i?null:i)}>
              <div className="faq-q">
                <span className="faq-num">0{i+1}</span>
                <span className="faq-qtext">{item.q}</span>
                <span className="faq-icon">{open===i?"−":"+"}</span>
              </div>
              <div className="faq-a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Policy Modal ── */
const PRIVACY_TR=`GİZLİLİK POLİTİKASI\n\nSon güncelleme: Mayıs 2025\n\nPazar Zekası Dijital Pazarlama olarak kişisel verilerinizin güvenliği bizim için büyük önem taşımaktadır.\n\n1. TOPLANAN VERİLER\nSitemiz üzerinden iletişim formunu doldurduğunuzda ad-soyad, e-posta adresi ve telefon numarası gibi kişisel verilerinizi topluyoruz. Bu veriler yalnızca sizinle iletişime geçmek amacıyla kullanılır.\n\n2. VERİLERİN KULLANIMI\nTopladığımız veriler; teklif hazırlama, hizmet bilgilendirmesi ve müşteri desteği sağlama amaçlarıyla kullanılmaktadır. Verileriniz üçüncü taraflarla kesinlikle paylaşılmaz.\n\n3. ÇEREZLER\nSitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerez kullanabilir. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz.\n\n4. GÜVENLİK\nKişisel verileriniz SSL şifrelemesi ile korunmaktadır. Yetkisiz erişime karşı gerekli teknik ve idari tedbirler alınmıştır.\n\n5. İLETİŞİM\nGizlilik politikamız hakkında sorularınız için: info@pazarzekasi.com`;
const PRIVACY_EN=`PRIVACY POLICY\n\nLast updated: May 2025\n\nAt Pazar Zekası Digital Marketing, the security of your personal data is of great importance to us.\n\n1. DATA COLLECTED\nWhen you fill out the contact form on our site, we collect personal data such as your full name, email address, and phone number. This data is used solely to contact you.\n\n2. USE OF DATA\nThe data we collect is used for preparing quotes, service information, and providing customer support. Your data is never shared with third parties.\n\n3. COOKIES\nOur site may use cookies to improve the user experience. You can disable cookies from your browser settings.\n\n4. SECURITY\nYour personal data is protected with SSL encryption. Necessary technical and administrative measures have been taken against unauthorized access.\n\n5. CONTACT\nFor questions about our privacy policy: info@pazarzekasi.com`;
const TERMS_TR=`KULLANIM KOŞULLARI\n\nSon güncelleme: Mayıs 2025\n\n1. KABUL\nBu web sitesini kullanarak aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız.\n\n2. HİZMETLER\nPazar Zekası Dijital Pazarlama, sosyal medya yönetimi, reklam yönetimi, SEO, içerik üretimi ve reklam çekimi hizmetleri sunmaktadır. Hizmet kapsamı ve fiyatlandırma, müşteri ile ayrıca belirlenir.\n\n3. FİKRİ MÜLKİYET\nSitemizde yer alan tüm içerik, görseller ve materyaller Pazar Zekası'na aittir. İzinsiz kopyalanamaz veya dağıtılamaz.\n\n4. SORUMLULUK SINIRI\nPazar Zekası, sunduğu hizmetlerin sonuçları konusunda genel taahhütler verse de, piyasa koşullarından kaynaklanan performans dalgalanmalarından sorumlu tutulamaz.\n\n5. DEĞİŞİKLİKLER\nBu koşullar önceden haber vermeksizin güncellenebilir. Güncel koşullar her zaman bu sayfada yayımlanır.\n\n6. İLETİŞİM\nKoşullar hakkında sorularınız için: info@pazarzekasi.com`;
const TERMS_EN=`TERMS OF USE\n\nLast updated: May 2025\n\n1. ACCEPTANCE\nBy using this website, you are deemed to have accepted the following terms of use.\n\n2. SERVICES\nPazar Zekası Digital Marketing provides social media management, ad management, SEO, content production, and ad shooting services. Service scope and pricing are determined separately with each client.\n\n3. INTELLECTUAL PROPERTY\nAll content, images, and materials on our site belong to Pazar Zekası. They may not be copied or distributed without permission.\n\n4. LIABILITY\nWhile Pazar Zekası makes general commitments about service outcomes, it cannot be held responsible for performance fluctuations due to market conditions.\n\n5. CHANGES\nThese terms may be updated without prior notice. Current terms are always published on this page.\n\n6. CONTACT\nFor questions about the terms: info@pazarzekasi.com`;

function PolicyModal({type,lang,onClose}){
  if(!type)return null;
  const isPrivacy=type==="privacy";
  const isTR=lang==="tr";
  const title=isPrivacy?(isTR?"Gizlilik Politikası":"Privacy Policy"):(isTR?"Kullanım Koşulları":"Terms of Use");
  const body=isPrivacy?(isTR?PRIVACY_TR:PRIVACY_EN):(isTR?TERMS_TR:TERMS_EN);
  return(
    <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="modal-box policy-modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-head">
          <h2 className="modal-title">{title}</h2>
        </div>
        <div className="policy-body">
          {body.split("\n").map((line,i)=>(
            line.trim()===""?<br key={i}/>:
            /^[A-Z0-9À-ſ\s]{4,}$/.test(line.trim())&&line.trim().length<60?<h3 key={i} className="policy-h3">{line}</h3>:
            <p key={i} className="policy-p">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Vision Section ── */
function VisionSection({lang}){
  const isTR=lang==="tr";
  const{ref,visible}=useFadeIn(0,.08);
  const pills=isTR
    ?["Yenilikçi Stratejiler","Sürdürülebilir Büyüme","Veri Odaklı","360° Pazarlama"]
    :["Innovative Strategies","Sustainable Growth","Data Driven","360° Marketing"];
  return(
    <section className="section vision-section" id="vizyon">
      <div className="vision-bg"/>
      <div className="vision-mob-bg"/>
      <div className="wrap">
        <div className="vision-grid">
          <div className={`vision-img-col${visible?" v":""}`}>
            <div className="vision-img-frame">
              <img src="/pazar_zekasi2.jpeg" className="vision-img" alt="Pazar Zekası Vizyon"/>
              <div className="vision-img-glow"/>
            </div>
          </div>
          <div ref={ref} className={`vision-content${visible?" v":""}`}>
            <div className="sec-tag">{isTR?"Vizyonumuz":"Our Vision"}</div>
            <h2 className="vision-title">
              {isTR?<>Dijitalde<br/>Geleceği<br/>Şekillendiriyoruz.</>:<>Shaping<br/>The Digital<br/>Future.</>}
            </h2>
            <div className="vision-line"/>
            <p className="vision-p">
              {isTR
                ?"Pazar Zekası Dijital Pazarlama olarak vizyonumuz; markaların dijital dünyada sadece görünür olmasını değil, sürdürülebilir şekilde büyümesini sağlayan yenilikçi ve sonuç odaklı stratejiler üretmektir."
                :"Our vision at Pazar Zekası Digital Marketing is to produce innovative, results-driven strategies that help brands not just become visible, but grow sustainably in the digital world."
              }
            </p>
            <p className="vision-p">
              {isTR
                ?"Modern pazarlama anlayışı, yaratıcı içerikler ve veri odaklı reklam yönetimiyle işletmeleri hedef kitlesiyle en doğru şekilde buluşturmayı amaçlıyoruz."
                :"With a modern marketing approach, creative content and data-driven ad management, we aim to connect businesses with their target audience in the most effective way possible."
              }
            </p>
            <div className="vision-highlight">
              {isTR
                ?"Türkiye'nin güven veren, fark yaratan ve dijital dönüşüme yön veren dijital pazarlama ajanslarından biri olmak en büyük hedefimizdir."
                :"Being one of Turkey's most trusted, differentiating and digitally transformative marketing agencies is our greatest goal."
              }
            </div>
            <div className="vision-pills">
              {pills.map((p,i)=><span key={i} className="vision-pill">{p}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reklam Çekimleri Section ── */
function ReklamCekimleriSection({lang}){
  const isTR=lang==="tr";
  const{ref,visible}=useFadeIn(0,.08);
  const features=isTR
    ?["Reels video çekimleri","Story içerik çekimleri","Instagram & Facebook gönderi çekimleri","Ürün ve mekan tanıtım videoları","Reklam kampanyalarına özel kısa videolar","Profesyonel ekipman ve yaratıcı kurgu desteği"]
    :["Reels video shoots","Story content shoots","Instagram & Facebook post shoots","Product and location intro videos","Short videos for ad campaigns","Professional equipment and creative editing support"];
  return(
    <section className="section reklam-section" id="reklam-cekimleri">
      <div className="reklam-bg"/>
      <div className="reklam-mob-bg"/>
      <div className="wrap">
        <div className="reklam-grid">
          <div ref={ref} className={`reklam-content${visible?" v":""}`}>
            <div className="sec-tag">{isTR?"Sosyal Medya Reklam Çekimleri":"Social Media Ad Shoots"}</div>
            <h2 className="reklam-title">
              {isTR?<>Markanızı<br/>Dijitalde<br/>Öne Çıkarın.</>:<>Put Your Brand<br/>In The<br/>Spotlight.</>}
            </h2>
            <div className="reklam-line"/>
            <p className="reklam-p">
              {isTR
                ?"Markanızı dijital dünyada öne çıkarmak için profesyonel sosyal medya içerikleri üretiyoruz. Pazar Zekası olarak işletmeniz için yaratıcı, dikkat çekici ve dönüşüm odaklı çekimler hazırlıyoruz."
                :"We produce professional social media content to highlight your brand in the digital world. At Pazar Zekası, we prepare creative, attention-grabbing and conversion-focused shoots for your business."
              }
            </p>
            <ul className="reklam-list">
              {features.map((f,i)=>(
                <li key={i} className="reklam-list-item">
                  <span className="reklam-dot"/>
                  {f}
                </li>
              ))}
            </ul>
            <div className="reklam-cta-box">
              <span className="reklam-cta-icon">🚀</span>
              <p>{isTR?"Hedefimiz: Etkileşim alan, güven veren ve satışa dönüşen içerikler üretmek.":"Our goal: To produce content that drives engagement, builds trust and converts to sales."}</p>
            </div>
          </div>
          <div className={`reklam-img-col${visible?" v":""}`}>
            <div className="reklam-img-wrap">
              <img src="/reklam_cekimleri.jpeg" className="reklam-img" alt="Reklam Çekimleri"/>
              <div className="reklam-img-shine"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── WhatsApp Float Button ── */
const WA_LINK="https://wa.me/905449742767";
function WhatsAppBtn(){
  return(
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-btn" aria-label="WhatsApp ile İletişim">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

/* ── Manifesto Section ── */
function ManifestoSection({lang}){
  const tx=T[lang];
  const{ref,visible}=useFadeIn(0,.08);
  const paragraphs=tx.manifestoText.split("\n\n");
  return(
    <section className="section manifesto-section" id="manifesto">
      <div className="manifesto-bg"/>
      <div className="manifesto-mob-bg" aria-hidden="true"/>
      <div className="wrap">
        <div className="manifesto-grid">
          <div ref={ref} className={`manifesto-inner${visible?" v":""}`}>
            <div className="manifesto-tag">{tx.manifestoTag}</div>
            <h2 className="manifesto-title">{tx.manifestoTitle}</h2>
            <div className="manifesto-line"/>
            <div className="manifesto-body">
              {paragraphs.map((para,i)=>{
                if(i===0){
                  const[first,...rest]=para.split("\n");
                  return(
                    <div key={i} className="manifesto-p">
                      <p className="manifesto-lead">{first}</p>
                      {rest.map((l,j)=><p key={j} className="manifesto-accent">{l}</p>)}
                    </div>
                  );
                }
                if(para.startsWith("Amacımız")||para.startsWith("Our goal")){
                  return <p key={i} className="manifesto-highlight">{para}</p>;
                }
                if(para.startsWith("Çünkü")||para.startsWith("Because")){
                  return <p key={i} className="manifesto-closing">{para}</p>;
                }
                return <p key={i} className="manifesto-p">{para}</p>;
              })}
            </div>
          </div>
          <div className={`manifesto-visual${visible?" v":""}`}>
            <div className="manifesto-img-wrap">
              <img src="/pazar_zekasi3.png" className="manifesto-img" alt="Dijital Pazarlama"/>
              <div className="manifesto-img-shine"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main ── */
export default function PazarZekasi(){
  const[lang,setLang]=useState("tr");
  const[quoteOpen,setQuoteOpen]=useState(false);
  const[policy,setPolicy]=useState(null);
  const[darkMode,setDarkMode]=useState(true);
  const toggleDark=()=>{
    setDarkMode(v=>{
      document.documentElement.setAttribute("data-theme",v?"light":"dark");
      return !v;
    });
  };
  const tx=T[lang];
  const SERVICES=ALL_SERVICES[lang];
  const WHY_ITEMS=ALL_WHY[lang];
  const STEPS=ALL_STEPS[lang];
  const TESTIMONIALS=ALL_TESTIMONIALS[lang];
  const STATS=ALL_STATS[lang];
  const PLATFORMS=ALL_PLATFORMS[lang];
  const{ref:ctaRef,visible:ctaV}=useFadeIn(0);
  const openQuote=()=>setQuoteOpen(true);
  return(<>
    <Style/><ScrollProgress/><CustomCursor/><ThreeBackground/><DotCanvas/>
    <WhatsAppBtn/>
    <QuoteModal open={quoteOpen} onClose={()=>setQuoteOpen(false)} lang={lang}/>
    <PolicyModal type={policy} lang={lang} onClose={()=>setPolicy(null)}/>
    <Navbar lang={lang} setLang={setLang} onQuote={openQuote} darkMode={darkMode} toggleDark={toggleDark}/>
    <Hero lang={lang} onQuote={openQuote}/>

    {/* STATS */}
    <section className="stats-section"><div className="wrap"><div className="stats-grid">{STATS.map((s,i)=><StatItem key={i} {...s} delay={i*110}/>)}</div></div></section>

    {/* SERVICES */}
    <section className="section svcs-section" id="hizmetler"><div className="wrap">
      <CinematicHeader tag={tx.svcTag} title={<>{tx.svcTitle.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</>} sub={tx.svcSub} center/>
      <div className="svcs-grid">{SERVICES.map((s,i)=><ServiceCard key={i} {...s} delay={(i%3)*110} lang={lang}/>)}</div>
    </div></section>

    {/* MANIFESTO */}
    <ManifestoSection lang={lang}/>

    {/* VISION */}
    <VisionSection lang={lang}/>

    {/* REKLAM ÇEKİMLERİ */}
    <ReklamCekimleriSection lang={lang}/>

    {/* WHY */}
    <WhySection lang={lang} items={WHY_ITEMS}/>

    {/* PLATFORMS */}
    <section className="section plat-section" id="platformlar"><div className="wrap">
      <CinematicHeader tag={tx.platTag} title={<>{tx.platTitle.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</>} sub={tx.platSub} center/>
      <div className="plat-grid">{PLATFORMS.map((p,i)=><PlatformCard key={i} {...p} delay={(i%3)*90}/>)}</div>
    </div></section>

    {/* PROCESS */}
    <section className="section proc-section" id="surec"><div className="wrap">
      <CinematicHeader tag={tx.procTag} title={tx.procTitle} sub={tx.procSub} center/>
      <div className="proc-grid"><div className="proc-connector"/>{STEPS.map((s,i)=><ProcessStep key={i} {...s} delay={i*140}/>)}</div>
    </div></section>

    {/* TESTIMONIALS */}
    <section className="section testi-section" id="referanslar"><div className="wrap">
      <CinematicHeader tag={tx.testiTag} title={<>{tx.testiTitle.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</>} center/>
      <div className="testi-grid">{TESTIMONIALS.map((t,i)=><TestiCard key={i} {...t} delay={i*120}/>)}</div>
    </div></section>

    {/* FAQ */}
    <FaqSection lang={lang}/>

    {/* CTA */}
    <section className="section cta-section" id="iletisim"><div className="wrap">
      <div ref={ctaRef} className={`cta-inner${ctaV?" v":""}`}>
        <div className="cta-grid-bg"/><div className="cta-glow"/><div className="cta-glow cta-glow-2"/>
        <div className="sec-tag">{tx.ctaTag}</div>
        <h2 className="cta-title">{tx.ctaTitle.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</h2>
        <p className="cta-sub">{tx.ctaSub.split("\n").map((l,i)=><span key={i}>{l}{i===0&&<br/>}</span>)}</p>
        <div className="cta-btns"><button className="btn-p" onClick={openQuote}>{tx.ctaBtn1}</button><button className="btn-o" onClick={()=>{window.location.href="tel:+905449742767"}}>{tx.ctaBtn2}</button></div>
      </div>
    </div></section>

    {/* FOOTER */}
    <footer><div className="wrap">
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo-wrap" style={{marginBottom:14,display:"inline-flex"}}>
            <BrainLogo size={52}/>
            <div className="logo-text"><span className="logo-main">Pazar<em>Z</em>ekası</span><span className="logo-sub">{lang==="tr"?"Dijital Pazarlama Uzmanı":"Digital Marketing Expert"}</span></div>
          </a>
          <p className="footer-desc">{tx.footer.desc}</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/pazarzekasi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer-social-link"><IconInstagram size={20}/></a>
            <a href="https://www.facebook.com/profile.php?id=61589132075714&locale=tr_TR" target="_blank" rel="noopener noreferrer" className="footer-social-link"><IconFacebook size={20}/></a>
            <a href="#" className="footer-social-link"><IconLinkedIn size={20}/></a>
            <a href="#" className="footer-social-link"><IconXTwitter size={20}/></a>
          </div>
        </div>
        {[{h:tx.footer.h1,links:tx.footer.links1},{h:tx.footer.h2,links:tx.footer.links2},{h:tx.footer.h3,links:["merhaba@pazarzekasi.com","LinkedIn","Instagram","Twitter/X"]}].map(col=>(<div key={col.h} className="footer-col"><h4 className="footer-col-h">{col.h}</h4><ul>{col.links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul></div>))}
      </div>
      <div className="footer-bottom"><p>{tx.footer.copy}</p><p className="footer-legal-links"><button className="footer-legal-btn" onClick={()=>setPolicy("privacy")}>{lang==="tr"?"GİZLİLİK":"PRIVACY"}</button><span> · </span><button className="footer-legal-btn" onClick={()=>setPolicy("terms")}>{lang==="tr"?"KOŞULLAR":"TERMS"}</button></p></div>
    </div></footer>
  </>);
}

/* ── Style ── */
function Style(){
  useEffect(()=>{const l=document.createElement("link");l.rel="stylesheet";l.href=FONTS_URL;document.head.appendChild(l);return()=>document.head.removeChild(l);},[]);
  return <style>{CSS}</style>;
}

const CSS=`
:root{--bg:#03050e;--bg2:#060b18;--bg3:#0a1020;--blue:#1d4ed8;--blue2:#2563eb;--blue3:#3b82f6;--glow:#60a5fa;--cyan:#06b6d4;--purple:#8b5cf6;--pink:#c084fc;--text:#e8f0ff;--text2:#7c93b8;--text3:#2e4060;--b1:rgba(37,99,235,.1);--b2:rgba(37,99,235,.2);--b3:rgba(37,99,235,.4);--card:rgba(6,11,24,.75);--r:12px;--rl:20px}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;cursor:none}html{overflow-x:hidden}
body::after{content:'';position:fixed;inset:0;z-index:1;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.018) 3px,rgba(0,0,0,.018) 4px);pointer-events:none}
@media(hover:none),(pointer:coarse){body{cursor:auto}.cur-dot,.cur-ring{display:none!important}}
@keyframes shimmer{0%{background-position:0% 0}100%{background-position:200% 0}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes gradAnim{0%,100%{background-position:0%}50%{background-position:100%}}
@keyframes glowPulse{0%,100%{opacity:.5;transform:translateX(-50%) scale(1)}50%{opacity:1;transform:translateX(-50%) scale(1.1)}}
@keyframes spinBorder{to{--angle:360deg}}
@keyframes scrollAnim{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
@keyframes gridMove{0%{background-position:0 0}100%{background-position:48px 48px}}
@keyframes brainFloat{0%,100%{transform:translateY(0) scale(1) rotate(-.5deg)}50%{transform:translateY(-18px) scale(1.03) rotate(.5deg)}}
@keyframes waPulse{0%,100%{box-shadow:0 4px 24px rgba(37,211,102,.5),0 0 0 0 rgba(37,211,102,.35)}60%{box-shadow:0 4px 24px rgba(37,211,102,.5),0 0 0 14px rgba(37,211,102,0)}}
.wa-btn{position:fixed;bottom:28px;right:28px;width:58px;height:58px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:9990;transition:transform .3s cubic-bezier(0.34,1.56,0.64,1),box-shadow .3s;animation:waPulse 2.6s ease-in-out infinite;text-decoration:none}
.wa-btn:hover{transform:scale(1.14);box-shadow:0 6px 36px rgba(37,211,102,.75)}
@keyframes warmGlow{0%,100%{opacity:.22;filter:drop-shadow(0 0 28px rgba(139,92,246,.55)) drop-shadow(0 0 60px rgba(96,165,250,.3)) drop-shadow(0 0 100px rgba(6,182,212,.15))}50%{opacity:.32;filter:drop-shadow(0 0 52px rgba(139,92,246,.95)) drop-shadow(0 0 100px rgba(96,165,250,.6)) drop-shadow(0 0 160px rgba(192,132,252,.4))}}
.cur-dot{position:fixed;width:7px;height:7px;background:var(--glow);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:screen}
.cur-ring{position:fixed;width:30px;height:30px;border:1px solid rgba(96,165,250,.3);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .18s,height .18s,border-color .18s}
.wrap{max-width:1140px;margin:0 auto;padding:0 28px;position:relative;z-index:2}
section{position:relative;z-index:2}
.section{padding:120px 0}
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 40px;height:64px;display:flex;align-items:center;justify-content:space-between;transition:all .5s cubic-bezier(0.16,1,0.3,1);border-bottom:1px solid transparent}
.navbar.sc{background:rgba(3,5,14,.92);backdrop-filter:blur(32px);border-color:var(--b1)}
.logo{font-family:'Space Mono',monospace;font-size:16px;font-weight:700;color:var(--text);text-decoration:none;letter-spacing:2px;display:inline-flex;align-items:center;gap:1px}
.logo em{font-style:normal;color:var(--glow)}
.nav-ul{display:flex;gap:28px;align-items:center;list-style:none}
.nav-ul a{font-family:'Space Mono',monospace;font-size:11px;color:var(--text2);text-decoration:none;letter-spacing:1px;transition:color .2s;position:relative}
.nav-ul a::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--glow);transition:width .3s cubic-bezier(0.16,1,0.3,1)}
.nav-ul a:hover{color:var(--glow)}.nav-ul a:hover::after{width:100%}
.nav-btn{background:var(--blue2)!important;color:#fff!important;padding:8px 20px;border-radius:7px;font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase}
.nav-btn:hover{background:var(--blue3)!important;box-shadow:0 0 28px rgba(37,99,235,.55)!important}.nav-btn::after{display:none!important}
.ham{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;cursor:pointer;padding:4px;border:none;background:transparent;z-index:200;flex-shrink:0}
.ham span{display:block;width:22px;height:1.5px;background:var(--text);border-radius:2px;transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .25s,width .25s}
.ham.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.ham.open span:nth-child(2){opacity:0;width:0}
.ham.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
.mob-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:140;opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s;backdrop-filter:blur(4px)}
.mob-overlay.open{opacity:1;visibility:visible}
.mob-menu{position:fixed;top:0;right:0;bottom:0;width:min(320px,85vw);background:rgba(3,5,14,.98);backdrop-filter:blur(40px);border-left:1px solid var(--b1);z-index:150;display:flex;flex-direction:column;padding:88px 32px 40px;transform:translateX(100%);transition:transform .45s cubic-bezier(0.16,1,0.3,1);visibility:hidden}
.mob-menu.open{transform:translateX(0);visibility:visible}
.mob-menu ul{list-style:none;display:flex;flex-direction:column}
.mob-menu ul li{border-bottom:1px solid var(--b1)}
.mob-menu ul a{display:block;padding:18px 0;font-family:'Space Mono',monospace;font-size:12px;color:var(--text2);text-decoration:none;letter-spacing:1.5px;transition:color .2s}
.mob-menu ul a:hover{color:var(--glow)}
.mob-cta-btn{margin-top:32px;width:100%;justify-content:center;display:inline-flex}
.btn-p{background:var(--blue2);color:#fff;padding:13px 28px;border-radius:8px;border:none;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;position:relative;overflow:hidden;letter-spacing:.3px}
.btn-p::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.11),transparent);transition:left .55s}
.btn-p:hover{background:var(--blue3);box-shadow:0 0 44px rgba(37,99,235,.6),0 8px 24px rgba(37,99,235,.3)}.btn-p:hover::before{left:100%}
.btn-o{background:transparent;color:var(--text);padding:13px 28px;border-radius:8px;border:1px solid var(--b2);font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:400;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .3s}
.btn-o:hover{background:rgba(37,99,235,.08);border-color:var(--b3);box-shadow:0 0 20px rgba(37,99,235,.15)}
@keyframes heroFloat{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-18px) scale(1.012)}}
@keyframes brainGlow{0%,100%{filter:drop-shadow(0 0 22px rgba(96,165,250,.55)) drop-shadow(0 0 55px rgba(139,92,246,.4)) drop-shadow(0 0 90px rgba(6,182,212,.25))}50%{filter:drop-shadow(0 0 42px rgba(96,165,250,.9)) drop-shadow(0 0 95px rgba(139,92,246,.7)) drop-shadow(0 0 150px rgba(6,182,212,.5))}}
@keyframes orbPulse{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.18);opacity:.85}}
@keyframes ringExpand{0%{transform:translate(-50%,-50%) scale(.8);opacity:.9}100%{transform:translate(-50%,-50%) scale(1.7);opacity:0}}
@keyframes streakSpin1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes streakSpin2{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
@keyframes particleOrbit{0%{transform:rotate(calc(var(--i)*22.5deg)) translateX(calc(145px + var(--i)*5px)) rotate(calc(var(--i)*-22.5deg));opacity:.9}50%{opacity:.4}100%{transform:rotate(calc(var(--i)*22.5deg + 360deg)) translateX(calc(145px + var(--i)*5px)) rotate(calc(var(--i)*-22.5deg - 360deg));opacity:.9}}
@keyframes shineSweep{0%{opacity:0;transform:translateX(-100%) rotate(-35deg)}40%{opacity:.5}60%{opacity:.5}100%{opacity:0;transform:translateX(200%) rotate(-35deg)}}
@keyframes radialPulse{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)}50%{opacity:.8;transform:translate(-50%,-50%) scale(1.1)}}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:90px 28px 60px;position:relative;overflow:hidden;max-width:100vw}
.hero-split{align-items:stretch}
.hero-wrap{display:grid;grid-template-columns:1fr 1.15fr;gap:16px;align-items:center;width:100%;max-width:100%;padding:0 2%}
.hero-left{text-align:left;display:flex;flex-direction:column;align-items:flex-start;padding-left:1%}
.hero-right{display:flex;align-items:center;justify-content:center;position:relative}
.hero-grid-bg{position:absolute;inset:0;background:linear-gradient(rgba(37,99,235,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.022) 1px,transparent 1px);background-size:48px 48px;animation:gridMove 28s linear infinite;pointer-events:none}
.hero-vignette{position:absolute;inset:0;background:radial-gradient(ellipse 100% 100% at 50% 50%,transparent 30%,rgba(3,5,14,.8));pointer-events:none}
.hero-pre{display:inline-flex;align-items:center;gap:7px;font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2.5px;color:var(--cyan);margin-bottom:22px;animation:fadeUp .6s ease both;min-height:20px}
.blink-dot{width:4px;height:4px;background:var(--cyan);border-radius:50%;animation:blink .8s step-end infinite;flex-shrink:0}
.hero-h1{font-family:'Rajdhani',sans-serif;font-size:clamp(56px,6vw,100px);font-weight:700;line-height:.96;letter-spacing:-1px;margin-bottom:24px}
.line-grad{background:linear-gradient(125deg,#fff 0%,var(--purple) 25%,var(--glow) 55%,var(--cyan) 80%,#c084fc 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200%;animation:gradAnim 5s ease infinite}
.line-em,.line-plain{color:var(--text);font-style:normal}
.type-cur{display:inline-block;width:3px;background:var(--glow);margin-left:2px;animation:blink .5s step-end infinite;vertical-align:baseline}
.hero-p{max-width:480px;font-size:17px;line-height:1.75;color:var(--text2);margin-bottom:32px;animation:fadeUp .7s .15s ease both;font-weight:300}
.hero-ctas{display:flex;gap:12px;flex-wrap:wrap;animation:fadeUp .7s .3s ease both}
.hero-mini-stats{display:flex;align-items:center;gap:20px;margin-top:36px;animation:fadeUp .7s .45s ease both}
.hms-item{display:flex;flex-direction:column;gap:2px}
.hms-num{font-family:'Rajdhani',sans-serif;font-size:22px;font-weight:700;background:linear-gradient(135deg,#fff,var(--glow));-webkit-background-clip:text;-webkit-text-fill-color:transparent;line-height:1}
.hms-label{font-family:'Space Mono',monospace;font-size:9px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase}
.hms-div{width:1px;height:32px;background:var(--b2)}
.float-tag{position:absolute;font-family:'Space Mono',monospace;font-size:9.5px;border-radius:5px;padding:5px 11px;pointer-events:none;white-space:nowrap}
.float-tag.green{color:rgba(34,197,94,.4);border:1px solid rgba(34,197,94,.12)}
.float-tag.blue{color:rgba(96,165,250,.4);border:1px solid rgba(96,165,250,.12)}
.scroll-indicator{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;animation:fadeUp .7s .8s ease both;z-index:3}
.scroll-txt{font-family:'Space Mono',monospace;font-size:8px;letter-spacing:3px;color:var(--text3);text-transform:uppercase}
.scroll-line{width:1px;height:42px;background:linear-gradient(to bottom,var(--text3),transparent);animation:scrollAnim 2s ease infinite}

/* ── HERO MOBILE PHOTO ── */
.hero-brain-wrap{display:block}
.hero-foto-mob{display:none;width:100%;max-width:400px;border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.55),0 0 0 1px rgba(139,92,246,.25),0 0 60px rgba(139,92,246,.12);height:auto}
@media(max-width:1024px){.hero-brain-wrap{display:none}.hero-foto-mob{display:block;max-width:420px}}
@media(max-width:768px){.hero-foto-mob{max-width:340px;border-radius:16px}}
@media(max-width:480px){.hero-foto-mob{max-width:280px;border-radius:14px}}

/* ── DIGITAL BRAIN CANVAS ── */
.dbc-outer{position:relative;width:560px;height:420px;flex-shrink:0}
.dbc-icon{position:absolute;width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:14px;background:rgba(4,6,16,.88);backdrop-filter:blur(10px);will-change:transform;cursor:default;z-index:3}
.dbc-icon-ring{position:absolute;inset:-4px;border-radius:18px;border:1px solid transparent;pointer-events:none}
@keyframes dbcF1{0%,100%{transform:translateY(0) rotate(0deg) scale(1)}40%{transform:translateY(-13px) rotate(-1.5deg) scale(1.03)}70%{transform:translateY(-7px) rotate(1deg) scale(0.98)}}
@keyframes dbcF2{0%,100%{transform:translateY(-6px) rotate(1deg) scale(0.98)}45%{transform:translateY(8px) rotate(-1deg) scale(1.04)}75%{transform:translateY(2px) rotate(0.5deg) scale(1)}}
@keyframes dbcF3{0%,100%{transform:translateY(-10px) rotate(-0.5deg) scale(1.02)}50%{transform:translateY(5px) rotate(1.5deg) scale(0.97)}80%{transform:translateY(-4px) rotate(0deg) scale(1)}}
.dbc-f1{animation:dbcF1 ease-in-out infinite}
.dbc-f2{animation:dbcF2 ease-in-out infinite}
.dbc-f3{animation:dbcF3 ease-in-out infinite}
.dbc-icon:hover{transform:scale(1.2) !important;filter:brightness(1.2);z-index:10}
.stats-section{padding:52px 0;border-top:1px solid var(--b1);border-bottom:1px solid var(--b1)}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr)}
.stat-item{text-align:center;padding:24px 16px;border-right:1px solid var(--b1);opacity:0;transform:translateY(18px);transition:opacity .6s cubic-bezier(0.16,1,0.3,1),transform .7s cubic-bezier(0.16,1,0.3,1)}
.stat-item:last-child{border-right:none}
.stat-item.v{opacity:1;transform:translateY(0)}
.stat-num{font-family:'Rajdhani',sans-serif;font-size:54px;font-weight:700;background:linear-gradient(135deg,#fff,var(--glow));-webkit-background-clip:text;-webkit-text-fill-color:transparent;display:block;line-height:1}
.stat-label{font-family:'Space Mono',monospace;font-size:9px;color:var(--text3);margin-top:7px;letter-spacing:2px;text-transform:uppercase}
.stat-bar-bg{width:60%;height:1.5px;background:rgba(37,99,235,.1);border-radius:2px;margin:10px auto 0;overflow:hidden}
.stat-bar-fill{height:100%;background:linear-gradient(90deg,var(--blue2),var(--cyan));border-radius:2px;transition:width .08s linear}
.sec-tag{display:inline-flex;align-items:center;gap:8px;font-family:'Space Mono',monospace;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--cyan);margin-bottom:14px}
.sec-title{font-family:'Rajdhani',sans-serif;font-size:clamp(34px,4.5vw,54px);font-weight:700;letter-spacing:-.5px;line-height:1.05;margin-bottom:16px}
.sec-sub{font-size:16px;color:var(--text2);line-height:1.75;max-width:500px;font-weight:300}
.section-head{margin-bottom:68px}.section-head.center{text-align:center}.center-sub{margin:0 auto}
.svcs-section{padding:120px 0}
.svcs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.svc-card{background:var(--card);border:1px solid var(--b1);border-radius:var(--rl);padding:32px 28px;position:relative;overflow:hidden;opacity:0;transform:translateY(30px);transition:opacity .6s cubic-bezier(0.16,1,0.3,1),transform .7s cubic-bezier(0.34,1.56,0.64,1),border-color .3s;backdrop-filter:blur(20px);will-change:transform}
.svc-card.v{opacity:1;transform:translateY(0)}
@property --angle{syntax:'<angle>';initial-value:0deg;inherits:false}
.svc-glow-border{position:absolute;inset:0;border-radius:var(--rl);background:conic-gradient(from var(--angle,0deg),transparent 55%,rgba(139,92,246,.5) 65%,rgba(37,99,235,.4) 75%,rgba(6,182,212,.4) 85%,transparent 92%);animation:spinBorder 5s linear infinite;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:destination-out;padding:1px;pointer-events:none;opacity:0;transition:opacity .35s}
.svc-card:hover{border-color:rgba(139,92,246,.35)}.svc-card:hover .svc-glow-border{opacity:1}
.svc-light{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .25s;border-radius:var(--rl)}
.svc-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.svc-icon{width:46px;height:46px;background:rgba(37,99,235,.1);border:1px solid rgba(37,99,235,.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;transition:all .35s}
.svc-card:hover .svc-icon{background:rgba(37,99,235,.22);box-shadow:0 0 20px rgba(37,99,235,.3);transform:scale(1.08)}
.svc-num{font-family:'Space Mono',monospace;font-size:10px;color:var(--text3);letter-spacing:1px}
.svc-title{font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:600;margin-bottom:10px;letter-spacing:.3px}
.svc-desc{font-size:13.5px;color:var(--text2);line-height:1.75;font-weight:300}
.svc-link{display:inline-flex;align-items:center;gap:5px;color:var(--glow);font-family:'Space Mono',monospace;font-size:11px;text-decoration:none;margin-top:18px;letter-spacing:.5px;transition:gap .25s}.svc-link:hover{gap:10px}
.why-section{padding:120px 0;background:linear-gradient(180deg,transparent,rgba(139,92,246,.03) 35%,rgba(37,99,235,.025) 65%,transparent)}
.why-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center}
.why-left{opacity:0;transform:translateX(-30px);transition:opacity .9s cubic-bezier(0.16,1,0.3,1),transform .9s cubic-bezier(0.16,1,0.3,1)}
.why-left.v{opacity:1;transform:translateX(0)}
.why-right{display:flex;flex-direction:column;gap:12px}
.why-item{background:var(--card);border:1px solid var(--b1);border-radius:var(--r);padding:20px 24px;display:flex;gap:14px;align-items:flex-start;opacity:0;transform:translateX(30px);transition:opacity .55s cubic-bezier(0.16,1,0.3,1),transform .6s cubic-bezier(0.16,1,0.3,1),border-color .3s,box-shadow .3s,transform .3s;backdrop-filter:blur(20px)}
.why-item.v{opacity:1;transform:translateX(0)}
.why-item:hover{border-color:var(--b2);box-shadow:0 8px 32px rgba(37,99,235,.1);transform:translateX(5px)!important}
.why-num{font-family:'Space Mono',monospace;font-size:11px;color:var(--glow);letter-spacing:1px;flex-shrink:0;padding-top:2px;font-weight:700}
.why-title{font-family:'Rajdhani',sans-serif;font-size:16px;font-weight:600;margin-bottom:4px}
.why-desc{font-size:13px;color:var(--text2);line-height:1.7;font-weight:300}
.terminal{background:rgba(2,4,12,.97);border:1px solid var(--b2);border-radius:var(--r);padding:22px 26px;margin-top:28px;font-family:'Space Mono',monospace;font-size:11.5px;line-height:2;box-shadow:0 0 48px rgba(37,99,235,.08),inset 0 1px 0 rgba(96,165,250,.06)}
.t-bar{display:flex;gap:6px;margin-bottom:16px}.td{width:10px;height:10px;border-radius:50%}
.td.r{background:#ff5f57}.td.y{background:#febc2e}.td.g{background:#28c840}
.tl{color:var(--text3)}.cmd{color:var(--glow)}.ok{color:#22c55e}.val{color:var(--cyan)}
.tcur{display:inline-block;width:7px;height:11px;background:var(--glow);animation:blink .7s step-end infinite;vertical-align:middle}
.plat-section{padding:120px 0}
.plat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.plat-card{background:var(--card);border:1px solid var(--b1);border-radius:var(--rl);padding:28px 24px;position:relative;overflow:hidden;opacity:0;transform:translateY(28px) scale(.97);transition:opacity .6s cubic-bezier(0.16,1,0.3,1),transform .7s cubic-bezier(0.34,1.56,0.64,1),border-color .3s,box-shadow .3s;backdrop-filter:blur(20px);will-change:transform;cursor:default}
.plat-card.v{opacity:1;transform:translateY(0) scale(1)}
.plat-card:hover{border-color:rgba(139,92,246,.3);box-shadow:0 20px 56px rgba(139,92,246,.1),0 8px 24px rgba(37,99,235,.08)}
.plat-icon{width:62px;height:62px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;transition:transform .4s cubic-bezier(0.34,1.56,0.64,1),box-shadow .3s;flex-shrink:0}
.plat-card:hover .plat-icon{transform:translateY(-5px) scale(1.07);box-shadow:0 14px 32px rgba(0,0,0,.45)}
.plat-text{flex:1;min-width:0}
.plat-name{font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;margin-bottom:6px;letter-spacing:.3px}
.plat-desc{font-size:13px;color:var(--text2);line-height:1.65;font-weight:300}
.proc-section{padding:120px 0}
.proc-grid{display:grid;grid-template-columns:repeat(4,1fr);position:relative}
.proc-connector{position:absolute;top:33px;left:12.5%;right:12.5%;height:1px;background:linear-gradient(90deg,transparent,var(--b2),var(--b2),transparent)}
.proc-step{text-align:center;padding:0 16px;opacity:0;transform:translateY(20px) scale(.95);transition:opacity .5s cubic-bezier(0.16,1,0.3,1),transform .7s cubic-bezier(0.34,1.56,0.64,1);position:relative;z-index:1}
.proc-step.v{opacity:1;transform:translateY(0) scale(1)}
.proc-circle{width:66px;height:66px;border-radius:50%;background:var(--bg3);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:13px;font-weight:700;color:var(--glow);margin:0 auto 20px;transition:all .35s;position:relative}
.proc-step:hover .proc-circle{background:rgba(37,99,235,.18);box-shadow:0 0 36px rgba(37,99,235,.4);border-color:var(--b3)}
.proc-body{flex:1}.proc-title{font-family:'Rajdhani',sans-serif;font-size:16px;font-weight:600;margin-bottom:8px}
.proc-desc{font-size:13px;color:var(--text2);line-height:1.7;font-weight:300}
.testi-section{padding:120px 0}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.testi-card{background:var(--card);border:1px solid var(--b1);border-radius:var(--rl);padding:30px 26px;opacity:0;transform:translateY(24px);transition:opacity .6s cubic-bezier(0.16,1,0.3,1),transform .7s cubic-bezier(0.34,1.56,0.64,1),border-color .3s;backdrop-filter:blur(20px);position:relative;overflow:hidden;will-change:transform}
.testi-card.v{opacity:1;transform:translateY(0)}
.testi-card:hover{border-color:var(--b2);box-shadow:0 20px 52px rgba(37,99,235,.1)}
.testi-quote{position:absolute;top:-12px;right:20px;font-family:'Rajdhani',sans-serif;font-size:120px;color:rgba(37,99,235,.05);line-height:1;pointer-events:none}
.stars{color:#fbbf24;font-size:11px;margin-bottom:13px;letter-spacing:3px}
.testi-text{font-size:13.5px;color:var(--text2);line-height:1.85;margin-bottom:22px;font-weight:300;font-style:italic}
.testi-author{display:flex;align-items:center;gap:10px}
.testi-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--blue2),var(--cyan));display:flex;align-items:center;justify-content:center;font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.testi-name{font-size:13px;font-weight:600}
.testi-role{font-family:'Space Mono',monospace;font-size:9.5px;color:var(--text3);margin-top:2px;letter-spacing:.5px}
.cta-section{padding:120px 0}
.cta-inner{background:linear-gradient(135deg,rgba(37,99,235,.1),rgba(6,182,212,.04));border:1px solid rgba(37,99,235,.2);border-radius:28px;padding:80px 56px;text-align:center;position:relative;overflow:hidden;opacity:0;transform:translateY(32px) scale(.98);transition:opacity .9s cubic-bezier(0.16,1,0.3,1),transform 1s cubic-bezier(0.34,1.56,0.64,1)}
.cta-inner.v{opacity:1;transform:translateY(0) scale(1)}
.cta-glow{position:absolute;top:-120px;left:50%;transform:translateX(-50%);width:520px;height:300px;background:radial-gradient(ellipse,rgba(37,99,235,.15),transparent 70%);animation:glowPulse 4s ease infinite;pointer-events:none}
.cta-glow-2{top:auto;bottom:-100px;background:radial-gradient(ellipse,rgba(6,182,212,.08),transparent 70%);animation-delay:2s}
.cta-grid-bg{position:absolute;inset:0;background:linear-gradient(rgba(37,99,235,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.025) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
.cta-title{font-family:'Rajdhani',sans-serif;font-size:clamp(36px,4.5vw,60px);font-weight:700;letter-spacing:-.5px;margin-bottom:18px;position:relative;z-index:1}
.cta-sub{font-size:16px;color:var(--text2);margin-bottom:40px;position:relative;z-index:1;font-weight:300}
.cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
footer{border-top:1px solid var(--b1);padding:56px 0 30px;position:relative;z-index:2}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:44px;margin-bottom:44px}
.footer-desc{font-size:13px;color:var(--text3);line-height:1.7;max-width:240px;font-weight:300;margin-bottom:20px}
.footer-socials{display:flex;gap:10px}
.footer-social-link{display:flex;align-items:center;justify-content:center;width:36px;height:36px;background:rgba(255,255,255,.03);border:1px solid var(--b1);border-radius:8px;transition:all .3s cubic-bezier(0.16,1,0.3,1)}
.footer-social-link:hover{background:rgba(37,99,235,.1);border-color:var(--b2);transform:translateY(-4px);box-shadow:0 8px 20px rgba(37,99,235,.15)}
.footer-col-h{font-family:'Space Mono',monospace;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:14px;color:var(--text2)}
.footer-col ul{list-style:none;display:flex;flex-direction:column;gap:8px}
.footer-col ul a{font-size:13px;color:var(--text3);text-decoration:none;transition:color .2s,transform .25s;font-weight:300;display:inline-block}
.footer-col ul a:hover{color:var(--glow);transform:translateX(4px)}
.footer-bottom{border-top:1px solid var(--b1);padding-top:24px;display:flex;justify-content:space-between;align-items:center}
.footer-bottom p{font-family:'Space Mono',monospace;font-size:9px;color:var(--text3);letter-spacing:1px}
@media(max-width:1200px){.wrap{padding:0 24px}.navbar{padding:0 24px}.svcs-grid,.plat-grid{grid-template-columns:repeat(2,1fr)}.why-inner{gap:52px}.dbc-outer{width:470px;height:352px}}

@media(max-width:1024px){
  .nav-ul{display:none}.ham{display:flex}
  .hero{padding:80px 24px 56px}
  .hero-wrap{grid-template-columns:1fr;gap:12px;text-align:center;padding:0}
  .hero-left{align-items:center;text-align:center;padding-left:0}
  .hero-right{justify-content:center}
  .hero-h1{font-size:clamp(48px,9vw,80px)}
  .hero-p{max-width:580px;text-align:center}
  .hero-ctas{justify-content:center}
  .hero-mini-stats{justify-content:center}
  .float-tag{display:none}
  
  
  
  
  
  
  
  
  .stats-section{padding:44px 0}.stat-num{font-size:44px}
  .svcs-section,.why-section,.plat-section,.proc-section,.testi-section,.cta-section{padding:96px 0}
  .svcs-grid{grid-template-columns:repeat(2,1fr)}
  .plat-grid{grid-template-columns:repeat(3,1fr)}
  .why-inner{grid-template-columns:1fr;gap:56px}.why-left{transform:none!important}.why-item{transform:none!important}
  .proc-grid{grid-template-columns:repeat(2,1fr);row-gap:48px}.proc-connector{display:none}
  .testi-grid{grid-template-columns:repeat(2,1fr)}.testi-grid .testi-card:last-child{grid-column:1/-1}
  .cta-inner{padding:60px 44px}
  footer{padding:44px 0 24px}.footer-grid{grid-template-columns:1fr 1fr;gap:32px}.footer-brand{grid-column:1/-1}.footer-desc{max-width:100%}
}

@media(max-width:768px){
  .navbar{padding:0 16px;height:58px}.logo{font-size:14px;letter-spacing:1.5px}
  .logo-wrap svg{width:40px!important;height:40px!important}
  .logo-main{font-size:15px;letter-spacing:.5px}
  .hero{padding:72px 20px 48px;min-height:100svh}
  .hero-wrap{gap:16px}
  .hero-h1{font-size:clamp(38px,10vw,64px);letter-spacing:-.5px}
  .hero-p{font-size:15px;max-width:100%}
  .hero-ctas{flex-direction:column;align-items:center;gap:10px}
  .hero-ctas a{width:100%;max-width:320px;justify-content:center}
  .hero-mini-stats{gap:14px;flex-wrap:wrap}
  .hms-num{font-size:18px}.hms-label{font-size:8px}
  
  
  
  
  
  
  
  
  .stats-section{padding:36px 0}
  .stats-grid{grid-template-columns:repeat(2,1fr)}
  .stat-item{border-right:none;border-bottom:1px solid var(--b1);padding:18px 12px}
  .stat-item:nth-child(1),.stat-item:nth-child(2){border-right:1px solid var(--b1)}
  .stat-item:nth-child(3),.stat-item:nth-child(4){border-bottom:none}
  .stat-num{font-size:40px}.stat-label{font-size:8px}
  .section-head{margin-bottom:44px}
  .svcs-grid{grid-template-columns:1fr;gap:10px}
  .svc-card{padding:20px 20px;display:flex;flex-direction:row;align-items:flex-start;gap:16px;flex-wrap:wrap}
  .svc-top{flex-direction:column;align-items:flex-start;gap:4px;margin-bottom:0;flex-shrink:0;width:52px}
  .svc-num{font-size:9px}.svc-icon{width:40px;height:40px;font-size:17px}
  .svc-content{flex:1;min-width:0}.svc-title{font-size:16px;margin-bottom:6px}.svc-desc{font-size:13px}
  .plat-grid{grid-template-columns:repeat(2,1fr);gap:10px}
  .plat-card{padding:18px 16px;display:flex;flex-direction:row;align-items:center;gap:14px}
  .plat-icon{width:44px;height:44px;border-radius:10px;margin-bottom:0;flex-shrink:0}
  .plat-text{flex:1;min-width:0}.plat-name{font-size:14px;margin-bottom:3px}.plat-desc{font-size:11.5px;line-height:1.5}
  .terminal{font-size:10.5px;padding:18px 18px;overflow-x:auto}
  .proc-grid{grid-template-columns:repeat(2,1fr);row-gap:36px}
  .testi-grid{grid-template-columns:1fr;gap:12px}.testi-grid .testi-card:last-child{grid-column:auto}.testi-card{padding:24px 20px}
  .cta-inner{padding:44px 28px;border-radius:20px}.cta-title{font-size:clamp(28px,6vw,44px)}.cta-sub{font-size:15px}
  .cta-btns{flex-direction:column;align-items:center}.cta-btns a{width:100%;max-width:300px;justify-content:center}
  footer{padding:40px 0 22px}.footer-grid{grid-template-columns:1fr 1fr;gap:28px}.footer-bottom{flex-direction:column;gap:8px;text-align:center}
}

@media(max-width:600px){
  .wrap{padding:0 14px}.navbar{padding:0 14px}
  .logo-wrap svg{width:34px!important;height:34px!important}
  .logo-main{font-size:14px}
  .lang-btn{padding:3px}.lang-switcher{padding:2px;gap:2px}
  .theme-toggle-mob{width:30px;height:30px;font-size:14px}
  .ham{width:32px}
  .hero{padding:76px 16px 52px}.hero-wrap{gap:24px}
  .hero-h1{font-size:clamp(32px,11vw,50px);line-height:1.0}
  .hero-mini-stats{justify-content:center;gap:10px}.hero-pre{font-size:9px;letter-spacing:1.5px}
  .scroll-indicator{display:none}
  
  
  
  
  
  
  
  
  .stats-section{padding:24px 0}.stat-num{font-size:36px}
  .svcs-section,.why-section,.plat-section,.proc-section,.testi-section,.cta-section{padding:64px 0}
  .plat-grid{grid-template-columns:repeat(2,1fr);gap:8px}
  .plat-card{padding:14px 12px;gap:10px}.plat-icon{width:38px;height:38px;border-radius:9px}
  .plat-name{font-size:13px}.plat-desc{font-size:11px}
  .proc-grid{grid-template-columns:1fr;gap:24px}
  .proc-step{display:flex;align-items:flex-start;text-align:left;gap:18px;padding:0}
  .proc-circle{margin:0;flex-shrink:0;width:50px;height:50px;font-size:11px}.proc-body{padding-top:4px}
  .footer-grid{grid-template-columns:1fr;gap:24px}.footer-col{border-top:1px solid var(--b1);padding-top:18px}
  .cta-inner{padding:32px 18px;border-radius:16px}
}

@media(max-width:480px){
  .logo-text{display:none}
  .logo-wrap svg{width:32px!important;height:32px!important}
  .hero-h1{font-size:clamp(28px,12vw,46px)}
  .btn-p,.btn-o{padding:12px 20px;font-size:13px}
  .stat-num{font-size:32px}.stat-label{font-size:7px;letter-spacing:1px}
  .svc-card{padding:16px 14px;gap:12px}.svc-icon{width:36px;height:36px;font-size:15px}.svc-top{width:36px}.svc-title{font-size:15px}
  .plat-grid{grid-template-columns:1fr}.plat-card{padding:14px 16px;gap:14px}.plat-icon{width:42px;height:42px}.plat-name{font-size:15px}.plat-desc{font-size:12px}
  .why-item{padding:14px 16px}.terminal{font-size:10px;padding:14px}
  .cta-inner{padding:26px 14px}.cta-title{font-size:clamp(22px,7vw,36px)}
  .footer-grid{gap:18px}.footer-bottom p{font-size:8px}.testi-card{padding:20px 16px}
  
  
}

@media(max-width:360px){
  .wrap{padding:0 12px}.navbar{padding:0 12px}.logo{font-size:13px;letter-spacing:1px}
  .hero-h1{font-size:26px}.hero-ctas a{max-width:100%}
  .stats-grid{grid-template-columns:1fr}
  .stat-item{border-right:none!important;border-bottom:1px solid var(--b1)!important}
  .stat-item:last-child{border-bottom:none!important}
  .proc-circle{width:44px;height:44px;font-size:10px}.plat-grid{grid-template-columns:1fr}
  
}


/* ── MODAL ── */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeUp .3s ease}
.modal-box{background:#060b18;border:1px solid var(--b2);border-radius:22px;width:100%;max-width:680px;max-height:90vh;overflow-y:auto;position:relative;padding:40px 40px 36px;box-shadow:0 32px 80px rgba(0,0,0,.6)}
.modal-close{position:absolute;top:18px;right:18px;background:rgba(255,255,255,.05);border:1px solid var(--b1);color:var(--text2);width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:14px;transition:all .2s;display:flex;align-items:center;justify-content:center}
.modal-close:hover{background:rgba(255,255,255,.1);color:var(--text)}
.modal-head{margin-bottom:28px}
.modal-title{font-family:"Rajdhani",sans-serif;font-size:28px;font-weight:700;margin-bottom:8px}
.modal-sub{font-size:14px;color:var(--text2);font-weight:300}
.modal-form{display:flex;flex-direction:column;gap:16px}
.mf-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.mf-group{display:flex;flex-direction:column;gap:6px}
.mf-group.mf-full{grid-column:1/-1}
.mf-group label{font-family:"Space Mono",monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text2)}
.mf-group input,.mf-group textarea{background:rgba(255,255,255,.04);border:1px solid var(--b1);border-radius:8px;padding:11px 14px;color:var(--text);font-family:"Space Grotesk",sans-serif;font-size:14px;font-weight:300;transition:border-color .2s,box-shadow .2s;outline:none;resize:none}
.mf-group input:focus,.mf-group textarea:focus{border-color:var(--b3);box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.mf-group input::placeholder,.mf-group textarea::placeholder{color:var(--text3)}
.mf-checks{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
.mf-chip{background:rgba(255,255,255,.04);border:1px solid var(--b1);border-radius:20px;padding:6px 14px;font-size:12px;color:var(--text2);cursor:pointer;transition:all .2s;font-family:"Space Grotesk",sans-serif;font-weight:400}
.mf-chip:hover{border-color:var(--b2);color:var(--text)}
.mf-chip.sel{background:rgba(37,99,235,.2);border-color:var(--b3);color:var(--glow)}
.mf-err{font-size:13px;color:#f87171;padding:8px 12px;background:rgba(248,113,113,.08);border-radius:7px;border:1px solid rgba(248,113,113,.2)}
.mf-submit{width:100%;justify-content:center;padding:14px;font-size:15px;margin-top:4px}
.modal-success{text-align:center;padding:32px 0}
.modal-success-icon{width:64px;height:64px;border-radius:50%;background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px;color:#22c55e}
.modal-success h3{font-family:"Rajdhani",sans-serif;font-size:26px;font-weight:700;margin-bottom:10px}
.modal-success p{color:var(--text2);font-size:15px;font-weight:300}
@media(max-width:600px){
  .modal-box{padding:28px 20px 24px}
  .mf-row{grid-template-columns:1fr}
  .modal-title{font-size:22px}
}

/* ── LANG SWITCHER FIX ── */
.lang-btn{background:transparent;border:none;cursor:pointer;padding:5px;border-radius:7px;transition:background .2s,transform .15s;display:flex;align-items:center;line-height:1}
.lang-btn:hover{background:rgba(255,255,255,.08);transform:scale(1.08)}
.lang-btn.active{background:rgba(37,99,235,.25);box-shadow:0 0 8px rgba(37,99,235,.3)}
.lang-switcher{display:flex;align-items:center;gap:3px;background:rgba(255,255,255,.04);border:1px solid var(--b1);border-radius:9px;padding:3px}
.lang-mob{display:none}

/* ── RESPONSIVE DBC CANVAS ── */
.dbc-outer{position:relative;width:700px;height:525px;flex-shrink:0;transform-origin:top center;margin:0 auto}
/* Scale formula: based on 700x525 canvas */
.hero-right{overflow:hidden}
@media(max-width:1024px){.hero-right{overflow:visible;padding-top:24px}}
@media(max-width:1200px){
  .dbc-outer{transform:scale(0.92);transform-origin:top center;margin-bottom:calc(525px*(0.92 - 1))}
}
@media(max-width:1024px){
  .hero-right{display:flex;justify-content:center;width:100%}
  .dbc-outer{transform:scale(0.86);margin-right:0;margin-bottom:calc(525px*(0.86 - 1))}
}
@media(max-width:768px){
  .dbc-outer{transform:scale(0.50);margin-bottom:calc(525px*(0.50 - 1))}
}
@media(max-width:600px){
  .dbc-outer{transform:scale(0.42);margin-bottom:calc(525px*(0.42 - 1))}
}
@media(max-width:480px){
  .dbc-outer{transform:scale(0.36);margin-bottom:calc(525px*(0.36 - 1))}
}
@media(max-width:390px){
  .dbc-outer{transform:scale(0.32);margin-bottom:calc(525px*(0.32 - 1))}
}
@media(max-width:360px){
  .dbc-outer{transform:scale(0.29);margin-bottom:calc(525px*(0.29 - 1))}
}

/* ── LOGO ── */
.logo-wrap{display:inline-flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
.logo-text{display:flex;flex-direction:column;gap:0}
.logo-main{font-family:'Space Mono',monospace;font-size:22px;font-weight:700;color:var(--text);letter-spacing:1px;line-height:1}
.logo-main em{font-style:normal;color:#00d4ff}
.logo-sub{font-family:'Space Grotesk',sans-serif;font-size:9px;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;line-height:1;margin-top:3px}
.mob-logo{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:'Space Mono',monospace;font-size:14px;font-weight:700;color:var(--text);letter-spacing:1px;margin-bottom:28px}

/* ── LANG SWITCHER ── */
.lang-switcher{display:flex;align-items:center;gap:2px;background:rgba(255,255,255,.04);border:1px solid var(--b1);border-radius:8px;padding:3px}
.lang-btn{background:transparent;border:none;cursor:pointer;padding:4px 8px;border-radius:5px;font-size:17px;transition:background .2s,transform .15s;line-height:1;display:flex;align-items:center}
.lang-btn:hover{background:rgba(255,255,255,.07);transform:scale(1.12)}
.lang-btn.active{background:rgba(37,99,235,.25);box-shadow:0 0 8px rgba(37,99,235,.3)}
.lang-mob{display:none}
@media(max-width:1024px){.lang-mob{display:flex}}

/* ── FAQ ── */
.faq-section{padding:120px 0;background:linear-gradient(180deg,transparent,rgba(37,99,235,.025),transparent)}
.faq-list{display:flex;flex-direction:column;gap:10px;opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(0.16,1,0.3,1),transform .8s cubic-bezier(0.16,1,0.3,1)}
.faq-list.v{opacity:1;transform:translateY(0)}
.faq-item{background:var(--card);border:1px solid var(--b1);border-radius:var(--r);overflow:hidden;cursor:pointer;transition:border-color .3s,box-shadow .3s;backdrop-filter:blur(16px)}
.faq-item:hover{border-color:var(--b2)}
.faq-item.open{border-color:var(--b2);box-shadow:0 8px 32px rgba(37,99,235,.1)}
.faq-q{display:flex;align-items:center;gap:14px;padding:20px 24px;user-select:none}
.faq-num{font-family:'Space Mono',monospace;font-size:10px;color:var(--glow);letter-spacing:1px;font-weight:700;flex-shrink:0;min-width:24px}
.faq-qtext{flex:1;font-family:'Rajdhani',sans-serif;font-size:17px;font-weight:600;letter-spacing:.2px}
.faq-icon{font-size:22px;color:var(--glow);font-weight:300;flex-shrink:0;width:24px;text-align:center;transition:transform .35s cubic-bezier(0.34,1.56,0.64,1)}
.faq-item.open .faq-icon{transform:rotate(45deg)}
.faq-a{max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(0.16,1,0.3,1)}
.faq-item.open .faq-a{max-height:280px}
.faq-a p{padding:0 24px 20px 52px;font-size:14px;color:var(--text2);line-height:1.85;font-weight:300}

/* ── MANIFESTO ── */
.manifesto-section{padding:120px 0;position:relative;overflow:hidden}
.manifesto-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(139,92,246,.06) 0%,transparent 35%,rgba(37,99,235,.04) 60%,rgba(6,182,212,.03) 100%);pointer-events:none}
.manifesto-grid{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:stretch;grid-template-rows:1fr}
.manifesto-inner{opacity:0;transform:translateX(-28px);transition:opacity .9s cubic-bezier(0.16,1,0.3,1),transform 1s cubic-bezier(0.16,1,0.3,1);position:relative;z-index:2}
.manifesto-inner.v{opacity:1;transform:translateX(0)}
.manifesto-tag{font-family:'Space Mono',monospace;font-size:9px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--pink);margin-bottom:16px;display:block}
.manifesto-title{font-family:'Rajdhani',sans-serif;font-size:clamp(36px,4.5vw,66px);font-weight:700;letter-spacing:4px;background:linear-gradient(125deg,#fff 0%,var(--purple) 30%,var(--glow) 65%,var(--cyan) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200%;animation:gradAnim 6s ease infinite;margin-bottom:20px;line-height:1.05}
.manifesto-line{width:90px;height:1px;background:linear-gradient(90deg,transparent,var(--purple),var(--cyan));margin:0 0 40px}
.manifesto-body{display:flex;flex-direction:column;gap:20px}
.manifesto-lead{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:2px;color:var(--pink);text-transform:uppercase;line-height:1.7}
.manifesto-accent{font-family:'Rajdhani',sans-serif;font-size:19px;font-weight:500;color:var(--text);line-height:1.6;letter-spacing:.2px}
.manifesto-p{font-size:14.5px;color:var(--text2);line-height:1.9;font-weight:300}
.manifesto-highlight{font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;color:var(--text);border-left:3px solid var(--purple);padding-left:20px;line-height:1.55;margin:6px 0}
.manifesto-closing{font-family:'Space Mono',monospace;font-size:12px;color:var(--pink);letter-spacing:1px;line-height:1.8;margin-top:6px;padding:20px;border:1px solid rgba(139,92,246,.28);border-radius:var(--r);background:linear-gradient(135deg,rgba(139,92,246,.06),rgba(37,99,235,.05))}
.manifesto-visual{opacity:0;transform:translateX(28px);transition:opacity .9s .2s cubic-bezier(0.16,1,0.3,1),transform 1s .2s cubic-bezier(0.34,1.56,0.64,1);position:relative;z-index:2}
.manifesto-visual.v{opacity:1;transform:translateX(0)}
.manifesto-mob-bg{display:none}
.manifesto-img-wrap{position:absolute;inset:0;border-radius:28px;overflow:hidden;box-shadow:0 0 0 1px rgba(139,92,246,.3),0 32px 80px rgba(0,0,0,.55),0 0 80px rgba(139,92,246,.12)}
.manifesto-img{width:100%;height:100%;object-fit:cover;object-position:center 60%;display:block}
.manifesto-img-shine{position:absolute;inset:0;background:linear-gradient(135deg,rgba(139,92,246,.1) 0%,transparent 50%,rgba(6,182,212,.08) 100%);pointer-events:none}

@media(max-width:768px){
  .faq-section,.manifesto-section{padding:72px 0}
  .faq-qtext{font-size:15px}.faq-a p{padding:0 16px 16px 16px}
  .logo-sub{display:none}.logo-main{font-size:17px}
  .manifesto-mob-bg{display:block;position:absolute;inset:-12px;background-image:url('/pazar_zekasi3.png');background-size:cover;background-position:center top;filter:blur(10px);opacity:.55;pointer-events:none;z-index:0}
  .manifesto-section::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(3,5,14,.82) 0%,rgba(3,5,14,.38) 40%,rgba(3,5,14,.38) 60%,rgba(3,5,14,.82) 100%);z-index:1;pointer-events:none}
  .manifesto-bg{display:none}
  .manifesto-grid{grid-template-columns:1fr;gap:0;align-items:start}
  .manifesto-inner{z-index:3;transform:translateY(28px)}
  .manifesto-inner.v{transform:translateY(0)}
  .manifesto-visual{display:none}
  .manifesto-title{font-size:clamp(30px,8vw,48px);letter-spacing:3px}
  .manifesto-line{margin:0 0 32px}
  .manifesto-highlight{font-size:18px}.manifesto-accent{font-size:17px}
  .vision-grid{grid-template-columns:1fr}
  .vision-img-col{order:1;margin-top:40px}
  .vision-content{order:0}
  .vision-title{font-size:clamp(28px,7vw,44px)}
  .vision-pills{flex-wrap:wrap}
}
@media(max-width:480px){
  .faq-section,.manifesto-section{padding:56px 0}
  .faq-q{padding:14px 16px;gap:10px}.faq-num{font-size:9px}.faq-qtext{font-size:14px}
  .faq-a p{font-size:13px;padding:0 14px 14px 14px}
  .manifesto-p{font-size:13.5px}.manifesto-closing{font-size:11px}
  .vision-section{padding:64px 0}
  .vision-p{font-size:14px}.vision-highlight{font-size:15px}
}

/* ── VISION ── */
.vision-section{padding:120px 0;position:relative;overflow:hidden}
.vision-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(6,182,212,.03) 0%,transparent 40%,rgba(139,92,246,.04) 70%,transparent 100%);pointer-events:none}
.vision-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.vision-img-col{opacity:0;transform:translateX(-28px);transition:opacity .9s cubic-bezier(0.16,1,0.3,1),transform 1s cubic-bezier(0.34,1.56,0.64,1)}
.vision-img-col.v{opacity:1;transform:translateX(0)}
.vision-img-frame{position:relative;border-radius:28px;overflow:visible}
.vision-img{width:100%;display:block;border-radius:24px;box-shadow:0 40px 100px rgba(0,0,0,.55);animation:brainFloat 10s ease-in-out infinite}
.vision-img-glow{position:absolute;inset:-30px;border-radius:50px;background:radial-gradient(ellipse at center,rgba(139,92,246,.18) 0%,rgba(96,165,250,.08) 45%,transparent 70%);pointer-events:none;animation:warmGlow 6s ease-in-out infinite;filter:blur(20px)}
.vision-content{opacity:0;transform:translateX(28px);transition:opacity .9s .2s cubic-bezier(0.16,1,0.3,1),transform 1s .2s cubic-bezier(0.16,1,0.3,1)}
.vision-content.v{opacity:1;transform:translateX(0)}
.vision-title{font-family:'Rajdhani',sans-serif;font-size:clamp(36px,4.2vw,60px);font-weight:700;letter-spacing:2px;background:linear-gradient(125deg,#fff 0%,var(--cyan) 40%,var(--purple) 80%,var(--pink) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200%;animation:gradAnim 7s ease infinite;margin-bottom:20px;line-height:1.05}
.vision-line{width:80px;height:1px;background:linear-gradient(90deg,var(--cyan),var(--purple),transparent);margin:0 0 32px}
.vision-p{font-size:15px;color:var(--text2);line-height:1.9;font-weight:300;margin-bottom:18px}
.vision-highlight{font-family:'Rajdhani',sans-serif;font-size:17px;font-weight:600;color:var(--text);border-left:3px solid var(--cyan);padding:12px 18px;background:rgba(6,182,212,.05);border-radius:0 var(--r) var(--r) 0;line-height:1.6;margin-bottom:28px}
.vision-pills{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}
.vision-pill{font-family:'Space Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--cyan);border:1px solid rgba(6,182,212,.25);border-radius:20px;padding:6px 14px;background:rgba(6,182,212,.05);transition:all .3s}
.vision-pill:hover{background:rgba(6,182,212,.12);border-color:rgba(6,182,212,.5);transform:translateY(-2px)}

/* ── REKLAM ÇEKİMLERİ ── */
.reklam-section{padding:120px 0;position:relative;overflow:hidden}
.reklam-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(6,182,212,.03) 0%,transparent 40%,rgba(139,92,246,.04) 100%);pointer-events:none}
.reklam-grid{display:grid;grid-template-columns:minmax(260px,400px) 1fr;gap:52px;align-items:center}
.reklam-content{opacity:0;transform:translateX(-28px);transition:opacity .9s cubic-bezier(0.16,1,0.3,1),transform 1s cubic-bezier(0.16,1,0.3,1)}
.reklam-content.v{opacity:1;transform:translateX(0)}
.reklam-title{font-family:'Rajdhani',sans-serif;font-size:clamp(30px,3.5vw,52px);font-weight:700;letter-spacing:2px;background:linear-gradient(125deg,#fff 0%,var(--cyan) 40%,var(--purple) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200%;animation:gradAnim 7s ease infinite;margin-bottom:16px;line-height:1.05}
.reklam-line{width:80px;height:1px;background:linear-gradient(90deg,var(--cyan),var(--purple),transparent);margin:0 0 24px}
.reklam-p{font-size:14.5px;color:var(--text2);line-height:1.85;font-weight:300;margin-bottom:20px}
.reklam-list{list-style:none;display:flex;flex-direction:column;gap:9px;margin-bottom:24px}
.reklam-list-item{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text2);font-weight:300}
.reklam-dot{width:6px;height:6px;border-radius:50%;background:var(--cyan);flex-shrink:0}
.reklam-cta-box{display:flex;align-items:flex-start;gap:12px;background:linear-gradient(135deg,rgba(6,182,212,.07),rgba(139,92,246,.06));border:1px solid rgba(6,182,212,.2);border-radius:var(--r);padding:16px 18px}
.reklam-cta-icon{font-size:20px;flex-shrink:0;margin-top:2px}
.reklam-cta-box p{font-family:'Rajdhani',sans-serif;font-size:16px;font-weight:600;color:var(--text);line-height:1.5}
.reklam-img-col{opacity:0;transform:translateX(28px);transition:opacity .9s .2s cubic-bezier(0.16,1,0.3,1),transform 1s .2s cubic-bezier(0.34,1.56,0.64,1)}
.reklam-img-col.v{opacity:1;transform:translateX(0)}
.reklam-img-wrap{border-radius:24px;overflow:hidden;box-shadow:0 0 0 1px rgba(6,182,212,.2),0 24px 60px rgba(0,0,0,.5),0 0 50px rgba(6,182,212,.07)}
.reklam-img{width:100%;height:auto;display:block;object-fit:contain}
.reklam-img-shine{position:absolute;inset:0;background:linear-gradient(135deg,rgba(6,182,212,.08) 0%,transparent 50%,rgba(139,92,246,.06) 100%);pointer-events:none}

/* ── POLICY MODAL ── */
.policy-modal-box{max-height:80vh;display:flex;flex-direction:column}
.policy-body{overflow-y:auto;padding:0 4px;margin-top:20px;flex:1;scrollbar-width:thin;scrollbar-color:var(--b2) transparent}
.policy-h3{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:700;color:var(--glow);letter-spacing:1px;margin:18px 0 6px}
.policy-p{font-size:13.5px;color:var(--text2);line-height:1.85;font-weight:300}
.footer-legal-links{display:flex;align-items:center;gap:4px}
.footer-legal-btn{background:none;border:none;color:var(--text3);font-family:'Space Mono',monospace;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;transition:color .2s;padding:2px 4px}
.footer-legal-btn:hover{color:var(--glow)}

/* ── THEME TOGGLE ── */
.theme-toggle{background:none;border:1px solid var(--b2);border-radius:8px;color:var(--text2);font-size:16px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;padding:0}
.theme-toggle:hover{border-color:var(--b3);background:rgba(37,99,235,.08)}
.theme-toggle-mob{display:none}
@media(max-width:1024px){.theme-toggle-mob{display:flex}}

/* ── LIGHT MODE ── */
[data-theme="light"]{--bg:#f0f4ff;--bg2:#e6ecfa;--bg3:#dae3f5;--text:#080f2a;--text2:#1a2f5e;--text3:#3d5080;--glow:#1d4ed8;--cyan:#0891b2;--purple:#6d28d9;--card:rgba(255,255,255,.97);--b1:rgba(37,99,235,.15);--b2:rgba(37,99,235,.28);--b3:rgba(37,99,235,.55)}
[data-theme="light"] body{background:var(--bg);color:var(--text)}
[data-theme="light"] .navbar{background:rgba(240,244,255,.97);border-bottom:1px solid rgba(37,99,235,.15)}
[data-theme="light"] .navbar.sc{background:rgba(240,244,255,.98);box-shadow:0 4px 24px rgba(37,99,235,.1)}
[data-theme="light"] .nav-link{color:var(--text2)}
[data-theme="light"] .nav-link:hover{color:var(--purple)}
[data-theme="light"] body::after{background:none}
[data-theme="light"] .hero-sub,.hero-sub{color:var(--text2)}
[data-theme="light"] .section-tag{color:var(--purple);border-color:rgba(109,40,217,.3);background:rgba(109,40,217,.08)}
[data-theme="light"] .section-sub{color:var(--text2)}
[data-theme="light"] .card{background:rgba(255,255,255,.95);border-color:rgba(37,99,235,.18)}
[data-theme="light"] .card p,.card-desc{color:var(--text2)}
[data-theme="light"] .stat-label{color:var(--text2)}
[data-theme="light"] .why-card{background:rgba(255,255,255,.95);border-color:rgba(37,99,235,.2)}
[data-theme="light"] .why-desc{color:var(--text2)}
[data-theme="light"] .step-card{background:rgba(255,255,255,.95);border-color:rgba(37,99,235,.2)}
[data-theme="light"] .step-desc{color:var(--text2)}
[data-theme="light"] .test-card{background:rgba(255,255,255,.97);border-color:rgba(37,99,235,.18)}
[data-theme="light"] .test-text{color:var(--text2)}
[data-theme="light"] .test-role{color:var(--text3)}
[data-theme="light"] .faq-item{border-color:rgba(37,99,235,.2)}
[data-theme="light"] .faq-q{color:var(--text)}
[data-theme="light"] .faq-a{color:var(--text2)}
[data-theme="light"] .manifesto-section{background-image:none!important}
[data-theme="light"] .manifesto-section::before{display:none}
[data-theme="light"] .manifesto-bg{background:linear-gradient(135deg,rgba(109,40,217,.05) 0%,transparent 35%,rgba(37,99,235,.04) 100%)}
[data-theme="light"] .manifesto-mob-bg{display:none!important}
[data-theme="light"] .manifesto-title{color:var(--text)}
[data-theme="light"] .manifesto-lead{color:var(--text2)}
[data-theme="light"] .vision-title{color:var(--text)}
[data-theme="light"] .vision-text{color:var(--text2)}
[data-theme="light"] .reklam-title{color:var(--text)}
[data-theme="light"] .reklam-desc{color:var(--text2)}
[data-theme="light"] .footer-copy{color:var(--text3)}
[data-theme="light"] .modal-overlay{background:rgba(8,15,42,.6)}
[data-theme="light"] .modal-box{background:#fff;border-color:rgba(37,99,235,.2)}
[data-theme="light"] .modal-title{color:var(--text)}
[data-theme="light"] .modal-body{color:var(--text2)}
[data-theme="light"] .stat-num{background:linear-gradient(135deg,#0a1f5c,var(--blue2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
[data-theme="light"] .hms-num{background:linear-gradient(135deg,#0a1f5c,var(--blue2));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
[data-theme="light"] .line-grad{background:linear-gradient(125deg,#0a1635 0%,var(--purple) 28%,var(--blue2) 55%,var(--cyan) 80%,#4f1ca8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200%;animation:gradAnim 5s ease infinite}
[data-theme="light"] .line-em,[data-theme="light"] .line-plain{color:var(--text);-webkit-text-fill-color:var(--text)}
[data-theme="light"] .sec-title{color:var(--text)}
[data-theme="light"] .hero-pre{color:var(--cyan)}
[data-theme="light"] .blink-dot{background:var(--cyan)}
[data-theme="light"] .stat-bar-bg{background:rgba(37,99,235,.15)}
[data-theme="light"] .hms-div{background:rgba(37,99,235,.25)}
[data-theme="light"] .hms-label{color:var(--text3)}
[data-theme="light"] .stat-label{color:var(--text3)}
[data-theme="light"] .scroll-txt{color:var(--text3)}
[data-theme="light"] .nav-ul a{color:var(--text2)}
[data-theme="light"] .ham span{background:var(--text)}
[data-theme="light"] .hero-vignette{background:radial-gradient(ellipse 100% 100% at 50% 50%,transparent 30%,rgba(240,244,255,.7))}
[data-theme="light"] body::after{display:none}
[data-theme="light"] .mob-menu{background:rgba(240,244,255,.99);border-left-color:rgba(37,99,235,.18)}
[data-theme="light"] .mob-menu ul a{color:var(--text2)}
[data-theme="light"] .mob-menu ul a:hover{color:var(--purple)}
[data-theme="light"] .mob-menu ul li{border-bottom-color:rgba(37,99,235,.12)}
[data-theme="light"] .mob-overlay{background:rgba(8,15,42,.45)}
[data-theme="light"] .vision-section::after{background:linear-gradient(to bottom,rgba(240,244,255,.88) 0%,rgba(240,244,255,.52) 25%,rgba(240,244,255,.52) 75%,rgba(240,244,255,.88) 100%)}
[data-theme="light"] .reklam-section::after{background:linear-gradient(to bottom,rgba(240,244,255,.88) 0%,rgba(240,244,255,.52) 25%,rgba(240,244,255,.52) 75%,rgba(240,244,255,.88) 100%)}
[data-theme="light"] .vision-mob-bg{opacity:.45}
[data-theme="light"] .reklam-mob-bg{opacity:.45}
[data-theme="light"] .hero-grid-bg{background:linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);background-size:48px 48px}

/* ── VISION & REKLAM MOB BG ── */
.vision-mob-bg,.reklam-mob-bg{display:none;position:absolute;inset:-20px;background-size:cover;background-position:center;filter:blur(10px);opacity:0;pointer-events:none}
@media(max-width:768px){
  /* vision mobile */
  .vision-section{overflow:hidden;isolation:isolate}
  .vision-mob-bg{display:block;background-image:url('/pazar_zekasi2.jpeg');opacity:.6}
  .vision-section::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(3,5,14,.85) 0%,rgba(3,5,14,.28) 25%,rgba(3,5,14,.28) 75%,rgba(3,5,14,.85) 100%);z-index:1;pointer-events:none}
  .vision-img-col{display:none}
  .vision-grid{grid-template-columns:1fr}
  .vision-content{position:relative;z-index:2}
  /* reklam mobile */
  .reklam-section{overflow:hidden;isolation:isolate;padding:72px 0}
  .reklam-mob-bg{display:block;background-image:url('/reklam_cekimleri.jpeg');opacity:.6}
  .reklam-section::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(3,5,14,.85) 0%,rgba(3,5,14,.28) 25%,rgba(3,5,14,.28) 75%,rgba(3,5,14,.85) 100%);z-index:1;pointer-events:none}
  .reklam-grid{grid-template-columns:1fr;grid-template-rows:auto}
  .reklam-content{transform:translateY(28px);position:relative;z-index:2}.reklam-content.v{transform:translateY(0)}
  .reklam-img-col{display:none}
  .reklam-title{font-size:clamp(28px,7vw,44px)}
}
/* REKLAM responsive ── */
@media(max-width:900px){.reklam-grid{gap:40px}}
@media(max-width:480px){
  .reklam-section{padding:56px 0}
  .reklam-p{font-size:14px}.reklam-list-item{font-size:13.5px}
}
`;


