import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateRecipe = z.object({
  id: z.number(),
  title: z.string(),
  image: z.string(),
  instructions: z.string(),
  ingredients1: z.string(),
  ingredients2: z.string(),
  ingredients3: z.string(),
  ingredients4: z.string(),
  ingredients5: z.string(),
  ingredients6: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateRecipe),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const recipe = await db.recipe.update({ where: { id }, data })

    return recipe
  }
)
