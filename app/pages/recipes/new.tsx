// @ts-nocheck
import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRecipe from "app/recipes/mutations/createRecipe"
import { RecipeForm, FORM_ERROR } from "app/recipes/components/RecipeForm"
import NavBar from "app/core/components/NavBar"
import { Heading, Text, Flex, Box, Image, Button } from "@chakra-ui/react"
import Footer from "app/core/components/Footer"

const NewRecipePage: BlitzPage = () => {
  const router = useRouter()
  const [createRecipeMutation] = useMutation(createRecipe)

  return (
    <div>
      <NavBar />

      <Box pos="relative" w={["100%", 800]} m="auto">
        <Text
          fontSize="3xl"
          textAlign="center"
          rounded="full"
          borderWidth="2px"
          bg="whatsapp.300"
          mt="9"
        >
          Create New Recipe
        </Text>

        <RecipeForm
          // submitText="Create Recipe"
          text="Create Recipe"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={CreateRecipe}
          // initialValues={{}}

          onSubmit={async (values) => {
            try {
              const recipe = await createRecipeMutation(values)
              router.push(Routes.ShowRecipePage({ recipeId: recipe.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Box>
      <Footer />
    </div>
  )
}

NewRecipePage.authenticate = true
NewRecipePage.getLayout = (page) => <Layout title={"Create New Recipe"}>{page}</Layout>

export default NewRecipePage
