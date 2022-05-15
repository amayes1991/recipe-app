// @ts-nocheck
import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"
import { Flex, Button } from "@chakra-ui/react"
import { Link, Routes } from "blitz"

export function RecipeForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="image" label="Image" placeholder="Image Url" />
      <LabeledTextField name="instructions" label="Instructions" placeholder="Instructions" />
      <LabeledTextField name="ingredients1" label="Ingredients" placeholder="Ingredients" />
      <LabeledTextField name="ingredients2" label="Ingredients" placeholder="Ingredients" />
      <LabeledTextField name="ingredients3" label="Ingredients" placeholder="Ingredients" />
      <LabeledTextField name="ingredients4" label="Ingredients" placeholder="Ingredients" />
      <LabeledTextField name="ingredients5" label="Ingredients" placeholder="Ingredients" />
      <LabeledTextField name="ingredients6" label="Ingredients" placeholder="Ingredients" />
      <Flex justify="center">
        <Button
          type="submit"
          backgroundColor="yellow.400"
          transition="ease-in .2s"
          _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
        >
          {props.text}
        </Button>
        <Button
          ml="9"
          backgroundColor="yellow.400"
          transition="ease-in .2s"
          _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
        >
          <Link href={Routes.RecipesPage()}>
            <a>Back to All Recipes</a>
          </Link>
        </Button>
      </Flex>
    </Form>
  )
}
