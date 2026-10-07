/** Cabeçalho editorial de seção: (02) ———————— About — O Artista */
export function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="label flex items-center gap-4 text-ash md:gap-6">
      <span className="text-bone" data-reveal="fade">
        ({index})
      </span>
      <span className="h-px flex-1 bg-smoke" data-reveal="line-x" />
      <span data-reveal="fade">{label}</span>
    </div>
  );
}
