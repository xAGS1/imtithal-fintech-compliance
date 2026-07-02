let company = null;
let rules = [];
let results = [];

const sampleCompany = {
  company_id: "fintech-demo-001",
  company_name: "AgsPay",
  sector: "FinTech",
  activity_type: "Digital Wallet and Payment Services",
  country: "Saudi Arabia",
  target_frameworks: ["SAMA", "NCA", "PDPL"],
  technical_environment: {
    mfa_enabled: true,
    encryption_at_rest: true,
    encryption_in_transit: true,
    audit_logging_enabled: true,
    admin_users_count: 4,
    least_privilege_reviewed: false,
    privacy_policy_published: true,
    data_retention_policy_exists: true,
    incident_response_plan_exists: false,
    backup_enabled: true,
    backup_tested_recently: true,
    github_branch_protection: true,
    ci_cd_security_scan: true,
    secrets_scanning_enabled: false,
    customer_data_classified: true,
    third_party_risk_review: true,
    access_review_quarterly: true,
    vulnerability_management_exists: true,
    security_training_completed: true,
    data_breach_notification_process: true,
    logs_retention_days: 90,
    password_policy_strong: true,
    api_rate_limiting_enabled: true,
    production_debug_disabled: true,
    disaster_recovery_plan_exists: true
  }
};

const sampleRules = [];

