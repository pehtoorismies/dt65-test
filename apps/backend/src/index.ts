import { initTRPC } from '@trpc/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { z } from 'zod'

const t = initTRPC.context().create()

const router = t.router({
  greet: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return `Hello ${input.name}!`
    }),
  hello: t.procedure.query(() => {
    return 'Hello World!!'
  }),
})

export type Router = typeof router

export default {
  async fetch(request: Request): Promise<Response> {
    return fetchRequestHandler({
      router,
      req: request,
      endpoint: '/',
      createContext: (opts) => opts,
    })
  },
}
