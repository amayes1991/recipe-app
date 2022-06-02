import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Heading, Text, Flex, Box, Image, Button } from "@chakra-ui/react"
import NavBar from "app/core/components/NavBar"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div>
      <NavBar />
      <Box justifyContent="center" alignItems="center" m="5">
        <Text textAlign="center" bg="whatsapp.300" rounded="full" fontSize="3xl">
          Login
        </Text>

        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              const user = await loginMutation(values)
              props.onSuccess?.(user)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />

          <Button
            backgroundColor="yellow.400"
            m="4"
            transition="ease-in .2s"
            _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
          >
            <div>
              <Link href={Routes.ForgotPasswordPage()}>
                <a>Forgot your password?</a>
              </Link>
            </div>
          </Button>
        </Form>
        <Button
          pos="absolute"
          backgroundColor="yellow.400"
          transition="ease-in .2s"
          marginLeft={[4, 350]}
          marginTop={[5, -55.9]}
          _hover={{ bg: "whatsapp.400", boxShadow: "2xl" }}
        >
          <div>
            Or <Link href={Routes.SignupPage()}>Sign Up</Link>
          </div>
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm
