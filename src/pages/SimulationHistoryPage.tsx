import { CalendarClock, ChevronRight, Goal } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const { getAllSimulations } = useSimulationStorage()

  const simulations = getAllSimulations()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Consulte suas simulações financeiras anteriores."
      />

      {simulations.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground">
            Nenhuma simulação encontrada
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Crie sua primeira simulação para começar a acompanhar seus
            objetivos financeiros.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Criar simulação
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {simulations.map((simulation) => (
            <Link
              key={simulation.id}
              to={`/resultado/${simulation.id}`}
              className="group block rounded-2xl border bg-card p-6 transition hover:shadow-[4px_4px_18px_0px_rgba(0,0,0,0.12)]"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Goal
                      size={20}
                      className="shrink-0 text-primary"
                    />

                    <h2 className="truncate text-lg font-semibold text-foreground">
                      {simulation.goalName}
                    </h2>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Meta:{' '}
                    <span className="font-medium text-foreground">
                      {simulation.goalAmount}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarClock size={16} />

                    <span>{simulation.goalDeadline} meses</span>
                  </div>

                  <ChevronRight
                    size={20}
                    className="text-muted-foreground transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}