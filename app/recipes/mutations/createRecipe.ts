import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateRecipe = z.object({
  title: z.string(),
  instructions: z.string(),
  ingredients1: z.string(),
  ingredients2: z.string(),
  ingredients3: z.string(),
  ingredients4: z.string(),
  ingredients5: z.string(),
  ingredients6: z.string(),
  image: z.string(),
})

export default resolver.pipe(resolver.zod(CreateRecipe), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const recipe = await db.recipe.create({ data: input })

  return recipe
})
