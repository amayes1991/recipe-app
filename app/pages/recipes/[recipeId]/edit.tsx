// @ts-nocheck
import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRecipe from "app/recipes/queries/getRecipe"
import updateRecipe from "app/recipes/mutations/updateRecipe"
import { RecipeForm, FORM_ERROR } from "app/recipes/components/RecipeForm"
import NavBar from "app/core/components/NavBar"
import { Text, Box } from "@chakra-ui/react"
import Footer from "app/core/components/Footer"

export const EditRecipe = () => {
  const router = useRouter()
  const recipeId = useParam("recipeId", "number")
  const [recipe, { setQueryData }] = useQuery(
    getRecipe,
    { id: recipeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateRecipeMutation] = useMutation(updateRecipe)

  let text: string

  return (
    <>
      <Head>
        <title>Edit Recipe {recipe.id}</title>
      </Head>

      <div>
        <Text
          fontSize="3xl"
          textAlign="center"
          rounded="full"
          borderWidth="2px"
          bg="whatsapp.300"
          mt="9"
        >
          <h1>Edit {recipe.title} Recipe </h1>
        </Text>

        <RecipeForm
          text="Update Recipe"
          initialValues={recipe}
          onSubmit={async (values) => {
            try {
              const updated = await updateRecipeMutation({
                id: recipe.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowRecipePage({ recipeId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditRecipePage: BlitzPage = () => {
  return (
    <div>
      <NavBar />
      <Box w={["100%", 800]} m="auto">
        <Suspense fallback={<div>Loading...</div>}>
          <EditRecipe />
        </Suspense>
      </Box>
      <Footer />
    </div>
  )
}

EditRecipePage.authenticate = true
EditRecipePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRecipePage
