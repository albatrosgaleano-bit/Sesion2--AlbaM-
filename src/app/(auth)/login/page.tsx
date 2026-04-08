export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="bg-[linear-gradient(180deg,#1f6b45_0%,#2d333a_100%)] p-8 text-white md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Acceso local</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Trazabilidad de cultivo y procesado</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-white/78">
            Pantalla base para autenticacion local con usuario y contrasena. Diseñada para escritorio y tablet en entorno LAN.
          </p>
        </section>
        <section className="p-8 md:p-10">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">Inicio de sesion</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">En el MVP se integrara autenticacion local con hash seguro y control por roles.</p>
            <form className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Usuario</span>
                <input className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 outline-none focus:border-[var(--color-primary-600)]" placeholder="operario.invernadero" />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">Contrasena</span>
                <input type="password" className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3 outline-none focus:border-[var(--color-primary-600)]" placeholder="••••••••" />
              </label>
              <button type="button" className="w-full rounded-2xl bg-[var(--color-primary-700)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--color-primary-600)]">
                Acceder
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