function addRule(id, framework, subject, field, expected, severity, rationale, remediation, operator='=='){
  sampleRules.push({
    id, framework, subject,
    condition: id.startsWith('DEV') ? 'عند استخدام مستودع GitHub أو CI/CD' : 'عند تشغيل المنصة أو معالجة بيانات العملاء',
    constraint: `يجب أن يكون ${field} ${operator} ${expected}`,
    context: 'FinTech compliance readiness MVP',
    field, operator, expected, severity,
    evidence: field.replaceAll('_',' '), rationale, remediation
  });
}
addRule('IAM-001','SAMA / NCA','المصادقة متعددة العوامل','mfa_enabled',true,'High','تفعيل MFA للحسابات الإدارية','فعّل MFA لجميع الحسابات الحساسة.');
addRule('SEC-001','NCA','التشفير أثناء التخزين','encryption_at_rest',true,'High','حماية البيانات المخزنة بالتشفير','فعّل encryption-at-rest لقواعد البيانات والتخزين.');
addRule('SEC-002','NCA / PDPL','التشفير أثناء النقل','encryption_in_transit',true,'High','حماية البيانات أثناء انتقالها','استخدم TLS لجميع الاتصالات.');
addRule('LOG-001','SAMA / NCA','تفعيل سجلات التدقيق','audit_logging_enabled',true,'Medium','تسجيل العمليات الحساسة للمراجعة','فعّل audit logs للأنظمة المهمة.');
addRule('IAM-002','NCA','مراجعة أقل صلاحية','least_privilege_reviewed',true,'High','مراجعة صلاحيات المستخدمين','نفّذ مراجعة دورية للصلاحيات وقلل صلاحيات admin.');
addRule('PDPL-001','PDPL','سياسة الخصوصية منشورة','privacy_policy_published',true,'Medium','إعلام العملاء بكيفية معالجة بياناتهم','انشر سياسة الخصوصية وحدثها.');
addRule('PDPL-002','PDPL','سياسة الاحتفاظ بالبيانات','data_retention_policy_exists',true,'Medium','تحديد مدة الاحتفاظ بالبيانات','وثّق سياسة الاحتفاظ والحذف.');
addRule('IR-001','NCA / SAMA','خطة الاستجابة للحوادث','incident_response_plan_exists',true,'High','وجود خطة للتعامل مع الحوادث','أنشئ خطة استجابة للحوادث مع مسؤوليات واضحة.');
addRule('BCP-001','SAMA','النسخ الاحتياطي','backup_enabled',true,'Medium','ضمان استمرارية الخدمة','فعّل النسخ الاحتياطي الدوري.');
addRule('BCP-002','SAMA','اختبار النسخ الاحتياطي','backup_tested_recently',true,'Medium','التأكد من قابلية الاستعادة','اختبر الاستعادة من النسخ الاحتياطي دوريًا.');
addRule('DEV-001','NCA','حماية فروع GitHub','github_branch_protection',true,'Medium','منع التغيير المباشر على الفروع المهمة','فعّل branch protection وcode review.');
addRule('DEV-002','NCA','فحص أمني في CI/CD','ci_cd_security_scan',true,'Medium','اكتشاف الثغرات قبل النشر','أضف dependency/security scanning للـ pipeline.');
addRule('DEV-003','NCA','فحص الأسرار البرمجية','secrets_scanning_enabled',true,'High','منع تسريب مفاتيح API وكلمات المرور','فعّل secrets scanning ونظف الأسرار من المستودع.');
addRule('DATA-001','PDPL','تصنيف بيانات العملاء','customer_data_classified',true,'Medium','تمييز البيانات الشخصية والحساسة','صنف البيانات حسب مستوى الحساسية.');
addRule('TPR-001','SAMA / NCA','مراجعة مخاطر الأطراف الثالثة','third_party_risk_review',true,'Medium','مراجعة مزودي الخدمات الخارجية','وثّق تقييم المخاطر للمزودين.');
addRule('IAM-003','SAMA / NCA','مراجعة الوصول ربع سنوية','access_review_quarterly',true,'High','مراجعة وصول المستخدمين بانتظام','طبق access review ربع سنوية.');
addRule('VUL-001','NCA','إدارة الثغرات','vulnerability_management_exists',true,'Medium','وجود آلية لمعالجة الثغرات','وثّق برنامج إدارة الثغرات.');
addRule('AWR-001','NCA','تدريب أمني للموظفين','security_training_completed',true,'Low','رفع الوعي الأمني','أكمل تدريب الوعي الأمني.');
addRule('PDPL-003','PDPL','إجراءات إشعار خرق البيانات','data_breach_notification_process',true,'High','وجود آلية للإبلاغ عن خرق البيانات','وثّق إجراء الإشعار والتصعيد.');
addRule('LOG-002','SAMA / NCA','مدة الاحتفاظ بالسجلات','logs_retention_days',90,'Medium','الاحتفاظ بالسجلات لفترة كافية','اضبط الاحتفاظ بالسجلات على 90 يومًا أو أكثر.','>=');
addRule('IAM-004','NCA','سياسة كلمات المرور','password_policy_strong',true,'Medium','تقليل مخاطر الحسابات الضعيفة','فعّل سياسة كلمات مرور قوية.');
addRule('API-001','SAMA / NCA','تحديد معدل الطلبات API Rate Limiting','api_rate_limiting_enabled',true,'Medium','حماية واجهات API من الإساءة','فعّل rate limiting ومراقبة الطلبات.');
addRule('DEV-004','NCA','إيقاف Debug في الإنتاج','production_debug_disabled',true,'High','منع كشف معلومات حساسة','تأكد من تعطيل debug mode في الإنتاج.');
addRule('BCP-003','SAMA','خطة التعافي من الكوارث','disaster_recovery_plan_exists',true,'Medium','استمرارية الخدمات المالية','وثّق خطة DR وحدد RTO/RPO.');
addRule('DOC-001','SAMA / NCA / PDPL','توثيق الأدلة للتدقيق','evidence_pack_ready',false,'Low','تجهيز الأدلة للمراجعة','اربط الأدلة لكل فحص قبل التدقيق.');

