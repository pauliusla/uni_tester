"use client";

import { useState } from "react";

export const Form = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const setPasswordInput = (value: string): void => {
    setPassword(value);
  };

  const setEmailInput = (value: string): void => {
    setEmail(value);
  };

  const submitForm = (value: React.FormEvent<HTMLInputElement>): void => {
    value.preventDefault();

    console.log("Form submitted");
  };

  return (
    <form>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(value: React.FormEvent<HTMLInputElement>) =>
          setEmailInput(value.currentTarget.value)
        }
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(value: React.FormEvent<HTMLInputElement>) =>
          setPasswordInput(value.currentTarget.value)
        }
      />
      <input
        type="submit"
        value="Submit"
        onClick={(value: React.FormEvent<HTMLInputElement>) =>
          submitForm(value)
        }
      />
    </form>
  );
};
