'use strict';

let company = null;
let rules = [];
let results = [];

const sampleCompany = {
  company_id: 'agspay-001',
  company_name: 'AgsPay',
  sector: 'FinTech',
  activity_type: 'Digital Wallet and Payment Services',
  country: 'Saudi Arabia',
  target_frameworks: ['SAMA', 'NCA', 'PDPL'],
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
    disaster_recovery_plan_exists: true,
    evidence_pack_ready: false
  }
};

const sampleRules = [];
function addRule(id, framework, subject, field, expected, severity, rationale, remediation, operator = '==', evidenceLabel = null) {
  sampleRules.push({
    id, framework, subject,
    condition: id.startsWith('DEV') ? 'عند استخدام مستودع GitHub أو CI/CD' : 'عند تشغيل المنصة أو معالجة بيانات العملاء',
    constraint: `يجب أن يكون ${field} ${operator} ${String(expected)}`,
    context: 'FinTech compliance readiness',
    field, operator, expected, severity,
    evidence: evidenceLabel || field.replaceAll('_', ' '),
    rationale, remediation
  });
}

addRule('IAM-001','SAMA / NCA','المصادقة متعددة العوامل','mfa_enabled',true,'High','تقليل مخاطر الاستيلاء على الحسابات الإدارية','فعّل MFA لجميع الحسابات الحساسة.','==','MFA configuration');
addRule('SEC-001','NCA','التشفير أثناء التخزين','encryption_at_rest',true,'High','حماية البيانات المخزنة من الوصول غير المصرح','فعّل encryption-at-rest لقواعد البيانات والتخزين.','==','Encryption settings');
addRule('SEC-002','NCA / PDPL','التشفير أثناء النقل','encryption_in_transit',true,'High','حماية البيانات أثناء انتقالها بين الأنظمة','استخدم TLS لجميع الاتصالات.','==','TLS configuration');
addRule('LOG-001','SAMA / NCA','تفعيل سجلات التدقيق','audit_logging_enabled',true,'Medium','توفير أثر قابل للمراجعة للعمليات الحساسة','فعّل audit logs للأنظمة المهمة.','==','Audit log settings');
addRule('IAM-002','NCA','مراجعة مبدأ أقل صلاحية','least_privilege_reviewed',true,'High','تقليل الصلاحيات الزائدة داخل الأنظمة','نفّذ مراجعة دورية للصلاحيات وقلل صلاحيات admin.','==','Access review record');
addRule('PDPL-001','PDPL','سياسة الخصوصية منشورة','privacy_policy_published',true,'Medium','إعلام العملاء بكيفية معالجة بياناتهم','انشر سياسة الخصوصية وحدثها.','==','Published privacy policy');
addRule('PDPL-002','PDPL','سياسة الاحتفاظ بالبيانات','data_retention_policy_exists',true,'Medium','تحديد مدة الاحتفاظ والحذف بشكل واضح','وثّق سياسة الاحتفاظ والحذف.','==','Retention policy');
addRule('IR-001','NCA / SAMA','خطة الاستجابة للحوادث','incident_response_plan_exists',true,'High','رفع الجاهزية للاستجابة للحوادث الأمنية','أنشئ خطة استجابة للحوادث مع مسؤوليات واضحة.','==','Incident response plan');
addRule('BCP-001','SAMA','النسخ الاحتياطي','backup_enabled',true,'Medium','ضمان استمرارية الخدمة وحماية البيانات','فعّل النسخ الاحتياطي الدوري.','==','Backup configuration');
addRule('BCP-002','SAMA','اختبار النسخ الاحتياطي','backup_tested_recently',true,'Medium','التأكد من إمكانية استعادة البيانات','اختبر الاستعادة من النسخ الاحتياطي دوريًا.','==','Recovery test record');
addRule('DEV-001','NCA','حماية فروع GitHub','github_branch_protection',true,'Medium','منع التغييرات المباشرة غير المراجعة','فعّل branch protection وcode review.','==','Repository settings');
addRule('DEV-002','NCA','فحص أمني في CI/CD','ci_cd_security_scan',true,'Medium','اكتشاف الثغرات قبل النشر','أضف dependency/security scanning للـ pipeline.','==','CI/CD pipeline evidence');
addRule('DEV-003','NCA','فحص الأسرار البرمجية','secrets_scanning_enabled',true,'High','منع تسريب مفاتيح API وكلمات المرور','فعّل secrets scanning ونظف الأسرار من المستودع.','==','Secret scanning settings');
addRule('DATA-001','PDPL','تصنيف بيانات العملاء','customer_data_classified',true,'Medium','تمييز البيانات الشخصية والحساسة','صنف البيانات حسب مستوى الحساسية.','==','Data classification register');
addRule('TPR-001','SAMA / NCA','مراجعة مخاطر الأطراف الثالثة','third_party_risk_review',true,'Medium','إدارة مخاطر مزودي الخدمات الخارجية','وثّق تقييم المخاطر للمزودين.','==','Third-party risk assessment');
addRule('IAM-003','SAMA / NCA','مراجعة الوصول ربع سنوية','access_review_quarterly',true,'High','مراجعة وصول المستخدمين بانتظام','طبّق access review ربع سنوية.','==','Quarterly access review');
addRule('VUL-001','NCA','إدارة الثغرات','vulnerability_management_exists',true,'Medium','وجود آلية مستمرة لمعالجة الثغرات','وثّق برنامج إدارة الثغرات.','==','Vulnerability management procedure');
addRule('AWR-001','NCA','تدريب أمني للموظفين','security_training_completed',true,'Low','رفع الوعي الأمني وتقليل الأخطاء البشرية','أكمل تدريب الوعي الأمني.','==','Training completion record');
addRule('PDPL-003','PDPL','إجراءات إشعار خرق البيانات','data_breach_notification_process',true,'High','وجود آلية للإبلاغ والتصعيد عند خرق البيانات','وثّق إجراء الإشعار والتصعيد.','==','Breach notification procedure');
addRule('LOG-002','SAMA / NCA','مدة الاحتفاظ بالسجلات','logs_retention_days',90,'Medium','الاحتفاظ بالسجلات لفترة كافية للمراجعة','اضبط الاحتفاظ بالسجلات على 90 يومًا أو أكثر.','>=','Log retention setting');
addRule('IAM-004','NCA','سياسة كلمات المرور','password_policy_strong',true,'Medium','تقليل مخاطر الحسابات الضعيفة','فعّل سياسة كلمات مرور قوية.','==','Password policy');
addRule('API-001','SAMA / NCA','تحديد معدل طلبات API','api_rate_limiting_enabled',true,'Medium','حماية واجهات API من الإساءة والضغط','فعّل rate limiting ومراقبة الطلبات.','==','API gateway configuration');
addRule('DEV-004','NCA','إيقاف Debug في الإنتاج','production_debug_disabled',true,'High','منع كشف معلومات حساسة في بيئة الإنتاج','تأكد من تعطيل debug mode في الإنتاج.','==','Production configuration');
addRule('BCP-003','SAMA','خطة التعافي من الكوارث','disaster_recovery_plan_exists',true,'Medium','استمرارية الخدمات المالية أثناء الانقطاعات','وثّق خطة DR وحدد RTO/RPO.','==','Disaster recovery plan');
addRule('DOC-001','SAMA / NCA / PDPL','حزمة الأدلة جاهزة للتدقيق','evidence_pack_ready',true,'Low','تجميع الأدلة يسهل المراجعة الرسمية','اربط الأدلة بكل فحص قبل التدقيق.','==','Evidence pack index');