function evaluateRule(env, rule){
  const value = env[rule.field];
  let passed = false;
  if(rule.operator === '>=') passed = Number(value) >= Number(rule.expected);
  else passed = value === rule.expected;
  return {...rule, actual:value, passed};
}
function runChecks(){
  company = company || sampleCompany;
  rules = rules.length ? rules : sampleRules;
  const env = company.technical_environment || {};
  results = rules.map(r => evaluateRule(env,r));
  renderAll();
}
function stats(){
  const total = results.length || 0;
  const passed = results.filter(r=>r.passed).length;
  const failed = total - passed;
  const high = results.filter(r=>!r.passed && r.severity === 'High').length;
  const score = total ? Math.round((passed/total)*100) : 0;
  return {total, passed, failed, high, score};
}
function renderAll(){
  const s = stats();
  document.querySelectorAll('[data-company]').forEach(e=>e.textContent = company.company_name);
  document.querySelector('[data-score]').textContent = s.score + '%';
  document.querySelector('[data-passed]').textContent = s.passed;
  document.querySelector('[data-total]').textContent = s.total;
  document.querySelector('[data-failed]').textContent = s.failed;
  document.querySelector('[data-high]').textContent = s.high;
  document.querySelector('.ring').style.background = `conic-gradient(var(--teal) 0 ${Math.round(s.score*3.6)}deg,#e6edf5 ${Math.round(s.score*3.6)}deg)`;
  renderFindings(); renderControls(); renderAI(); renderData(); renderReport();
}
function renderControls(){
  const tbody = document.querySelector('#controlsBody');
  tbody.innerHTML = results.map(r => `<tr><td>${r.id}</td><td>${r.framework}</td><td>${r.subject}</td><td><span class="status ${r.passed?'pass':'fail'}">${r.passed?'Pass':'Fail'}</span></td><td><span class="badge ${r.severity}">${r.severity}</span></td></tr>`).join('');
}
function renderFindings(){
  const tbody = document.querySelector('#findingsBody');
  const failed = results.filter(r=>!r.passed);
  tbody.innerHTML = failed.map(r => `<tr><td>${r.id}</td><td>${r.subject}</td><td><span class="badge ${r.severity}">${r.severity}</span></td><td>${r.evidence}</td><td>${r.remediation}</td></tr>`).join('');
}
function renderAI(){
  const failed = results.filter(r=>!r.passed);
  const ai = document.querySelector('#aiOutput');
  ai.innerHTML = failed.map(r => `<div class="card ai-card"><h3>${r.subject}</h3><p><b>السبب:</b> فشل الفحص لأن القيمة الحالية (${r.actual ?? 'غير متوفرة'}) لا تحقق القيد: ${r.constraint}.</p><p><b>الأثر:</b> ${r.rationale}.</p><p><b>الإصلاح المقترح:</b> ${r.remediation}</p></div>`).join('');
}
function renderData(){
  document.querySelector('#jsonCompany').textContent = JSON.stringify(company, null, 2);
  document.querySelector('#jsonRules').textContent = JSON.stringify(rules.slice(0,4), null, 2) + '\n\n... 21 more rules';
}
function renderReport(){
  const s = stats();
  const failed = results.filter(r=>!r.passed);
  document.querySelector('#reportContent').innerHTML = `
    <h2>تقرير جاهزية امتثال أولي</h2>
    <p><b>الشركة:</b> ${company.company_name} — ${company.activity_type}</p>
    <p><b>الأطر المستهدفة:</b> ${company.target_frameworks.join(' / ')}</p>
    <h3>النتيجة التنفيذية</h3>
    <p>درجة الجاهزية الحالية ${s.score}% بناءً على ${s.total} فحص امتثال. نجح النظام في ${s.passed} فحصًا، واكتشف ${s.failed} فجوات، منها ${s.high} عالية الأولوية.</p>
    <h3>الفجوات عالية الأولوية</h3>
    <ul>${failed.filter(r=>r.severity==='High').map(r=>`<li>${r.subject}: ${r.remediation}</li>`).join('')}</ul>
    <h3>الخلاصة</h3>
    <p>النموذج الأولي يوضح قدرة المنصة على تحليل بيانات شركة فنتك، تشغيل قواعد JSON، استخراج Pass/Fail، ثم توليد خطة إصلاح وتقرير جاهزية قابل للتدقيق.</p>`;
}
function switchSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active', b.dataset.target === id));
}
function downloadReport(){
  const blob = new Blob([document.querySelector('#reportContent').innerText], {type:'text/plain;charset=utf-8'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'imtithal_readiness_report.txt'; a.click();
}
async function uploadJson(evt){
  const file = evt.target.files[0]; if(!file) return;
  const text = await file.text();
  company = JSON.parse(text); runChecks();
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>switchSection(b.dataset.target));
  document.querySelector('#runBtn').onclick = runChecks;
  document.querySelector('#printBtn').onclick = ()=>window.print();
  document.querySelector('#downloadBtn').onclick = downloadReport;
  document.querySelector('#jsonUpload').addEventListener('change', uploadJson);
  runChecks();
});
