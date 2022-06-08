import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { notify } from "../lib/api";

const SendNotificationForm = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await notify({ message, showToast, userId });
    setIsLoading(false);

    e.target.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <FormControl mb={3}>
        <FormLabel htmlFor="message" fontSize={14}>
          Message
        </FormLabel>
        <Textarea
          id="message"
          name="message"
          size="sm"
          onChange={(e) => setMessage(e.target.value)}
        />
        <FormHelperText>
          The message to embed in the notification.
        </FormHelperText>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel fontSize={14} display="flex" alignItems="center">
          <Checkbox
            name="showToast"
            size="sm"
            isChecked={showToast}
            onChange={(e) => setShowToast(e.target.checked)}
            mr={2}
          />{" "}
          Show a toast?{" "}
        </FormLabel>
      </FormControl>

      <Button
        type="submit"
        variant="solid"
        colorScheme="gray"
        size="sm"
        isDisabled={message === ""}
        isLoading={isLoading}
      >
        Send notification
      </Button>
    </form>
  );
};

export default SendNotificationForm;