function evaluateRule(env, rule) {
  const value = env[rule.field];
  let passed = false;
  if (rule.operator === '>=') passed = Number(value) >= Number(rule.expected);
  else if (rule.operator === '<=') passed = Number(value) <= Number(rule.expected);
  else passed = value === rule.expected;
  return { ...rule, actual: value, passed, evidence_status: passed ? 'Available' : 'Missing / Incomplete' };
}

function validateCompanyPayload(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('ملف JSON غير صالح.');
  if (!payload.technical_environment || typeof payload.technical_environment !== 'object') {
    throw new Error('يجب أن يحتوي الملف على technical_environment.');
  }
  return payload;
}

function runChecks() {
  company = company || structuredClone(sampleCompany);
  rules = rules.length ? rules : structuredClone(sampleRules);
  const env = company.technical_environment || {};
  results = rules.map(rule => evaluateRule(env, rule));
  renderAll();
  showToast(`تم تشغيل ${results.length} فحصًا بنجاح.`);
}

function stats() {
  const total = results.length;
  const passed = results.filter(r => r.passed).length;
  const failed = total - passed;
  const high = results.filter(r => !r.passed && r.severity === 'High').length;
  const score = total ? Math.round((passed / total) * 100) : 0;
  return { total, passed, failed, high, score };
}

function renderAll() {
  const s = stats();
  document.querySelectorAll('[data-company]').forEach(el => el.textContent = company.company_name || 'شركة فنتك تجريبية');
  document.querySelectorAll('[data-score]').forEach(el => el.textContent = `${s.score}%`);
  document.querySelectorAll('[data-passed]').forEach(el => el.textContent = s.passed);
  document.querySelectorAll('[data-total]').forEach(el => el.textContent = s.total);
  document.querySelectorAll('[data-failed]').forEach(el => el.textContent = s.failed);
  document.querySelectorAll('[data-high]').forEach(el => el.textContent = s.high);
  document.querySelector('.ring').style.background = `conic-gradient(var(--teal) 0 ${Math.round(s.score * 3.6)}deg,#e6edf5 ${Math.round(s.score * 3.6)}deg)`;
  renderControls();
  renderFindings();
  renderAI();
  renderData();
  renderReport();
}

