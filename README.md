# إمتثال | Imtithal

منصة SaaS أولية لشركات الفنتك الناشئة في السعودية، تساعد على قياس الجاهزية التنظيمية والتقنية عبر تحويل متطلبات SAMA / NCA / PDPL إلى فحوصات رقمية.

## ماذا يحتوي المشروع؟

- واجهة Prototype بسيطة وسهلة الاستخدام.
- Mock Data لشركة فنتك ناشئة.
- JSON Rules Engine يحسب Pass / Fail.
- Dashboard لدرجة الجاهزية والفجوات.
- AI Explanation محاكي لشرح المخاطر واقتراح الإصلاحات.
- تقرير جاهزية أولي قابل للطباعة.
- Backend FastAPI اختياري لتشغيل الفحوصات عبر API.

## التقنيات المستخدمة

- Frontend: HTML/CSS/JavaScript Prototype، قابل للتحويل إلى React / Next.js.
- Backend: FastAPI.
- Data Format: JSON.
- Compliance Engine: JSON Rules Engine.
- Database planned: PostgreSQL.
- AI Layer planned: LLM / OpenAI API.
- Reporting: HTML/PDF-ready Audit Report.

## تشغيل الواجهة بسرعة

افتح الملف التالي مباشرة:

```bash
frontend/index.html
```

أو شغّل سيرفر محلي:

```bash
cd frontend
python -m http.server 8080
```

ثم افتح:

```bash
http://localhost:8080
```

## تشغيل Backend الاختياري

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

ثم:

```bash
http://127.0.0.1:8000/docs
```

## ملاحظة مهمة

البيانات الداخلية للشركات مثل MFA والصلاحيات والسجلات غير متاحة للعامة، لذلك يستخدم هذا النموذج Mock Data آمنة لمحاكاة بيئة شركة فنتك. الفكرة مستوحاة من مفهوم Compliance-to-Code، لكن هذا النموذج يطبق نسخة MVP مبسطة باستخدام JSON Rules بدل توليد كود كامل.
