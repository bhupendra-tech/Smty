import { Flex, Card, Heading, TextField, Text, Button } from "@radix-ui/themes";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

export default function Subject() {
  const fetcher = useFetcher();
  return (
    <Flex width={"100%"} height={"100%"} justify={"center"} align={"center"}>
      <Card size={"4"} className="max-w-96">
        <Heading as="h4" size={"6"} align={"center"}>
          Want to learn something new ?
        </Heading>
        <fetcher.Form className="mt-8 gap-3 flex flex-col" method="post">
          <Flex gap={"4"} width={"100%"}>
            <TextField.Root
              placeholder={"Enter a Subject Name"}
              className="flex-1"
              autoFocus
              name="subjectName"
            />
          </Flex>
          <Button
            type="submit"
            mt={"4"}
            loading={
              fetcher?.state === "loading" || fetcher?.state === "submitting"
            }
          >
            Create
          </Button>
        </fetcher.Form>
        {fetcher.data?.error && (
          <Text
            color="red"
            align={"center"}
            className="w-full block"
            mt={"4"}
            size={"2"}
          >
            {fetcher?.data?.errorMsg || "Something went wrong"}
          </Text>
        )}
        <Text as="p" size={"1"} color="gray" mt={"6"}>
          When you create a new subject its syllabus and the content will be
          automatically generated
        </Text>
      </Card>
    </Flex>
  );
}
