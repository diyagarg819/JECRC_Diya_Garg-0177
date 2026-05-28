type Props = {
  label: string;
  value: string | number;
  tone?: 'default' | 'danger';
};

export function MetricCard({ label, value, tone = 'default' }: Props) {
  return (
    <article className={`metric-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