function frameworkMatches(ruleFramework, selected) {
  return selected === 'all' || ruleFramework.split('/').map(v => v.trim()).includes(selected);
}

function getFilteredResults() {
  const q = document.querySelector('#checkSearch')?.value.trim().toLowerCase() || '';
  const framework = document.querySelector('#frameworkFilter')?.value || 'all';
  const status = document.querySelector('#statusFilter')?.value || 'all';
  const severity = document.querySelector('#severityFilter')?.value || 'all';
  return results.filter(r => {
    const matchesText = !q || `${r.id} ${r.subject} ${r.framework} ${r.evidence}`.toLowerCase().includes(q);
    const matchesFramework = frameworkMatches(r.framework, framework);
    const matchesStatus = status === 'all' || (status === 'pass' ? r.passed : !r.passed);
    const matchesSeverity = severity === 'all' || r.severity === severity;
    return matchesText && matchesFramework && matchesStatus && matchesSeverity;
  });
}

function renderControls() {
  const tbody = document.querySelector('#controlsBody');
  const filtered = getFilteredResults();
  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td><code>${escapeHtml(r.id)}</code></td>
      <td>${escapeHtml(r.framework)}</td>
      <td>${escapeHtml(r.subject)}</td>
      <td><span class="status-chip ${r.passed ? 'pass-bg' : 'fail-bg'}">${r.passed ? 'Pass' : 'Fail'}</span></td>
      <td><span class="badge ${r.severity}">${r.severity}</span></td>
      <td><span class="evidence ${r.passed ? 'available' : 'missing'}">${r.evidence_status}</span></td>
      <td><button class="link-btn" data-rule-id="${escapeHtml(r.id)}">عرض</button></td>
    </tr>`).join('');
  document.querySelector('#controlsEmpty').hidden = filtered.length !== 0;
  tbody.querySelectorAll('[data-rule-id]').forEach(btn => btn.addEventListener('click', () => openRuleModal(btn.dataset.ruleId)));
}

function renderFindings() {
  const tbody = document.querySelector('#findingsBody');
  const failed = results.filter(r => !r.passed).sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
  tbody.innerHTML = failed.map(r => `
    <tr>
      <td><code>${escapeHtml(r.id)}</code></td>
      <td>${escapeHtml(r.subject)}</td>
      <td>${escapeHtml(r.framework)}</td>
      <td><span class="badge ${r.severity}">${r.severity}</span></td>
      <td>${escapeHtml(r.evidence)}</td>
      <td>${escapeHtml(r.remediation)}</td>
    </tr>`).join('');
}

function renderAI() {
  const failed = results.filter(r => !r.passed).sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
  const ai = document.querySelector('#aiOutput');
  ai.innerHTML = failed.map(r => `
    <article class="card ai-card">
      <div class="ai-card-head"><h3>${escapeHtml(r.subject)}</h3><span class="badge ${r.severity}">${r.severity}</span></div>
      <p><b>سبب النتيجة:</b> القيمة الحالية <code>${formatValue(r.actual)}</code> لا تحقق القيد المطلوب: ${escapeHtml(r.constraint)}.</p>
      <p><b>الأثر المحتمل:</b> ${escapeHtml(r.rationale)}.</p>
      <p><b>الإجراء المقترح:</b> ${escapeHtml(r.remediation)}</p>
    </article>`).join('');
}

function renderData() {
  document.querySelector('#jsonCompany').textContent = JSON.stringify(company, null, 2);
  document.querySelector('#jsonRules').textContent = `${JSON.stringify(rules.slice(0, 4), null, 2)}\n\n... ${Math.max(rules.length - 4, 0)} more rules`;
}

function renderReport() {
  const s = stats();
  const failed = results.filter(r => !r.passed);
  const highFindings = failed.filter(r => r.severity === 'High');
  document.querySelector('#reportContent').innerHTML = `
    <div class="report-header"><div><h2>تقرير جاهزية الامتثال</h2><p>Compliance Readiness Report</p></div><span class="report-score">${s.score}%</span></div>
    <div class="report-meta">
      <p><b>الشركة:</b> ${escapeHtml(company.company_name || 'غير متوفر')}</p>
      <p><b>النشاط:</b> ${escapeHtml(company.activity_type || 'غير متوفر')}</p>
      <p><b>الأطر المستهدفة:</b> ${escapeHtml((company.target_frameworks || []).join(' / '))}</p>
    </div>
    <h3>النتيجة التنفيذية</h3>
    <p>درجة الجاهزية <b>${s.score}%</b> بناءً على ${s.total} فحصًا. نجح ${s.passed} فحصًا، واكتُشفت ${s.failed} فجوات، منها ${s.high} عالية الأولوية.</p>
    <h3>الفجوات عالية الأولوية</h3>
    ${highFindings.length ? `<ul>${highFindings.map(r => `<li><b>${escapeHtml(r.subject)}:</b> ${escapeHtml(r.remediation)}</li>`).join('')}</ul>` : '<p>لا توجد فجوات عالية الأولوية.</p>'}
    <h3>الخطوة التالية</h3>
    <p>معالجة الفجوات عالية الأولوية، إرفاق الأدلة التقنية المطلوبة، ثم إعادة تشغيل الفحص للحصول على نتيجة محدثة.</p>`;
}

function openRuleModal(ruleId) {
  const rule = results.find(r => r.id === ruleId);
  if (!rule) return;
  document.querySelector('#modalBody').innerHTML = `
    <div class="modal-title-row"><div><small>${escapeHtml(rule.id)} · ${escapeHtml(rule.framework)}</small><h2 id="modalTitle">${escapeHtml(rule.subject)}</h2></div><span class="status-chip ${rule.passed ? 'pass-bg' : 'fail-bg'}">${rule.passed ? 'Pass' : 'Fail'}</span></div>
    <div class="detail-grid">
      <div><span>Subject</span><strong>${escapeHtml(rule.subject)}</strong></div>
      <div><span>Condition</span><strong>${escapeHtml(rule.condition)}</strong></div>
      <div><span>Constraint</span><strong>${escapeHtml(rule.constraint)}</strong></div>
      <div><span>Context</span><strong>${escapeHtml(rule.context)}</strong></div>
      <div><span>Actual value</span><strong><code>${formatValue(rule.actual)}</code></strong></div>
      <div><span>Expected value</span><strong><code>${formatValue(rule.expected)}</code></strong></div>
      <div><span>Evidence</span><strong>${escapeHtml(rule.evidence)} | ${rule.evidence_status}</strong></div>
      <div><span>Severity</span><strong><span class="badge ${rule.severity}">${rule.severity}</span></strong></div>
    </div>
    <div class="modal-note"><b>التفسير:</b> ${escapeHtml(rule.rationale)}</div>
    <div class="modal-note fix"><b>الإجراء المقترح:</b> ${escapeHtml(rule.remediation)}</div>`;
  const modal = document.querySelector('#ruleModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeRuleModal() {
  const modal = document.querySelector('#ruleModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function switchSection(id) {
  document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav button').forEach(button => button.classList.toggle('active', button.dataset.target === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function downloadText(filename, content, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}


function downloadResultsJson() {
  const payload = { generated_at: new Date().toISOString(), company, summary: stats(), results };
  downloadText('imtithal_scan_results.json', JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
}


async function uploadJson(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    company = validateCompanyPayload(JSON.parse(text));
    runChecks();
    showToast(`تم تحميل ملف ${file.name}.`);
  } catch (error) {
    showToast(error.message || 'تعذر قراءة ملف JSON.', true);
  } finally {
    event.target.value = '';
  }
}

function showToast(message, isError = false) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function severityRank(severity) { return ({ High: 0, Medium: 1, Low: 2 })[severity] ?? 3; }
function formatValue(value) { return value === undefined ? 'غير متوفر' : escapeHtml(String(value)); }
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[ch]);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav button').forEach(button => button.addEventListener('click', () => switchSection(button.dataset.target)));
  document.querySelector('#runBtn').addEventListener('click', runChecks);
  document.querySelector('#resetBtn').addEventListener('click', () => { company = structuredClone(sampleCompany); runChecks(); showToast('تمت استعادة بيانات AgsPay.'); });
  document.querySelector('#printBtn').addEventListener('click', () => window.print());
    document.querySelector('#downloadJsonBtn').addEventListener('click', downloadResultsJson);
  document.querySelector('#jsonUpload').addEventListener('change', uploadJson);
  ['#checkSearch', '#frameworkFilter', '#statusFilter', '#severityFilter'].forEach(selector => {
    const element = document.querySelector(selector);
    element.addEventListener(element.tagName === 'INPUT' ? 'input' : 'change', renderControls);
  });
  document.querySelectorAll('[data-close-modal]').forEach(element => element.addEventListener('click', closeRuleModal));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeRuleModal(); });
  company = structuredClone(sampleCompany);
  rules = structuredClone(sampleRules);
  runChecks();
});
