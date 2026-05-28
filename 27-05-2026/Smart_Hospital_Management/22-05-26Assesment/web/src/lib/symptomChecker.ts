const rules = [
  { terms: ['chest', 'breath', 'sweat'], advice: 'Possible cardiac emergency. Call emergency care and mark the case Critical.' },
  { terms: ['fever', 'cough', 'throat'], advice: 'Respiratory infection symptoms. Book general medicine and recommend lab screening if fever persists.' },
  { terms: ['headache', 'blurred', 'vomit'], advice: 'Neurological warning signs. Prioritize doctor review today.' },
  { terms: ['rash', 'itching', 'swelling'], advice: 'Possible allergy or dermatology issue. Check medication history before prescribing.' }
];

export function checkSymptoms(input: string): string {
  const normalized = input.toLowerCase();
  const match = rules.find(rule => rule.terms.some(term => normalized.includes(term)));
  return match?.advice ?? 'No urgent pattern detected. Collect vitals and route to appointment scheduling.';
}
