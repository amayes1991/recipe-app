import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteRecipe = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteRecipe), resolver.authorize(), async ({ id }) => {
  const recipe = await db.recipe.deleteMany({ where: { id } })

  return recipe
})
