import { addSubject, createUser, getUser } from ".";
export const submitSignUpFormAction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  return await createUser({ name, email, password });
};

export const submitSignInFormAction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return await getUser({ email, password });
};

export const submitSelectedSizeForm = async ({ request }) => {
  const formData = await request.formData();
  const subjectName = await formData.get("subjectName");
  return addSubject({ subjectName });
};
